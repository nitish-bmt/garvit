import React, { useState } from "react";
import { Box, Container, Divider, Typography, IconButton } from "@mui/material";
import MiniDrawer from "./CommonSideBar";
import MenuIcon from "@mui/icons-material/Menu";
import { DateRangePicker, SingleInputDateRangeField } from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface TopBarProps{
  title: string,
  dateRange?: [Dayjs | null, Dayjs | null],
  handleDateRangeChange?: (newRange: [Dayjs | null, Dayjs | null])=>void,
};

const CommonTopBar: React.FC<TopBarProps> = (props: TopBarProps) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });



  return (
    <>
      <Box
        sx={{
          position: "fixed",
          // bgcolor: "#111827",
          width: "100%",
          bgcolor: "#000000",
          color: "white",
          height: "10vh",
          display: "flex",
          alignItems: "center",
          paddingLeft: 2,
          paddingRight: 2,
          zIndex: 99,
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {props.title}
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={darkTheme}>
            <DateRangePicker
              sx={{ float:"right", marginLeft: "64vw"}}
              slots={{ field: SingleInputDateRangeField }}
              value={props.dateRange}
              onChange={props.handleDateRangeChange}
            />
          </ThemeProvider>

        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          // position: "fixed",
          // bgcolor: "#111827",
          bgcolor: "#000000",
          color: "white",
          height: "10vh",
          display: "flex",
          alignItems: "center",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      ></Box>
      <MiniDrawer open={drawerOpen} onClose={handleDrawerToggle} />
    </>
  );
};

export default CommonTopBar;
