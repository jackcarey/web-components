import{j as e}from"./index-BFfWjCa1.js";import{useMDXComponents as s}from"./index-Bx0zT03Q.js";import{M as r,c as m}from"./blocks-BeFS3cr3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-i4LUE4V3.js";const c=`# use-element\r
\r
[![use-element component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-use-element) [![use-element version on JSR](https://jsr.io/badges/@web-components/use-element)](https://jsr.io/@web-components/use-element/versions) [![JSR score](https://jsr.io/badges/@web-components/use-element/score)](https://jsr.io/@web-components/use-element/score)\r
\r
> Copy the innerHTML of any other element.\r
\r
-   **Version:** 0.0.0\r
-   **License:** [LGPL-3.0](./LICENSE.md)\r
\r
## Using this package\r
\r
### Browser\r
\r
-   via the ESM CDN: [https://esm.sh/jsr/@web-components/use-element](https://esm.sh/jsr/@web-components/use-element)\r
\r
\`\`\`html\r
<script src="https://esm.sh/jsr/@web-components/use-element" type="module"><\/script>\r
\`\`\`\r
\r
### Deno\r
\r
\`\`\`\r
deno add jsr:@web-components/use-element\r
\`\`\`\r
\r
### NPM\r
\r
-   JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:\r
\r
\`\`\`\r
npx jsr add @web-components/use-element\r
\`\`\`\r
\r
## Documentation\r
\r
-   **Open examples for [use-element on Storybook](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-use-element)**.\r
\r
Copy the \`innerHTML\` of an element from somewhere else on the DOM.

**Attributes**

-   \`selector\`: The CSS selector of the element you want to copy. If multiple elements are found, the first non-empty element will be used.
-   \`strip-ids\`: If a \`mirror-element\` instance has this attribute it will remove all IDs from child elements.

**Styling**

You might want to use [\`display:contents\`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents) in your CSS so that \`mirror-element\` instances don't produce a specific box in the DOM.
\r
\r
---\r
\r
Made by [jackcarey](https://jackcarey.co.uk).\r
`;function o(n){return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"components/use-element/Documentation"}),`
`,e.jsx(m,{children:c})]})}function u(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o()}export{u as default};
//# sourceMappingURL=use-element-DUK6hEJv.js.map
