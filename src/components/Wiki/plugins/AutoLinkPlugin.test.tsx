// Copyright 2023 Paion Data. All rights reserved.
import React from "react";

test("Converts a string to a url-link", () => {
  const urlify = (text: any) => {
    const urlRegex =
      /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    return text.replace(urlRegex, (url: string) => {
      return `<a href='${url}'>${url}</a>`;
    });
  };
  const text = "Find me at http://www.example.com and also at http://stackoverflow.com";
  const html = urlify(text);
  expect(html).toBe(
    "Find me at <a href='http://www.example.com'>http://www.example.com</a> and also at <a href='http://stackoverflow.com'>http://stackoverflow.com</a>"
  );

  const isEmail = (emailText: any) => {
    const emailRegex =
      /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return emailText.replace(emailRegex, (email: string) => {
      return `<a href='${email}'>${email}</a>`;
    });
  };
  const emailText = "Find me at http://www.example.com and also at http://stackoverflow.com";
  const emailHtml = isEmail(emailText);
  expect(emailHtml).toBe(
    "Find me at <a href='http://www.example.com'>http://www.example.com</a> and also at <a href='http://stackoverflow.com'>http://stackoverflow.com</a>"
  );
});
