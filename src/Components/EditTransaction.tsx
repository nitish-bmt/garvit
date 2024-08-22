import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Transaction, TransactionType } from "../dbOperations/interfaces";
import { expensesCategory, incomeCategory } from "../Constants/categories";

interface EditTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction;
  onSave: (updatedTransaction: Transaction) => void;
  type: TransactionType;
}

const EditTransactionDialog: React.FC<EditTransactionDialogProps> = ({
  open,
  onClose,
  transaction,
  onSave,
  type,
}) => {
  const [amount, setAmount] = useState<number>(transaction.amount);
  const [category, setCategory] = useState<string>(transaction.category);
  const [date, setDate] = useState<string>(
    transaction.date.toISOString().substring(0, 10),
  );

  const handleSave = () => {
    const updatedTransaction: Transaction = {
      ...transaction,
      amount,
      category,
      date: new Date(date),
    };
    onSave(updatedTransaction);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Transaction</DialogTitle>
      <DialogContent>
        <TextField
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {type === "Income" &&
              Object.values(incomeCategory).map(categoryKey => (
                <MenuItem key={categoryKey} value={categoryKey}>
                  {categoryKey}
                </MenuItem>
              ))}
            {type === "Expense" &&
              Object.keys(expensesCategory).map(categoryKey => (
                <MenuItem key={categoryKey} value={categoryKey}>
                  {expensesCategory[categoryKey].name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={e => setDate(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTransactionDialog;
