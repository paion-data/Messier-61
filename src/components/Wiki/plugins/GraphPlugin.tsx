// Copyright 2023 Paion Data. All rights reserved.
import React, { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import type { EditorState } from "lexical";
import generateId from "../../ID/IdGenerator";
import type { CanvasConfig } from "../../Graph/D3Graph/D3Graph";
import type { Graph, Node, Link } from "../../Graph/Graph";
import { D3Graph } from "../../Graph/D3Graph/D3Graph";

/**
 * A Lexical plugin that, on a part of web page canvas, holds a knowledge graph content.
 */
export default function GraphPlugin(): JSX.Element {
  const [graphContent, setGraphContent] = useState<JSX.Element>();
  const [editor] = useLexicalComposerContext();

  // useCallback is a React Hook that lets you cache a function definition between re-renders.
  const generateGraph = useCallback(
    (editorState: EditorState) => {
      const currentGraph = generateGraphContent(editor.getEditorState());
      setGraphContent(currentGraph);
    },
    [editor]
  );

  // useEffect Hooks ,Get notified when Lexical commits an automatic update to the DOM.
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      setGraphContent(generateGraphContent(editorState));
    });
  }, [editor, generateGraph]);

  /* @returns Get countless update Graphcontent and render in editor. */
  return <p>{graphContent}</p>;
}

/**
 * Given a line of text, usually a Lexical child text node, extracts and returns the subject of the text sentence.
 *
 * A sentence, or a fact, can usually be described by the following part of speeches:
 *
 * <img src="media://SubjectPredicateObject.svg" width="500" />
 *
 * @param line the provided line of text
 *
 * @returns a noun
 */
export const getSourceNode: any = (line: string) => {
  const fromNameindex = line?.indexOf("到");
  const fromName = line?.slice(0, fromNameindex);
  const node = {
    id: generateId(),
    name: fromName,
  };
  return node;
};

/**
 * Given a line of text, usually a Lexical child text node, extracts and returns the object of the text sentence.
 *
 * A sentence, or a fact, can usually be described by the following part of speeches:
 *
 * <img src="media://SubjectPredicateObject.svg" width="500" />
 *
 * @param line the provided line of text
 *
 * @returns a noun
 */
export const getTargetNode: any = (line: string) => {
  const fristNameindex = line?.indexOf("到");
  const endNameindex = line?.indexOf(":");
  const toName = line?.slice(fristNameindex + 1, endNameindex);
  const node = {
    id: generateId(),
    name: toName,
  };
  return node;
};

/**
 * Given a line of text, usually a Lexical child text node, extracts and returns the predicate of the text sentence.
 *
 * A sentence, or a fact, can usually be described by the following part of speeches:
 *
 * <img src="media://SubjectPredicateObject.svg" width="500" />
 *
 * @param line the provided line of text
 *
 * @returns a num
 */
export const getLinkLabelToNode: any = (line: string) => {
  const fromNameindex = line?.indexOf("到");
  const fromName = line?.slice(0, fromNameindex);
  const fristNameindex = line?.indexOf("到");
  const endNameindex = line?.indexOf(":");
  const toName = line?.slice(fristNameindex + 1, endNameindex);
  const firstindex = line?.indexOf("$");
  const linkLabel = line?.slice(firstindex + 1);
  const link = {
    id: generateId(),
    name: linkLabel,
    source: fromName,
    target: toName,
  };

  return link;
};

/**
 * get editorContent and transfrom format of json.
 *
 * @param editorState The complete field entered by the user.
 * @returns The obtained data is sent to D3Graph.
 */
function generateGraphContent(editorState: EditorState): JSX.Element {
  const editorContent = editorState.toJSON().root.children;

  // return some D3Graph

  // const graphData  = (content: any): Graph => {
  //   return {
  //     nodes: [getFromNode(content),getToNode(content)],
  //     links: [getLinkLabelToNode(content)]
  //   }

  // };

  const canvasConfig: CanvasConfig = {
    height: 400,
    width: 400,
    margin: {
      bottom: 10,
      left: 10,
      right: 10,
      top: 10,
    },
  };

  // 深圳到云南:$100

  const graphData: Graph = {
    nodes: getAllNodes[editorContent],
    links: getAllLinks([editorContent]),
  };

  return (
    <>
      <D3Graph graphData={graphData} canvasConfig={canvasConfig} />
    </>
  );
}

function getAllNodes(lines: string[]): Node[] {
  return editorContent;
}

function getAllLinks(lines: string[]): Link[] {}
