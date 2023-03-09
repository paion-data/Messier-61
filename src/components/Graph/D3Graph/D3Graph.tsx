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

  const width = graphConfig.canvasConfig.width;
  const height = graphConfig.canvasConfig.height;

  const nodes: any[] = initializeNodes(graphConfig.graphData.nodes);
  let links: any[] = initializeLinks(graphConfig.graphData.links);

  useEffect(() => {
    let selectedSourceNode: any;
    let selectedTargetNode: any;
    let selectedLink: any;
    let newLine: any;
  
    let drawingLine = false;
  
    const simulation = initializeSimulation(nodes, links, width, height);
  
    const svg = attatchSvgTo(svgRef.current, width, height);
  
    /**
     * Reload all existing links & nodes and off-load obsolete (soft-deleted) ones.
     * 
     * This method is usually called between a D3 force simulation "stop" and "restart" .
     * 
     * Executing this function will cause the re-binding of simulation nodes and node data are joined using a key
     * funciton, which takes the node "name" as the resolving key. 
     * 
     * @see [How new links & nodes are loaded onto canvas](https://stackoverflow.com/a/43357028)
     * @see [D3 drag](https://github.com/d3/d3-drag/blob/v3.0.0/README.md#drag)
     * @see [key function](https://www.d3indepth.com/datajoins/#key-functions)
     */
    function update(): void {
      const link = linesg.selectAll("line.link")
        .data(links)
        .attr("x1", function (d: any) { return d.source.x; })
        .attr("y1", function (d: any) { return d.source.y; })
        .attr("x2", function (d: any) { return d.target.x; })
        .attr("y2", function (d: any) { return d.target.y; })
        .classed("selected", function (d: any) { return d === selectedLink; });
  
      link.enter().append("line")
        .attr("class", "link")
        .attr("marker-end", "url(#child)")
        .on("mousedown", linkMousedown);
  
      // off-load obsolete links due to node removal
      link.exit().remove();
  
      const node = circlesg.selectAll(".node")
        .data(nodes, function (d: any) { return d.name; })
        .classed("selected", function (d: any) { return d === selectedSourceNode; })
        .classed("selectedTarget", function (d: any) { return d === selectedTargetNode; })
  
      const nodeg = node.enter()
        .append("g")
        .attr("class", "node")
        .call(d3.drag)
        .attr("transform", function (d: any) {
          return `translate(${d.x as string}, ${d.y as string})`;
        });
  
      nodeg.append("circle")
        .attr("r", 10)
        .on("mousedown", nodeMousedown)
        .on("mouseover", nodeMouseover)
        .on("mouseout", nodeMouseout);
  
      nodeg.append("svg:a")
        .attr("xlink:href", function (d: any) { return d.url || '#'; })
        .append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function (d: any) { return d.name });
      node.exit().remove();
  
      simulation.nodes(nodes); // Reload nodes in simulation - https://github.com/d3/d3-force#simulation_nodes
      simulation.on("tick", () => {
        link.attr("x1", function (d: any) { return d.source.x; })
          .attr("y1", function (d: any) { return d.source.y; })
          .attr("x2", function (d: any) { return d.target.x; })
          .attr("y2", function (d: any) { return d.target.y; });
        node.attr("transform", function (d: any) {
          return `translate(${d.x as string}, ${d.y as string})`;
        });
      });
    }
  
    /**
     * An event listener function that selects a link when a pointing device button is pressed while the pointer is inside
     * a graph link.
     * 
     * The function records the currently selected link and deselect any nodes
     *
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as 
     * 
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     */
    function linkMousedown(event: any, d: any): void {
      selectedLink = d;
      selectedSourceNode = null;
      update();
    }
  
    /**
     * An event listener function that selects a source node when a pointing device button is pressed while the pointer is
     * inside a graph node.
     * 
     * The function records the currently selected node, deselect any links, and flags a link drawing.
     * 
     * This function als performs side effect of stoping the simulation and graph reloading by calling {@link update}
     *
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as 
     * 
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     */
    function nodeMousedown(event: any, d: any): void {
      if (!drawingLine) {
        selectedSourceNode = d;
        selectedLink = null;
      }
  
      event.stopPropagation();
      drawingLine = true;
  
      d.fixed = true;
  
      simulation.stop()
  
      update();
    }
  
    /**
     * Prepare a target node selection by resetting the currently selected target node when a pointing device (usually a
     * mouse) is used to move the cursor so that it is no longer contained within a node element.
     *
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as 
     * 
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     */
    function nodeMouseout(event: any, d: any): void {
      if (drawingLine) {
        selectedTargetNode = null;
      }
    }
  
    /**
     * Selects, when a button on a pointing device (such as a mouse or trackpad) is released while the pointer is located
     * inside a node, a target node for new node connection if and only if the target node is not the source node.
     *
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as 
     * 
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     */
    function nodeMouseover(event: any, d: any): void {
      if (drawingLine && d !== selectedSourceNode) {
        // highlight and select target node
        selectedTargetNode = d;
      }
    }
  
    /**
     * Handles, after a node or link is mouse-selected, various key stroke event, such as deleting the node or link.
     * 
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as 
     * 
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     */
    function windowKeydown(event: any, d: any): void {
      switch (event.keyCode) {
        case BACKSPACE_KEY_CODE:
        case DELETE_KEY_CODE: {
          if (selectedSourceNode) {
            const i = nodes.indexOf(selectedSourceNode);
            nodes.splice(i, 1);
  
            // find links to/from this node, and delete them too
            const preservedLinks: any = [];
            links.forEach(function (link) {
              if (link.source !== selectedSourceNode && link.target !== selectedSourceNode) {
                preservedLinks.push(link);
              }
            });
            links = preservedLinks;
  
            selectedSourceNode = nodes.length ? nodes[i > 0 ? i - 1 : 0] : null;
          } else if (selectedLink) {
            const i = links.indexOf(selectedLink);
            links.splice(i, 1);
  
            selectedLink = links.length ? links[i > 0 ? i - 1 : 0] : null;
          }
          update();
          break;
        }
      }
    }
  
    /**
     * Draws yellow "new connector" line when a pointing device (usually a mouse) is moved while the cursor's hotspot is
     * inside browser window.
     * 
     * This happens only when we are drawing a line (i.e. drawingLine = true)
     * 
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as 
     * 
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     */
    function windowMousemove(event: any, d: any): void {
      if (drawingLine) {
        const pointerLocation = d3.pointer(event, svg.node());
  
        // confine the dragging inside canvas defined by width and height
        const x = Math.max(0, Math.min(width, pointerLocation[0]));
        const y = Math.max(0, Math.min(height, pointerLocation[1]));
  
        // debouncing - only start drawing when the line gets a bit longer
        const dx = selectedSourceNode.x - x;
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
  
    /**
     * Materializes a link between source and target nodes when a button on a pointing device (such as a mouse or
     * trackpad) is released while the pointer is located inside the trget node.
     * 
     * The closing drag is followed by a 30-ms delay before the link appears on screen
     * 
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as 
     * 
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     * @see [setTimeout](https://www.w3schools.com/jsref/met_win_settimeout.asp)
     */
    function windowMouseup(event: any, d: any): void {
      drawingLine = false;
      if (newLine) {
        let newNode: any;
  
        if (selectedTargetNode) {
          selectedTargetNode.fixed = false;
          newNode = selectedTargetNode;
        } else {
          const pointerLocation = d3.pointer(event, svg.node());
          newNode = {
            x: pointerLocation[0],
            y: pointerLocation[1],
            name: `${DEFAULT_NODE_NAME} ${nodes.length}`,
            group: 1
          }
          nodes.push(newNode);
          simulation.nodes(nodes); // Reload nodes in simulation - https://github.com/d3/d3-force#simulation_nodes
        }
  
        selectedSourceNode.fixed = false;
        links.push({ source: selectedSourceNode, target: newNode })
  
        selectedSourceNode = null;
        selectedTargetNode = null;
  
        update();
  
        setTimeout(function () {
          newLine.remove();
          newLine = null;
          simulation.restart();
        }, 300);
      }
    }
  
    d3.select(window)
      .on("keydown", windowKeydown)
      .on("mouseup", windowMouseup)
      .on("mousemove", windowMousemove);
  
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .on("mousedown", mousedown);
  
    /**
     * Add a new disconnected node to canvas.
     *
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as 
     * 
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     * @see [How to obtain pointer location in D3](https://stackoverflow.com/a/63988345)
     */
    function mousedown(event: any, d: any): void {
      const pointerLocation = d3.pointer(event, svg.node())
  
      nodes.push({
        x: pointerLocation[0],
        y: pointerLocation[1],
        name: `${DEFAULT_NODE_NAME} ${nodes.length}`,
        group: 1
      });
  
      simulation.nodes(nodes); // Reload nodes in simulation - https://github.com/d3/d3-force#simulation_nodes
  
      selectedLink = null;
  
      simulation.stop();
      update();
      simulation.restart();
    }
  
    // Arrow marker
    svg.append("svg:defs").selectAll("marker")
      .data(["child"])
      .enter().append("svg:marker")
      .attr("id", String)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", DEFAULT_LINK_DISTANCE)
      .attr("refY", -1.1)
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");
  
    const linesg = svg.append("g");
    const circlesg = svg.append("g");
  }, [nodes, links, svgRef.current]);

  return <svg ref={svgRef} width={width} height={height} />;
}

/**
 * Creates a new simulation with the specified array of nodes and links with no forces.
 * 
 * If nodes is not specified, it defaults to an empty array. Executing this function starts simulator automatically.
 * 
 * The configuration of the simulation is the following:
 * 
 * - A repulsive force field with a fixed strength of -340
 * - Nodes are pushed at a fixed distance of 90 units apart
 * - The ID of a node is defined by its property "id"
 * - The force attracts nodes to the center of the SVG area
 *
 * @param nodes The provided array of starting nodes
 * @param links The provided array of starting links
 * @param width The width of the canvas hosting the simulation
 * @param height The height of the canvas hosting the simulation
 *
 * @returns a fully initialized and running D3 force graph simulation
 * 
 * @see [How node ID are accessed in D3](https://stackoverflow.com/a/45382200)
 */
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

/**
 * Selects a specified HTML element and bind a new SVG to it using the provided width and height.
 * 
 * @param htmlContainer The string that specifies which elements this SVG bind to and is in the form of a CSS
 * @param width The width of the SVG
 * @param height The height of the SVG
 *
 * @returns the selection itself, i.e. The bound SVG instance
 */
function attatchSvgTo(htmlContainer: any, width: number, height: number): any {
  return d3.select(htmlContainer)
    .append("svg")
    .attr("width", width)
    .attr("height", height);
}

/**
 * Converts a list of {@link D3Graph. Node}'s to D3-compatible nodes.
 *
 * @param inputNodes The list of all node objects in Messier-61 format
 *
 * @returns a list of D3 force-graph nodes
 */
export function initializeNodes(inputNodes: Node[]): any[] {
  return inputNodes;
}

/**
 * Converts a list of {@link Graph. Link}'s to D3-compatible links.
 *
 * Each of the returned links promises to have the following attributes:
 *
 * - source
 * - target
 *
 * Note that each link might contain other attributes, which D3 doesn't need for its own good
 *
 * @param inputLinks The list of all link objects in Messier-61 format
 *
 * @returns a list of D3 force-graph links
 */
export function initializeLinks(inputLinks: Link[]): any[] {
  return inputLinks;
}

// /**
//  * D3 graph component
//  *
//  * @param nodes A list of object containting info about all vertices of graph
//  *
//  * @param links A list of object containting info about all links of graph
//  *
//  * @returns A D3 visualization whose data is defined by nodes & links
//  */
// export function generateD3Graph(props: Graph, canvasConfig: CanvasConfig): JSX.Element {
//   const svgRef = React.useRef(null);
//   const margin = canvasConfig.margin;
//   const width = canvasConfig.width - margin.left - margin.right;
//   const height = canvasConfig.height - margin.top - margin.bottom;
//   const svg = attachSvgTo(svgRef.current, margin, width, height);

//   const link = initializeLinks(svg, props);
//   const edgesText = generateEdgesText(svg, props);
//   edgesText
//     .append("textPath")
//     .attr("xlink:href", (d: any, i: string): any => {
//       return i != null && "#edgepath" + i;
//     })
//     .style("pointer-events", "none")
//     .text((d: { lable: any }) => {
//       return d?.lable;
//     });

//   const node = initializeNode(svg, props);

//   generateNodeText(svg, props);

//   function generateSimulation(props: Graph, ticked: any): any {
//     d3.forceSimulation(getAllNodes(props.nodes))
//       .force(
//         "link",
//         d3
//           .forceLink()
//           .id(function (node: any) {
//             return node.id;
//           })
//           .links(getAllLinks(props.links))
//       )
//       .force("charge", d3.forceManyBody().strength(-400))
//       .force("center", d3.forceCenter(width / 2, height / 2))
//       .on("end", ticked);
//   }
//   generateSimulation(props, ticked);

//   function ticked(): any {
//     link
//       .attr("x1", function (d: { source: { x: any } }) {
//         return d.source.x;
//       })
//       .attr("y1", function (d: { source: { y: any } }) {
//         return d.source.y;
//       })
//       .attr("x2", function (d: { target: { x: any } }) {
//         return d.target.x;
//       })
//       .attr("y2", function (d: { target: { y: any } }) {
//         return d.target.y;
//       });

//     node
//       .attr("cx", function (d: { x: number }) {
//         return d.x + 6;
//       })
//       .attr("cy", function (d: { y: number }) {
//         return d.y - 6;
//       });
//   }

//   return <svg ref={svgRef} width={width} height={height} />;
// }

// /**
//  * Define svg style
//  *
//  * @param selector A string that conforms to the W3C selector, which is how elements are selected in a css document
//  *
//  * @param margin the margin of the svg
//  *
//  * @param width the width of the svg
//  *
//  * @param height the height of the svg
//  *
//  * @returns A D3 graph with defined dimensions
//  */
// export function attachSvgTo(selector: any, margin: Margin, width: number, height: number): any {
//   const svg = d3
//     .select(selector)
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left.toString() + "," + margin.top.toString() + ")");
//   return svg;
// }

// export function initializeNode(svg: any, props: Graph): any {
//   return svg
//     .selectAll("circle")
//     .data(getAllNodes(props.nodes))
//     .enter()
//     .append("circle")
//     .attr("r", 20)
//     .style("fill", "#69B3A2")
//     .on("click", (node: any) => {
//       console.log("click");
//     });
// }

// /**
//  * Visual node text
//  *
//  * @param svg A D3 visualization whose data is defined by nodes & links
//  *
//  * @param nodes A list of object containting info about all vertices of graph
//  *
//  * @returns A node with text
//  */
// function generateNodeText(svg: any, props: Graph): any {
//   return svg
//     .selectAll("text")
//     .data(getAllNodes(props.nodes))
//     .enter()
//     .append("text")
//     .attr("dy", ".3em")
//     .attr("text-anchor", "middle")
//     .style("fill", "black")
//     .style("pointer-events", "none")
//     .text((d: { id: any }): any => {
//       return d?.id;
//     });
// }

// /**
//  * Generating line
//  *
//  * @param svg A D3 visualization whose data is defined by nodes & links
//  *
//  * @param links A list of object containting info about all line of graph
//  *
//  * @returns A line connect two nodes
//  */
// export function initializeLinks(svg: any, props: Graph): any {
//   return svg.selectAll("line").data(getAllLinks(props.links)).enter().append("line").style("stroke", "#aaa");
// }

// /**
//  * Visual line text
//  *
//  * @param svg A D3 visualization whose data is defined by nodes & links
//  *
//  * @param links A list of object containting info about all line of graph
//  *
//  * @returns A line with text
//  */
// function generateEdgesText(svg: any, props: any): any {
//   return svg
//     .selectAll(".edgelabel")
//     .data(getAllLinks(props.links))
//     .enter()
//     .append("text")
//     .attr("class", "edgelabel")
//     .attr("dx", 80)
//     .attr("dy", 0);
// }


