// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import type { Graph, Node, Link } from "../Graph";
import * as d3 from "d3";
import { drag } from "d3";
import styles from "./D3Graph.module.css";

/**
 * Encapsulate the margin value of the D3 graph
 *
 * @type {Margin} top, bottom, left and right margins of the svg
 */
export interface Margin {
  top: number;
  bottom: number;
  right: number;
  left: number;
}

/**
 * Incoming D3 data
 *
 * @param nodes A list of object containting info about all vertices of graph
 *
 * @param links A list of object containting info about all links of graph
 *
 * @returns A D3 graph component
 */
export function D3Graph(props: Graph): JSX.Element {
  return generateD3Graph(props);
}

/**
 * D3 graph component
 *
 * @param nodes A list of object containting info about all vertices of graph
 *
 * @param links A list of object containting info about all links of graph
 *
 * @returns A D3 visualization whose data is defined by nodes & links
 */
export function generateD3Graph(props: Graph): JSX.Element {
  const svgRef = React.useRef(null);
  const margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const width = styles.svgWidth - margin.left - margin.right;
  const height = styles.svgHeight - margin.top - margin.bottom;
  const svg = attachSvgTo(svgRef.current, margin, width, height);

  const link = initializeLinks(svg, props);
  const edgesText = generateEdgesText(svg, props);
  edgesText
    .append("textPath")
    .attr("xlink:href", (d: any, i: string): any => {
      return i != null && "#edgepath" + i;
    })
    .style("pointer-events", "none")
    .text((d: { lable: any }) => {
      return d?.lable;
    });

  const node = initializeNode(svg, props);

  generateNodeText(svg, props);

  function generateSimulation(props: Graph, ticked: any): any {
    d3.forceSimulation(getAllNodes(props.nodes))
      .force(
        "link",
        d3
          .forceLink()
          .id(function (node: any) {
            return node.id;
          })
          .links(getAllLinks(props.links))
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("end", ticked);
  }
  generateSimulation(props, ticked);

  function ticked(): any {
    link
      .attr("x1", function (d: { from: { x: any } }) {
        return d.from.x;
      })
      .attr("y1", function (d: { from: { y: any } }) {
        return d.from.y;
      })
      .attr("x2", function (d: { to: { x: any } }) {
        return d.to.x;
      })
      .attr("y2", function (d: { to: { y: any } }) {
        return d.to.y;
      });

    node
      .attr("cx", function (d: { x: number }) {
        return d.x + 6;
      })
      .attr("cy", function (d: { y: number }) {
        return d.y - 6;
      });
  }

  return <svg ref={svgRef} width={width} height={height} />;
}

/**
 * Define svg style
 *
 * @param selector A string that conforms to the W3C selector, which is how elements are selected in a css document
 *
 * @param margin the margin of the svg
 *
 * @param width the width of the svg
 *
 * @param height the height of the svg
 *
 * @returns A D3 graph with defined dimensions
 */
export function attachSvgTo(selector: any, margin: Margin, width: number, height: number): any {
  const svg = d3
    .select(selector)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left.toString() + "," + margin.top.toString() + ")");
  return svg;
}

export function initializeNode(svg: any, props: Graph): any {
  return svg
    .selectAll("circle")
    .data(getAllNodes(props.nodes))
    .enter()
    .append("circle")
    .attr("r", 20)
    .style("fill", "#69B3A2")
    .on("click", (node: any) => {
      console.log("click");
    })
    .call(drag);
}

/**
 * Visual node text
 *
 * @param svg A D3 visualization whose data is defined by nodes & links
 *
 * @param nodes A list of object containting info about all vertices of graph
 *
 * @returns A node with text
 */
function generateNodeText(svg: any, props: Graph): any {
  return svg
    .selectAll("text")
    .data(getAllNodes(props.nodes))
    .enter()
    .append("text")
    .attr("dy", ".3em")
    .attr("text-anchor", "middle")
    .style("fill", "black")
    .style("pointer-events", "none")
    .text((d: { id: any }): any => {
      return d?.id;
    });
}

/**
 * Generating line
 *
 * @param svg A D3 visualization whose data is defined by nodes & links
 *
 * @param links A list of object containting info about all line of graph
 *
 * @returns A line connect two nodes
 */
export function initializeLinks(svg: any, props: Graph): any {
  return svg.selectAll("line").data(getAllLinks(props.links)).enter().append("line").style("stroke", "#aaa");
}

/**
 * Visual line text
 *
 * @param svg A D3 visualization whose data is defined by nodes & links
 *
 * @param links A list of object containting info about all line of graph
 *
 * @returns A line with text
 */
function generateEdgesText(svg: any, props: any): any {
  return svg
    .selectAll(".edgelabel")
    .data(getAllLinks(props.links))
    .enter()
    .append("text")
    .attr("class", "edgelabel")
    .attr("dx", 80)
    .attr("dy", 0);
}

/**
 * Get all the vertices
 *
 * @param Node[] A list of all vertices received
 *
 * @returns An array of all vertices in json form
 */
export function getAllNodes(inputNodes: Node[]): any[] {
  return inputNodes;
}

/**
 * Get all the links
 *
 * @param Link[] A list of all links received
 *
 * @returns An array of all links in json form
 */
export function getAllLinks(inputLinks: Link[]): any[] {
  return inputLinks;
}
