import{j as e}from"./index-BFfWjCa1.js";import{useMDXComponents as s}from"./index-Bx0zT03Q.js";import{M as o,c}from"./blocks-C4etrrZb.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CbEtxNW2.js";const i=`# kbd-click\r
\r
[![kbd-click component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-kbd-click) [![kbd-click version on JSR](https://jsr.io/badges/@web-components/kbd-click)](https://jsr.io/@web-components/kbd-click/versions) [![JSR score](https://jsr.io/badges/@web-components/kbd-click/score)](https://jsr.io/@web-components/kbd-click/score)\r
\r
> Trigger click events on child kbd elements\r
\r
-   **Version:** 1.0.0\r
-   **License:** [LGPL-3.0-or-later](./LICENSE.md)\r
\r
## Using this package\r
\r
### Browser\r
\r
-   via the ESM CDN: [https://esm.sh/jsr/@web-components/kbd-click](https://esm.sh/jsr/@web-components/kbd-click)\r
\r
\`\`\`html\r
<script src="https://esm.sh/jsr/@web-components/kbd-click" type="module"><\/script>\r
\`\`\`\r
\r
### Deno\r
\r
\`\`\`\r
deno add jsr:@web-components/kbd-click\r
\`\`\`\r
\r
### NPM\r
\r
-   JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:\r
\r
\`\`\`\r
npx jsr add @web-components/kbd-click\r
\`\`\`\r
\r
## Documentation\r
\r
-   **Open examples for [kbd-click on Storybook](https://jackcarey.co.uk/web-components/storybook-static/?path=/docs/components-kbd-click)**.\r
\r
The \`kbd-click\` component listens on the \`document\` for key presses then fires clicks on any visible inner \`kbd\` elements where the \`data-key\` or \`innerText\` match. This is useful for implementing keyboard shortcuts.

**Attributes**

<!-- 'allow-repeat', 'filter', 'capture', 'passive', 'ignore-visibility', 'disabled' -->

-   \`allow-repeat\` - Whether or not repeat key presses should continue to trigger clicks. Default: \`false\`.
-   \`filter\` - A comma-separated list of keys that will be listened for. Other key presses will be ignored. Default: no filter.
-   \`capture\` - A boolean value indicating that key press events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. If not specified, defaults to \`false\`.
-   \`passive\` - \`A boolean value that, if \`true\`, indicates that the function triggered by inner \`kbd\`clicks will never call\`preventDefault()\`. Defaults to \`false\`.
\r
\r
---\r
\r
Made by [jackcarey](https://jackcarey.co.uk).\r
`;function r(n){return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"components/kbd-click/Documentation"}),`
`,e.jsx(c,{children:i})]})}function b(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r()}export{b as default};
//# sourceMappingURL=kbd-click-MVx1WW-5.js.map
