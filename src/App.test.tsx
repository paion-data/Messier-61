// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app title", () => {
  render(<App />);
  const linkElement = screen.getByText(/nextwiki/i);
  expect(linkElement).toBeInTheDocument();
});
