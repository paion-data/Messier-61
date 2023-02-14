// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";

test("renders app without error", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
});
