import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import RouteManager from "./Routes/RouteManager";
import { useEffect } from "react";
import { initializeDataStore } from "./dbOperations/operations";
import { localStorageKeys } from "./dbOperations/config";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setUser, selectLoggedInUser } from "./features/user/userSlice";
import { fetchTransactions } from "./features/transaction/transactionSlice";
import { fetchBudget } from "./features/budget/budgetSlice";

const App = () => {
  const user = useAppSelector(selectLoggedInUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeDataStore();

    const userId = localStorage.getItem(localStorageKeys.user);
    if (userId) {
      dispatch(setUser(userId));
      dispatch(fetchTransactions(userId));
      dispatch(fetchBudget(userId));
      return;
    }
  }, [user]);

  return (
    <>
      <RouteManager />
      <ToastContainer />
    </>
  );
};

export default App;
