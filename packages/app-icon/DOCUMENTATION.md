Enhance a `<picture>` element with additional attributes.

## Registering the element

So it can be extended, this element is not defined in the custom element registry by default. You must call:

```
import { defineElement } from "./path/to/app-icon";
defineElement();
```

## Attributes

-   `superscript`: A string displayed at the top of the icon. Typically a notification count.
    -   Exposed as a [`part`](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) so it can be styled.
-   `subscript`: A string displayed at the bottom of the icon. Typically for indicating a shortcut or sync status.
    -   Exposed as a [`part`](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) so it can be styled.
-   `for`: A CSS ID for another element on the page. Makes up part of the events fired for this component.
-   `preview`: Used with `for`, shows a preview of an element when hovered
-   `src`: Used in a fallback `img` if the light DOM for this component is empty.

## Events

-
