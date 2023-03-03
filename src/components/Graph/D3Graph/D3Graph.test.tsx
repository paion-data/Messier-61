// Copyright 2023 Paion Data. All rights reserved.
import * as d3 from "d3";
import { getAllNodes, attachSvgTo } from "./D3Graph";
import type { Margin } from "./D3Graph";
import type { Node, Link } from "../Graph";

test("test svg width and height", () => {
  const svgMargin: Margin = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  };

  const actualSvg = attachSvgTo("body", svgMargin, 3, 3);

  expect(actualSvg).not.toBeNull();

  const actualWidth = d3.selectAll("svg").attr("width");
  const actualHeight = d3.selectAll("svg").attr("height");

  expect(actualWidth).toBe("3");
  expect(actualHeight).toBe("3");
});

test("verifies input nodes gets converted to D3-compatible format", () => {
  const inputNodes: Node[] = [
    {
      id: "1",
      name: "foo",
    },
    {
      id: "2",
      name: "bar",
    },
    {
      id: "3",
      name: "bat",
    },
  ];

  const actualNodes: any[] = getAllNodes(inputNodes);

  expect(actualNodes).toBe(inputNodes);
  actualNodes.forEach((node) => {
    expect(node).toHaveProperty("id");
  });
  actualNodes.forEach((node) => {
    expect(node).toHaveProperty("name");
  });
});

test("verifies input links gets converted to D3-compatible format", () => {
  const inputLinks: Link[] = [
    {
      id: "1",
      name: "link1",
      source: "foo",
      target: "bar",
    },
    {
      id: "2",
      name: "link2",
      source: "bat",
      target: "baz",
    },
  ];

  const actualLinks = getAllNodes(inputLinks);

  expect(actualLinks).toBe(inputLinks);
  actualLinks.forEach((link) => {
    expect(link).toHaveProperty("source");
  });
  actualLinks.forEach((link) => {
    expect(link).toHaveProperty("target");
  });
});
