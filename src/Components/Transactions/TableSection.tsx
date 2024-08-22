import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../features/transaction/transactionSlice";

const TableSection: React.FC = () => {
  const transactions = useSelector(selectTransactions);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map(trxn => (
              <TableRow>
                <TableCell>{trxn.type}</TableCell>
                <TableCell>{trxn.amount}</TableCell>
                <TableCell>{trxn.date.toDateString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const AddButton = () => (
  <IconButton
    color="primary"
    style={{ position: "fixed", bottom: 16, right: 16 }}
  >
    <AddIcon fontSize="large" />
  </IconButton>
);

export { TableSection, AddButton };
