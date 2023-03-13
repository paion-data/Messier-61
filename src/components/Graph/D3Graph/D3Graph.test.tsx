// Copyright 2023 Paion Data. All rights reserved.
import * as d3 from "d3";
import { initializeNodes, attatchSvgTo, D3Graph, initializeLinks } from "./D3Graph";
import type { CanvasConfig } from "./D3Graph";
import type { Node, Link } from "../Graph";
import { render } from "@testing-library/react";

test("test svg width and height", () => {
    const canvasConfig: CanvasConfig = {
        width: 3,
        height: 3

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

test("Coordinates of line ,include 'x1' ,'y1','x2','y2'", () => {
    // const graph = render(<D3Graph />);
    const nodes: Node[] = [
        {
            id: "1",
            name: "foo",
        },
        {
            id: "2",
            name: "bar",
        },
    ]

    const links: Link[] = [
        {
            id: "3",
            name: "link1",
            source: "1",
            target: "2",
        },
    ]
    // const node = d3.selectAll("node")
    const actualLinks = initializeLinks(links)
    const actualNodes = initializeNodes(nodes)

    function linksX1(actualLinks: Link[], actualNodes: Node[]) {
        for (let i = 0; i <= actualNodes.length; i++) {
            // actualLinks.forEach((link: any) => {
            //     expect(link.source).toBe(actualNodes[i].id);
            // });

            const allLinksX1 = actualLinks.map((object) => {
                return object.source = actualNodes[i].id ? object.source : ""
            });
            expect(allLinksX1).not.toBeNull();
            expect(allLinksX1.length).toBe(actualLinks.length);
        }
    }
    linksX1(actualLinks, actualNodes)

    // const translate = "'translate(' + ${nodeX} + ',' + 250 ')'"

    // expect(graph.props.getElementByClassName(node). getAttribute("transform")).toBe('translate(480,250)')

})

test("Source and target coordinates for link", () => {
    const links = [
        {
            id: "3",
            name: "link1",
            source: "1",
            target: "2",
        },
    ]

})
