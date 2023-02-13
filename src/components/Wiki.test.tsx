// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { render, screen } from "@testing-library/react";
import Wiki from "./Wiki";

test("renders app title", () => {
  render(<Wiki />);
  const linkElement = screen.getByText(/nextwiki/i);
  expect(linkElement).toBeInTheDocument();
});
