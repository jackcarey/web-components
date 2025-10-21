Instantiates reveal.js in a component so you can set up the light DOM children as slides. This component is packaged with reveal.js and it's [built-in plugins](https://revealjs.com/plugins/#built-in-plugins). This component is unofficial and unaffiliated with the [reveal.js](https://revealjs.com/) library.

## Attributes

Component attributes are the same as the [config options](https://revealjs.com/config/), except for the cases in 'Properties' below. No conversion from kebab-case or others is done, use the keys as they are written.

## Properties

-   `plugins`: An array of [plugin](https://revealjs.com/plugins/) objects. By default this component enables Highlight, Markdown, and Notes plugins.
-   `theme`: optional, one of the [built-in theme](https://revealjs.com/themes/) names to load from [esm.sh](https://esm.sh). Note, this will affect all presentations on a page. To change this behaviour, apply scoped styles with your own theme or [custom properties](https://revealjs.com/themes/#custom-properties).
-   `appearance`: Load the Appearance plugin from [`martinomagnifico/reveal.js-appearance`](https://github.com/martinomagnifico/reveal.js-appearance).
