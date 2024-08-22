import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        marginRight: "8px",
        marginBottom: "8px",
        borderRadius: "4px",
        // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        boxShadow: "0 0px 32px 0px rgba(0, 0, 0, 0.01)",
        border: "1px solid #e0e0e0",
        width: 300,
        // backgroundColor: "#f5f5f5",
        backgroundColor: "#ffffff",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "2px 2px 8px 0.1px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: "1 0 auto" }}>
        <CardContent sx={{ padding: 0 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 700, color: "#fffff", marginTop: "8px" }}
          >
            ₹{value}
          </Typography>
        </CardContent>
      </Box>
      <IconButton sx={{ padding: 0 }}>
        {icon}
      </IconButton>
    </Card>
  );
};

export default SummaryCard;



// import React from 'react';
// import { Card, CardContent, Typography, Stack } from '@mui/material';

// interface SummaryCardProps {
//   title: string;
//   value: string;
//   icon: React.ReactNode;
// }

// const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon }) => {
//   return (
//     <Card sx={{ width: '85%', mx: 'auto', my: 1, p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid #ccc', borderRadius: '16px' }}>
//       <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0.5 }}>
//         <Stack sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//           {icon}
//           <Typography variant="subtitle2" component="div" sx={{ ml: 1 }}>
//             {title}
//           </Typography>
//         </Stack>
//         <Typography variant="h5" component="div" sx={{ mt: 0.5 }}>
//           {value}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default SummaryCard;
