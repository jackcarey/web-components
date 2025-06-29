# dynamic-template

[![dynamic-template component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/storybook-static/?path=/docs/components-dynamic-template) [![dynamic-template version on JSR](https://jsr.io/badges/@web-components/dynamic-template)](https://jsr.io/@web-components/dynamic-template/versions) [![JSR score](https://jsr.io/badges/@web-components/dynamic-template/score)](https://jsr.io/@web-components/dynamic-template/score)

> Dynamically render a component using corresponding templates

- **Version:** 0.0.1
- **License:** [](./LICENSE.md)

## Using this package

**Browser:** via the ESM CDN: [https://esm.sh/jsr/@web-components/dynamic-template](https://esm.sh/jsr/@web-components/dynamic-template) 

```html
<script src="https://esm.sh/jsr/@web-components/dynamic-template" type="module"></script>
```

#### Deno

```
deno add jsr:@web-components/dynamic-template
```

**NPM:** JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:

```
npx jsr add @web-components/dynamic-template
```

# Documentation

- **Open examples for [dynamic-template on Storybook](https://jackcarey.co.uk/web-components/storybook-static/?path=/docs/components-dynamic-template)**.

WIP: Use the closest `data-dynamic-template` attribute to find a template element to use for the shadow DOM based on that and the the tag name.

The `DynamicTemplate` can be registered multiple times with different names. The template will be taken from the element with the format `[data-dynamic-template]-[tagName]`. If no template is found then the light DOM is rendered as-is.

**Example**

1. Register the component: `customElementsRegistry.define('blog-post', DynamicTemplate);`
2. Set up your DOM:

```
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
```

Since the `DynamicTemplate class is registered with name `blog-post` and the template name (`compact`) in the closest ancestor (`main`), the `blog-post`components take their inner content from the`template`element with ID `compact-blog-post`, apart from the last one which uses the `simple` template.

**Styling components**

The `DynamicTemplate` assumes nothing about styles by default. You can use a `style` tag within a template or, if the `exportparts` attribute is present, it will be copied from templates to each consumer to enable global styling.

**Using a different dataset attribute**

The dataset attribute can be changed as it is a static value on `DynamicTemplate`. It's default value is `dynamic-template` but, for example, you may wish to change it with `DynamicTemplate.datasetAttribute = 'dt';` so that the selector for finding a template name is `data-dt`. This should be changed either before elements are registered or before they are connected to the DOM.

**Using a default theme**

Set `DynamicTemplate.defaultTemplate` to define the name of the default template that should be used for components. If none is set, all light DOM elements will be rendered in the shadow DOM. This should be changed either before elements are registered or before they are connected to the DOM.


---

Made by [jackcarey](https://jackcarey.co.uk).
