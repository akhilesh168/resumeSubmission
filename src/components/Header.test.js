import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

it("should check Company x to be in the rendered document ", () => {
  render(<Header />);
  expect(screen.getByText("CompanyX")).toBeInTheDocument();
});

it("should check Remy Sharp as alt text to be in the rendered document ", () => {
  render(<Header />);
  expect(screen.getByAltText("Remy Sharp")).toBeInTheDocument();
});
