<template>
  <BaseButton :label="props.label" @onClick="toggleModal" v-bind="attrs" />
  <BaseModal
    :header="props.header"
    :show-footer="true"
    v-model:visible="showModal"
    @toggle-modal="toggleModal"
    @cancel="cancel"
    @submit="submit"
  >
    <BasePicker>
      <template v-slot:selection>
        <BaseChip
          v-for="customer in fullSelection"
          @remove="removeSelection(customer)"
          :text="customer.fullName"
          :show-action="!!selection.map((c) => c.id).find((c) => c === customer.id)"
        />
      </template>
      <template v-slot:search>
        <BaseInput v-model="search" class="" type="text" label="Search" />
      </template>
      <template v-slot:options>
        <BaseChip
          v-for="customer in customers.slice(0, 8)"
          @select="selection.push(customer)"
          :text="customer.fullName"
          :show-action="false"
        />
        <BaseChip v-if="customers.length > 8" text="..." :show-action="false" />
      </template>
    </BasePicker>
  </BaseModal>
</template>
<script setup lang="ts">
import { Customer } from '@/services/CustomerService';
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';
import { useMultiplePicker } from '@/hooks/usePicker';
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, ref } from 'vue';
import { useAttrs } from 'vue';

interface Props {
  header: string;
  label: string;
  selection: Customer[];
  customers: Customer[];
}

const attrs = useAttrs();
const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const { showModal, toggleModal } = useModal();
const { selection, fullSelection, removeSelection } = useMultiplePicker<Customer>(props);

const search = ref('');

const customers = computed(() =>
  props.customers.filter(
    (c) =>
      !fullSelection.value.map((cs) => cs.id).includes(c.id) &&
      (c.fullName.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
        c.location.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
        c.about.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
        c.email?.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
        c.instagram?.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
  )
);

const submit = () => {
  if (selection.value.length) {
    emit('submit', selection.value);
    selection.value = [];
    toggleModal();
  }
};

const cancel = () => {
  selection.value = [];
  toggleModal();
};
</script>
