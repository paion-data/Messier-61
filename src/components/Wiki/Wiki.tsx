// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import "./Wiki.css";
import Editor from "./Editor";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <h1>nextwiki</h1>
      <p>beta development version</p>
      <Editor />
    </div>
  );
}
