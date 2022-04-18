import React from "react";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import Header from "./Header";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

export default function Home() {
  return (
    <>
      <Container>
        <Paper elevation={3}>
          <Header />
          <FormOne />
          <FormTwo />
        </Paper>
      </Container>
    </>
  );
}
