// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Wiki from "./Wiki";

test("renders app title", async () => {
  /* eslint-disable @typescript-eslint/no-floating-promises */

  // we can append this statemen with something like .then(() => {}) but another eslint error pops up.
  // This will simpy turn a simple and readable test code into a stupid unnecessary unreadable nightmare
  // For this reason, we are turning off this check to save enery for the good.
  act(() => render(<Wiki />));

  /* eslint-enable @typescript-eslint/no-floating-promises */

  await waitFor(() => {
    const linkElement = screen.getByText(/nextwiki/i);
    expect(linkElement).toBeInTheDocument();
  });
});
