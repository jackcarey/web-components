# search-dom

> A component that filters the DOM when an inner search input changes.

[![search-dom](https://jsr.io/badges/@web-components/search-dom)](https://jsr.io/@web-components/search-dom) [![score](https://jsr.io/badges/@web-components/search-dom/score)](https://jsr.io/@web-components/search-dom/score)

**version:** 0.0.1

**license:** [](./LICENSE.md)

## Using this package

**Browser:** via the ESM CDN: [https://esm.sh/jsr/@web-components/search-dom](https://esm.sh/jsr/@web-components/search-dom) 

```html
<script src="https://esm.sh/jsr/@web-components/search-dom" type="module"></script>
```

#### Deno

```
deno add jsr:@web-components/search-dom
```

**NPM:** JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:

```
npx jsr add @web-components/search-dom
```

## Documentation

- **Open [search-dom on Storybook](https://jackcarey.co.uk/web-components/storybook-static/?path=/docs/components-search-dom)**.

A component that filters the DOM when an inner search input changes.

**Attributes:**

-   `target` - A CSS selector for the parent element containing items.
-   `items` - A CSS selector for items within the parent. Items that have `textContent` that includes the value of the inner `input` element will remain visible. Other items will be hidden.
-   `mode` - `normal`/omitted or `matchCase`.


---

Made by [jackcarey](https://jackcarey.co.uk).
