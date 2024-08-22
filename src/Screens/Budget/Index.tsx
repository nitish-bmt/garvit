import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import SummaryCard from "../../Components/SummaryCard";
import PieActiveArc from "../../Components/PieChart";
import AddBudgetDialog from "../../Components/AddBudget";
import { AccountBalance, Wallet } from "@mui/icons-material";
import AddButton from "../../Components/Common/AddButton";
import { useAppSelector } from "../../app/hooks";
import {
  selectBudget,
  selectBudgetStatus,
} from "../../features/budget/budgetSlice";
import { Budget } from "../../dbOperations/interfaces";
import { convertBudgetDataToList } from "../../utils/chartUtils";
import CommonBox from "../../Components/Common/CommonBox";
import CommonCircularProgress from "../../Components/Common/CommonCircularProgress";
import MiniDrawer from "../../Components/Common/CommonSideBar";
import { selectExpenseSum } from "../../features/transaction/transactionSlice";
import CommonTopBar from "../../Components/Common/CommonTopBar";
import CommonContainer from "../../Components/Common/CommonContainer";
import CommonCard from "../../Components/Common/CommonCard";

const BudgetPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const budget = useAppSelector(selectBudget);
  const totalBudgetSpent = useAppSelector(selectExpenseSum);
  const budgetStatus = useAppSelector(selectBudgetStatus);
  const [budgetItems, setBudgetItems] = useState<Budget>(budget || {});
  const totalBudget = Object.values(budgetItems).reduce(
    (value, currentCategory) => {
      return value + currentCategory.amountSet;
    },
    0,
  );

  const budgetGraphData = convertBudgetDataToList(budgetItems);

  useEffect(() => {
    setBudgetItems(budget || {});
  }, [budget]);

  if (budgetStatus === "idle" || budgetStatus === "loading") {
    return (
      <CommonBox
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CommonCircularProgress size={80} sx={{ color: "black" }} />
      </CommonBox>
    );
  } else {
    return (
      <>
        <CommonTopBar title="Budget" />
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
            <h3>Summary</h3>
            <Grid container spacing={2}>
              <Grid item>
                <SummaryCard
                  value={String(totalBudget)}
                  title="Total Budget"
                  icon={
                    <AccountBalance sx={{ fontSize: 30, color: "inherit" }} />
                  }
                />
              </Grid>
              <Grid item>
                <SummaryCard
                  value={String(totalBudgetSpent)}
                  title="Budget Spent"
                  icon={
                    <Wallet
                      sx={{
                        fontSize: 30,
                        color:
                          totalBudgetSpent < totalBudget
                            ? "inherit"
                            : "error.main",
                      }}
                    />
                  }
                />
              </Grid>
            </Grid>
            <h3>Reports</h3>
            {/* <Stack sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '16px' }}> */}
            {/* <CommonCard sx={{ display: "flex", ml: "0px" }}> */}
              <PieActiveArc title="report" data={budgetGraphData} type={"expense"} />
            {/* </CommonCard> */}
            {/* </Stack> */}
            <Grid container spacing={4} sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Stack>
                  <TableContainer
                    component={Paper}
                    sx={{
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundColor: "white",
                    }}
                  >
                    <Table sx={{
                      backgroundColor: "#ffffff",
                      boxShadow: "0 0px 32px 0px rgba(0, 0, 0, 0.01)",
                      border: "1px solid #e0e0e0",
                      // backgroundColor: "#f5f5f5",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "2px 2px 8px 0.1px rgba(0, 0, 0, 0.1)",
                      },
                    }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Category
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Amount Set
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Amount Spent
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(budgetItems).map(
                          ([category, details]) => (
                            <TableRow
                              key={category}
                              sx={{ 
                                backgroundColor: "#ffffff",
                                boxShadow: "0 0px 32px 0px rgba(0, 0, 0, 0.01)",
                                border: "1px solid #e0e0e0",
                                width: 300,
                                // backgroundColor: "#f5f5f5",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                "&:hover": {
                                  transform: "translateY(-4px)",
                                  boxShadow: "2px 2px 8px 0.1px rgba(0, 0, 0, 0.1)",
                                },
                               }}
                            >
                              <TableCell component="th" scope="row">
                                {category}
                              </TableCell>
                              <TableCell align="right">
                                {details.amountSet}
                              </TableCell>
                              <TableCell align="right">
                                {details.amountSpent}
                              </TableCell>
                            </TableRow>
                          ),
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </Grid>
            </Grid>
            <AddButton onClick={handleDialogOpen} />
            <AddBudgetDialog open={dialogOpen} onClose={handleDialogClose} />
          </div>
        </div>
      </>
    );
  }
};

export default BudgetPage;
