// Copyright 2023 Paion Data. All rights reserved.
const TypeDoc = require("typedoc");

async function main() {
  const app = new TypeDoc.Application();

  // Ask TypeDoc to load tsconfig.json and typedoc.json files
  app.options.addReader(new TypeDoc.TSConfigReader());
  app.options.addReader(new TypeDoc.TypeDocReader());

  app.bootstrap({
    // typedoc options
    entryPoints: ["../src/components/Graph/Graph.d.ts", "../src/components/Graph/D3Graph/D3Graph.tsx"],
    tsconfig: "../tsconfig.json",
    media: "static/img/typedoc",
  });

  const project = app.convert();

  // Project has converted correctly
  if (project) {
    const outputDir = "./build/api";

    // Rendered docs
    await app.generateDocs(project, outputDir);
    // Alternatively generate JSON output
    await app.generateJson(project, outputDir + "/documentation.json");
  }
}

main().catch(console.error);
