<template>
  <Toolbar class="mb-4">
    <template #start>
      <span class="font-medium text-2xl text-900">{{ supplier.fullName }}</span>
    </template>
    <template #end>
      <SupplierFormDialog
        :supplier="supplier"
        :button="{
          class: 'p-button-rounded p-button-success mr-2 pr-2',
          icon: 'pi pi-pencil',
          label: 'Edit',
        }"
      />
    </template>
  </Toolbar>

  <div class="surface-card p-4 shadow-2 border-round">
    <div class="font-medium text-3xl text-900 mb-3">Applicant Profile</div>
    <div class="text-500 mb-5">
      Egestas sed tempus urna et pharetra pharetra massa massa ultricies.
    </div>
    <div class="grid grid-nogutter border-top-1 surface-border pt-2">
      <div class="col-12 md:col-6 p-3">
        <div class="text-500 font-medium mb-2">Name</div>
        <div class="text-900">Elliot Alderson</div>
      </div>
      <div class="col-12 md:col-6 p-3">
        <div class="text-500 font-medium mb-2">Email</div>
        <div class="text-900">elliot.alderson@email.com</div>
      </div>
      <div class="col-12 md:col-6 p-3">
        <div class="text-500 font-medium mb-2">Applied Position</div>
        <div class="text-900">Front-End Developer</div>
      </div>
      <div class="col-12 md:col-6 p-3">
        <div class="text-500 font-medium mb-2">Salary Expectation</div>
        <div class="text-900">$150,000</div>
      </div>
      <div class="col-12 p-3">
        <div class="text-500 font-medium mb-2">Bio</div>
        <div class="text-900 line-height-3">
          Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt
          vitae. Commodo odio aenean sed adipiscing diam donec adipiscing
          tristique. Eget felis eget nunc lobortis mattis aliquam faucibus purus
          in.
        </div>
      </div>
      <div class="col-12 p-3">
        <div class="text-500 font-medium mb-3">Files</div>
        <div
          class="
            flex
            md:align-items-center md:justify-content-between
            border-top-1
            surface-border
            p-3
            flex-column
            md:flex-row
          "
        >
          <div class="flex align-items-center">
            <span class="block pi pi-file mr-2"></span>
            <span class="text-900">resume_en.pdf</span>
          </div>
          <Button
            icon="pi pi-download"
            label="Download"
            class="p-button-outlined mt-2 md:mt-0"
          ></Button>
        </div>
        <div
          class="
            flex
            md:align-items-center md:justify-content-between
            border-top-1 border-bottom-1
            surface-border
            p-3
            flex-column
            md:flex-row
          "
        >
          <div class="flex align-items-center">
            <span class="block pi pi-file mr-2"></span>
            <span class="text-900">cover_letter_en.pdf</span>
          </div>
          <Button
            icon="pi pi-download"
            label="Download"
            class="p-button-outlined mt-2 md:mt-0"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSuppliersStore } from '@/store/suppliersStore';
import SupplierFormDialog from '@/components/suppliers/SupplierFormDialog.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useSuppliersStore();
const id: number = +route.params.id;

if (!store.loaded) await store.fetchAll();

const supplier = computed(() => store.getRaw[id]);
</script>
