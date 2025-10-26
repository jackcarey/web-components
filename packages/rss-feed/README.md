# rss-feed

[![rss-feed component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-rss-feed) [![rss-feed version on JSR](https://jsr.io/badges/@web-components/rss-feed)](https://jsr.io/@web-components/rss-feed/versions) [![JSR score](https://jsr.io/badges/@web-components/rss-feed/score)](https://jsr.io/@web-components/rss-feed/score)

> Render RSS feeds in the DOM

-   **Version:** 0.0.24
-   **License:** [LGPL-3](./LICENSE.md)

## Using this package

### Browser

-   via the ESM CDN: [https://esm.sh/jsr/@web-components/rss-feed](https://esm.sh/jsr/@web-components/rss-feed)

```html
<script src="https://esm.sh/jsr/@web-components/rss-feed" type="module"></script>
```

### Deno

```
deno add jsr:@web-components/rss-feed
```

### NPM

-   JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:

```
npx jsr add @web-components/rss-feed
```

## Documentation

-   **Open examples for [rss-feed on Storybook](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-rss-feed)**.

Fetch and render RSS feeds using inner `template` and `source` elements.

## Attributes

-   `disabled` - Prevents the component from fetching any new data.
-   `ttl` - The TTL to use for all feeds in seconds.
-   `proxy` - Prepended to feed URLs to work around CORS restrictions, if needed.
-   `loading` - Not provided or `lazy`, ensures data is only loaded when the component is visible.
-   `sort-by` - The item attribute to sort by. Default: `pubDate`. RSS specification values are: 'pubDate', 'title', 'link', 'guid', 'creator', 'summary', 'content', 'isoDate', 'categories', 'contentSnippet', 'enclosure'. However, some feeds include custom properties that can still be used.
-   `sort-order` - `asc` (default) or `desc`.
-   `link` - An optional anchor [`target`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target). When present, each item is wrapped in an anchor link.
-   `element` - A custom element name to render items with (eg. `your-rss-item`). Properties and attributes are set from the `sort-by` allowed values. For more more information on the item structure, look at [rss-parser](https://www.npmjs.com/package/rss-parser).

## Examples

### Basic

Render each feed item using just their titles.

```
<rss-feed>
    <template>
      <h2><slot name="title"></slot></h2>
    </template>
    <source src="http://example.com/rss/feed">
</rss-feed>
```

### Multiple feeds

Render multiple sources.

```
<rss-feed>
    <template>
      <h2><slot name="title"></slot></h2>
    </template>
    <source src="http://example.com/rss/feed1">
    <source src="http://example.com/rss/feed2">
    <source src="http://some-feed-website.com/rss/feed2">
    <source src="http://news.example.com/rss/global">
</rss-feed>
```

### Lazy loading

Only fetch the feed data when the component is in view.

```
<rss-feed loading="lazy">
    <template>
      <h2><slot name="title"></slot></h2>
    </template>
    <source src="http://example.com/rss/feed">
</rss-feed>
```

### Sorted

Sort by author in descending order.

```
<rss-feed sort-by="author" sort-order="desc">
    <template>
      <h2><slot name="title"></slot></h2>
      <h3><slot name="author"></slot></h3>
      <p><slot name="content"></slot></p>
    </template>
    <source src="http://example.com/rss/feed">
</rss-feed>
```

### Custom element

Render items using a custom element.

```
<script src="/path/to/your-rss-element.js"></script>
<rss-feed element="your-rss-item">
    <source src="http://example.com/rss/feed">
</rss-feed>
```

## As list

Style the component with display [contents](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents) to make transparent to other elements.

```
<style>
   rss-feed{
     display:contents;
   }
</style>
<ol>
<rss-feed>
   <template>
      <li><slot name="title"></slot></li>
   </template>
   <source src="http://example.com/rss/feed">
</rss-feed>
</ol>

```

## Dependencies

This element uses [rss-parser](https://www.npmjs.com/package/rss-parser) to extract RSS information.

## Future work

_Could include..._

-   OPML support


---

Made by [jackcarey](https://jackcarey.co.uk).
