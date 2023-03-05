// Copyright 2023 Paion Data. All rights reserved.

/**
 * A Graph is an abstract data type that is meant to implement the Knowledge Graph (both directed and undirected)
 * concept from the field of graph theory within mathematics.
 *
 * A knowledge graph is a directed labeled graph in which the labels have well-defined meanings. A directed labeled
 * graph consists of nodes, edges, and labels. Anything can act as a node, for example, people, company, computer, etc.
 * An edge connects a pair of nodes and captures the relationship of interest between them, for example, friendship
 * relationship between two people, customer relationship between a company and person, or a network connection between
 * two computers. The labels capture the meaning of the relationship, for example, the friendship relationship between
 * two people.
 */
export interface Graph {
  nodes: Node[];
  links: Link[];
}

/**
 * A node has a unique identifier
 */
export interface Node {
  /**
   * Surrogate key
   */
  id: string;
  name: string;
}

export interface Link {
  /**
   * Surrogate key
   */
  id: string;
  name: string;
  source: string;
  target: string;
}
