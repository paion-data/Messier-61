// Copyright 2023 Paion Data. All rights reserved.
import React, { useEffect, useRef } from "react";
import type { Graph, Node, Link } from "../Graph";
import * as d3 from "d3";
import "./D3Graph.css";

const DELETE_KEY_CODE = 46;
const BACKSPACE_KEY_CODE = 8;

const DEFAULT_LINK_DISTANCE = 90;
const DEFAULT_FORCE_STRENGTH = -340;

const DEFAULT_NODE_NAME = "new node";

/**
 * A CanvasConfig describes the whole layout of a rendered D3 graph.
 *
 * The canvas config contains the following attributes:
 *
 * - {@link Margin}
 * - Canvas width
 * - Canvas height
 *
 * Note that it is not guaranteed that the graph will occupy the entire canvas width or height. It does, however,
 * guarantees the entire graph will fit inside the canvas
 */
export interface CanvasConfig {

  /**
   * The canvas width.
   */
  width: number;

  /**
   * The canvas height.
   */
  height: number;
}

/**
 * A graph config instructs {@link D3Graph} how the D3 network graph is going to be rendered and with what data to be
 * rendered.
 */
export interface GraphConfig {

  /**
   * The data.
   */
  graphData: Graph;

  /**
   * See {@link CanvasConfig}
   */
  canvasConfig: CanvasConfig;
}

/**
 * Generates a D3 graph whose content is defined by a provided {@link Graph graph data}.
 *
 * @param props An object containing a list of {@link Graph. Node}'s and list of {@link Graph. Link}'s
 *
 * @returns A D3 visualization of network graph
 */
export function D3Graph(graphConfig: GraphConfig): JSX.Element {
  const svgRef = useRef(null);
  const width = graphConfig.canvasConfig.width
  const height = graphConfig.canvasConfig.height
  const circleR = 20;

  const nodes = initializeNodes(graphConfig.graphData.nodes)
  let links = initializeLinks(graphConfig.graphData.links)

  useEffect(() => {

    let selectedSourceNode: any;
    let selectedTargetNode: any;
    let drawingLine = false;
    let newLine: any;

    const simulation = initializeSimulation(nodes, links, width, height);

    const svg = attatchSvgTo(svgRef.current, width, height);


    function update() {

      //<g> <g class=node transforn><circle></circle></g> </g> 

      const node = circlesg.selectAll(".node")
        .data(nodes, function (d: any) { return d.name; })
        .classed("selectedSource", function (d: any) { return d === selectedSourceNode; })
        .classed("selectedTarget", function (d: any) { return d === selectedTargetNode; })

      const nodeg = node.enter()
        .append("g")
        .attr("class", "node")
        .call(d3.drag)
        .attr("transform", function (d: any) {
          return `translate(${d.x as string}, ${d.y as string})`;
        })

      nodeg
        .append("circle")
        .attr("r", circleR)
        .on("mousedown", nodeMousedown)
        .on("mouseover", nodeMouseover)
        .on("mouseout", nodeMouseout);

      node.append("svg:a")
        .attr("xlink:href", function (d: any) { return d.url || '#'; })
        .append("text")
        .attr("dx", 25)
        .attr("dy", ".35em")
        .text(function (d: any) { return d.name })
      node.exit().remove();

      const link = linesg.selectAll("line.link")
        .data(links)
        .attr("x1", function (d: any) { return d.source.x; })
        .attr("y1", function (d: any) { return d.source.y; })
        .attr("x2", function (d: any) { return d.target.x; })
        .attr("y2", function (d: any) { return d.target.y; })

      link.enter().append("line")
        .attr("class", "link")
        .attr("marker-end", "url(#child)")

      link.exit().remove();

      simulation.nodes(nodes); // Reload nodes in simulation - https://github.com/d3/d3-force#simulation_nodes
      simulation.on("tick", () => {
        link.attr("x1", function (d: any) { return d.source.x; })
          .attr("y1", function (d: any) { return d.source.y; })
          .attr("x2", function (d: any) { return d.target.x; })
          .attr("y2", function (d: any) { return d.target.y; });
        node.attr("transform", function (d: any) {
          return `translate(${d.x as string}, ${d.y as string})`;
        });
        update();
      });
    }

    function nodeMousedown(event: any, d: any): void {
      if (!drawingLine) {
        selectedSourceNode = d;
      }

      event.stopPropagation();//阻止冒泡
      drawingLine = true;

      d.fixed = true;

      simulation.stop()

      update();
    }


    function nodeMouseover(d: any) {
      if (drawingLine && d !== selectedSourceNode) {
        selectedTargetNode = d
      }
    }

    function nodeMouseout(d: any) {
      if (d !== selectedSourceNode) {
        selectedTargetNode = null
      }
    }

    function windowMousemove(event: any, d: any): void {
      if (drawingLine) {
        const pointerLocation = d3.pointer(event, svg.node());//获取鼠标指针坐标
        console.log(pointerLocation);
        const x = Math.max(0, Math.min(width, pointerLocation[0]));
        const y = Math.max(0, Math.min(height, pointerLocation[1]));
        const dx = selectedSourceNode.x - x;//拖拽后线变长在节点右侧为负 节点左侧为正 即（dx，dy）相较节点移动的位置
        console.log(dx);
        const dy = selectedSourceNode.y - y;
        if (Math.sqrt(dx * dx + dy * dy) > 10) {
        if (!newLine) {
          newLine = linesg.append("line").attr("class", "newLine");
        }
        newLine.attr("x1", function (d: any) { return selectedSourceNode.x; })
          .attr("y1", function (d: any) { return selectedSourceNode.y; })
          .attr("x2", function (d: any) { return x; })
          .attr("y2", function (d: any) { return y; });
        }
      }
      update();
    }

    // //new link
    function windowMouseup(d: any) {
      drawingLine = false;
      if (newLine) {
        if (selectedTargetNode) {
          selectedTargetNode.fixed = false;
          d = selectedTargetNode
        }

        if (selectedSourceNode != null && selectedTargetNode != null) {
          links.push({ source: selectedSourceNode, target: d })
          update()
        } else {
          newLine.remove();
          newLine = null;
        }
        
        selectedSourceNode = null;
        selectedTargetNode = null;

        

        // setTimeout(function () {
        //   newLine.remove();
        //   newLine = null;
        //   simulation.restart();
        // }, 300);
      }
    }

    d3.select(svgRef.current)
      .on("mouseup", windowMouseup)
      .on("mousemove", windowMousemove);

    svg.append("svg:defs").selectAll("marker")
      .data(["child"])
      .enter().append("svg:marker")
      .attr("id", String)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", circleR + 10)
      .attr("refY", -1.1)
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

    const linesg = svg.append("g");
    const circlesg = svg.append("g");

  }, [nodes, links, svgRef.current]);

  return <svg ref={svgRef} width={width} height={height}></svg>
}

export function attatchSvgTo(htmlContainer: any, width: number, height: number): any {
  return d3.select(htmlContainer)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
}

function initializeSimulation(nodes: any[], links: any[], width: number, height: number): any {
  return d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(DEFAULT_FORCE_STRENGTH))
    .force("link", d3.forceLink()
      .distance(DEFAULT_LINK_DISTANCE)
      .id(function (d: any) { return d.id })
      .links(links)
    )
    .force("center", d3.forceCenter(width / 2, height / 2));
}

export function initializeNodes(inputNodes: Node[]): any[] {
  return inputNodes
}

export function initializeLinks(inputLinks: Node[]): any[] {
  return inputLinks
}