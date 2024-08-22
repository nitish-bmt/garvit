import {
  getTransactions,
  addTransaction,
  editTransaction as editDBTransaction,
} from "../../dbOperations/operations";
import { TransactionType, Transaction } from "../../dbOperations/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import type { AppThunk } from "../../app/store";
import { Category } from "@mui/icons-material";

interface TransactionSliceState {
  transactions: Transaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: TransactionSliceState = {
  transactions: [],
  status: "idle",
};

export const transactionSlice = createAppSlice({
  name: "transactions",
  initialState,
  reducers: create => ({
    fetchTransactions: create.asyncThunk(
      async (userId: string) => {
        const transactions = await getTransactions(userId);
        return { transactions };
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (
          state,
          action: PayloadAction<{ transactions: Transaction[] }>,
        ) => {
          state.status = "succeeded";
          state.transactions = action.payload.transactions;
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
    addNewTransaction: create.asyncThunk(
      async ({
        userId,
        transaction,
      }: {
        userId: string;
        transaction: Transaction;
      }) => {
        await addTransaction(userId, transaction);
        return { transaction };
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (
          state,
          action: PayloadAction<{
            transaction: Transaction;
          }>,
        ) => {
          state.status = "succeeded";
          state.transactions.push(action.payload.transaction);
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
    editTransaction: create.asyncThunk(
      async ({
        userId,
        transactionId,
        updatedTransaction,
      }: {
        userId: string;
        transactionId: string;
        updatedTransaction: Partial<Transaction>;
      }) => {
        const updatedTransactions = await editDBTransaction(
          userId,
          transactionId,
          updatedTransaction,
        );
        return { updatedTransactions };
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (
          state,
          action: PayloadAction<{ updatedTransactions: Transaction[] }>,
        ) => {
          state.status = "succeeded";
          state.transactions = action.payload.updatedTransactions;
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
  }),
  selectors: {
    selectTransactions: state => state.transactions,
    selectIncomeTransactions: state =>
      state.transactions.filter(transaction => transaction.type === "Income"),
    selectExpenseTransactions: state =>
      state.transactions.filter(transaction => transaction.type === "Expense"),
    selectStatus: state => state.status,
    selectIncomeSum: state =>
      state.transactions
        .filter(transaction => transaction.type === "Income")
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    selectExpenseSum: state =>
      state.transactions
        .filter(transaction => transaction.type === "Expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0),
  },
});

export const { fetchTransactions, editTransaction, addNewTransaction } =
  transactionSlice.actions;

export const {
  selectTransactions,
  selectStatus,
  selectIncomeTransactions,
  selectExpenseTransactions,
  selectExpenseSum,
  selectIncomeSum,
} = transactionSlice.selectors;

export default transactionSlice.reducer;
