import React from "react";
import { PieChart } from "@mui/x-charts";
import { Box, Divider, Typography } from "@mui/material";

const expenseGraphColors = [
  "#FF0000", // Red
  "#FF6347", // Tomato
  "#FFD700", // Gold
  "#FFA500", // Orange
  "#FF8C00", // Dark Orange
  "#B22222", // Firebrick
  "#DC143C", // Crimson
  "#8B0000", // Dark Red
  "#FF4500", // Orange Red
  "#FF1493", // Deep Pink
  "#FF69B4", // Hot Pink
  "#DB7093", // Pale Violet Red
  "#CD5C5C", // Indian Red
  "#F08080", // Light Coral
  "#E9967A", // Dark Salmon
];

const incomeGraphColors = [
  "#008000", // Green
  "#9ACD32", // Yellow Green
  "#3CB371", // Medium Sea Green
  "#00FF00", // Lime
  "#2E8B57", // Sea Green
  "#006400", // Dark Green
  "#32CD32", // Lime Green
];

interface PieChartProps {
  title: string;
  type: "income" | "expense";
  data: Array<{ value: number; label: string }>;
}

export default function PieActiveArc({ title, type, data }: PieChartProps) {
  const colors = type === "income" ? incomeGraphColors : expenseGraphColors;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        // width: "95%",
        // height: "95%",
        backgroundColor: "#fff",
        borderRadius: "4px",
        // borderTopRightRadius: 0,
        // borderTopLeftRadius: 0,
        border: "1px solid #e0e0e0",
        // borderTop: "white",
        // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        boxShadow: "0 0px 32px 0px rgba(0, 0, 0, 0.01)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          // boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          boxShadow: "2px 2px 8px 0.1px rgba(0, 0, 0, 0.1)",
        },
        overflow: "visible", // Ensure overflow is handled correctly
      }}
    >
      <Divider flexItem textAlign="left" sx={{ padding: 0, margin: 0 }}>
        {/* <Typography variant="h6" sx={{color: "#000000", opacity: 0.6,}}> */}
        <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontWeight: 400, letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
          {title}</Typography>
      </Divider>
      <PieChart
        colors={colors}
        series={[
          {
            data,
            cornerRadius: 4,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        sx={{
          "& .MuiPieChart-root": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
          "& .MuiPieChart-legend": {
            marginTop: "16px",
            textAlign: "center",
          },
        }}
        height={300}
      />
    </Box>
  );
}
