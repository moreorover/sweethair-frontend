import { Customer } from '@/services/CustomerService';
import { Invoice } from './InvoiceService';
import Service from './Service';

export interface Item {
  id: number;
  title: string;
  total: number;
  invoices?: Invoice[];
  customer?: Customer | null;
}

class ItemService extends Service<Item> {}

export default new ItemService('items');
