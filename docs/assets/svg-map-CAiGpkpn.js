import{j as n}from"./index-D3OCdday.js";import{useMDXComponents as o}from"./index-vh4sUJbT.js";import{M as s,a as r}from"./blocks-Fedb4Hwk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-Dp1pzeXC.js";import"./iframe-BWuQHxz2.js";const i=`# svg-map\r
\r
[![svg-map component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-svg-map) [![svg-map version on JSR](https://jsr.io/badges/@web-components/svg-map)](https://jsr.io/@web-components/svg-map/versions) [![JSR score](https://jsr.io/badges/@web-components/svg-map/score)](https://jsr.io/@web-components/svg-map/score)\r
\r
> Plot anchor tags onto SVG images with zoom-based switching, like an interactive navigational map.\r
\r
-   **Version:** 0.0.1\r
-   **License:** [LGPL-3.0](./LICENSE.md)\r
\r
## Using this package\r
\r
### Browser\r
\r
-   via the ESM CDN: [https://esm.sh/jsr/@web-components/svg-map](https://esm.sh/jsr/@web-components/svg-map)\r
\r
\`\`\`html\r
<script src="https://esm.sh/jsr/@web-components/svg-map" type="module"><\/script>\r
\`\`\`\r
\r
### Deno\r
\r
\`\`\`\r
deno add jsr:@web-components/svg-map\r
\`\`\`\r
\r
### NPM\r
\r
-   JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:\r
\r
\`\`\`\r
npx jsr add @web-components/svg-map\r
\`\`\`\r
\r
## Documentation\r
\r
-   **Open examples for [svg-map on Storybook](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-svg-map)**.\r
\r
# svg-map

A web component that plots anchor tags onto SVG images with zoom-based switching. Works like a cross between an image map and a navigational map.

## Features

- Maps anchor links to named SVG areas (paths, shapes, etc.)
- Distributes links evenly within enclosed areas or along path edges
- Zoom-level based link visibility control
- Zoom-level based SVG image switching
- Declarative HTML-based configuration

## Usage

\`\`\`html
<svg-map zoom="1">
  <!-- SVG for zoom level 1 -->
  <svg data-zoom="1" slot="svg">
    <rect id="area1" x="10" y="10" width="100" height="100" fill="lightblue"/>
    <path id="path1" d="M 150 50 L 250 50 L 200 150 Z" fill="lightgreen"/>
  </svg>
  
  <!-- SVG for zoom level 2 (more detailed) -->
  <svg data-zoom="2" slot="svg">
    <rect id="area1" x="10" y="10" width="200" height="200" fill="lightblue"/>
    <circle id="circle1" cx="300" cy="100" r="50" fill="yellow"/>
  </svg>
  
  <!-- Links for area1, visible at zoom level 1 -->
  <a href="/link1" data-area="area1" data-zoom="1">Link 1</a>
  <a href="/link2" data-area="area1" data-zoom="1">Link 2</a>
  
  <!-- Links for area1, visible at zoom level 2 -->
  <a href="/detail1" data-area="area1" data-zoom="2">Detail 1</a>
  <a href="/detail2" data-area="area1" data-zoom="2">Detail 2</a>
  
  <!-- Links along path1 -->
  <a href="/path-link" data-area="path1" data-zoom="1">Path Link</a>
</svg-map>
\`\`\`

## Attributes

- \`zoom\` - Current zoom level (number, default: 1)

## Child Element Attributes

### SVG Elements (with \`slot="svg"\`)
- \`data-zoom\` - Zoom level at which this SVG is displayed

### Anchor Elements
- \`data-area\` - ID of the SVG area/element to map to
- \`data-zoom\` - Zoom level(s) at which this link is visible (comma-separated for multiple levels)

## How It Works

1. The component reads all SVG elements with \`slot="svg"\` and switches between them based on zoom level
2. Anchor tags with \`data-area\` attributes are positioned within or along their corresponding SVG elements
3. For enclosed shapes (rect, circle, polygon with closed paths), links are distributed evenly inside
4. For open paths or lines, links are distributed along the path
5. Only links matching the current zoom level are visible
\r
\r
---\r
\r
Made by [jackcarey](https://jackcarey.co.uk).\r
`;function t(e){return n.jsxs(n.Fragment,{children:[n.jsx(s,{title:"components/svg-map/Documentation"}),`
`,n.jsx(r,{children:i})]})}function g(e={}){const{wrapper:a}={...o(),...e.components};return a?n.jsx(a,{...e,children:n.jsx(t,{...e})}):t()}export{g as default};
//# sourceMappingURL=svg-map-CAiGpkpn.js.map
