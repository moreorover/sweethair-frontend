<template>
  <BaseButton :label="props.label" @onClick="toggleModal" :size="props.buttonSize" />
  <BaseModal
    :header="props.header"
    :show-footer="true"
    v-model:visible="showModal"
    @toggle-modal="toggleModal"
    @cancel="cancel"
    @submit="submit"
  >
    <div class="flex flex-col lg:flex-row justify-center min-w-max gap-4">
      <div class="flex flex-col w-full lg:w-1/2">
        <p>Selection:</p>
        <ul class="divide-y divide-gray-300">
          <li @click="removeSelection" :class="{ 'bg-red-100': selection }">
            {{ selection?.fullName }}
          </li>
        </ul>
      </div>
      <div class="flex flex-col w-full lg:w-1/2">
        <div>
          <BaseInput v-model="search" class="" type="text" label="Search" />
        </div>
        <div class="rounded-lg w-full">
          <p>Options:</p>
          <ul class="divide-y divide-gray-300">
            <li v-for="customer in customers.slice(0, 8)" @click="selection = customer">{{ customer.fullName }}</li>
            <li v-if="customers.length > 8">...</li>
          </ul>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
import { useCustomersStore } from '@/store/customersStore';
import { Customer } from '@/services/CustomerService';
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, ref } from 'vue';

interface Props {
  header: string;
  label: string;
  buttonSize: string;
  customersToPick?: Customer[];
}

const props = withDefaults(defineProps<Props>(), { customersToPick: undefined });
const emit = defineEmits(['submit']);

const customersStore = useCustomersStore();
const { showModal, toggleModal } = useModal();

const search = ref('');

const customers = computed(() =>
  props.customersToPick
    ? props.customersToPick.filter(
        (c) =>
          c.fullName.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
          c.location.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
          c.about.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
          c.email?.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
          c.instagram?.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
      )
    : customersStore.getAll.filter(
        (c) =>
          selection.value?.id !== c.id &&
          (c.fullName.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
            c.location.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
            c.about.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
            c.email?.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
            c.instagram?.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
      )
);

const selection = ref<Customer>();

const removeSelection = () => {
  selection.value = undefined;
};

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
