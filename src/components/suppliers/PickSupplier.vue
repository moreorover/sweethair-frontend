<template>
  <div v-bind="attrs">
    <div>
      <FormKit type="button" @click="startPick">
        {{ buttonText }}
      </FormKit>
    </div>
    <div v-show="pickSupplier">
      <div v-show="suppliers.length > 5">
        <FormKit
          type="search"
          placeholder="Search..."
          label="Search"
          value=""
          v-model="searchSupplier"
        />
      </div>
      <div
        class="
          flex flex-wrap
          gap-4
          font-mono
          text-white text-sm
          font-bold
          leading-6
          bg-stripes-indigo
          rounded-lg
        "
      >
        <div v-for="supplier of suppliers.slice(0, 5)">
          <div
            class="
              p-2
              rounded-md
              flex
              items-center
              justify-center
              shadow-lg
              cursor-pointer
            "
            :class="[cardBackground(supplier.id)]"
            @click="clickedCard(supplier)"
          >
            {{ supplier.fullName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSuppliersStore } from '@/store/suppliersStore';
import { Supplier } from '@/types';
import { ref, computed, reactive } from 'vue';
import { useAttrs } from 'vue';

const attrs = useAttrs();

type Props = {
  supplier: Supplier | null;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'picked', supplier: Supplier): void;
}>();

const store = useSuppliersStore();

const suppliers = computed(() =>
  store.getAll.filter((s) =>
    s.fullName
      .toLocaleLowerCase()
      .includes(searchSupplier.value.toLocaleLowerCase())
  )
);

const data = reactive<{ pickedSupplier: Supplier | null }>({
  pickedSupplier: props.supplier,
});

const pickSupplier = ref<boolean>(false);

const searchSupplier = ref<string>('');

const startPick = async () => {
  if (!store.loaded) await store.fetchAll();
  pickSupplier.value = true;
};

const cardBackground = (supplierId: number): string => {
  if (data.pickedSupplier?.id == supplierId) return 'bg-indigo-500';
  return 'bg-indigo-300';
};

const clickedCard = (supplier: Supplier): void => {
  data.pickedSupplier = supplier;
  emit('picked', supplier);
};

const buttonText = computed(() =>
  data.pickedSupplier ? data.pickedSupplier.fullName : 'Pick Supplier'
);
</script>
