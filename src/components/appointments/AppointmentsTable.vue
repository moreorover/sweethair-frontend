<template>
  <DataTable
    :value="appointments"
    responsive-layout="stack"
    class="p-datatable-sm"
    :paginator="true"
    :rows="10"
    paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rows-per-page-options="[10, 25, 50]"
    current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
  >
    <template #header>
      <div class="p-d-flex p-jc-between p-ai-center">
        <h5 class="p-m-0">Appointments</h5>

        <div class="flex">
          <new-appointment />
        </div>
      </div>
    </template>
    <template #empty> No appointments found. </template>
    <Column header="Scheduled">
      <template #body="slotProps"> {{ format(new Date(slotProps.data.start), 'dd/MMMM/yyyy hh:mm') }} </template>
    </Column>
    <Column header="Customers">
      <template #body="slotProps">
        <p v-for="customer in slotProps.data.customers" :key="customer.id">
          {{ customer.firstName }} {{ customer.lastName }}
        </p>
      </template>
    </Column>
    <Column header="Transactions">
      <template #body="slotProps">
        <p>{{ slotProps.data.transactions.length }}</p>
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <edit-appointment :appointment-value="slotProps.data" />
      </template>
    </Column>
    <Column
      v-if="viewAppointment"
      header-style="width: 4rem; text-align: center"
      body-style="text-align: center; overflow: visible"
    >
      <template #body="slotProps">
        <router-link v-slot="{ navigate }" :to="{ name: `Appointment`, params: { id: slotProps.data.id } }" custom>
          <Button class="p-button-sm" type="button" icon="pi pi-search" @click="navigate" />
        </router-link>
      </template>
    </Column>
  </DataTable>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Appointment } from '@/services/AppointmentService';
import { format } from 'date-fns';
import NewAppointment from '@/views/appointments/NewAppointment.vue';
import EditAppointment from '@/views/appointments/EditAppointment.vue';

export default defineComponent({
  name: 'AppointmentsTable',
  components: { NewAppointment, EditAppointment },
  props: {
    appointments: {
      type: Object as () => Appointment[],
      required: true,
    },
    viewAppointment: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return { format };
  },
});
</script>
<style scoped></style>
