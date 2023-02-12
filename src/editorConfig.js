// Copyright 2023 Paion Data. All rights reserved.
import { EmojiNode } from "./nodes/EmojiNode";
import ExampleTheme from "./themes/ExampleTheme";

const editorConfig = {
  theme: ExampleTheme,
  onError(error) {
    throw error;
  },
  nodes: [EmojiNode],
};

export default editorConfig;
