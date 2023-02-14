// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {useCallback, useEffect, useRef, useState} from 'react';

export default function Messier61GraphPlugin() {
    const [editor] = useLexicalComposerContext();

    const [content, setContent] = useState<string>('');

    return (
      <div>"test graph"</div>
    )
}
