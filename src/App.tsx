// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./components/Home";
import { Wiki } from "./components/Wiki";

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="wiki/:id" element={<Wiki />} />
      </Routes>
    </Router>
  );
}
