<template>
  <div class="columns is-multiline">
    <router-link
      v-for="customer in customers"
      :key="customer.id"
      v-slot="{ navigate }"
      :to="`/customers/${customer.id}`"
      custom
    >
      <div class="column is-12-tablet is-6-desktop is-4-widescreen" @click="navigate">
        <article class="box">
          <div class="media">
            <div class="media-content">
              <p class="title is-5 is-spaced is-marginless">{{ customer.firstName }} {{ customer.lastName }}</p>
              <p class="subtitle is-marginless">{{ customer.email }}</p>
              <p class="subtitle is-marginless">{{ customer.instagram }}</p>
              <div class="content is-small">
                Created on: {{ customer.createdOn && format(new Date(customer.createdOn), 'dd MMMM yyyy') }}
                <br />
                Modified on: {{ customer.modifiedOn && format(new Date(customer.modifiedOn), 'dd MMMM yyyy') }}
                <br />
                <router-link :to="`/customers/${customer.id}/edit`" class="subtitle is-marginless"> Edit </router-link>
                <span class="subtitle is-marginless"> / </span>
                <router-link :to="`/customers/${customer.id}/edit`" class="subtitle is-marginless">
                  Book Appointment
                </router-link>
                <p></p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Customer } from '@/services/CustomerService';
import { format } from 'date-fns';

export default defineComponent({
  name: 'CustomersCards',
  props: {
    customers: {
      type: Object as () => Customer[],
      required: true,
    },
  },
  setup() {
    return { format };
  },
});
</script>
<style scoped></style>
