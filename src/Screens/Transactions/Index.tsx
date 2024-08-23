import React from "react";
import { Box } from "@mui/material";
import { CommonTableSection } from "../../Components/Common/CommonTableSection";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../features/transaction/transactionSlice";
import CommonTopBar from "../../Components/Common/CommonTopBar";

// Correct background image URL
const backgroundImageUrl = "/images/light2.jpeg";

const TransactionPage: React.FC = () => {
  const trxns = useSelector(selectTransactions);

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
        backgroundColor: "#f9f9f9", // Fallback background color
      }}
    >
      <CommonTopBar title="Transactions" />
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
        <CommonTableSection
          transactions={trxns}
          showType={true}
          showEditButton={false}
          type="Expense"
        />
      </Box>
    </Box>
  );
};

export default TransactionPage;
