<script setup lang="ts">
import { Supplier } from '../../services/SuppliersService';

type Props = {
  supplier: Supplier;
  submitted: boolean;
};

const props = defineProps<Props>();
</script>

<template>
  <div class="field">
    <label for="name">Name</label>
    <InputText
      id="name"
      v-model.trim="supplier.fullName"
      required="true"
      autofocus
      :class="{ 'p-invalid': submitted && !supplier.fullName }"
    />
    <small class="p-error" v-if="submitted && !supplier.fullName"
      >Name is required.</small
    >
  </div>
  <div class="field">
    <label for="about">About</label>
    <Textarea
      id="description"
      v-model="supplier.about"
      required="false"
      rows="3"
      cols="20"
    />
  </div>

  <div class="field">
    <label for="about">Location</label>
    <InputText id="location" v-model="supplier.location" required="false" />
  </div>

  <div class="field">
    <label for="about">Email</label>
    <InputText id="email" v-model="supplier.email" required="false" />
  </div>

  <div class="field">
    <label for="about">Instagram</label>
    <InputText id="location" v-model="supplier.instagram" required="false" />
  </div>

  <div class="field">
    <label for="about">Website URL</label>
    <InputText id="location" v-model="supplier.url" required="false" />
  </div>
</template>
