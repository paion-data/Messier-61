---
id: "Graph"
title: "Interface: Graph"
sidebar_label: "Graph"
sidebar_position: 0
custom_edit_url: null
---

A Graph is an abstract data type that is meant to implement the Knowledge Graph (both directed and undirected)
concept from the field of graph theory within mathematics.

A knowledge graph is a directed labeled graph in which the labels have well-defined meanings. A directed labeled
graph consists of nodes, edges, and labels. Anything can act as a node, for example, people, company, computer, etc.
An edge connects a pair of nodes and captures the relationship of interest between them, for example, friendship
relationship between two people, customer relationship between a company and person, or a network connection between
two computers. The labels capture the meaning of the relationship, for example, the friendship relationship between
two people.

Graph

## Properties

### links

• **links**: [`Link`](Link.md)[]

#### Defined in

[Graph.d.ts:18](https://github.com/paion-data/Messier-61/blob/f232fd9/src/components/Graph/Graph.d.ts#L18)

___

### nodes

• **nodes**: [`Node`](Node.md)[]

#### Defined in

[Graph.d.ts:17](https://github.com/paion-data/Messier-61/blob/f232fd9/src/components/Graph/Graph.d.ts#L17)
