import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { selectTransactions } from "../../features/transaction/transactionSlice";
import { useSelector } from "react-redux";

const SummaryCard = ({ title, value }: { title: string; value: string }) => (
  <Paper elevation={2} style={{ padding: "16px", textAlign: "center" }}>
    <Typography variant="subtitle1">{title}</Typography>
    <Typography variant="h6">{value}</Typography>
  </Paper>
);

const SummarySection: React.FC = () => {
  const transactions = useSelector(selectTransactions);
  let totalExpense = 0;
  transactions.forEach(trxn => {
    if (trxn.type == "Expense") totalExpense += trxn.amount;
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <SummaryCard
          title="Total Expenses"
          value={"$  ".concat(totalExpense.toString())}
        />
      </Grid>
    </Grid>
  );
};

export default SummarySection;
