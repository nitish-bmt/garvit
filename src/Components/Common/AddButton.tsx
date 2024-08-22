import React from "react";
import Fab from "@mui/material/Fab";
import { Add as AddIcon } from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Fab
      color="primary"
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: isLargeScreen ? 60 : 50,
        height: isLargeScreen ? 60 : 50,
      }}
      onClick={onClick}
    >
      <AddIcon style={{ fontSize: isLargeScreen ? 40 : 24 }} />
    </Fab>
  );
};

export default AddButton;
