import { Customer } from '@/services/CustomerService';

const emptyCustomer: Customer = { firstName: '', lastName: '', email: '', instagram: '' };

export const useCustomerModal = function () {
  const cleanCustomer = (customer: Customer): Customer => {
    for (const propName in customer) {
      if (
        customer[propName] === null ||
        customer[propName] === undefined ||
        customer[propName] === '' ||
        customer[propName] === []
      ) {
        delete customer[propName];
      }
      delete customer.createdOn;
      delete customer.modifiedOn;
    }
    return customer;
  };

  return {
    emptyCustomer,

    cleanCustomer,
  };
};

export default useCustomerModal;
