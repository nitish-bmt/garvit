import React, { useState } from "react";
import { Box, Container, Divider } from "@mui/material";
import { CommonTableSection } from "../../Components/Common/CommonTableSection";
import { Transaction, TransactionType } from "../../dbOperations/interfaces";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../features/transaction/transactionSlice";
import { AccountBalance } from "@mui/icons-material";
import SummaryCard from "../../Components/SummaryCard";
import AddButton from "../../Components/Common/AddButton";
import AddIncomeDialog from "../../Components/AddIncome";
import MiniDrawer from "../../Components/Common/CommonSideBar";
import SingleLineChart from "../../Components/SingleLineChart";
import { processTransactionsForSingleLineChart } from "../../utils/chartUtils";
import CommonTopBar from "../../Components/Common/CommonTopBar";
import CommonCard from "../../Components/Common/CommonCard";

const Incomes: React.FC = () => {
  const trxns = useSelector(selectTransactions);
  const incomes = trxns.filter((trxn: Transaction) => trxn.type === "Income");
  let sum = 0;
  incomes.forEach(income => {
    sum += income.amount;
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const { amounts, dates } = processTransactionsForSingleLineChart(incomes);

  return (
    <div>
      <CommonTopBar title="Income" />
      <div
        style={{
          padding: 1,
          marginLeft: "0px",
          paddingLeft: "0px",
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
            title="Income"
            icon={<AccountBalance sx={{ fontSize: 30, color: "inherit" }} />}
          />
          </Box>
          <Box component="h3" sx={{ mx: 0, marginTop: 2 }}>
            Reports
          </Box>
          
          <CommonCard>
            <SingleLineChart data={amounts} label="Income" dates={dates} />
          </CommonCard>
          <Box sx={{ mt: 2 }}>
            <CommonTableSection transactions={incomes} type={"Income"} />
          </Box>
          <AddButton onClick={handleDialogOpen} />
          <AddIncomeDialog open={dialogOpen} onClose={handleDialogClose} />
        </div>
      </div>
    </div>
  );
};

export default Incomes;
