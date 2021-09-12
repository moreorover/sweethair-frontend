<template>
  <section class="section card has-text-centered">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <div class="control">
          <input v-model="start" type="date" class="input is-medium" placeholder="First Name" />
        </div>
      </div>
      <button class="button is-block is-primary is-fullwidth is-medium">Submit</button>
    </form>
  </section>
</template>
<script lang="ts">
import { Appointment } from '@/services/AppointmentService';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    appointment: {
      type: Object as () => Appointment,
      required: true,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    save: (appointment: Appointment) => {
      return true;
    },
  },
  setup(props, ctx) {
    const start = ref(props.appointment.start);

    const onSubmit = () => {
      const newAppointment: Appointment = {
        ...props.appointment,
        start: start.value,
      };

      for (var propName in newAppointment) {
        if (
          newAppointment[propName] === null ||
          newAppointment[propName] === undefined ||
          newAppointment[propName] === ''
        ) {
          delete newAppointment[propName];
        }
      }

      ctx.emit('save', newAppointment);
    };

    return { start, onSubmit };
  },
});
</script>
<style scoped></style>
