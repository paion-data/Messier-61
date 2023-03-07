// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import "./Wiki.css";
import Editor from "./Editor";
import { D3Graph, CanvasConfig } from "../Graph/D3Graph/D3Graph";
import { Graph } from "../Graph/Graph";

export default function App(): JSX.Element {
  const canvasConfig: CanvasConfig = {
    width: 400,
    height: 400,
    margin: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
  };

  const graphData: Graph = {
    nodes: [],
    links: []
  };

  return (
    <div className="App">
      <h1>nextwiki</h1>
      <p>beta development version</p>
      <Editor />
      <D3Graph graphData={graphData} canvasConfig={canvasConfig} />
    </div>
  );
}
