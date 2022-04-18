import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("should check Company x to be in the rendered document ", () => {
  render(<App />);
  expect(screen.getByText("CompanyX")).toBeInTheDocument();
});
