import { Transaction } from '@/services/TransactionService';

const emptyTransaction: Transaction = { total: 0, date: new Date().toISOString(), isPaid: false };

export const useTransactionModal = function () {
  const cleanTransaction = (transaction: Transaction): Transaction => {
    for (const propName in transaction) {
      if (
        transaction[propName] === null ||
        transaction[propName] === undefined ||
        transaction[propName] === '' ||
        transaction[propName] === []
      ) {
        delete transaction[propName];
      }
      delete transaction.createdOn;
      delete transaction.modifiedOn;
    }
    return transaction;
  };

  return {
    emptyTransaction,

    cleanTransaction,
  };
};

export default useTransactionModal;
