import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import type { AppThunk } from "../../app/store";

import { Budget } from "../../dbOperations/interfaces";
import { expensesCategory } from "../../Constants/categories";

// for the db operations
import {
  getWholeBudget,
  setCategoryBudget as setDbCategoryBudget,
} from "../../dbOperations/operations";
import { setWholeBudget } from "../../dbOperations/operations";

export interface budgetSliceState {
  status: "idle" | "loading" | "succeeded" | "failed";
  budget: Budget;
}

// initiating the empty initialState object
const initialState: budgetSliceState = {
  budget: {},
  status: "idle",
};

// populating the empty initial state object
Object.keys(expensesCategory).forEach(category => {
  initialState.budget[category] = { amountSet: 0, amountSpent: 0 };
});

// If you are not using async thunks you can use the standalone `createSlice`.
export const budgetSlice = createAppSlice({
  name: "budget",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    fetchBudget: create.asyncThunk(
      async (userId: string) => {
        const budget = await getWholeBudget(userId);
        return { budget };
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<{ budget: Budget }>) => {
          state.status = "succeeded";
          state.budget = action.payload.budget;
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
    // setting the whole budget object
    setBudget: create.asyncThunk(
      async ({ userId, budget }: { userId: string; budget: Budget }) => {
        await setWholeBudget(userId, budget);
        return { budget };
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (
          state,
          action: PayloadAction<{
            budget: Budget;
          }>,
        ) => {
          state.budget = action.payload.budget;
          state.status = "succeeded";
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),

    //
    setCategoryBudget: create.asyncThunk(
      async ({
        userId,
        category,
        categoryBudget,
      }: {
        userId: string;
        category: string;
        categoryBudget: Budget;
      }) => {
        const { amountSet, amountSpent } = categoryBudget[category];
        await setDbCategoryBudget(userId, category, amountSet, amountSpent);
        return { userId, category, amountSet, amountSpent };
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (
          state,
          action: PayloadAction<{
            userId: string;
            category: string;
            amountSet: number;
            amountSpent: number;
          }>,
        ) => {
          const { userId, category, amountSet, amountSpent } = action.payload;
          state.budget[category] = {
            amountSet: amountSet,
            amountSpent: amountSpent,
          };
          state.status = "succeeded";
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
  }),

  selectors: {
    selectBudget: state => state.budget,
    selectCategoryBudget: (state: budgetSliceState, category: string) =>
      state.budget[category],
    selectBudgetStatus: state => state.status,
  },
});

// Action creators are generated for each case reducer function.
export const { setBudget, setCategoryBudget, fetchBudget } =
  budgetSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectBudget, selectCategoryBudget, selectBudgetStatus } =
  budgetSlice.selectors;
