# svg-map

[![svg-map component on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-svg-map) [![svg-map version on JSR](https://jsr.io/badges/@web-components/svg-map)](https://jsr.io/@web-components/svg-map/versions) [![JSR score](https://jsr.io/badges/@web-components/svg-map/score)](https://jsr.io/@web-components/svg-map/score)

> Plot anchor tags onto SVG images with zoom-based switching, like an interactive navigational map.

-   **Version:** 0.0.1
-   **License:** [LGPL-3.0](./LICENSE.md)

## Using this package

### Browser

-   via the ESM CDN: [https://esm.sh/jsr/@web-components/svg-map](https://esm.sh/jsr/@web-components/svg-map)

```html
<script src="https://esm.sh/jsr/@web-components/svg-map" type="module"></script>
```

### Deno

```
deno add jsr:@web-components/svg-map
```

### NPM

-   JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:

```
npx jsr add @web-components/svg-map
```

## Documentation

-   **Open examples for [svg-map on Storybook](https://jackcarey.co.uk/web-components/docs/?path=/docs/components-svg-map)**.

# svg-map

A web component that plots anchor tags onto SVG images with zoom-based switching. Works like a cross between an image map and a navigational map.

## Features

- Maps anchor links to named SVG areas (paths, shapes, etc.)
- Distributes links evenly within enclosed areas or along path edges
- Zoom-level based link visibility control
- Zoom-level based SVG image switching
- Declarative HTML-based configuration

## Usage

```html
<svg-map zoom="1">
  <!-- SVG for zoom level 1 -->
  <svg data-zoom="1" slot="svg">
    <rect id="area1" x="10" y="10" width="100" height="100" fill="lightblue"/>
    <path id="path1" d="M 150 50 L 250 50 L 200 150 Z" fill="lightgreen"/>
  </svg>
  
  <!-- SVG for zoom level 2 (more detailed) -->
  <svg data-zoom="2" slot="svg">
    <rect id="area1" x="10" y="10" width="200" height="200" fill="lightblue"/>
    <circle id="circle1" cx="300" cy="100" r="50" fill="yellow"/>
  </svg>
  
  <!-- Links for area1, visible at zoom level 1 -->
  <a href="/link1" data-area="area1" data-zoom="1">Link 1</a>
  <a href="/link2" data-area="area1" data-zoom="1">Link 2</a>
  
  <!-- Links for area1, visible at zoom level 2 -->
  <a href="/detail1" data-area="area1" data-zoom="2">Detail 1</a>
  <a href="/detail2" data-area="area1" data-zoom="2">Detail 2</a>
  
  <!-- Links along path1 -->
  <a href="/path-link" data-area="path1" data-zoom="1">Path Link</a>
</svg-map>
```

## Attributes

- `zoom` - Current zoom level (number, default: 1)

## Child Element Attributes

### SVG Elements (with `slot="svg"`)
- `data-zoom` - Zoom level at which this SVG is displayed

### Anchor Elements
- `data-area` - ID of the SVG area/element to map to
- `data-zoom` - Zoom level(s) at which this link is visible (comma-separated for multiple levels)

## How It Works

1. The component reads all SVG elements with `slot="svg"` and switches between them based on zoom level
2. Anchor tags with `data-area` attributes are positioned within or along their corresponding SVG elements
3. For enclosed shapes (rect, circle, polygon with closed paths), links are distributed evenly inside
4. For open paths or lines, links are distributed along the path
5. Only links matching the current zoom level are visible


---

Made by [jackcarey](https://jackcarey.co.uk).
