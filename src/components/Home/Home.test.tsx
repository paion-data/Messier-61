// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import {screen } from "@testing-library/react";


test("renders app without error", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
});

const linkToTest = screen.getByRole("link", { name: /link to test/i })
expect(linkToTest.getAttribute("href")).toMatchInlineSnapshot();
