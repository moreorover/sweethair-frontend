import { BaseDataEntity, BaseService } from './BaseService';

export interface Purchase extends BaseDataEntity {
  orderedAt: Date;
  arrivesAt: Date;
  arrived: boolean;
  total: number;
  supplierId: number;
}

class PurchaseService extends BaseService<Purchase> {}

export default new PurchaseService('purchases');
