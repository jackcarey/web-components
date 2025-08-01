# diff-text

[![diff-text component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-diff-text) [![diff-text version on JSR](https://jsr.io/badges/@web-components/diff-text)](https://jsr.io/@web-components/diff-text/versions) [![JSR score](https://jsr.io/badges/@web-components/diff-text/score)](https://jsr.io/@web-components/diff-text/score)

> Use diff-text to compare two texts/objects and render the differences.

-   **Version:** 1.0.7
-   **License:** [BSD-3-Clause](./LICENSE.md)

## Using this package

### Browser

-   via the ESM CDN: [https://esm.sh/jsr/@web-components/diff-text](https://esm.sh/jsr/@web-components/diff-text)

```html
<script src="https://esm.sh/jsr/@web-components/diff-text" type="module"></script>
```

### Deno

```
deno add jsr:@web-components/diff-text
```

### NPM

-   JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:

```
npx jsr add @web-components/diff-text
```

## Documentation

-   **Open examples for [diff-text on Storybook](https://jackcarey.co.uk/web-components/storybook-static/?path=/docs/components-diff-text)**.

`diff-text` uses [kpdecker/jsdiff](https://www.npmjs.com/package/diff) to render the difference between words (with or without spaces), characters, lines, sentences, CSS, JSON, or arrays.

There is no default styling. Removed text is given the class `diff-text-removed` and added text is given the class `diff-text-added`.

**Attributes**

-   `mode`: one of `words`, `wordsWithSpaces`, `chars` (characters), `lines`, `sentences`, `css`, `json`, `arrays`.
-   `original`: A [CSS selector](https://developer.mozilla.org/en-US/docs/Glossary/CSS_Selector) for the original text/object. The `innerText` is used by default.
-   `changed`: A [CSS selector](https://developer.mozilla.org/en-US/docs/Glossary/CSS_Selector) for the changed text/object. The `innerText` is used by default.
-   `compare`: A property or attribute name to use instead of the `innerText` when using `original` or `changed` selectors, such as `title` or `value`.
-   `ignore-case`: If set to `true` the case of text is ignored when producing the difference.
-   `original-src`: A URL to fetch the original text/object from. This takes precedence over `original`.
-   `changed-src`: A URL to fetch the original text/object from. This takes precedence over `changed`.
-   `refetch`: The interval, in seconds, to automatically refetch data from `original-src` and `changed-src`. If omitted the data is only refetched when the component is connected to the DOM.

**Properties**

    - `options`: The [jsdiff](https://www.npmjs.com/package/diff) options to be used when comparing 2 strings/objects.
    - `refresh()`: Reload the component manually, useful if using remote content without `refetch`.

**Events**

-   `diff-text`: Emitted when the text diff is calculated, this event contains `detail` for the attributes, original value, changed value, and list of changes.

## Example

This snippet:

```html
<span id="original">The quick brown fox jumps over the lazy dog.</span>
<span id="changed">The slow blue rabbit jumps over the lazy cat.</span>
<diff-text></diff-text>
```

becomes:

```html
<span id="original">The quick brown fox jumps over the lazy dog.</span>
<span id="changed">The slow blue fox jumps over the lazy dog.</span>
<diff-text>
    <span>The</span>
    <span class="diff-text-removed">quick brown</span>
    <span class="diff-text-added">slow blue</span>
    <span>jumps over the lazy dog.</span>
</diff-text>
```


---

Made by [jackcarey](https://jackcarey.co.uk).
