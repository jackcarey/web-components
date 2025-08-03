# reveal-presentation

[![reveal-presentation component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-reveal-presentation) [![reveal-presentation version on JSR](https://jsr.io/badges/@web-components/reveal-presentation)](https://jsr.io/@web-components/reveal-presentation/versions) [![JSR score](https://jsr.io/badges/@web-components/reveal-presentation/score)](https://jsr.io/@web-components/reveal-presentation/score)

> Instantiate a reveal.js target using attributes for configuration

-   **Version:** 0.0.2
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

-   **Open examples for [reveal-presentation on Storybook](https://jackcarey.co.uk/web-components/storybook-static/?path=/docs/components-reveal-presentation)**.

Instantiates reveal.js in a component so you can set up the light DOM children as slides. This component is packaged with reveal.js and it's default plugins. Highlight, Markdown, and Notes are enabled by default. The `embedded` flag is set to `true` by default.

All attributes except `use-preamble` are passed to the reveal.js config.

This component is unofficial and unaffiliated with the [reveal.js](https://revealjs.com/) library.


---

Made by [jackcarey](https://jackcarey.co.uk).
