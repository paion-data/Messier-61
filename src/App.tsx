// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import "./App.css";
import Editor from "./Editor";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <h1>nextwiki</h1>
      <p>beta development version</p>
      <Editor />
      <div className="other">
        <h2>Other Examples</h2>
        <ul>
          <li>
            <a href="https://codesandbox.io/s/lexical-rich-text-example-5tncvy" target="_blank" rel="noreferrer">
              Rich text example
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
