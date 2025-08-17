import{j as e}from"./index-Dlwx_-PB.js";import{useMDXComponents as s}from"./index-BM3H6bQe.js";import{M as r,a}from"./blocks-DDrvoJte.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-Dp1pzeXC.js";import"./iframe-qlbfcv1L.js";const i=`# reveal-presentation\r
\r
[![reveal-presentation component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-reveal-presentation) [![reveal-presentation version on JSR](https://jsr.io/badges/@web-components/reveal-presentation)](https://jsr.io/@web-components/reveal-presentation/versions) [![JSR score](https://jsr.io/badges/@web-components/reveal-presentation/score)](https://jsr.io/@web-components/reveal-presentation/score)\r
\r
> Instantiate a reveal.js presentation using attributes for configuration\r
\r
-   **Version:** 0.0.22\r
-   **License:** [MIT](./LICENSE.md)\r
\r
## Using this package\r
\r
### Browser\r
\r
-   via the ESM CDN: [https://esm.sh/jsr/@web-components/reveal-presentation](https://esm.sh/jsr/@web-components/reveal-presentation)\r
\r
\`\`\`html\r
<script src="https://esm.sh/jsr/@web-components/reveal-presentation" type="module"><\/script>\r
\`\`\`\r
\r
### Deno\r
\r
\`\`\`\r
deno add jsr:@web-components/reveal-presentation\r
\`\`\`\r
\r
### NPM\r
\r
-   JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:\r
\r
\`\`\`\r
npx jsr add @web-components/reveal-presentation\r
\`\`\`\r
\r
## Documentation\r
\r
-   **Open examples for [reveal-presentation on Storybook](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-reveal-presentation)**.\r
\r
Instantiates reveal.js in a component so you can set up the light DOM children as slides. This component is packaged with reveal.js and it's [built-in plugins](https://revealjs.com/plugins/#built-in-plugins). This component is unofficial and unaffiliated with the [reveal.js](https://revealjs.com/) library.

## Attributes

Component attributes are the same as the [config options](https://revealjs.com/config/), except for the cases in 'Properties' below. No conversion from kebab-case or others is done, use the keys as they are written.

## Properties

-   \`plugins\`: An array of [plugin](https://revealjs.com/plugins/) objects. By default this component enables Highlight, Markdown, and Notes plugins.
-   \`theme\`: optional, one of the [built-in theme](https://revealjs.com/themes/) names to load from [esm.sh](https://esm.sh). Note, this will affect all presentations on a page. To change this behaviour, apply scoped styles with your own theme or [custom properties](https://revealjs.com/themes/#custom-properties).
-   \`appearance\`: Load the Appearance plugin from [\`martinomagnifico/reveal.js-appearance\`](https://github.com/martinomagnifico/reveal.js-appearance).
\r
\r
---\r
\r
Made by [jackcarey](https://jackcarey.co.uk).\r
`;function o(n){return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"components/reveal-presentation/Documentation"}),`
`,e.jsx(a,{children:i})]})}function d(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o()}export{d as default};
//# sourceMappingURL=reveal-presentation-6DRkP7uo.js.map
