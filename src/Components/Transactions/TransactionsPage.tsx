import React from "react";
import { Container } from "@mui/material";
import SummarySection from "./SummarySection";
import { TableSection, AddButton } from "./TableSection";

const Subscriptions = () => (
  <Container
    sx={{
      p: 4,
    }}
  >
    <SummarySection />
    <TableSection />
    <AddButton />
  </Container>
);

export default Subscriptions;
