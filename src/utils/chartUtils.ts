import { Transaction, Budget } from "../dbOperations/interfaces";

export function convertBudgetDataToList(
  budgetData: Budget,
): { value: number; label: string }[] {
  return Object.entries(budgetData)
    .filter(([_, value]) => value.amountSet !== 0) // Filter out entries where amountSet is 0
    .map(([key, value]) => ({
      value: value.amountSet,
      label: `${key.toUpperCase()}`,
    }));
}

export const groupAndSumByCategory = (transactions: Transaction[]) => {
  const groupedData: { [key: string]: number } = transactions.reduce(
    (acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    },
    {} as { [key: string]: number },
  );

  const data = Object.keys(groupedData).map(category => ({
    label: category,
    value: groupedData[category],
  }));

  return data;
};

export function processTransactionsForSingleLineChart(
  transactions: Transaction[],
): { dates: Date[]; amounts: number[] } {
  let lowestDate = new Date();
  let highestDate = new Date(0); // Initialize with the earliest possible date

  transactions.forEach(transaction => {
    if (transaction.date < lowestDate) {
      lowestDate = transaction.date;
    }
    if (transaction.date > highestDate) {
      highestDate = transaction.date;
    }
  });

  const datesArray: Date[] = [];
  let currentDate = new Date(lowestDate.setHours(0, 0, 0));
  while (currentDate <= highestDate) {
    datesArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const amountsArray: number[] = [];
  datesArray.forEach(date => {
    const amountOnDate = transactions
      .filter(
        transaction => transaction.date.toDateString() === date.toDateString(),
      )
      .reduce(
        (totalAmount, transaction) => totalAmount + transaction.amount,
        0,
      );
    amountsArray.push(amountOnDate);
  });

  return { dates: datesArray, amounts: amountsArray };
}

export function processTransactionsForDualLineChart(
  incomeTransactions: Transaction[],
  expenseTransactions: Transaction[],
): { dates: Date[]; incomeAmounts: number[]; expenseAmounts: number[] } {
  // Initialize variables to track lowest and highest dates
  let lowestDate = new Date(
    Math.min(
      ...incomeTransactions.map(t => t.date.getTime()),
      ...expenseTransactions.map(t => t.date.getTime()),
    ),
  );

  let highestDate = new Date(
    Math.max(
      ...incomeTransactions.map(t => t.date.getTime()),
      ...expenseTransactions.map(t => t.date.getTime()),
    ),
  );

  // Generate array of dates between lowestDate and highestDate
  const datesArray: Date[] = [];
  let currentDate = new Date(lowestDate.setHours(0, 0, 0));
  while (currentDate <= highestDate) {
    datesArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Create arrays to store aggregated amounts by date
  const incomeAmountsArray: number[] = [];
  const expenseAmountsArray: number[] = [];

  datesArray.forEach(date => {
    const incomeAmountOnDate = incomeTransactions
      .filter(
        transaction => transaction.date.toDateString() === date.toDateString(),
      )
      .reduce(
        (totalAmount, transaction) => totalAmount + transaction.amount,
        0,
      );
    incomeAmountsArray.push(incomeAmountOnDate);

    const expenseAmountOnDate = expenseTransactions
      .filter(
        transaction => transaction.date.toDateString() === date.toDateString(),
      )
      .reduce(
        (totalAmount, transaction) => totalAmount + transaction.amount,
        0,
      );
    expenseAmountsArray.push(expenseAmountOnDate);
  });

  return {
    dates: datesArray,
    incomeAmounts: incomeAmountsArray,
    expenseAmounts: expenseAmountsArray,
  };
}

interface CategoryData {
  categories: string[];
  budgetedAmounts: number[];
  spentAmounts: number[];
}

export const processCategoryDataForDualBarChart = (
  transactions: Transaction[],
  budget: Budget
): CategoryData => {
  const categorySpendMap: { [category: string]: number } = {};

  // Calculate total spent per category
  transactions.forEach((transaction) => {
    if (transaction.type === "Expense") {
      if (!categorySpendMap[transaction.category]) {
        categorySpendMap[transaction.category] = 0;
      }
      categorySpendMap[transaction.category] += transaction.amount;
    }
  });

  // Generate the arrays for categories, budgeted amounts, and spent amounts
  const categories: string[] = [];
  const budgetedAmounts: number[] = [];
  const spentAmounts: number[] = [];

  Object.keys(budget).forEach((category) => {
    categories.push(category);
    budgetedAmounts.push(budget[category].amountSet);
    spentAmounts.push(categorySpendMap[category] || 0);
  });

  return { categories, budgetedAmounts, spentAmounts };
};
