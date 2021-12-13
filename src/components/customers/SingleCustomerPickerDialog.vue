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
          v-if="selection"
          @remove="removeSelection"
          :text="selection?.fullName"
          :show-action="true"
        />
      </template>
      <template v-slot:search>
        <BaseInput v-model="search" type="text" label="Search" />
      </template>
      <template v-slot:options>
        <BaseChip
          v-for="customer in customers.slice(0, 8)"
          @select="selection = customer"
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
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, ref } from 'vue';
import { useSinglePicker } from '@/hooks/usePicker';
import { useAttrs } from 'vue';

interface Props {
  header: string;
  label: string;
  customers: Customer[];
}

const attrs = useAttrs();
const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const { showModal, toggleModal } = useModal();
const { selection, removeSelection } = useSinglePicker<Customer>();

const search = ref('');

const customers = computed(() =>
  props.customers.filter(
    (c) =>
      selection.value?.id !== c.id &&
      (c.fullName
        .toLocaleLowerCase()
        .includes(search.value.toLocaleLowerCase()) ||
        c.location
          .toLocaleLowerCase()
          .includes(search.value.toLocaleLowerCase()) ||
        c.about
          .toLocaleLowerCase()
          .includes(search.value.toLocaleLowerCase()) ||
        c.email
          ?.toLocaleLowerCase()
          .includes(search.value.toLocaleLowerCase()) ||
        c.instagram
          ?.toLocaleLowerCase()
          .includes(search.value.toLocaleLowerCase()))
  )
);

const submit = () => {
  emit('submit', selection.value);
  selection.value = undefined;

  toggleModal();
};

const cancel = () => {
  selection.value = undefined;
  toggleModal();
};
</script>
