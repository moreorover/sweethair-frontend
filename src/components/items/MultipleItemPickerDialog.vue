<template>
  <BaseButton :label="props.label" @onClick="toggleModal" v-bind="attrs" />
  <BaseModal
    :header="props.header"
    :show-footer="true"
    v-model:visible="showModal"
    @toggle-modal="toggleModal"
    @cancel="cancel"
    @submit="submit"
  >
    <BasePicker>
      <template v-slot:selection>
        <BaseChip
          v-for="item in fullSelection"
          @remove="removeSelection(item)"
          :text="item.title"
          :show-action="!!selection.map((c) => c.id).find((c) => c === item.id)"
        />
      </template>
      <template v-slot:search>
        <BaseInput v-model="search" class="" type="text" label="Search" />
      </template>
      <template v-slot:options>
        <BaseChip
          v-for="item in items.slice(0, 8)"
          @select="selection.push(item)"
          :text="`${item.id} - ${item.title}`"
          :show-action="false"
        />
        <BaseChip v-if="items.length > 8" text="..." :show-action="false" />
      </template>
    </BasePicker>
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';
import { useMultiplePicker } from '@/hooks/usePicker';
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, ref } from 'vue';
import { useAttrs } from 'vue';
import { Item } from '@/services/ItemService';

interface Props {
  header: string;
  label: string;
  selection: Item[];
  items: Item[];
}

const attrs = useAttrs();
const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const { showModal, toggleModal } = useModal();
const { selection, fullSelection, removeSelection } = useMultiplePicker<Item>(props);

const search = ref('');

const items = computed(() =>
  props.items.filter(
    (i) =>
      !fullSelection.value.map((cs) => cs.id).includes(i.id) &&
      (i.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
        i.id.toString().includes(search.value.toLocaleLowerCase()))
  )
);

const submit = () => {
  if (selection.value.length) {
    emit('submit', selection.value);
    selection.value = [];
    toggleModal();
  }
};

const cancel = () => {
  selection.value = [];
  toggleModal();
};
</script>
