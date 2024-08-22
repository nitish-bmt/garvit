import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addNewTransaction } from "../../features/transaction/transactionSlice";
import { TransactionType } from "../../dbOperations/interfaces";

interface CommonAddTransactionProps {
  open: boolean;
  handleClose: () => void;
}

const CommonAddTransaction: React.FC<CommonAddTransactionProps> = ({
  open,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const [type, setType] = useState<TransactionType>("Expense");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const handleSubmit = () => {
    const id = Math.random().toString(36).substring(2, 9);
    const newTransaction = {
      type,
      amount,
      description,
      date: new Date().toISOString(),
    };
    // dispatch(addNewTransaction(userID, newTransaction));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Transaction</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Type"
          value={type}
          onChange={e => setType(e.target.value as TransactionType)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Expense">Expense</MenuItem>
          <MenuItem value="Income">Income</MenuItem>
        </TextField>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={e => setAmount(parseFloat(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonAddTransaction;
