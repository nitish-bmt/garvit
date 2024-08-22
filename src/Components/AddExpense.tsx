import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { expensesCategory } from "../Constants/categories";
import { Transaction } from "../dbOperations/interfaces";
import { selectLoggedInUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { addNewTransaction } from "../features/transaction/transactionSlice";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

interface AddExpenseDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddExpenseDialog: React.FC<AddExpenseDialogProps> = ({
  open,
  onClose,
}) => {
  const defaultCategory = Object.values(expensesCategory).at(0) as any;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectLoggedInUser);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    defaultCategory.name.toLowerCase(),
  );
  const [amount, setAmount] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
  };

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAmount(Number(event.target.value));
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
    } else {
      toast.warn("Select Appropriate Date");
    }
  };

  const handleSubmit = () => {
    if (user) {
      const newTransaction: Transaction = {
        amount: amount,
        type: "Expense",
        date: selectedDate.toDate(),
        category: selectedCategory,
        id: uuidv4(),
      };
      dispatch(
        addNewTransaction({ userId: user, transaction: newTransaction }),
      );
    } else {
      toast.error("Login before adding Expense");
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Budget</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  {Object.keys(expensesCategory).map(categoryKey => (
                    <MenuItem key={categoryKey} value={categoryKey}>
                      {expensesCategory[categoryKey].name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseDialog;
