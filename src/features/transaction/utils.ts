import { Transaction } from "../../dbOperations/interfaces";

export const getDateFilteredIncomeTransactions = (
  transactions: Transaction[],
  startDate: string,
  endDate: string,
): Transaction[] => {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate >= new Date(startDate) &&
      transactionDate <= new Date(endDate) &&
      transaction.type === "Income"
    );
  });
};

export const getDateFilteredExpenseTransactions = (
  transactions: Transaction[],
  startDate: string,
  endDate: string,
): Transaction[] => {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate >= new Date(startDate) &&
      transactionDate <= new Date(endDate) &&
      transaction.type === "Expense"
    );
  });
};

export const getDateFilteredIncomeSum = (
  transactions: Transaction[],
  startDate: string,
  endDate: string,
): number => {
  return transactions
    .filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate >= new Date(startDate) &&
        transactionDate <= new Date(endDate) &&
        transaction.type === "Income"
      );
    })
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getDateFilteredExpenseSum = (
  transactions: Transaction[],
  startDate: string,
  endDate: string,
): number => {
  return transactions
    .filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate >= new Date(startDate) &&
        transactionDate <= new Date(endDate) &&
        transaction.type === "Expense"
      );
    })
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};
