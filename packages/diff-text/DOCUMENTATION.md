`diff-text` uses [jsdiff](https://www.npmjs.com/package/diff) to render the difference between words (with or without spaces), characters, lines, sentences, CSS, JSON, or arrays.

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
    - `refresh()` - Reload the component manually, useful if using remote content without `refetch`.
