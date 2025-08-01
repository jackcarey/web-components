import{j as e}from"./index-BFfWjCa1.js";import{useMDXComponents as o}from"./index-Bx0zT03Q.js";import{M as s,c as m}from"./blocks-DyTNyriz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CsV8dSpw.js";const i=`# dynamic-template\r
\r
[![dynamic-template component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-dynamic-template) [![dynamic-template version on JSR](https://jsr.io/badges/@web-components/dynamic-template)](https://jsr.io/@web-components/dynamic-template/versions) [![JSR score](https://jsr.io/badges/@web-components/dynamic-template/score)](https://jsr.io/@web-components/dynamic-template/score)\r
\r
> Dynamically render a component using corresponding templates\r
\r
-   **Version:** 1.0.0\r
-   **License:** [](./LICENSE.md)\r
\r
## Using this package\r
\r
### Browser\r
\r
-   via the ESM CDN: [https://esm.sh/jsr/@web-components/dynamic-template](https://esm.sh/jsr/@web-components/dynamic-template)\r
\r
\`\`\`html\r
<script src="https://esm.sh/jsr/@web-components/dynamic-template" type="module"><\/script>\r
\`\`\`\r
\r
### Deno\r
\r
\`\`\`\r
deno add jsr:@web-components/dynamic-template\r
\`\`\`\r
\r
### NPM\r
\r
-   JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:\r
\r
\`\`\`\r
npx jsr add @web-components/dynamic-template\r
\`\`\`\r
\r
## Documentation\r
\r
-   **Open examples for [dynamic-template on Storybook](https://jackcarey.co.uk/web-components/storybook-static/?path=/docs/components-dynamic-template)**.\r
\r
Use the closest \`data-dynamic-template\` attribute to find a template element to use for the shadow DOM based on that and the the tag name.

The \`DynamicTemplate\` can be registered multiple times with different names. The template will be taken from the element with the format \`[data-dynamic-template]-[tagName]\`. If no template is found then the light DOM is rendered as-is.

**Example**

1. Register the component: \`customElements.define('blog-post', DynamicTemplate')\`
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

Since the \`DynamicTemplate\` element is registered with the name \`blog-post\` and the template name (\`compact\`) is in the closest ancestor (\`main\`), the \`blog-post\`components take its inner content from the\`template\`element with ID \`compact-blog-post\`, apart from the last one which uses the \`simple\` template.

**Styling components**

The \`DynamicTemplate\` assumes nothing about styles. You can use a \`style\` tag within a template or, if the \`exportparts\` attribute is present, it will be copied from templates to each consumer to enable global styling.

**Using a different dataset attribute**

The dataset attribute can be changed as it is a static value on \`DynamicTemplate\`. It's default value is \`dynamic-template\` but, for example, you may wish to change it with \`DynamicTemplate.datasetAttribute = 'dt';\` so that the selector for finding a template name is \`data-dt\`. This should be changed either before elements are registered or before they are connected to the DOM.

**Using a default theme**

Set \`DynamicTemplate.defaultTemplate\` to define the name of the default template that should be used for components. If none is set, all light DOM elements will be rendered in the shadow DOM. This should be changed either before elements are registered or before they are connected to the DOM.

**Inheriting the component**

You can inherit the properties and methods of \`DynamicTemplate\` like any other class:

\`\`\`
class YourComponent extends DynamicTemplate {...}\`
\`\`\`

The following are exposed to subclasses:

-   \`templateName\` - The string returned from \`data-dynamic-template\` in the closest ancestor element.
-   \`templateId\` - The ID of the \`template\` this element will look for.
-   \`render(templateId?: string)\` - The render function that finds and consumes templates. Subclasses can optionally change the \`templateId\` by passing it as the only argument.
\r
\r
---\r
\r
Made by [jackcarey](https://jackcarey.co.uk).\r
`;function a(t){return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"components/dynamic-template/Documentation"}),`
`,e.jsx(m,{children:i})]})}function d(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a()}export{d as default};
//# sourceMappingURL=dynamic-template-B4eXx6bV.js.map
