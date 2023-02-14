// Copyright 2023 Paion Data. All rights reserved.
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

// A Lexical React plugin (composable React component) that auto focuses a text prompt in editor, saving
// user's need to click on the text area before editing
export default function AutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}
