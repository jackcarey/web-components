# web-components

## This is currently a work-in-progress.

[![JSR Scope](https://jsr.io/badges/@web-components)](https://jsr.io/@web-components)
[![repo workflow](https://github.com/jackcarey/web-components/actions/workflows/repo.yml/badge.svg?branch=main)](https://github.com/jackcarey/web-components/actions/workflows/repo.yml?query=branch%3Amain)
[![CICD workflow](https://github.com/jackcarey/web-components/actions/workflows/cicd.yml/badge.svg?branch=main)](https://github.com/jackcarey/web-components/actions/workflows/cicd.yml?query=branch%3Amain)
[![pages-build-deployment](https://github.com/jackcarey/web-components/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/jackcarey/web-components/actions/workflows/pages/pages-build-deployment)

-   There are 4 packages in this collection. Some are web components intended for the DOM, others are utilities that components consume.
-   **Each is published as it's own package with a readme, license, and documentation.**
-   They are distributed through [jsr.io/@web-components](https://jsr.io/@web-components).

| Name | Description | Version | License | Registry |
| --- | --- | --- | --- | --- |
| [autoloader](https://jackcarey.co.uk/web-components/packages/autoloader) | Automatically load components from jackcarey/web-components using esm.sh. - **Utility** | 1.1.11 | [LGPL-3](https://www.tldrlegal.com/search?query=LGPL-3) | [![autoloader](https://jsr.io/badges/@web-components/autoloader)](https://jsr.io/@web-components/autoloader) [![score](https://jsr.io/badges/@web-components/autoloader/score)](https://jsr.io/@web-components/autoloader/score) |
| [can-i-use](https://jackcarey.co.uk/web-components/packages/can-i-use) | Wraps the caniuse embed from ireade/caniuse-embed so it can be used as a component - **Component** | 1.0.8 | [LGPL-3](https://www.tldrlegal.com/search?query=LGPL-3) | [![can-i-use](https://jsr.io/badges/@web-components/can-i-use)](https://jsr.io/@web-components/can-i-use) [![score](https://jsr.io/badges/@web-components/can-i-use/score)](https://jsr.io/@web-components/can-i-use/score) |
| [i-cal](https://jackcarey.co.uk/web-components/packages/i-cal) | Renders ics data in a web component - **Component** | 1.0.8 | [LGPL-3](https://www.tldrlegal.com/search?query=LGPL-3) | [![i-cal](https://jsr.io/badges/@web-components/i-cal)](https://jsr.io/@web-components/i-cal) [![score](https://jsr.io/badges/@web-components/i-cal/score)](https://jsr.io/@web-components/i-cal/score) |
| [query](https://jackcarey.co.uk/web-components/packages/query) | A class for periodically fetching new data from a memory, OPFS, or sessionStorage. - **Utility** | 1.0.1 | [LGPL-3](https://www.tldrlegal.com/search?query=LGPL-3) | [![query](https://jsr.io/badges/@web-components/query)](https://jsr.io/@web-components/query) [![score](https://jsr.io/badges/@web-components/query/score)](https://jsr.io/@web-components/query/score) |



Made with ❤️ by [jackcarey](https://jackcarey.co.uk/)

## Using components

//todo

## Developing components

//todo

### Producing documentation

Readmes, JSR config, and package documentation are updated using GitHub Actions to run the files in the `/scripts` folder. These handle patch version bumping and config for automatic JSR registry publishing. They also handle compiling complete readme files that combine `package.json` and `DOCUMENTATION.md` files.
