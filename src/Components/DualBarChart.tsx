import { Box, Divider, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

interface DualBarChartProps {
  title: string,
  BudgetArray: number[];
  ExpenseArray: number[];
  categories: Array<string>;
}

const highlightScope = {
  highlighted: 'series',
  faded: 'global',
} as const;

export default function DualBarChart({
  title,
  BudgetArray,
  ExpenseArray,
  categories,
}: DualBarChartProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 2,
        // width: "75%",
        // height: "75%",
        padding: 4,
        backgroundColor: "#fff",
        borderRadius: "4px",
        border: "1px solid #e0e0e0",
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
        <Divider flexItem textAlign="left" sx={{ padding: 0, margin: 0, marginBottom: 2 }}>
        {/* <Typography variant="h6" sx={{color: "#000000", opacity: 0.6,}}> */}
          <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontWeight: 400, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {title}
          </Typography>
        </Divider>
    <BarChart
      height={500}
      series={[
        {
          label: 'Budget',
          data: BudgetArray,
        },
        {
          label: 'Expense',
          data: ExpenseArray,
        },
      ].map((s) => ({ ...s, highlightScope }))}
      xAxis={[{ scaleType: "band", data: categories }]}
      width={500}
      skipAnimation={true}
      sx={{
        "& .MuiBarElement-series-budget": {
          fill: "#4caf50", // Budget color
          transition: "fill 0.3s ease",
        },
        "& .MuiBarElement-series-expense": {
          fill: "#f44336", // Expense color
          transition: "fill 0.3s ease",
        },
        "& .MuiBarChart-root": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    />
    </Box>
  );
}
