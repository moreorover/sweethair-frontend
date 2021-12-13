import { computed, ref } from 'vue';
import moment from 'moment';

const currentDate = moment();
const currentWeek = currentDate.week();
const weekNumber = ref(currentWeek);

export const useWeek = () => {
  const weekStart = computed(() =>
    moment().week(weekNumber.value).startOf('week')
  );
  const weekEnd = computed(() => moment().week(weekNumber.value).endOf('week'));

  const increaseWeek = () => {
    ++weekNumber.value;
  };

  const decreaseWeek = () => {
    --weekNumber.value;
  };

  const reset = () => {
    weekNumber.value = currentWeek;
  };

  return {
    currentWeek,
    weekNumber,
    weekStart,
    weekEnd,
    increaseWeek,
    decreaseWeek,
    reset,
  };
};
