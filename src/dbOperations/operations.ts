import localforage from "localforage";
import {
  User,
  DBUsers,
  Transaction,
  DBTransactions,
  Budget,
  DBBudgets,
} from "./interfaces";
import { DBKeys, localStorageKeys } from "./config";

localforage.config({
  driver: localforage.INDEXEDDB,
  name: "expense-tracker",
  version: 1.0,
  storeName: "expense-tracker",
  description: "A data store for expense tracking application",
});

const INITIAL_USERS: DBUsers = {};
const INITIAL_TRANSACTIONS: DBTransactions = {};
const INITIAL_BUDGETS: DBBudgets = {};

// User Operations
export const addUser = async (
  userId: string,
  userData: User,
): Promise<boolean> => {
  let users = await localforage.getItem<DBUsers>(DBKeys.users);

  if (!users) {
    await localforage.setItem(DBKeys.users, INITIAL_USERS);
    users = INITIAL_USERS;
  }

  if (users[userId]) {
    return false; // User already exists
  }

  users[userId] = userData;
  await localforage.setItem(DBKeys.users, users);
  return true;
};

export const getUser = async (userId: string): Promise<User | null> => {
  const users = await localforage.getItem<DBUsers>(DBKeys.users);
  return users ? users[userId] : null;
};

export const logUser = async (
  userId: string,
  password: string,
): Promise<boolean> => {
  const users = await localforage.getItem<DBUsers>(DBKeys.users);

  if (users && users[userId]) {
    const user = users[userId];
    if (user.password === password) {
      localStorage.setItem(localStorageKeys.user, userId);
      return true;
    }
  }
  return false;
};

// Transaction Operations
export const addTransaction = async (
  userId: string,
  transaction: Transaction,
): Promise<void> => {
  let transactions = await localforage.getItem<DBTransactions>(
    DBKeys.transactions,
  );

  if (!transactions) {
    await localforage.setItem(DBKeys.transactions, INITIAL_TRANSACTIONS);
    transactions = INITIAL_TRANSACTIONS;
  }

  if (!transactions[userId]) {
    transactions[userId] = [];
  }

  transactions[userId].push(transaction);
  await localforage.setItem(DBKeys.transactions, transactions);
};

export const getTransactions = async (
  userId: string,
): Promise<Transaction[]> => {
  const transactions = await localforage.getItem<DBTransactions>(
    DBKeys.transactions,
  );
  return transactions ? transactions[userId] || [] : [];
};

export const editTransaction = async (
  userId: string,
  transactionId: string,
  updatedTransaction: Partial<Transaction>,
): Promise<Transaction[]> => {
  let transactions = await localforage.getItem<DBTransactions>(
    DBKeys.transactions,
  );

  if (!transactions) {
    await localforage.setItem(DBKeys.transactions, INITIAL_TRANSACTIONS);
    transactions = INITIAL_TRANSACTIONS;
  }

  if (!transactions[userId]) {
    throw new Error("No transactions found for the user.");
  }

  const userTransactions = transactions[userId];
  const transactionIndex = userTransactions.findIndex(
    transaction => transaction.id === transactionId,
  );

  if (transactionIndex === -1) {
    throw new Error("Transaction not found.");
  }

  userTransactions[transactionIndex] = {
    ...userTransactions[transactionIndex],
    ...updatedTransaction,
  };

  await localforage.setItem(DBKeys.transactions, transactions);
  return userTransactions;
};

// Budget Operations
export const setCategoryBudget = async (
  userId: string,
  category: string,
  amountSet: number,
  amountSpent: number,
): Promise<void> => {
  let budgets = await localforage.getItem<DBBudgets>(DBKeys.budgets);

  if (!budgets) {
    await localforage.setItem(DBKeys.budgets, INITIAL_BUDGETS);
    budgets = INITIAL_BUDGETS;
  }

  if (!budgets[userId]) {
    budgets[userId] = {};
  }

  budgets[userId][category] = {
    amountSet: amountSet,
    amountSpent: amountSpent,
  };
  await localforage.setItem(DBKeys.budgets, budgets);
};

export const setWholeBudget = async (
  userId: string,
  budget: Budget,
): Promise<void> => {
  let budgets = await localforage.getItem<DBBudgets>(DBKeys.budgets);

  if (!budgets) {
    await localforage.setItem(DBKeys.budgets, INITIAL_BUDGETS);
    budgets = INITIAL_BUDGETS;
  }

  budgets[userId] = budget;
  await localforage.setItem(DBKeys.budgets, budgets);
};

export const getCategoryBudget = async (
  userId: string,
  category: string,
): Promise<Budget | null> => {
  const budgets = await localforage.getItem<DBBudgets>(DBKeys.budgets);
  return budgets && budgets[userId] ? (budgets[userId][category] as any) : null;
};

export const getWholeBudget = async (userId: string): Promise<Budget> => {
  const budgets = await localforage.getItem<DBBudgets>(DBKeys.budgets);
  return budgets ? budgets[userId] || {} : {};
};

export const initializeDataStore = async (): Promise<void> => {
  let users = await localforage.getItem<DBUsers>(DBKeys.users);
  if (!users) {
    await localforage.setItem(DBKeys.users, INITIAL_USERS);
  }

  let transactions = await localforage.getItem<DBTransactions>(
    DBKeys.transactions,
  );
  if (!transactions) {
    await localforage.setItem(DBKeys.transactions, INITIAL_TRANSACTIONS);
  }

  let budgets = await localforage.getItem<DBBudgets>(DBKeys.budgets);
  if (!budgets) {
    await localforage.setItem(DBKeys.budgets, INITIAL_BUDGETS);
  }
};
