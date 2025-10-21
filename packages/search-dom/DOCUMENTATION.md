A component that filters the DOM when an inner search input changes.

**Attributes:**

-   `target` - A CSS selector for the parent element containing items.
-   `items` - A CSS selector for items within the parent. Items that have `textContent` that includes the value of the inner `input` element will remain visible. Other items will be hidden.
-   `mode` - `normal`/omitted or `matchCase`.
