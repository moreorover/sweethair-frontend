import { AxiosResponse } from 'axios';
import { BaseDataEntity, BaseService } from './BaseService';
import { PurchaseDetail } from './PurchaseDetailsService';
import { Supplier } from './SuppliersService';

export interface Purchase extends BaseDataEntity {
  orderedAt: Date;
  arrivesAt: Date;
  arrived: boolean;
  total: number;
  supplierId: number;
  supplier?: Supplier;

  purchaseDetails?: PurchaseDetail[];
}

class PurchaseService extends BaseService<Purchase> {
  createPurchaseDetail(
    purchaseId: number,
    data: PurchaseDetail
  ): Promise<AxiosResponse<PurchaseDetail>> {
    const { id, ...d } = data;
    return this.apiClient.post<PurchaseDetail>(
      `${this.apiEndpoint}/${purchaseId}/purchaseDetails`,
      d
    );
  }

  deletePurchaseDetail(
    purchaseId: number,
    purchaseDetailId: number
  ): Promise<AxiosResponse<PurchaseDetail>> {
    return this.apiClient.delete<PurchaseDetail>(
      `${this.apiEndpoint}/${purchaseId}/purchaseDetails/${purchaseDetailId}`
    );
  }
}

export default new PurchaseService('purchases');
