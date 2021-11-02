<script setup lang="ts">
import { Customer } from '@/services/CustomerService';
import { useCustomersStore } from '@/store/customersStore';
import { computed, ref } from 'vue';

type Props = {
  selectedCustomers?: Customer[] | null;
  multiple?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  selectedCustomers: () => {
    return [];
  },
  multiple: false,
});

const emit = defineEmits(['selected']);

const store = useCustomersStore();
store.fetchAll();
const customers = computed(() => store.getAll);
const selectedCustomersIds: string[] =
  props.selectedCustomers && props.selectedCustomers.length > 0 ? props.selectedCustomers.map((c) => c.id) : [];
const selected = ref();
const selectedMultiple = ref([]);
const filteredCustomers = ref();
const searchCustomer = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredCustomers.value = [...customers.value];
    } else {
      filteredCustomers.value = customers.value.filter((customer) => {
        return (
          customer.fullName.toLowerCase().includes(event.query.toLowerCase()) &&
          !selectedCustomersIds.includes(customer.id)
        );
      });
    }
  }, 250);
};

const confirmSelection = () => {
  if (props.multiple) {
    emit('selected', selectedMultiple.value);
  } else {
    emit('selected', selected.value);
  }
};
const onClear = () => {
  emit('selected', null);
};
</script>
<template>
  <AutoComplete
    v-if="!props.multiple"
    v-model="selected"
    :suggestions="filteredCustomers"
    field="fullName"
    force-selection
    :multiple="false"
    :dropdown="true"
    @complete="searchCustomer($event)"
    @clear="onClear()"
    @item-select="confirmSelection()"
    @item-unselect="confirmSelection()"
  />
  <AutoComplete
    v-else
    v-model="selectedMultiple"
    :suggestions="filteredCustomers"
    field="fullName"
    force-selection
    :multiple="true"
    :dropdown="true"
    @complete="searchCustomer($event)"
    @clear="onClear()"
    @item-select="confirmSelection()"
    @item-unselect="confirmSelection()"
  />
</template>
