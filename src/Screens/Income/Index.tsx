import React, { useState } from "react";
import { Box } from "@mui/material";
import { CommonTableSection } from "../../Components/Common/CommonTableSection";
import { Transaction } from "../../dbOperations/interfaces";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../features/transaction/transactionSlice";
import { AccountBalance } from "@mui/icons-material";
import SummaryCard from "../../Components/SummaryCard";
import AddButton from "../../Components/Common/AddButton";
import AddIncomeDialog from "../../Components/AddIncome";
import CommonTopBar from "../../Components/Common/CommonTopBar";
import SingleLineChart from "../../Components/SingleLineChart";
import { processTransactionsForSingleLineChart } from "../../utils/chartUtils";
import CommonCard from "../../Components/Common/CommonCard";

// Correct background image URL
const backgroundImageUrl = "/images/light2.jpeg";

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
    <Box
      sx={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: 1,
        marginLeft: 0,
        paddingLeft: 0,
      }}
    >
      <CommonTopBar title="Income" />
      <Box
        sx={{
          maxWidth: "94%",
          marginTop: "16px",
          marginLeft: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: Add background color for readability
          padding: 2,
          borderRadius: 2,
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
          <CommonTableSection transactions={incomes} type="Income" />
        </Box>
        <AddButton onClick={handleDialogOpen} />
        <AddIncomeDialog open={dialogOpen} onClose={handleDialogClose} />
      </Box>
    </Box>
  );
};

export default Incomes;
