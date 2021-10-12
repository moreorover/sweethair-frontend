<template>
  <Button :label="action" @click="show = true"></Button>

  <Dialog
    v-model:visible="show"
    :dismissable-mask="true"
    :modal="true"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '80%' }"
  >
    <template #header>
      <div class="flex align-items-center">
        <span class="font-medium text-2xl text-900">{{ title }}</span>
      </div>
    </template>
    <customer-form :customer-value="newCustomer" />
    <template #footer>
      <div class="border-top-1 surface-border pt-3">
        <Button icon="pi pi-times" label="Cancel" class="p-button-text" @click="show = false"></Button>
        <Button icon="pi pi-check" label="Save" @click="submit"></Button>
      </div>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref, toRefs } from 'vue';
import CustomerForm from '@/components/customers/CustomerForm.vue';
import { Customer } from '@/services/CustomerService';
import { useCustomerModal } from '@/composables/customerModal';
import { useCustomersStore } from '@/store/customersStore';

export default defineComponent({
  name: 'CustomerModal',
  components: { CustomerForm },
  props: {
    customer: {
      type: Object as PropType<Customer | null>,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const customersStore = useCustomersStore();
    const show = ref<boolean>(false);
    const customerModal = useCustomerModal();
    const { customer } = toRefs(props);
    const newCustomer = customer.value
      ? reactive<Customer>(customer.value)
      : reactive<Customer>(customerModal.emptyCustomer);

    const submit = () => {
      const c: Customer = customerModal.cleanCustomer(newCustomer);
      if (!c.id) {
        customersStore.create(c);
      } else {
        customersStore.update(c);
      }
      show.value = false;
    };
    return { show, submit, newCustomer };
  },
});
</script>
