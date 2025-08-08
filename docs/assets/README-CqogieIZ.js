const e=`# mirror-element\r
\r
[![mirror-element component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-mirror-element) [![mirror-element version on JSR](https://jsr.io/badges/@web-components/mirror-element)](https://jsr.io/@web-components/mirror-element/versions) [![JSR score](https://jsr.io/badges/@web-components/mirror-element/score)](https://jsr.io/@web-components/mirror-element/score)\r
\r
> Copy the innerHTML of any other element.\r
\r
-   **Version:** 0.0.1\r
-   **License:** [LGPL-3.0](./LICENSE.md)\r
\r
## Using this package\r
\r
### Browser\r
\r
-   via the ESM CDN: [https://esm.sh/jsr/@web-components/mirror-element](https://esm.sh/jsr/@web-components/mirror-element)\r
\r
\`\`\`html\r
<script src="https://esm.sh/jsr/@web-components/mirror-element" type="module"><\/script>\r
\`\`\`\r
\r
### Deno\r
\r
\`\`\`\r
deno add jsr:@web-components/mirror-element\r
\`\`\`\r
\r
### NPM\r
\r
-   JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:\r
\r
\`\`\`\r
npx jsr add @web-components/mirror-element\r
\`\`\`\r
\r
## Documentation\r
\r
-   **Open examples for [mirror-element on Storybook](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-mirror-element)**.\r
\r
Copy the \`innerHTML\` of an element from somewhere else on the DOM.

**Attributes**

-   \`selector\`: The CSS selector of the element you want to copy.
-   \`strip-ids\`: If a \`mirror-element\` instance has this attribute it will remove all IDs from child elements.
-   \`disabled\`: Prevents automatic updates. Controlled updates can be done by calling \`render()\` on each element instance.

**Styling**

You might want to use [\`display:contents\`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents) in your CSS so that \`mirror-element\` instances don't produce a specific box in the DOM.
\r
\r
---\r
\r
Made by [jackcarey](https://jackcarey.co.uk).\r
`;export{e as D};
//# sourceMappingURL=README-CqogieIZ.js.map
