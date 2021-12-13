import { computed, ref } from 'vue';
import { DataEntity } from '../services/Service';

export const useMultiplePicker = <T extends DataEntity>(props: any) => {
  const selection = ref<T[]>([]);

  const fullSelection = computed<T[]>(() => [
    ...props.selection,
    ...selection.value,
  ]);

  const removeSelection = (obj: T) => {
    selection.value = selection.value.filter((c) => c.id !== obj.id);
  };
  return { selection, fullSelection, removeSelection };
};

export function useSinglePicker<T extends DataEntity>() {
  const selection = ref<T>();

  const removeSelection = () => {
    selection.value = undefined;
  };
  return { selection, removeSelection };
}
