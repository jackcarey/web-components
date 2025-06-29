import{j as t}from"./index-9HsilqVn.js";import{useMDXComponents as o}from"./index-BBwTxGhi.js";import{M as s,e as m}from"./index-Dnj-d-hf.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CfohMh3S.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";const p=`# dynamic-template\r
\r
[![dynamic-template component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/storybook-static/?path=/docs/components-dynamic-template) [![dynamic-template version on JSR](https://jsr.io/badges/@web-components/dynamic-template)](https://jsr.io/@web-components/dynamic-template/versions) [![JSR score](https://jsr.io/badges/@web-components/dynamic-template/score)](https://jsr.io/@web-components/dynamic-template/score)\r
\r
> Dynamically render a component using corresponding templates\r
\r
- **Version:** 0.0.1\r
- **License:** [](./LICENSE.md)\r
\r
## Using this package\r
\r
**Browser:** via the ESM CDN: [https://esm.sh/jsr/@web-components/dynamic-template](https://esm.sh/jsr/@web-components/dynamic-template) \r
\r
\`\`\`html\r
<script src="https://esm.sh/jsr/@web-components/dynamic-template" type="module"><\/script>\r
\`\`\`\r
\r
#### Deno\r
\r
\`\`\`\r
deno add jsr:@web-components/dynamic-template\r
\`\`\`\r
\r
**NPM:** JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:\r
\r
\`\`\`\r
npx jsr add @web-components/dynamic-template\r
\`\`\`\r
\r
# Documentation\r
\r
- **Open examples for [dynamic-template on Storybook](https://jackcarey.co.uk/web-components/storybook-static/?path=/docs/components-dynamic-template)**.\r
\r
WIP: Use the closest \`data-dynamic-template\` attribute to find a template element to use for the shadow DOM based on that and the the tag name.

The \`DynamicTemplate\` can be registered multiple times with different names. The template will be taken from the element with the format \`[data-dynamic-template]-[tagName]\`. If no template is found then the light DOM content is used as-is. \`exportparts\` are copied from the template.

The dataset attribute can be changed as it is a static value on \`DynamicTemplate\`. It's default value is \`dynamic-template\` but, for example, you may wish to change it with \`DynamicTemplate.datasetAttribute = 'dt';\` so that the selector for finding a template name is \`data-dt\`.

**Example**

1. Register the component: \`customElementsRegistry.define('blog-post', DynamicTemplate);\`
2. Set up your DOM:

\`\`\`
<template id="simple-blog-post">
    <slot></slot>
</template>

<template id="compact-blog-post" exportparts="heading">
    <heading part="heading">
        <slot name="heading"></slot>
    </heading>
</template>

<main data-dynamic-template="compact">
    <blog-post>
        <h1>Some title</h1>
        <img src="https://example.com/image.png"
    </blog-post>
    <blog-post>
        <h1>Some title 2</h1>
        <img src="https://example.com/image2.png"
    </blog-post>
    <blog-post data-dynamic-template="simple">
        <h1>Some titl3</h1>
        <img src="https://example.com/image3.png"
    </blog-post>
</main>
\`\`\`

Since the \`DynamicTemplate class is registered with name \`blog-post\` and the template name (\`compact\`) in the closest ancestor (\`main\`), the \`blog-post\`components take their inner content from the\`template\`element with ID \`compact-blog-post\`, apart from the last one which uses the \`simple\` template.
\r
\r
---\r
\r
Made by [jackcarey](https://jackcarey.co.uk).\r
`;function a(e){return t.jsxs(t.Fragment,{children:[t.jsx(s,{title:"components/dynamic-template/Documentation"}),`
`,t.jsx(m,{children:p})]})}function y(e={}){const{wrapper:n}={...o(),...e.components};return n?t.jsx(n,{...e,children:t.jsx(a,{...e})}):a()}export{y as default};
//# sourceMappingURL=dynamic-template-D6O2jDIk.js.map
