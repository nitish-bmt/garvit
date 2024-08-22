import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Transaction } from "../dbOperations/interfaces";
import {
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";

interface DualLineChartProps {
  IncomeArray: number[];
  ExpenseArray: number[];
  dates: Array<Date>;
}

export default function DualLineChart({
  IncomeArray,
  ExpenseArray,
  dates,
}: DualLineChartProps) {
  return (
    <LineChart
      xAxis={[{ data: dates.map(date => date.getDate()) }]}
      series={[
        {
          label: "Income",
          data: IncomeArray,
          showMark: false,
        },
        {
          label: "Expense",
          data: ExpenseArray,
          showMark: false,
        },
      ]}
      sx={{
        [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
          strokeWidth: 2,
        },
        ".MuiLineElement-series-pvId": {
          strokeDasharray: "5 5",
        },
        ".MuiLineElement-series-uvId": {
          strokeDasharray: "3 4 5 2",
        },
        [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]:
          {
            fill: "#fff",
          },
        [`& .${markElementClasses.highlighted}`]: {
          stroke: "none",
        },
      }}
      width={500}
      height={400}
    />
  );
}
