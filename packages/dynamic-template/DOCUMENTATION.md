WIP: Use the closest `data-dynamic-template` attribute to find a template element to use for the shadow DOM based on that and the the tag name.

The `DynamicTemplate` can be registered multiple times with different names. The template will be taken from the element with the format `[data-dynamic-template]-[tagName]`. If no template is found then the light DOM content is used as-is. `exportparts` are copied from the template.

The dataset attribute can be changed as it is a static value on `DynamicTemplate`. It's default value is `dynamic-template` but, for example, you may wish to change it with `DynamicTemplate.datasetAttribute = 'dt';` so that the selector for finding a template name is `data-dt`.

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
