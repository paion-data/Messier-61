// Copyright 2022 Paion Data. All rights reserved.
import React from "react";

import { render } from "@testing-library/react";

import Welcome from "./Welcome";

test("welcome page loads and renders properly", () => {
  const { container } = render(<Welcome headLineMessage="Welcome" subHeadLineMessage="Page" />);
  expect(container.firstChild).toHaveClass("onboarding");
});
