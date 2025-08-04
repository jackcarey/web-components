Copy the `innerHTML` of an element from somewhere else on the DOM.

**Attributes**

-   `selector`: The CSS selector of the element you want to copy. If multiple elements are found, the first non-empty element will be used.
-   `strip-ids`: If a `mirror-element` instance has this attribute it will remove all IDs from child elements.

**Styling**

You might want to use [`display:contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents) in your CSS so that `mirror-element` instances don't produce a specific box in the DOM.
