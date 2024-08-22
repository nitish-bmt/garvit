import { LineChart } from "@mui/x-charts/LineChart";
import {
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";

interface SingleLineChartProps {
  label: string;
  data: number[];
  dates: Date[];
}

export default function SingleLineChart({
  label,
  data,
  dates,
}: SingleLineChartProps) {
  const newDates = dates.map(date =>
    date.toLocaleDateString("en-US")?.toString(),
  );

  return (
    <LineChart
      xAxis={[
        {
          data: newDates,
          scaleType: "point",
        },
      ]}
      series={[
        {
          label: label,
          data: data,
          showMark: false,
        },
      ]}
      width={500}
      height={300}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#f5f5f5",
        borderRadius: "20px",
        border: "1px solid #e0e0e0",
        // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        // "&:hover": {
        //   transform: "translateY(-4px)",
        //   boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        // },
        [`& .${lineElementClasses.root}`]: {
          strokeWidth: 2,
        },
        [`& .${markElementClasses.root}`]: {
          scale: "0.6",
          fill: "#fff",
          strokeWidth: 2,
        },
        "& .MuiLineChart-root": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    />
  );
}
