export interface Graph {
  nodes: Node[];
  links: Link[];
}

export interface Node {
  id: string;
  label: string;
  value: any;
}

export interface Link {
  id: string;
  label: string;
  from: string;
  to: string;
}
