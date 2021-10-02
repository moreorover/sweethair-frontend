<template>
  <button class="button is-small is-warning" @click="show = true">{{ action }}</button>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background" @click="show = false"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="show = false" />
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
        <customer-form :customer-value="newCustomer" />
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="submit">Submit</button>
      </footer>
    </div>
  </div>
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
