// Copyright 2023 Paion Data. All rights reserved.
import { getFromNode, getToNode, getLinkLabelToNode } from "./GraphPlugin";

describe("测试", () => {
  test("fromname", () => {
    console.log(getFromNode("深圳到云南:$156"));
    expect(getFromNode("深圳到云南:$156").name).toBe("深圳");
  });
  test("Toname", () => {
    console.log(getToNode("深圳到云南:$156"));
    const { name } = getToNode("深圳到云南:$156");
    expect(name).toBe("云南");
  });
  test("linklabel", () => {
    console.log(getLinkLabelToNode("深圳到云南:$156"));
    const { name } = getLinkLabelToNode("深圳到云南:$156");
    expect(name).toBe("156");
  });
});
