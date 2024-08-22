import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Screens/Dashboard/Index";
import BudgetPage from "../Screens/Budget/Index";
import Incomes from "../Screens/Income/Index";
import Expenses from "../Screens/Expense/Index";
import TransactionPage from "../Screens/Transactions/Index";

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/budget" element={<BudgetPage />} />
      <Route path="/income" element={<Incomes />} />
      <Route path="/expense" element={<Expenses />} />
      <Route path="/transactions" element={<TransactionPage />} />
    </Routes>
  );
};

export default PrivateRoutes;
