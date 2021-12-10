import InvoiceService, { Invoice } from '@/services/InvoiceService';
import { defineStore } from 'pinia';

interface InvoiceStore {
  all: Record<string, Invoice>;
  ids: number[];
  loaded: boolean;
  loading: boolean;
}

export const useInvoicesStore = defineStore({
  id: 'invoicesStore',
  state: (): InvoiceStore => ({
    all: {},
    ids: [],
    loaded: false,
    loading: false,
  }),
  getters: {
    getRaw(state): Record<string, Invoice> {
      return state.all;
    },
    getAll(state): Invoice[] {
      return state.ids.map((id: number) => this.all[id]);
    },
    getIds(state): number[] {
      return state.ids;
    },
    getInvoiceById:
      (state) =>
      (id: number): Invoice => {
        return state.all[id];
      },
    shouldLoadState: (state): boolean => !state.loading && !state.loaded,
  },
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const { data } = await InvoiceService.getAll();
        const ids: number[] = [];
        const all: Record<string, Invoice> = {};

        for (const invoice of data) {
          if (!ids.includes(invoice.id)) {
            ids.push(invoice.id);
          }
          all[invoice.id] = invoice;
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
        console.log('Not loaded, something went wrong loading Invoices');
        console.log({ error });
      }
    },
    async fetchById(invoiceId: number) {
      this.loading = true;
      try {
        const { data } = await InvoiceService.get(invoiceId);

        this.all[invoiceId] = data;
        if (!this.ids.includes(invoiceId)) this.ids.push(invoiceId);
        this.loaded = true;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log('Not loaded, something went wrong loading Invoice');
        console.log({ error });
      }
    },
    async create(invoice: Invoice) {
      try {
        const { data } = await InvoiceService.create(invoice);
        this.all[data.id] = data;
        this.ids.push(data.id);
      } catch (error) {
        console.log('Failed to create Invoice', invoice, error);
      }
    },
    async update(invoice: Invoice) {
      try {
        const { data } = await InvoiceService.update(invoice);
        this.all[data.id] = data;
      } catch (error) {
        console.log('Failed to update Invoice', invoice, error);
      }
    },
  },
});
