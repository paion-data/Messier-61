// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import "./Wiki.css";
import Editor from "./Editor";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <img src="https://paion-data.github.io/Messier-61/img/logo.svg" width="128px" height="128px" alt="" />
      <p id="wiki">Entity Resolution</p>
      <Editor />
    </div>
  );
}
