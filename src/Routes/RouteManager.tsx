import React from "react";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { localStorageKeys } from "../dbOperations/config";

const RouteManager: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem(localStorageKeys.user);

  return (
    <>
      <PublicRoutes />
      {isAuthenticated && <PrivateRoutes />}
    </>
  );
};

export default RouteManager;
