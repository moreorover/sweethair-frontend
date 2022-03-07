import Service from './Service';
import { Purchase } from '@/types';

class PurchaseService extends Service<Purchase> {}

export default new PurchaseService('purchases');
