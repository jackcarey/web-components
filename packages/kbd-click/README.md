# kbd-click

[![kbd-click component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-kbd-click) [![kbd-click version on JSR](https://jsr.io/badges/@web-components/kbd-click)](https://jsr.io/@web-components/kbd-click/versions) [![JSR score](https://jsr.io/badges/@web-components/kbd-click/score)](https://jsr.io/@web-components/kbd-click/score)

> Trigger click events on child kbd elements

-   **Version:** 1.0.24
-   **License:** [LGPL-3.0-or-later](./LICENSE.md)

## Using this package

### Browser

-   via the ESM CDN: [https://esm.sh/jsr/@web-components/kbd-click](https://esm.sh/jsr/@web-components/kbd-click)

```html
<script src="https://esm.sh/jsr/@web-components/kbd-click" type="module"></script>
```

### Deno

```
deno add jsr:@web-components/kbd-click
```

### NPM

-   JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:

```
npx jsr add @web-components/kbd-click
```

## Documentation

-   **Open examples for [kbd-click on Storybook](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-kbd-click)**.

The `kbd-click` component listens on the `document` for key presses then fires clicks on any visible inner `kbd` elements where the `data-key` or `innerText` match. This is useful for implementing keyboard shortcuts.

**Attributes**

<!-- 'allow-repeat', 'filter', 'capture', 'passive', 'ignore-visibility', 'disabled' -->

-   `allow-repeat` - Whether or not repeat key presses should continue to trigger clicks. Default: `false`.
-   `filter` - A comma-separated list of keys that will be listened for. Other key presses will be ignored. Default: no filter.
-   `capture` - A boolean value indicating that key press events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. If not specified, defaults to `false`.
-   `passive` - `A boolean value that, if `true`, indicates that the function triggered by inner `kbd`clicks will never call`preventDefault()`. Defaults to `false`.


---

Made by [jackcarey](https://jackcarey.co.uk).
