import { Transaction } from '@/services/TransactionService';
import Service, { DataEntity } from './Service';
import { Item } from './ItemService';
import { boolean } from 'yup';

export interface Invoice extends DataEntity {
  total: number;
  isReceived: boolean;
  isPaid: boolean;
  scheduledAt: string;
  transactions?: Transaction[];
  items?: Item[];
}

class InvoiceService extends Service<Invoice> {}

export default new InvoiceService('invoices');
