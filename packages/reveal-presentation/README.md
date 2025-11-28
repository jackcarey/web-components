# reveal-presentation

[![reveal-presentation component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-reveal-presentation) [![reveal-presentation version on JSR](https://jsr.io/badges/@web-components/reveal-presentation)](https://jsr.io/@web-components/reveal-presentation/versions) [![JSR score](https://jsr.io/badges/@web-components/reveal-presentation/score)](https://jsr.io/@web-components/reveal-presentation/score)

> Instantiate a reveal.js presentation using attributes for configuration

-   **Version:** 0.0.41
-   **License:** [MIT](./LICENSE.md)

## Using this package

### Browser

-   via the ESM CDN: [https://esm.sh/jsr/@web-components/reveal-presentation](https://esm.sh/jsr/@web-components/reveal-presentation)

```html
<script src="https://esm.sh/jsr/@web-components/reveal-presentation" type="module"></script>
```

### Deno

```
deno add jsr:@web-components/reveal-presentation
```

### NPM

-   JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:

```
npx jsr add @web-components/reveal-presentation
```

## Documentation

-   **Open examples for [reveal-presentation on Storybook](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-reveal-presentation)**.

Instantiates reveal.js in a component so you can set up the light DOM children as slides. This component is packaged with reveal.js and it's [built-in plugins](https://revealjs.com/plugins/#built-in-plugins). This component is unofficial and unaffiliated with the [reveal.js](https://revealjs.com/) library.

## Attributes

Component attributes are the same as the [config options](https://revealjs.com/config/), except for the cases in 'Properties' below. No conversion from kebab-case or others is done, use the keys as they are written.

## Properties

-   `plugins`: An array of [plugin](https://revealjs.com/plugins/) objects. By default this component enables Highlight, Markdown, and Notes plugins.
-   `theme`: optional, one of the [built-in theme](https://revealjs.com/themes/) names to load from [esm.sh](https://esm.sh). Note, this will affect all presentations on a page. To change this behaviour, apply scoped styles with your own theme or [custom properties](https://revealjs.com/themes/#custom-properties).
-   `appearance`: Load the Appearance plugin from [`martinomagnifico/reveal.js-appearance`](https://github.com/martinomagnifico/reveal.js-appearance).


---

Made by [jackcarey](https://jackcarey.co.uk).
