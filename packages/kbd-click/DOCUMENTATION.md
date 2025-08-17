The `kbd-click` component listens on the `document` for key presses then fires clicks on any visible inner element that has a matching `accesskey` attribute or `kbd` where the `innerText` matches. This is useful for implementing keyboard shortcuts.

**Attributes**

<!-- 'allow-repeat', 'filter', 'capture', 'passive', 'ignore-visibility', 'disabled' -->

-   `allow-repeat` - Whether or not repeat key presses should continue to trigger clicks. Default: `false`.
-   `filter` - A comma-separated list of keys that will be listened for. Other key presses will be ignored. Default: no filter.
-   `capture` - A boolean value indicating that key press events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. If not specified, defaults to `false`.
-   `passive` - `A boolean value that, if `true`, indicates that the function triggered by inner `kbd` clicks will never call`preventDefault()`. Defaults to `false`.
