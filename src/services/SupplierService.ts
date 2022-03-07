import Service from './Service';
import { Supplier } from '@/types';

class PurchaseService extends Service<Supplier> {}

export default new PurchaseService('suppliers');
