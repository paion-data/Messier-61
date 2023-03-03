import React from "react";
import { Graph } from "./Graph";
import * as d3 from "d3";

export default function D3Graph(props: Graph): JSX.Element {
  return generateD3Graph(props);
}

function generateD3Graph(props: Graph): JSX.Element {
  const svgRef = React.useRef(null);
  const margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const width = 400 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select(svgRef.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(' + margin.left + ',' + margin.top + ')");

  // Initialize the links
  const link = svg.selectAll("line").data(getAllLinks(props)).enter().append("line").style("stroke", "#aaa");

  // Initialize the nodes
  const node = svg
    .selectAll("circle")
    .data(getAllNodes(props))
    .enter()
    .append("circle")
    .attr("r", 20)
    .style("fill", "#69b3a2");

  // Let's list the force we wanna apply on the network
  d3.forceSimulation(getAllNodes(props)) // Force algorithm is applied to data.nodes
    .force(
      "link",
      d3
        .forceLink() // This force provides links between nodes
        .id(function (node: any) {
          return node.id;
        }) // This provide  the id of a node
        .links(getAllLinks(props)) // and this the list of links
    )
    .force("charge", d3.forceManyBody().strength(-400)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
    .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
    .on("end", ticked);
  // This function is run at each iteration of the force algorithm, updating the nodes position.
  function ticked() {
    link
      .attr("x1", function (d: any) {
        return d.from.x;
      })
      .attr("y1", function (d: any) {
        return d.from.y;
      })
      .attr("x2", function (d: any) {
        return d.to.x;
      })
      .attr("y2", function (d: any) {
        return d.to.y;
      });

    node

      .attr("cx", function (d: any) {
        return d.x + 6;
      })
      .attr("cy", function (d: any) {
        return d.y - 6;
      });
  }

  return <svg ref={svgRef} width={width} height={height} />;
}

function getAllLinks(graphData: Graph): any {
  const { links } = graphData;
  // console.log("links",links[0]);

  return links[0];
  // extract all links from graphData and transform each of them to JSON object
}

function getAllNodes(graphData: Graph): any {
  const { nodes } = graphData;
  // console.log(nodes,"nodes");

  return nodes;

  // extract all nodes from graphData and transform each of them to JSON object
}
