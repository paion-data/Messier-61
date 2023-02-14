// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export default function Messier61GraphPlugin(props) {
    const [editor] = useLexicalComposerContext();

    return (
      <div>
          This is a test graph
      </div>
    )
}