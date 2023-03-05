// Copyright 2023 Paion Data. All rights reserved.
import { getSourceNode, getTargetNode, getLinkLabelToNode } from "./GraphPlugin";

describe("测试", () => {
  test("fromname", () => {
    console.log(getSourceNode("深圳到云南:$156"));
    expect(getSourceNode("深圳到云南:$156").name).toBe("深圳");
  });
  test("Toname", () => {
    console.log(getTargetNode("深圳到云南:$156"));
    const { name } = getTargetNode("深圳到云南:$156");
    expect(name).toBe("云南");
  });
  test("linklabel", () => {
    console.log(getLinkLabelToNode("深圳到云南:$156"));
    const { name } = getLinkLabelToNode("深圳到云南:$156");
    expect(name).toBe("156");
  });
});
