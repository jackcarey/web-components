# autoloader

[![autoloader utility on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/utilities-autoloader) [![autoloader version on JSR](https://jsr.io/badges/@web-components/autoloader)](https://jsr.io/@web-components/autoloader/versions) [![JSR score](https://jsr.io/badges/@web-components/autoloader/score)](https://jsr.io/@web-components/autoloader/score)

> Automatically load components from jackcarey/web-components using esm.sh.

-   **Version:** 1.1.47
-   **License:** [LGPL-3](./LICENSE.md)

## Using this package

### Browser

-   via the ESM CDN: [https://esm.sh/jsr/@web-components/autoloader](https://esm.sh/jsr/@web-components/autoloader)

```html
<script src="https://esm.sh/jsr/@web-components/autoloader" type="module"></script>
```

### Deno

```
deno add jsr:@web-components/autoloader
```

### NPM

-   JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:

```
npx jsr add @web-components/autoloader
```

## Documentation

-   **Open examples for [autoloader on Storybook](https://jackcarey.co.uk/web-components/storybook-static/?path=/docs/utilities-autoloader)**.

The 'autoloader' has no options.
Component script tags are added to the head of the document using the [esm.sh CDN](https://esm.sh/). 
This is done when the components are first seen in the DOM and when the DOM is updated.
Utilities are not loaded with the autoloader, only DOM components.
DOM components are are versioned to match each autoloader release.
This version includes the following components:

- `can-i-use`: v1.0.8
- `diff-text`: v1.0.27
- `dynamic-template`: v1.0.0
- `i-cal`: v1.1.8
- `kbd-click`: v1.0.0
- `middle-truncate`: v0.1.1
- `rss-feed`: v0.0.0
- `search-dom`: v0.0.1



---

Made by [jackcarey](https://jackcarey.co.uk).
