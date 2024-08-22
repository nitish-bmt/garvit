import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { selectTransactions } from "../../features/transaction/transactionSlice";
import { useSelector } from "react-redux";

const CommonSummaryCard = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => (
  <Paper elevation={2} style={{ padding: "16px", textAlign: "center" }}>
    <Typography variant="subtitle1">{title}</Typography>
    <Typography variant="h6">{value}</Typography>
  </Paper>
);

const CommonSummarySection: React.FC<{ total: number; type: string }> = ({
  total,
  type,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <CommonSummaryCard
          title={`Total ${type}`}
          value={`$ ${total.toString()}`}
        />
      </Grid>
    </Grid>
  );
};

export default CommonSummarySection;
