import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectBudget, setBudget } from "../features/budget/budgetSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { expensesCategory } from "../Constants/categories";
import { Budget } from "../dbOperations/interfaces";
import { selectLoggedInUser } from "../features/user/userSlice";
import { toast } from "react-toastify";

interface AddBudgetDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddBudgetDialog: React.FC<AddBudgetDialogProps> = ({ open, onClose }) => {
  const budget = useAppSelector(selectBudget);
  const dispatch = useAppDispatch();
  const [budgetItems, setBudgetItems] = useState<Budget>(budget);
  const user = useAppSelector(selectLoggedInUser);

  const handleAmountSetChange = (
    category: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setBudgetItems({
      ...budgetItems,
      [category]: {
        ...budgetItems[category],
        amountSet: Number(event.target.value),
      },
    });
  };

  const handleSubmit = () => {
    if (user) {
      dispatch(setBudget({ userId: user, budget: budgetItems }));
    } else {
      toast.error("Login before adding Budget");
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Budget</DialogTitle>
      <DialogContent>
        <form>
          {Object.keys(expensesCategory).map(categoryKey => (
            <Grid container spacing={2} alignItems="center" key={categoryKey}>
              <Grid item xs={6}>
                {expensesCategory[categoryKey].name}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Amount Set"
                  type="number"
                  value={budgetItems[categoryKey]?.amountSet || ""}
                  onChange={event => handleAmountSetChange(categoryKey, event)}
                />
              </Grid>
            </Grid>
          ))}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBudgetDialog;
