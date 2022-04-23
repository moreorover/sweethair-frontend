import { BaseDataEntity, BaseService } from './BaseService';

export type ProductMeasurement = {
  KG: 'KG';
  G: 'G';
  L: 'L';
  ML: 'ML';
  UNIT: 'UNIT';
};

export interface Product extends BaseDataEntity {
  title: string;
  description: string;
  canReorder: boolean;
  startingStock: number;
  currentStock: number;
  measurement: 'KG' | 'G' | 'L' | 'ML' | 'UNIT';
}

class ProductService extends BaseService<Product> {}

export default new ProductService('products');
