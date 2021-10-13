<template>
  <div class="card">
    <h5>Single</h5>
    <DataTable
      v-model:selection="selectedProduct1"
      :value="products"
      selection-mode="single"
      data-key="id"
      responsive-layout="scroll"
    >
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { Customer } from '@/services/CustomerService';
import { useCustomersStore } from '@/store/customersStore';

export default defineComponent({
  name: 'SingleCustomerPicker',
  props: {
    customersValue: {
      type: Object as PropType<Customer[]>,
      required: true,
    },
    selectionValue: {
      type: Object as PropType<Customer>,
      required: true,
    },
  },
  emits: ['update:customerValue'],
  setup(props, { emit }) {
    const customerStore = useCustomersStore();
    const customers = computed(() => customerStore.getAll);
    const searchKey = ref('');

    const selectedId = ref(props.customerValue ? props.customerValue.id : '');

    const onSelect = (customerId: string | undefined) => {
      if (customerId === selectedId.value) {
        selectedId.value = '';
      } else {
        selectedId.value = customerId;
      }
      emit(
        'update:customerValue',
        customers.value.find((c) => c.id === selectedId.value)
      );
    };

    customerStore.fetchAll();

    const filteredCustomers = computed(() => {
      return customers.value.filter((customer) => {
        if (searchKey.value === '' && !(props.customerValue?.id === customer.id)) {
          return false;
        }
        if (
          customer.firstName.toLowerCase().includes(searchKey.value) ||
          customer.lastName.toLowerCase().includes(searchKey.value) ||
          customer.email?.toLowerCase().includes(searchKey.value) ||
          customer.instagram?.toLowerCase().includes(searchKey.value) ||
          props.customerValue?.id === customer.id
        ) {
          return true;
        }
        return false;
      });
    });

    return { filteredCustomers, searchKey, customers, onSelect, selectedId };
  },
});
</script>
<style scoped></style>
