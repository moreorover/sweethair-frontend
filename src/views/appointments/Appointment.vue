<template>
  <div class="px-0 py-4 md:px-4">
    <div class="border-2 surface-border border-round surface-card">
      <div class="surface-section p-5">
        <div class="flex align-items-start flex-column lg:flex-row lg:justify-content-between">
          <div class="flex align-items-start flex-column md:flex-row">
            <div>
              <span class="text-900 font-medium text-3xl">
                {{ appointment?.start && format(new Date(appointment?.start), 'dd/MMMM/yyy hh:mm') }}
              </span>
            </div>
          </div>
          <div class="flex align-items-end">
            <edit-appointment :appointment-value="appointment" />
          </div>
        </div>
        <div class="flex align-items-start flex-column lg:flex-row lg:justify-content-between py-2">
          <div class="flex align-items-start flex-column md:flex-row"></div>
          <div class="flex align-items-end">
            <add-customers :appointment-value="appointment" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-for="customer in customers" :key="customer.id" class="px-0 py-4 md:px-4">
    <div class="border-2 surface-border border-round surface-card">
      <customer-vue :id="customer.id" :appointment-id="appointment?.id">
        <template v-if="customerTransactions(customer).value === 0" #Action>
          <Button
            class="p-button-sm"
            label="Remove Customer From Appointment"
            @click="removeCustomer(customer)"
          ></Button>
        </template>
      </customer-vue>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { format } from 'date-fns';
import { useCustomersStore } from '@/store/customersStore';
import { useTransactionsStore } from '@/store/transactionsStore';
import EditAppointment from '@/components/appointments/EditAppointment.vue';
import AddCustomers from '@/components/appointments/AddCustomers.vue';
import { Customer } from '@/services/CustomerService';
import CustomerVue from '../customers/Customer.vue';

export default defineComponent({
  components: { EditAppointment, AddCustomers, CustomerVue },
  setup() {
    const appointmentsStore = useAppointmentsStore();
    const customersStore = useCustomersStore();
    const transactionsStore = useTransactionsStore();
    const id = useRoute().params.id as string;

    appointmentsStore.fetchAll();
    customersStore.fetchAll();
    transactionsStore.fetchAll();

    const appointment = computed(() => appointmentsStore.getAppointmentById(id));
    const customers = computed(() => customersStore.getCustomersByAppointment(appointment.value));
    // const transactions = computed(() => transactionsStore.getTransactionsByAppointment(appointment.value));

    if (!appointment.value) {
      throw Error('Appointment was not found.');
    }

    const customerTransactions = (customer: Customer) =>
      computed<number>(
        () => transactionsStore.getTransactionsByCustomerAndAppointmentId(customer, appointment.value).length
      );

    const removeCustomer = (customer: Customer) => {
      appointmentsStore.removeCustomer(appointment.value, customer);
    };

    return { appointment, format, customers, removeCustomer, customerTransactions };
  },
});
</script>
