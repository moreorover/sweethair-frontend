import { Invoice } from '@/services/InvoiceService';
import { Appointment } from '@/services/AppointmentService';
import { Customer } from '@/services/CustomerService';
import ItemService, { Item } from '@/services/ItemService';
import { defineStore } from 'pinia';

interface ItemStore {
  all: Record<string, Item>;
  ids: number[];
  loaded: boolean;
  loading: boolean;
}

export const useItemsStore = defineStore({
  id: 'itemsStore',
  state: (): ItemStore => ({
    all: {},
    ids: [],
    loaded: false,
    loading: false,
  }),
  getters: {
    getRaw(state): Record<string, Item> {
      return state.all;
    },
    getAll(state): Item[] {
      return state.ids.map((id: number) => this.all[id]);
    },
    getIds(state): number[] {
      return state.ids;
    },
    getItemById:
      (state) =>
      (id: number): Item => {
        return state.all[id];
      },
    getAvailableItems(state): Item[] {
      return state.ids.map((id: number) => this.all[id]).filter((i) => !i.customer && !i.appointment);
    },
    getItemsByCustomerAndAppointment:
      (state) =>
      (customer: Customer, appointment: Appointment): Item[] => {
        const { id: customerId } = customer;
        const items: Item[] = state.ids
          .map((id: number) => state.all[id])
          .filter((item: Item) => item.customer?.id === customerId && item.appointment?.id === appointment.id);
        return items;
      },
    getItemsByInvoice:
      (state) =>
      (invoice: Invoice): Item[] => {
        const { id: invoiceId } = invoice;
        const items: Item[] = state.ids
          .map((id: number) => state.all[id])
          .filter((item: Item) => item.invoice?.id === invoiceId);
        return items;
      },
    shouldLoadState: (state): boolean => !state.loading && !state.loaded,
  },
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const { data } = await ItemService.getAll();
        const ids: number[] = [];
        const all: Record<string, Item> = {};

        for (const item of data) {
          if (!ids.includes(item.id)) {
            ids.push(item.id);
          }
          all[item.id] = item;
        }
        this.all = all;
        this.ids = ids;
        this.loaded = true;
        this.loading = false;
      } catch (error) {
        this.all = {};
        this.ids = [];
        this.loaded = false;
        this.loading = false;
        console.log('Not loaded, something went wrong loading Items');
        console.log({ error });
      }
    },
    async create(item: Item) {
      try {
        const { data } = await ItemService.create(item);
        this.all[data.id] = data;
        this.ids.push(data.id);

        const invoicesStore = useInvoicesStore();
        if (item.invoice) invoicesStore.fetchById(item.invoice.id);
      } catch (error) {
        console.log('Failed to create Item', item, error);
      }
    },
    async update(item: Item) {
      try {
        const { data } = await ItemService.update(item);
        this.all[data.id] = data;

        const invoicesStore = useInvoicesStore();
        if (item.invoice) invoicesStore.fetchById(item.invoice.id);
      } catch (error) {
        console.log('Failed to update Item', item, error);
      }
    },
  },
});
