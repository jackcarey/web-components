# web-components

## This repo is currently a work-in-progress.

[![JSR Scope](https://jsr.io/badges/@web-components)](https://jsr.io/@web-components)
[![cicd.yml workflow](https://github.com/jackcarey/web-components/actions/workflows/cicd.yml/badge.svg?branch=main)](https://github.com/jackcarey/web-components/actions/workflows/cicd.yml?query=branch%3Amain)

There are 4 packages in this collection. Some are web components intended for the DOM, others are utilities that components consume. **Each is published as it's pwn package with a readme, license, and documentation.** They are published to [jsr.io/@web-components](https://jsr.io/@web-components). The 'autoloader' can be used to load other components.

| Name | Description | Version | License | Registry |
 | --- | --- | --- | --- | --- |
| [autoloader](https://github.com/jackcarey/web-components/tree/main/packages/autoloader) | Automatically load the components from jackcarey/web-components - *Utility* | 1.1.11 | [LGPL-3](https://www.tldrlegal.com/search?query=LGPL-3) | [![autoloader](https://jsr.io/badges/@web-components/autoloader)](https://jsr.io/@web-components/autoloader) [![autoloader score](https://jsr.io/badges/@web-components/autoloader/score)](https://jsr.io/@web-components/autoloader/score) | 
| [can-i-use](https://github.com/jackcarey/web-components/tree/main/packages/can-i-use) | Wraps the caniuse embed from ireade/caniuse-embed so it can be used as a component - *Component* | 1.0.8 | [LGPL-3](https://www.tldrlegal.com/search?query=LGPL-3) | [![can-i-use](https://jsr.io/badges/@web-components/can-i-use)](https://jsr.io/@web-components/can-i-use) [![can-i-use score](https://jsr.io/badges/@web-components/can-i-use/score)](https://jsr.io/@web-components/can-i-use/score) | 
| [i-cal](https://github.com/jackcarey/web-components/tree/main/packages/i-cal) | Renders ics data in a web component - *Component* | 1.0.8 | [LGPL-3](https://www.tldrlegal.com/search?query=LGPL-3) | [![i-cal](https://jsr.io/badges/@web-components/i-cal)](https://jsr.io/@web-components/i-cal) [![i-cal score](https://jsr.io/badges/@web-components/i-cal/score)](https://jsr.io/@web-components/i-cal/score) | 
| [query](https://github.com/jackcarey/web-components/tree/main/packages/query) | A class for periodically fetching new data from a memory, OPFS, or sessionStorage. - *Utility* | 1.0.1 | [LGPL-3](https://www.tldrlegal.com/search?query=LGPL-3) | [![query](https://jsr.io/badges/@web-components/query)](https://jsr.io/@web-components/query) [![query score](https://jsr.io/badges/@web-components/query/score)](https://jsr.io/@web-components/query/score) |  



Made with ❤️ by [jackcarey](https://jackcarey.co.uk/)

## Using components

Checkout the [Storybook documentation](/storybook-static/)

## Developing components

//todo

## Producing documentation

Readmes, JSR config, and package documentation are updated by the files in the `/scripts` folder by GitHub Actions. These handle patch version bumping and config for automatic JSR registry publishing. They also handle compiling readme files from `package.json` files and `DOCUMENTATION.md` files.
