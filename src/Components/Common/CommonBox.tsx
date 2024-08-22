import React from "react";
import Stack, { StackProps } from "@mui/material/Stack";
import { Box } from "@mui/material";

interface CommonBoxProps extends StackProps {}

const CommonBox: React.FC<CommonBoxProps> = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        // minHeight: "90vh",
        // backgroundColor: "#f0f0f0",
        margin: 0,
        border: 0,
        padding: 0,
        boxShadow: 0,
        elevation: 0,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        ...props.sx,
        // alignContent : "center",
      }}
    >
      {children}
    </Box>
  );
};

export default CommonBox;
