// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./components/Home";
import { D3Graph } from "./components/Graph/D3Graph";
import type { CanvasConfig } from "./components/Graph/D3Graph";
import { Graph } from "./components/Graph/Graph";

export default function App(): JSX.Element {

  const graphData: Graph = {
    nodes: [],
    links: []
  }

  const canvasConfig: CanvasConfig = {
    width: 960,
    height: 500
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/externalbrain" element={<D3Graph graphData={graphData} canvasConfig={canvasConfig}/>} />
      </Routes>
    </Router>
  );
}
