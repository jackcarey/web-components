# mutative

[![mutative utility on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/utilities-mutative) [![mutative version on JSR](https://jsr.io/badges/@web-components/mutative)](https://jsr.io/@web-components/mutative/versions) [![JSR score](https://jsr.io/badges/@web-components/mutative/score)](https://jsr.io/@web-components/mutative/score)

> Persistent DOM mutation observations based on CSS query selectors

-   **Version:** 1.0.8
-   **License:** [LGPL-3](./LICENSE.md)

## Using this package

### Browser

-   via the ESM CDN: [https://esm.sh/jsr/@web-components/mutative](https://esm.sh/jsr/@web-components/mutative)

```html
<script src="https://esm.sh/jsr/@web-components/mutative" type="module"></script>
```

### Deno

```
deno add jsr:@web-components/mutative
```

### NPM

-   JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:

```
npx jsr add @web-components/mutative
```

## Documentation

-   **Open examples for [mutative on Storybook](https://jackcarey.co.uk/web-components/docs/?path=/docs/utilities-mutative)**.

Persistent DOM mutation observations based on CSS query [selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors). It's essentially a wrapper for a global [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) that filters records to specific callbacks. The API is _similar_ to MutationObserver, but not the same.

The advantage is that observers can be set up independently/ahead of matching DOM elements, which is useful when working with SPAs or other reactive content.

```javascript
// pass a single selector and callback
Mutative.observe("p", (record) => console.log(record));

//pass multiple selectors with the same callback
Mutative.observe(["p", ".text", "*[data-text]"], (record) => console.log("text mutated", record));

//pass multiple selectors at once with different callbacks
Mutative.observe({
    "*[data-text]": (rec) => console.log(rec),
    p: (rec) => alert("paragraph edited"),
    output: (rec) => console.log("calculation updated", rec),
});

//Remove observations for the 'p' selector only
Mutative.disconnect("p");

// Pause all observations
Mutative.disconnect();

//Resume existing observations
Mutative.observe();
```

### observe()

The parameters are different from the MutationObserver implementation. Instead of a `target` and `options` there is `selectors` and `callback`.

-   `selectors` - Several types are allowed:
    -   `null` - If no arguments are passed, observation of existing selectors will resume.
    -   `string` - a single CSS query selector.
    -   `string[]` - multiple CSS query selectors that use the same `callback`.
    -   `object` - CSS query selectors strings as keys, callbacks as values.
-   `callback` - Only required when `selectors` is a string or array of strings. A function that accepts a MutationRecord as it's only parameter.

### disconnect()

Mutations that have been detected but not yet reported to observers are _not_ discarded. Observer callbacks are triggered before disconnection. This method will either pause or remove observations and callbacks.

-   **When called with no arguments:** acts the same as [disconnect()](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/disconnect), ignoring **all** _future_ mutations. Note: this does not clear the internal selector list, so calling `observe()` again will continue with existing selectors.
-   **When passed with an argument:** The arguments follow the same formats as `observe()`'s `selectors` parameter. Only observers with the passed selectors are removed. If no selectors remain, observation is paused (as if no arguments were passed).

### takeRecords()

Takes all records from the Mutative object, use carefully. See: [takeRecords()](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/takeRecords).

## How it works

A single MutationObserver is created on the document `body` with the first call of `mutative.observe()`. MutationRecords are only passed to callbacks that have a matching selector for at least one of `target`, `addedNodes`, or `removedNodes`.


---

Made by [jackcarey](https://jackcarey.co.uk).
