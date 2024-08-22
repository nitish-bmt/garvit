import React, { useState } from "react";
import { Box, Container, Divider, Grid } from "@mui/material";
import { CommonTableSection } from "../../Components/Common/CommonTableSection";
import AddButton from "../../Components/Common/AddButton";
import { Transaction } from "../../dbOperations/interfaces";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../features/transaction/transactionSlice";
import AddExpenseDialog from "../../Components/AddExpense";
import SummaryCard from "../../Components/SummaryCard";
import { AccountBalance } from "@mui/icons-material";
import MiniDrawer from "../../Components/Common/CommonSideBar";
import SingleLineChart from "../../Components/SingleLineChart";
import { processTransactionsForSingleLineChart } from "../../utils/chartUtils";
import DualLineChart from "../../Components/DualLineChart";
import CommonTopBar from "../../Components/Common/CommonTopBar";
import CommonCard from "../../Components/Common/CommonCard";

const Expenses: React.FC = () => {
  const trxns = useSelector(selectTransactions);
  const expenses = trxns.filter((trxn: Transaction) => trxn.type === "Expense");
  let sum = 0;
  expenses.forEach(income => {
    sum += income.amount;
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const { amounts, dates } = processTransactionsForSingleLineChart(expenses);

  return (
    <div>
      <CommonTopBar title="Expense" />
      <div
        style={{
          padding: 1,
          marginLeft: "0px",
          paddingLeft: "0px",
          backgroundColor: "#f9f9f9",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "94%",
            marginTop: "16px",
            marginLeft: "16px",
          }}
        >
          <Box component="h3" sx={{ mx: 0 }}>
            Summary
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <SummaryCard
              value={String(sum)}
              title="Expense"
              icon={<AccountBalance sx={{ fontSize: 30, color: "inherit" }} />}
            />
          </Box>
          <Box component="h3" sx={{ mx: 0, marginTop: 2 }}>
            Reports
          </Box>
          <CommonCard>
            <SingleLineChart data={amounts} label="Expense" dates={dates} />
          </CommonCard>
          <Box sx={{ mt: 2 }}>
            <CommonTableSection transactions={expenses} type="Expense" />
          </Box>
          <AddButton onClick={handleDialogOpen} />
          <AddExpenseDialog open={dialogOpen} onClose={handleDialogClose} />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
