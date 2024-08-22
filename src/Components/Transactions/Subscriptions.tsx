import React from "react";
import { Container } from "@mui/material";
import SummarySection from "./SummarySection";
import FilterSection from "./FilterSection";
import { TableSection, AddButton } from "./TableSection";

const Subscriptions = () => (
  <Container
    sx={{
      p: 4,
    }}
  >
    <SummarySection />
    <FilterSection />
    <TableSection />
    <AddButton />
  </Container>
);

export default Subscriptions;
