// Copyright 2023 Paion Data. All rights reserved.

import { render } from "@testing-library/react";
import AutoLinkPlugin from "./AutoLinkPlugin";

test("renders app without error", () => {
  render(<AutoLinkPlugin />);
});

test("Converts a string to a url-link", () => {
  render(<AutoLinkPlugin />);

  const urlify = (text: any) => {
    const urlRegex =
      /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    return text.replace(urlRegex, (url: string) => {
      return `<a href="${url}>${url}</a>`;
    });
  };
  const text = "Find me at http://www.example.com and also at http://stackoverflow.com";
  const html = urlify(text);
  expect(html.getAttribute("href")).toBe("https://www.baidu.com/");
});
