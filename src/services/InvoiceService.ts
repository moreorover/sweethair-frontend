import { Transaction } from '@/services/TransactionService';
import Service, { DataEntity } from './Service';
import { Item } from './ItemService';

export interface Invoice extends DataEntity {
  title: string;
  total: number;
  transactions?: Transaction[];
  items?: Item[];
}

class InvoiceService extends Service<Invoice> {}

export default new InvoiceService('invoices');
