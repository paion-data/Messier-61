// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ForceGraph3D } from "react-force-graph";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Messier61GraphPlugin() {
  const [editor] = useLexicalComposerContext();

  const [content, setContent] = useState<string>("");

  const myData = {
    nodes: [
      {
        id: "id1",
        name: "name1",
        val: 1,
      },
      {
        id: "id2",
        name: "name2",
        val: 10,
      },
    ],
    links: [
      {
        source: "id1",
        target: "id2",
      },
    ],
  };

  return <ForceGraph3D graphData={myData} width={200} height={200} />;
}
