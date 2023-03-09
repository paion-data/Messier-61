// Copyright 2023 Paion Data. All rights reserved.
import type { EditorState, LexicalEditor } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useState } from 'react';

export interface OnChangeProps {
  onChange: (editorState: EditorState) => JSX.Element;
}

export function OnChangePlugin({ onChange }: OnChangeProps): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [content, setContent] = useState<JSX.Element>(null as any);

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        setContent(onChange(editorState));
      });
    });
  }, [editor, onChange]);

  return content;
}