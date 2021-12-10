<template>
  <div class="flex flex-col" v-if="props.transactions.length > 0">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-indigo-100">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="transaction in props.transactions" :key="transaction.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ moment(transaction.scheduledAt).format('DD MMM YYYY') }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ transaction.total }}</div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap"
                  :class="{
                    'bg-red-200': transactionStatus(transaction).value === 'Late',
                    'bg-yellow-200': transactionStatus(transaction).value === 'Awaiting',
                  }"
                >
                  <div class="text-sm text-gray-500">
                    {{ transactionStatus(transaction).value }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <slot
                    name="actions"
                    :transaction="transaction"
                    :customer="props.customer"
                    :appointment="props.appointment"
                  ></slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class=""></div>
</template>

<script setup lang="ts">
import { Appointment } from '@/services/AppointmentService';
import { Customer } from '@/services/CustomerService';
import { Transaction } from '@/services/TransactionService';
import moment from 'moment';
import { computed } from 'vue';

interface Props {
  transactions: Transaction[];
  customer?: Customer;
  appointment?: Appointment;
}

const props = defineProps<Props>();

const transactionStatus = (transaction: Transaction) =>
  computed<string>(() => {
    if (transaction.isPaid) return 'Paid';
    if (moment(transaction.scheduledAt).isAfter(moment())) return 'Awaiting';
    return 'Late';
  });
</script>
