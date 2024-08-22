import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactlessIcon from "@mui/icons-material/Contactless";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/user/userSlice";

const drawerWidth = 240;
interface MiniDrawerProps {
  open: boolean;
  onClose: () => void;
}


const MiniDrawer: React.FC<MiniDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          // backgroundColor: "#111827",
          backgroundColor: "#000000",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          // backgroundColor: "#111827",
          backgroundColor: "#000000",
          color: "#ffffff",
          cursor: "pointer",
        }}
      >
        <ContactlessIcon sx={{ color: "#ffffff", fontSize: "48px" }} />
      </div>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/dashboard")}>
            <ListItemIcon>
              <AccountBalanceRoundedIcon sx={{ color: "#ffffff", fontSize: "24px" }} />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/income")}>
            <ListItemIcon>
              <MonetizationOnRoundedIcon sx={{ color: "#ffffff", fontSize: "24px" }} />
            </ListItemIcon>
            <ListItemText primary="Income" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/expense")}>
            <ListItemIcon>
              <SavingsRoundedIcon sx={{ color: "#ffffff", fontSize: "24px" }} />
            </ListItemIcon>
            <ListItemText primary="Expenses" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/budget")}>
            <ListItemIcon>
              <AccountBalanceWalletRoundedIcon sx={{ color: "#ffffff", fontSize: "24px" }} />
            </ListItemIcon>
            <ListItemText primary="Budget" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/transactions")}>
            <ListItemIcon>
              <ReceiptIcon sx={{ color: "#ffffff", fontSize: "24px" }} />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItemButton>
        </ListItem>
      </List>
      <List sx={{ marginTop: "auto" }}>
        {/* <ListItem disablePadding>
          <ListItemButton sx={{ margin: "8px 0" }} onClick={() => navigate("/")}>
            <ListItemIcon>
              <AccountBoxIcon sx={{ color: "#ffffff", fontSize: "24px" }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem> */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => {logoutUser(); navigate("/")}}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#ffffff", fontSize: "24px" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MiniDrawer;
