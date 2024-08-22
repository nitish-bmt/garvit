import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Stack, Typography, Button } from "@mui/material";

const NotFoundPage: React.FC = () => {
  const location = useLocation();
  const isPrivateRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/budget");

  return (
    <Stack
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f5f5f5"
      p={4}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        {isPrivateRoute ? "Access Denied" : "Page Not Found"}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        {isPrivateRoute
          ? "You need to be logged in to view this page."
          : "The page you are looking for does not exist."}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={isPrivateRoute ? "/login" : "/"}
      >
        {isPrivateRoute ? "Go to Login" : "Go to Home"}
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
