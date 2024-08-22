import React, { useState } from "react";
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
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editTransaction, selectTransactions } from "../../features/transaction/transactionSlice";
import { Transaction, TransactionType } from "../../dbOperations/interfaces";
import EditTransactionDialog from "../EditTransaction";
import { selectLoggedInUser } from "../../features/user/userSlice";
import { toast } from "react-toastify";

interface CommonTableSectionProps {
  transactions: Transaction[];
  showType?: boolean;
  showEditButton?: boolean;
  type: TransactionType;
}

const CommonTableSection: React.FC<CommonTableSectionProps> = ({
  transactions,
  showType = false,
  showEditButton = true,
  type,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectLoggedInUser);

  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTransaction(null);
  };

  const handleSave = (updatedTransaction: Transaction) => {
    if (user) {
      dispatch(
        editTransaction({
          userId: user,
          updatedTransaction: updatedTransaction,
          transactionId: updatedTransaction.id,
        }),
      );
    } else {
      toast.error("Log In before editing transaction");
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              {!!showType && <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>}
              {!!showEditButton && <TableCell sx={{ fontWeight: 600 }}>Edit</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map(trxn => (
                <TableRow
                  key={trxn.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#e0f7fa",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell>{trxn.category}</TableCell>
                  <TableCell>₹{trxn.amount}</TableCell>
                  <TableCell>{new Date(trxn.date).toDateString()}</TableCell>
                  {!!showType && <TableCell>{trxn.type}</TableCell>}
                  {!!showEditButton && (
                    <TableCell sx={{ width: 10, maxHeight: 20 }}>
                      <IconButton
                        onClick={() => handleEditClick(trxn)}
                        sx={{
                          padding: 0,
                          transition: "color 0.3s ease",
                          "&:hover": {
                            color: "#1976d2", // You can customize the color as needed
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedTransaction && (
        <EditTransactionDialog
          open={open}
          transaction={selectedTransaction}
          onClose={handleClose}
          onSave={handleSave}
          type={type}
        />
      )}
    </>
  );
};

const AddButton = () => (
  <IconButton
    color="primary"
    style={{ position: "fixed", bottom: 16, right: 16 }}
    sx={{
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#1976d2", // Customize the background color on hover
      },
    }}
  >
    <AddIcon fontSize="large" />
  </IconButton>
);

export { CommonTableSection, AddButton };
