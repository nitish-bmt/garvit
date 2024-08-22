import React from "react";
import { TextField, Box, Stack } from "@mui/material";

const FilterSection = () => (
  <Stack my={2}>
    <TextField label="Filter by name" variant="outlined" fullWidth />
  </Stack>
);

export default FilterSection;
