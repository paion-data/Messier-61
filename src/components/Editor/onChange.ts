import type {EditorState} from 'lexical';

import { $getRoot, $getSelection } from "lexical";

/**
 * When the editor changes, get notified and invoke Graphing action
 * @param editorState The 
 */
export default function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
}
