// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import * as d3 from "d3";
import { initializeNodes, attatchSvgTo, D3Graph, initializeLinks } from "./D3Graph";
import type { CanvasConfig } from "./D3Graph";
import type { Node, Link, Graph } from "../Graph";
import { render } from "@testing-library/react";

test("test svg width and height", () => {
    const canvasConfig: CanvasConfig = {
        width: 3,
        height: 3,
    };

    const actualSvg = attatchSvgTo("htmlContainer", canvasConfig.width, canvasConfig.height);

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

    const actualNodes: any[] = initializeNodes(inputNodes);

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

    const actualLinks = initializeLinks(inputLinks);

    expect(actualLinks).toBe(inputLinks);
    actualLinks.forEach((link: any) => {
        expect(link).toHaveProperty("source");
    });
    actualLinks.forEach((link: any) => {
        expect(link).toHaveProperty("target");
    });
});

test("source and target field in links are all node ID's in generatd graphCoordinates of line", () => {
    // const graph = render(<D3Graph />);
    //   const nodes: Node[] = [
    //     {
    //       id: "1",
    //       name: "foo",
    //     },
    //     {
    //       id: "2",
    //       name: "bar",
    //     },
    //   ];

    //   const links: Link[] = [
    //     {
    //       id: "3",
    //       name: "link1",
    //       source: "1",
    //       target: "2",
    //     },
    //   ];
    // const node = d3.selectAll("node")
    //   const actualLinks = initializeLinks(links);
    //   const actualNodes = initializeNodes(nodes);

    const actualGraph = getTestGraph();

    actualGraph

    function linksSource(actualLinks: Link[], actualNodes: Node[]) {
        for (let i = 0; i <= actualNodes.length; i++) {
            // actualLinks.forEach((link: any) => {
            //     expect(link.source).toBe(actualNodes[i].id);
            // });

            const allLinksSource = actualLinks.map((object) => {
                return (object.source = actualNodes[i].id ? object.source : "");
            });
            expect(allLinksSource).not.toBeNull();
            expect(allLinksSource.length).toBe(actualLinks.length);
        }
    }
    linksSource(exampleLinks, exampleNodes);

    function linksTarget(actualLinks: Link[], actualNodes: Node[]) {
        for (let i = 0; i <= actualNodes.length; i++) {
            const allLinksTarget = actualLinks.map((object) => {
                return (object.target = actualNodes[i].id ? object.target : "");
            });
            expect(allLinksTarget).not.toBeNull();
            expect(allLinksTarget.length).toBe(actualLinks.length);
        }
    }
    linksTarget(exampleLinks, exampleNodes);

});

test(" node coordinates are within canvas range", () => {

    // const graph = render(getTestGraph());
    const nodes: Node[] = exampleNodes;
    for (let i = 0; i <= nodes.length; i++) {
        const transform = getTestGraph().props.getElementByClassName("node")[i].getAttribute("transform")
        //transform = "translate(x,y)"
        const nodeX = Number(transform.slice(10, -1).split(',')[0])
        const nodeY = Number(transform.slice(10, -1).split(',')[1])
        let compareX = false;
        let compareY = false;
        if (0 < nodeX < getTestGraph().props.width) {
            compareX = true
        };
        expect(compareX).toBe(true);

        if (0 < nodeY < getTestGraph().props.height) {
            compareY = true
        };
        expect(compareY).toBe(true);
    };
    // function compareX(nodeX: number){
    //     if( 0 < nodeX < getTestGraph().props.width){
    //         return true
    //     }
    // }
    // expect(compareX(nodeX)).toBe(true);

    // function compareY(nodeY: number){
    //     if( 0 < nodeY< getTestGraph().props.height){
    //         return true
    //     }
    // }
    // expect(compareY(nodeY)).toBe(true);     

    // expect(graph.props.getElementByClassName(node). getAttribute("transform")).toBe('translate(480,250)')
});

test(" link coordinates are within canvas range", () => {
    const links: Link[] = exampleLinks;
    for (let i = 0; i <= links.length; i++) {
    const linkX1 = Number(getTestGraph().props.getElementByClassName("link").getAttribute("x1"));
    const linkY1 = Number(getTestGraph().props.getElementByClassName("link").getAttribute("y1"));
    const linkX2 = Number(getTestGraph().props.getElementByClassName("link").getAttribute("x2"));
    const linkY2 = Number(getTestGraph().props.getElementByClassName("link").getAttribute("y2"));
    let compareX1 = false;
    let compareX2 = false;
    let compareY1 = false;
    let compareY2 = false;
    if(0 < linkX1 < getTestGraph().props.width && 0 < linkX2 < getTestGraph().props.width){
        compareX1 = true;
        compareX2 = true;
    };
    expect(compareX1).toBe(true);
    expect(compareX2).toBe(true);

    if(0 < linkY1 < getTestGraph().props.width && 0 < linkY2 < getTestGraph().props.width){
        compareY1 = true;
        compareY2 = true;
    };
    expect(compareY1).toBe(true);
    expect(compareY2).toBe(true);

};
})

test(" color of the nodes on the canvas ", () => {
    const circleColor = getTestGraph().props.getElementByTabName("link").getAttribute("x1");
})

const exampleNodes: Node[] = getTestGraph().props.nodes;
const exampleLinks: Link[] = getTestGraph().props.links;

function getTestGraph(): JSX.Element {
    const graphData: Graph = {
        nodes: [
            {
                /**
                 * Surrogate key
                 */
                id: "1",
                name: "node1",
            },
            {
                /**
                 * Surrogate key
                 */
                id: "2",
                name: "node2",
            },
            {
                /**
                 * Surrogate key
                 */
                id: "3",
                name: "node3",
            },
        ],
        links: [
            {
                /**
                 * Surrogate key
                 */
                id: "4",
                name: "link1",
                source: "1",
                target: "2",
            },
            {
                /**
                 * Surrogate key
                 */
                id: "5",
                name: "link2",
                source: "2",
                target: "3",
            },
        ],
    };

    const canvasConfig: CanvasConfig = {
        width: 960,
        height: 500,
    };


    return <D3Graph graphData={graphData} canvasConfig={canvasConfig} />
}