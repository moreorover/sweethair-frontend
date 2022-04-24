import { BaseDataEntity, BaseService } from './BaseService';

export interface PurchaseDetail extends BaseDataEntity {
  quantity: number;
  total: number;

  purchaseId: number;
  productId: number;
}

class PurchaseDetailsService extends BaseService<PurchaseDetail> {}

export default new PurchaseDetailsService('purchases');
