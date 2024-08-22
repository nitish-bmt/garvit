import React from "react";
import { Container } from "@mui/material";
import { CommonTableSection } from "../../Components/Common/CommonTableSection";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../features/transaction/transactionSlice";
import MiniDrawer from "../../Components/Common/CommonSideBar";
import CommonTopBar from "../../Components/Common/CommonTopBar";

const TransactionPage: React.FC = () => {
  const trxns = useSelector(selectTransactions);

  return (
    <div>
      <CommonTopBar title="Transactions" />
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
          <CommonTableSection
            transactions={trxns}
            showType={true}
            showEditButton={false}
            type="Expense"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
