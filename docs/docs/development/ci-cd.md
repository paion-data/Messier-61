---
sidebar_position: 2
title: CI/CD
---

Testing
-------

1. Code style check

   - YAML lint
   - Markdown lint
   - Markdown link check

2. Build and test Messier-61

   - The build process checks code style again using [Prettier][Prettier]
   - The process also runs static code anslysis using [ESLint][ESLint]

     :::caution

     ESLint currently does not run on documentation source codes, i.e. `/docs`

     :::

3. Test Build Messier-61 Documentation

Release Process
---------------

### Messier-61

1. [Comprehensively test](#testing)
2. Fetch the tags from the adjusted remote
3. Get the last tag on the working branch
4. Build (`.github/upversion.py`) and push the new tag as the new release version.
5. Bump Messier-61 version the new release version
6. Push Messier-61 to [NPM registry][Messier-61 npm repo]

### Messier-61 Documentation

[GitHub Actions][GitHub Actions] allow us to automate, customize, and execute our software development workflows right
in our repository. This also applies to our documentations.

Messier-61 documentation source resides in the master branch under `docs/` directory,  publishing source is configured
for the `gh-pages` branch.

The CI/CD for documentation achieves 2 goals:

1. When a new pull request is made to `master`, there's an action that ensures the site builds successfully, without
   actually deploying. This job is called `test-doc-build`.
2. When a pull request is merged to the `master` branch, it will be built and deployed to the `gh-pages` branch. After
   that, the new build output will be served on the GitHub Pages site. This job is `deploy-documentation` called deploy.

[ESLint]: https://eslint.org/

[GitHub Actions]: https://docusaurus.io/docs/deployment#deploying-to-github-pages

[Messier-61 npm repo]: https://www.npmjs.com/package/@paiondata/messier-61

[Prettier]: https://prettier.io/