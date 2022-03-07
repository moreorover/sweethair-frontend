<template>
  Purchase Form
  <FormKit type="form" @submit="submit" v-model="supplier">
    <FormKit
      type="text"
      name="fullName"
      label="Full Name"
      help="Enter a full name of a supplier"
      validation="required"
      validation-visibility="live"
    />
    <FormKit
      type="text"
      name="location"
      label="Location"
      help="Enter a location (city, country) of a supplier"
      validation=""
      validation-visibility="live"
    />
    <FormKit
      type="textarea"
      name="about"
      label="About"
      help="Enter a description of a supplier"
      validation=""
      validation-visibility="live"
    />
    <FormKit
      type="text"
      name="email"
      label="Email address"
      help="Enter an email contact address"
      validation="email"
      validation-visibility="live"
    />
    <FormKit
      type="text"
      name="instagram"
      label="Instagram tag"
      help="Enter an instagram tag"
      validation=""
      validation-visibility="live"
    />
    <FormKit
      type="text"
      name="url"
      label="Website Url"
      help="Enter a link to the website"
      validation="url"
      validation-visibility="live"
    />
  </FormKit>
</template>

<script setup lang="ts">
import { Supplier } from '@/types';
import { reactive } from 'vue';

type Props = {
  supplier: Supplier;
};

const props = defineProps<Props>();

const emit = defineEmits(['submit']);

const supplier = reactive<Supplier>({
  ...props.supplier,
});

const submit = () => {
  emit('submit', {
    ...supplier,
  });
};
</script>
