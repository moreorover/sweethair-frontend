<template>
  <Button
    :label="button.label"
    :icon="button.icon"
    :class="button.class"
    @click="showDialog = true"
  />
  <Dialog
    v-model:visible="showDialog"
    :style="{ width: '450px' }"
    header="Supplier Details"
    :modal="true"
    class="p-fluid"
  >
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

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeDialog"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="submit"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useSuppliersStore } from '@/store/suppliersStore';
import { Supplier } from '@/types';
import { reactive, ref } from 'vue';

type Props = {
  supplier?: Supplier;
  button?: {
    label: string;
    class: string;
    icon: string;
  };
};

const store = useSuppliersStore();

const showDialog = ref(false);

const props = withDefaults(defineProps<Props>(), {
  supplier: () => {
    return {
      id: -1,
      fullName: '',
      location: '',
      about: '',
      email: '',
      instagram: '',
      url: '',
    };
  },
  button: () => {
    return {
      class: 'p-button-success mr-2',
      icon: 'pi pi-plus',
      label: 'New',
    };
  },
});

const submitted = ref(false);

const supplier = reactive<Supplier>({
  ...props.supplier,
});

const submit = async () => {
  submitted.value = true;

  if (supplier.fullName.trim()) {
    if (supplier.id > 0) {
      await store.update(supplier);
    } else {
      await store.create(supplier);
    }

    showDialog.value = false;
    supplier.id = -1;
    supplier.fullName = '';
    supplier.location = '';
    supplier.about = '';
    supplier.email = '';
    supplier.instagram = '';
    supplier.url = '';
  }
};

const closeDialog = () => {
  submitted.value = false;
  showDialog.value = false;
  supplier.id = -1;
  supplier.fullName = '';
  supplier.location = '';
  supplier.about = '';
  supplier.email = '';
  supplier.instagram = '';
  supplier.url = '';
};
</script>
