// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import type { Graph, Node, Link } from "../Graph";
import * as d3 from "d3";
import { drag } from "d3";
import styles from "./D3Graph.module.css";

export interface Margin {
  top: number;
  bottom: number;
  right: number;
  left: number;
}

/**
 * D3 做图组件
 *
 * @param props 图的原始数据
 *  
 * @returns 一张 D3 只是替图谱
 */
export function D3Graph(props: Graph): JSX.Element {
  return generateD3Graph(props);
}

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

export function initializeLinks(svg: any, props: Graph): any {
  return (
    svg
      .selectAll("line")
      .data(getAllLinks(props.links))
      .enter()
      .append("line")
      // .attr("d", (d: { from: { x: string; y: string }; to: { x: string; y: string } }): any => {
      //   return d != null && "M " + d.from.x + " " + d.from.y + " L " + d.to.x + " " + d.to.y;
      // })
      // .attr("id", (d: any, i: string) => {
      //   return i != null && "edgepath" + i;
      // })
      // .attr("marker-end", "url(#arrow)")
      .style("stroke", "#aaa")
  );
}

function generateEdgesText(svg: any, props: any): any {
  return svg
    .selectAll(".edgelabel")
    .data(getAllLinks(props))
    .enter()
    .append("text")
    .attr("class", "edgelabel")
    .attr("dx", 80)
    .attr("dy", 0);
}

export function getAllNodes(inputNodes: Node[]): any[] {
  return inputNodes;
}

export function getAllLinks(inputLinks: Link[]): any[] {
  return inputLinks;
}