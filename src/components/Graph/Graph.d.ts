interface Graph {
  nodes: Node[];
  links: Link[];
}

interface Node {
  id: string;
  label: string;
  value: any;
}

interface Link {
  id: string;
  label: string;
  from: string;
  to: string;
}
