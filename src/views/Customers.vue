<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCustomers } from '../store/customersStore';

const customersStore = useCustomers();
const customers = computed(() => customersStore.getAll);
const records = computed(() => customersStore.getRecords);
const ids = computed(() => customersStore.getIds);

customersStore.fetchAll();

const displayBasic = ref(false);

const openBasic = () => {
  displayBasic.value = true;
};
const closeBasic = () => {
  displayBasic.value = false;
};
</script>
<template>
  <h3 class="text-3xl font-medium text-gray-700">Customers</h3>

  <div class="mt-4">
    <div
      class="flex items-center justify-end space-x-4 rounded-md bg-white px-4 py-4"
    >
      <div>Search</div>
      <div>
        <Button label="Show" icon="pi pi-external-link" @click="openBasic" />
        <Dialog
          header="Header"
          v-model:visible="displayBasic"
          :style="{ width: '50vw' }"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <template #footer>
            <Button
              label="No"
              icon="pi pi-times"
              @click="closeBasic"
              class="p-button-text"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              @click="closeBasic"
              autofocus
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>

  <div class="mt-4">
    <div
      class="flex items-center justify-end space-x-4 rounded-md bg-white px-4 py-4"
    >
      Customers <br />
      {{ customers }} <br />
      <br />
      Records <br />
      {{ records }} <br />
      <br />
      ids <br />
      {{ ids }}
    </div>
  </div>
  <div class="flex flex-col">
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    <!-- <div class="flex w-1/2 flex-col bg-red-400">
      <div class="">Customers</div>
      
    </div>
    <div class="flex w-1/2 flex-col bg-blue-400">Selected Customer</div> -->
  </div>
</template>
