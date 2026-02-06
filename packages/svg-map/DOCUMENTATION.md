# svg-map

A web component that plots anchor tags onto SVG images with zoom-based switching. Works like a cross between an image map and a navigational map.

## Features

- Maps anchor links to named SVG areas (paths, shapes, etc.)
- Distributes links evenly within enclosed areas or along path edges
- Zoom-level based link visibility control (exact match or min/max ranges)
- Zoom-level based SVG image switching (exact match or min/max ranges)
- Supports inline SVG and external SVG images via `<img>` tags
- Declarative HTML-based configuration

## Usage

### Basic Example with Exact Zoom Levels

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
</svg-map>
```

### Min/Max Zoom Ranges

You can specify zoom ranges instead of exact values:

```html
<svg-map zoom="1.5">
  <!-- Overview SVG: visible from zoom 0.5 to 1.5 -->
  <svg slot="svg" data-min-zoom="0.5" data-max-zoom="1.5" width="400" height="300">
    <rect id="country" x="10" y="10" width="380" height="280" fill="lightgreen"/>
  </svg>
  
  <!-- Detail SVG: visible from zoom 1.5 to 3 -->
  <svg slot="svg" data-min-zoom="1.5" data-max-zoom="3" width="400" height="300">
    <rect id="country" x="10" y="10" width="380" height="280" fill="lightblue"/>
    <circle id="city1" cx="100" cy="100" r="40" fill="yellow"/>
    <circle id="city2" cx="300" cy="100" r="40" fill="yellow"/>
  </svg>
  
  <!-- Country link: visible at lower zoom levels -->
  <a href="/country" data-area="country" data-min-zoom="0.5" data-max-zoom="1.5">Country Info</a>
  
  <!-- City links: visible at higher zoom levels -->
  <a href="/city1" data-area="city1" data-min-zoom="1.5" data-max-zoom="3">City 1</a>
  <a href="/city2" data-area="city2" data-min-zoom="1.5" data-max-zoom="3">City 2</a>
</svg-map>
```

### External SVG Images

Use external SVG files via `<img>` tags:

```html
<svg-map zoom="1">
  <img 
    slot="svg" 
    data-zoom="1" 
    src="/path/to/map.svg"
    alt="Map"
    width="500"
    height="400"
  />
  
  <a href="/zone1" data-area="zone1" data-zoom="1">Zone 1</a>
  <a href="/zone2" data-area="zone2" data-zoom="1">Zone 2</a>
</svg-map>
```

**Note:** External SVGs use estimated bounding boxes for positioning since the SVG DOM isn't directly accessible. For precise positioning, use inline SVG.

### Many Links in One Region

The component automatically distributes multiple links in a grid pattern:

```html
<svg-map zoom="1">
  <svg slot="svg" data-zoom="1" width="600" height="500">
    <rect id="campus" x="50" y="50" width="500" height="400" fill="lightgray"/>
  </svg>
  
  <!-- 20 links will be distributed in a 5x4 grid within the campus area -->
  <a href="#building1" data-area="campus" data-zoom="1">Building 1</a>
  <a href="#building2" data-area="campus" data-zoom="1">Building 2</a>
  <!-- ... up to 20 links ... -->
</svg-map>
```

## Attributes

### Component Attributes
- `zoom` - Current zoom level (number, default: 1)
- `disabled` - Disable the component (boolean)

### SVG Element Attributes (with `slot="svg"`)
- `data-zoom` - Exact zoom level at which this SVG is displayed
- `data-min-zoom` - Minimum zoom level (inclusive) for this SVG
- `data-max-zoom` - Maximum zoom level (inclusive) for this SVG

**Note:** Use either `data-zoom` for exact matching OR `data-min-zoom`/`data-max-zoom` for range matching.

### Anchor Element Attributes
- `data-area` - ID of the SVG area/element to map to
- `data-zoom` - Exact zoom level(s) at which this link is visible (comma-separated for multiple levels)
- `data-min-zoom` - Minimum zoom level (inclusive) for this link
- `data-max-zoom` - Maximum zoom level (inclusive) for this link

**Note:** Use either `data-zoom` for exact matching OR `data-min-zoom`/`data-max-zoom` for range matching.

## How It Works

1. The component reads all SVG elements (inline or external) and switches between them based on zoom level
2. Anchor tags with `data-area` attributes are positioned within or along their corresponding SVG elements
3. For enclosed shapes (rect, circle, polygon with closed paths), links are distributed evenly inside in a grid pattern
4. For circles, links are distributed in a radial pattern
5. For open paths or lines, links are distributed along the path
6. Only SVGs and links matching the current zoom level (exact or within min/max range) are visible
