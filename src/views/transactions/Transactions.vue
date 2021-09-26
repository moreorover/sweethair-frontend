<template>
  <div class="hero is-small welcome is-info my-3">
    <div class="hero-body">
      <p class="title">Transactions</p>
      <p class="subtitle">Menage your Transactions here...</p>
    </div>
    <div class="hero-foot">
      <nav class="tabs">
        <div class="container end">
          <ul>
            <router-link to="/transactions/new">Create Transaction</router-link>
          </ul>
        </div>
      </nav>
    </div>
  </div>

  <div class="info-tiles">
    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="field">
            <div class="control">
              <input v-model="searchKey" type="text" class="input is-medium" placeholder="Search" disabled />
            </div>
          </div>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">{{ transactions.length }}</p>
          <p class="subtitle">Transactions</p>
        </article>
      </div>
    </div>
  </div>

  <transactions-table :transactions="transactions" />
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import TransactionsTable from '@/components/transactions/TransactionsTable.vue';
import { useTransactionsStore } from '@/store/transactionsStore';

export default defineComponent({
  name: 'Transactions',
  components: { TransactionsTable },
  setup() {
    const store = useTransactionsStore();
    const searchKey = ref('');

    store.fetchAll();

    // const customers = computed(() => {
    //   return store.all.filter((customer) => {
    //     if (customer.firstName.toLowerCase().includes(searchKey.value)) {
    //       return true;
    //     }
    //     if (customer.lastName.toLowerCase().includes(searchKey.value)) {
    //       return true;
    //     }
    //     if (customer.email.toLowerCase().includes(searchKey.value)) {
    //       return true;
    //     }
    //     if (customer.instagram.toLowerCase().includes(searchKey.value)) {
    //       return true;
    //     }
    //     return false;
    //   });
    // });

    return { transactions: computed(() => store.getAll), searchKey };
  },
});
</script>
<style scoped></style>
