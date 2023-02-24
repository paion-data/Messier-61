// Copyright 2023 Paion Data. All rights reserved.
import { URL_MATCHER, EMAIL_MATCHER } from "./UrlEmailAutoLinkPlugin";
test("Auto attach link to URL and email", () => {
  const urlify = (text: string): string => {
    return text.replace(URL_MATCHER, (url: string) => {
      return `<a href='${url}'>${url}</a>`;
    });
  };
  const text = "Find me at http://www.example.com and also at http://stackoverflow.com";
  const html = urlify(text);
  expect(html).toBe(
    "Find me at <a href='http://www.example.com'>http://www.example.com</a> and also at <a href='http://stackoverflow.com'>http://stackoverflow.com</a>"
  );

  const isEmail = (emailText: string): string => {
    return emailText.replace(EMAIL_MATCHER, (email: string) => {
      return `<a href='mailto:${email}'>${email}</a>`;
    });
  };
  const emailText = "Find me at some-email@example.com";
  const emailHtml = isEmail(emailText);
  expect(emailHtml).toBe("Find me at <a href='mailto:some-email@example.com'>some-email@example.com</a>");
});
