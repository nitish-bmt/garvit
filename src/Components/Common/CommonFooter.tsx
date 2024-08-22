import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer"
      sx={{ 
        width: '100%', 
        textAlign: 'center', 
        padding: '1rem', 
        backgroundColor: '#f8f9fa', 
        marginTop: 'auto',
        borderTop: '1px solid #dee2e6',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Fake.expense.app. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;