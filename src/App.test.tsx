// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app without error", () => {
  render(<App />);
});
