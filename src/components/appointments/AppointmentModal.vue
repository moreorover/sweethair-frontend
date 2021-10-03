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
        <appointment-form :appointment-value="newAppointment" />
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="submit">Submit</button>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref, toRefs } from 'vue';
import AppointmentForm from '@/components/appointments/AppointmentForm.vue';
import { Customer } from '@/services/CustomerService';
import { Appointment } from '@/services/AppointmentService';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { useAppointmentModal } from '@/composables/appointmentModal';

export default defineComponent({
  name: 'AppointmentModal',
  components: { AppointmentForm },
  props: {
    appointment: {
      type: Object as PropType<Appointment | null>,
      required: false,
      default: null,
    },
    customers: {
      type: Object as PropType<Customer[] | null>,
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
    const appointmentsStore = useAppointmentsStore();
    const show = ref<boolean>(false);
    const appointmentModal = useAppointmentModal();
    const { appointment, customers } = toRefs(props);
    const newAppointment = appointment.value
      ? reactive<Appointment>(appointment.value)
      : reactive<Appointment>({
          ...appointmentModal.emptyAppointment,
          customers: customers.value ? [...customers.value] : [],
        });

    const submit = () => {
      const a: Appointment = appointmentModal.cleanAppointment(newAppointment);
      if (!a.id) {
        appointmentsStore.create(a);
      } else {
        appointmentsStore.update(a);
      }
      show.value = false;
    };
    return { show, submit, newAppointment };
  },
});
</script>
<style scoped>
.modal-card {
  width: 80%;
}
</style>
