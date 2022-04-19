import { BaseDataEntity, BaseService } from './BaseService';

export interface Customer extends BaseDataEntity {
  fullName: string;
  location: string;
  about: string;
  email: string | null;
  instagram: string | null;
  //   appointments?: Appointment[];
  //   transactions?: Transaction[];
  //   items?: Item[];
}

class CustomerService extends BaseService<Customer> {}

export default new CustomerService('customers');
