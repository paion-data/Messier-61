// Copyright 2023 Paion Data. All rights reserved.
import React, { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import type { EditorState } from "lexical";
import generateId from "../../ID/IdGenerator";

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
export const getFromNode: any = (line: string) => {
  const fromNameindex = line?.indexOf("到");
  const fromName = line?.slice(0, fromNameindex);
  return {
    id: generateId(),
    name: fromName,
  };
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
export const getToNode: any = (line: string) => {
  const fristNameindex = line?.indexOf("到");
  const endNameindex = line?.indexOf(":");
  const toName = line?.slice(fristNameindex + 1, endNameindex);
  return {
    id: generateId(),
    name: toName,
  };
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
  return {
    id: generateId(),
    name: linkLabel,
    source: fromName,
    target: toName,
  };
};

/**
 * get editorContent and transfrom format of json.
 *
 * @param editorState The complete field entered by the user.
 * @returns The obtained data is sent to D3Graph.
 */
function generateGraphContent(editorState: EditorState): JSX.Element {
  // const editorContent = editorState.toJSON().root.children;
  // return some D3Graph
  return (
    <>
      {/* {editorContent.map((ele:any, index: number)=>
  <D3Graph  key={index} nodes={[getFromNode(ele.children[0]?.text),getToNode(ele.children[0]?.text)]} links={[getLinkLabelToNode(ele.children[0]?.text)]}      
    />
)} */}
    </>
  );
}
