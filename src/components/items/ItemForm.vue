<template>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
      <div>
        <BaseInput label="Title" v-model="title" type="text" :error="errors.title" />
      </div>
      <div>
        <BaseInput label="Total amount" v-model="total" type="number" :error="errors.total" step=".01" />
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <BaseButton label="Submit" size="large" />
    </div>
  </form>
</template>
<script setup lang="ts">
import { Item } from '@/services/ItemService';
import { useField, useForm } from 'vee-validate';
import { object, string, number, boolean } from 'yup';
import BaseInput from '../base/BaseInput.vue';

type Props = {
  item: Item;
};

const props = defineProps<Props>();

const emit = defineEmits(['submit']);

const validationSchema = object({
  title: string().trim().required('Title is required.'),
  total: number().required(),
});

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: title } = useField('title');
const { value: total } = useField('total');

title.value = props.item.title;
total.value = props.item.total;

const submit = handleSubmit((values) => {
  props.item.id > 0 ? emit('submit', { id: props.item.id, ...values }) : emit('submit', { ...values });
});
</script>
