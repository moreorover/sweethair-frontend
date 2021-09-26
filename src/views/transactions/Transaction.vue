<template>
  <div class="hero is-small welcome is-info my-3">
    <div class="hero-body">
      <div class="columns">
        <div class="column has-text-left my-auto">
          <p class="title is-3">{{ transaction?.id }}</p>
        </div>
        <div class="column has-text-right my-auto">
          <p class="subtitle">{{ transaction?.total }} {{ transaction?.isPaid }}</p>
          <p class="subtitle">{{ transaction && format(new Date(transaction.date), 'dd MMMM yyyy') }}</p>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <nav class="tabs">
        <div class="container end">
          <ul>
            <!-- <router-link to="/customers/new">Create Customer</router-link> -->
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTransactionsStore } from '@/store/transactionsStore';
import { format } from 'date-fns';

export default defineComponent({
  components: {},
  setup() {
    const store = useTransactionsStore();
    const id = useRoute().params.id as string;

    store.fetchAll();

    const transaction = computed(() => store.getTransactionById(id));

    if (!transaction.value) {
      throw Error('Transaction was not found.');
    }

    return { transaction, format };
  },
});
</script>
