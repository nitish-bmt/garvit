interface ExpensesCategory {
  [key: string]: {
    name: string;
    emoji: string;
  };
}

export const expensesCategory: ExpensesCategory = {
  education: { name: "Education", emoji: "📚" },
  entertainment: { name: "Entertainment", emoji: "🍿" },
  bills: { name: "Bills", emoji: "🧾" },
  food: { name: "Food", emoji: "🍔" },
  grocery: { name: "Grocery", emoji: "🛒" },
  order: { name: "Online Order", emoji: "📦" },
  other: { name: "Others", emoji: "🤷🏻‍♂️" },
  emi: { name: "EMI", emoji: "🤑" },
  sports: { name: "Sports", emoji: "⚽️" },
  savings: { name: "Savings", emoji: "💰" },
  debt: { name: "Debt", emoji: "💸" },
  loan: { name: "Loan", emoji: "🤫" },
  medical: { name: "Medical", emoji: "🏥" },
  rent: { name: "Rent", emoji: "🏠" },
  shopping: { name: "Shopping", emoji: "🛍️" },
  travel: { name: "Travel", emoji: "✈️" },
};

interface ExpensesPay {
  [key: string]: {
    name: string;
    emoji: string;
  };
}

export const expensesPay: ExpensesPay = {
  cash: { name: "Cash", emoji: "💵" },
  creditcard: { name: "Credit Card", emoji: "💳" },
  debitcard: { name: "Debit Card", emoji: "💳" },
  ewallet: { name: "E-Wallet", emoji: "🪪" },
  netbanking: { name: "NetBanking", emoji: "🏦" },
  upi: { name: "UPI", emoji: "📲" },
};

interface Income {
  [key: string]: string;
}

export const incomeCategory: Income = {
  ads: "Ads",
  other: "Other",
  passiveincome: "Passive Income",
  salary: "Salary",
  youtube: "Youtube",
};
