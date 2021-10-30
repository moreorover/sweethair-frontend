<template>
  <div class="grid">
    <div class="col-12 md:col-12 lg:col-4">
      <div
        class="
          flex
          align-items-center
          justify-content-center
          bg-yellow-500
          font-bold
          text-gray-900
          m-2
          px-5
          py-2
          border-round
        "
        @click="adjustDate(-1)"
      >
        Previous Month
      </div>
    </div>
    <div class="col-12 md:col-12 lg:col-3">
      <div
        class="
          flex
          align-items-center
          justify-content-center
          bg-yellow-500
          font-bold
          text-gray-900
          m-2
          px-5
          py-2
          border-round
        "
      >
        {{ format(new Date(date), 'MMMM yyyy') }}
      </div>
    </div>
    <div class="col-12 md:col-12 lg:col-1">
      <div
        class="
          flex
          align-items-center
          justify-content-center
          bg-yellow-500
          font-bold
          text-gray-900
          m-2
          px-5
          py-2
          border-round
        "
        @click="date = new Date()"
      >
        Today
      </div>
    </div>
    <div class="col-12 md:col-12 lg:col-4">
      <div
        class="
          flex
          align-items-center
          justify-content-center
          bg-yellow-500
          font-bold
          text-gray-900
          m-2
          px-5
          py-2
          border-round
        "
        @click="adjustDate(1)"
      >
        Next Month
      </div>
    </div>
  </div>

  <ul class="list-none p-0 m-0">
    <li v-for="appointment in appointments" :key="appointment.id" class="surface-0 p-4 mb-3 shadow-2 border-round">
      <div class="border-2 border-dashed border-300 border-round surface-0 p-4">
        <div class="mb-3 flex align-items-center justify-content-start">
          <div class="flex align-items-center">
            <span class="text-xl font-medium text-900">{{ appointment.title }}</span>
          </div>
          <div class="flex align-items-center">
            <span class="text-xl font-medium text-900">{{
              format(new Date(appointment.scheduledAt), 'dd MMMM yyyy')
            }}</span>
          </div>
        </div>
      </div>
    </li>
  </ul>

  <!-- <div class="card">
    <div class="flex flex-row flex-wrap card-container blue-container">
      <div
        v-for="day in daysInMonth"
        :key="day"
        class="
          flex flex-1
          align-items-center
          justify-content-center
          w-4rem
          h-4rem
          bg-blue-500
          font-bold
          text-white
          border-round
          m-2
          relative
        "
        style="min-width: 200px; min-height: 100px"
      >
        {{ getAppointmentsForDay(day)?.length }}
        <div
          class="
            absolute
            top-0
            right-0
            bg-cyan-500
            text-white
            font-bold
            flex
            align-items-center
            justify-content-center
            w-2rem
            h-2rem
            border-round
          "
        >
          {{ day }}
        </div>
      </div>
    </div>
  </div> -->
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { format, addMonths, isSameDay, isSameMonth, isSameYear, getMonth, getYear, getDaysInMonth } from 'date-fns';

export default defineComponent({
  name: 'AppointmentsCalendarView',
  components: {},
  setup() {
    const store = useAppointmentsStore();

    const date = ref<Date>(new Date());

    store.fetchAll();

    const appointments = computed(() =>
      store.getAppointmentByMonthAndYear(
        getMonth(new Date(date.value.toISOString())),
        getYear(new Date(date.value.toISOString()))
      )
    );

    const adjustDate = (number: number) => {
      date.value = addMonths(new Date(date.value.toISOString()), number);
    };

    const getDate = (day: number): Date => {
      return new Date(getYear(new Date(date.value.toISOString())), getMonth(new Date(date.value.toISOString())), day);
    };

    const getAppointmentsForDay = (day: number) => {
      return appointments.value?.filter(
        (a) =>
          isSameDay(getDate(day), new Date(a.scheduledAt)) &&
          isSameMonth(getDate(day), new Date(a.scheduledAt)) &&
          isSameYear(getDate(day), new Date(a.scheduledAt))
      );
    };

    const daysInMonth = computed(() => getDaysInMonth(new Date(date.value.toISOString())));

    return { appointments, date, format, adjustDate, daysInMonth, getAppointmentsForDay };
  },
});
</script>
<style scoped></style>
