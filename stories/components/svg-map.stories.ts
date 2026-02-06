import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { CreateComponentStoryMeta } from "../utils";
import { html } from "lit";

const meta: Meta = { 
  ...CreateComponentStoryMeta("svg-map"),
  argTypes: {
    zoom: {
      control: { type: 'number', min: 0.5, max: 3, step: 0.5 },
      description: 'Current zoom level',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the component',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    zoom: 1,
  },
  render: (args) => html`
    <svg-map zoom="${args.zoom}">
      <svg slot="svg" data-zoom="1" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect id="area1" x="10" y="10" width="180" height="130" fill="lightblue" stroke="navy" stroke-width="2"/>
        <rect id="area2" x="210" y="10" width="180" height="130" fill="lightgreen" stroke="darkgreen" stroke-width="2"/>
        <circle id="area3" cx="100" cy="220" r="60" fill="lightyellow" stroke="orange" stroke-width="2"/>
        <path id="path1" d="M 210 180 L 390 180 L 300 280 Z" fill="lightcoral" stroke="darkred" stroke-width="2"/>
      </svg>
      
      <a href="#link1" data-area="area1" data-zoom="1">North Link</a>
      <a href="#link2" data-area="area1" data-zoom="1">South Link</a>
      <a href="#link3" data-area="area2" data-zoom="1">East Link</a>
      <a href="#link4" data-area="area3" data-zoom="1">Circle Link</a>
      <a href="#link5" data-area="path1" data-zoom="1">Triangle</a>
    </svg-map>
  `,
};

export const ZoomBasedSwitching: Story = {
  args: {
    zoom: 1,
  },
  render: (args) => html`
    <div>
      <p>Use the zoom control above to switch between zoom levels. Different SVGs and links appear at different zoom levels.</p>
      <svg-map zoom="${args.zoom}">
        <!-- Zoom level 1 - Overview map -->
        <svg slot="svg" data-zoom="1" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect id="region1" x="10" y="10" width="180" height="280" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
          <rect id="region2" x="210" y="10" width="180" height="280" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
          <text x="100" y="150" text-anchor="middle" font-size="20" fill="#1976d2">Region 1</text>
          <text x="300" y="150" text-anchor="middle" font-size="20" fill="#7b1fa2">Region 2</text>
        </svg>
        
        <!-- Zoom level 2 - Detailed map -->
        <svg slot="svg" data-zoom="2" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect id="region1" x="10" y="10" width="380" height="280" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
          <circle id="district1" cx="100" cy="80" r="40" fill="#bbdefb" stroke="#1976d2" stroke-width="1"/>
          <circle id="district2" cx="300" cy="80" r="40" fill="#bbdefb" stroke="#1976d2" stroke-width="1"/>
          <rect id="district3" x="80" y="160" width="80" height="60" fill="#90caf9" stroke="#1976d2" stroke-width="1"/>
          <rect id="district4" x="240" y="160" width="80" height="60" fill="#90caf9" stroke="#1976d2" stroke-width="1"/>
          <text x="200" y="270" text-anchor="middle" font-size="16" fill="#1976d2">Region 1 Details</text>
        </svg>
        
        <!-- Zoom level 1 links - overview -->
        <a href="#region1" data-area="region1" data-zoom="1">Region 1 Home</a>
        <a href="#region2" data-area="region2" data-zoom="1">Region 2 Home</a>
        
        <!-- Zoom level 2 links - detailed -->
        <a href="#d1" data-area="district1" data-zoom="2">District 1</a>
        <a href="#d2" data-area="district2" data-zoom="2">District 2</a>
        <a href="#d3" data-area="district3" data-zoom="2">District 3</a>
        <a href="#d4" data-area="district4" data-zoom="2">District 4</a>
      </svg-map>
    </div>
  `,
};

export const MultipleLinksInArea: Story = {
  args: {
    zoom: 1,
  },
  render: (args) => html`
    <svg-map zoom="${args.zoom}">
      <svg slot="svg" data-zoom="1" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect id="building" x="50" y="50" width="300" height="200" fill="lightgray" stroke="black" stroke-width="3"/>
        <text x="200" y="40" text-anchor="middle" font-size="14">Office Building</text>
      </svg>
      
      <a href="#floor1" data-area="building" data-zoom="1">Floor 1</a>
      <a href="#floor2" data-area="building" data-zoom="1">Floor 2</a>
      <a href="#floor3" data-area="building" data-zoom="1">Floor 3</a>
      <a href="#floor4" data-area="building" data-zoom="1">Floor 4</a>
      <a href="#floor5" data-area="building" data-zoom="1">Floor 5</a>
      <a href="#floor6" data-area="building" data-zoom="1">Floor 6</a>
    </svg-map>
  `,
};

export const PathDistribution: Story = {
  args: {
    zoom: 1,
  },
  render: (args) => html`
    <p>Links are distributed along the path for linear/open shapes:</p>
    <svg-map zoom="${args.zoom}">
      <svg slot="svg" data-zoom="1" width="500" height="300" xmlns="http://www.w3.org/2000/svg">
        <path id="route" d="M 50 150 Q 150 50 250 150 T 450 150" 
              stroke="darkblue" stroke-width="4" fill="none"/>
        <text x="250" y="30" text-anchor="middle" font-size="14">Highway Route</text>
      </svg>
      
      <a href="#station1" data-area="route" data-zoom="1">Station 1</a>
      <a href="#station2" data-area="route" data-zoom="1">Station 2</a>
      <a href="#station3" data-area="route" data-zoom="1">Station 3</a>
      <a href="#station4" data-area="route" data-zoom="1">Station 4</a>
      <a href="#station5" data-area="route" data-zoom="1">Station 5</a>
    </svg-map>
  `,
};

export const CircleDistribution: Story = {
  args: {
    zoom: 1,
  },
  render: (args) => html`
    <p>Links are distributed in a circular pattern around the center:</p>
    <svg-map zoom="${args.zoom}">
      <svg slot="svg" data-zoom="1" width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <circle id="plaza" cx="200" cy="200" r="150" fill="lightyellow" stroke="orange" stroke-width="3"/>
        <circle cx="200" cy="200" r="10" fill="orange"/>
        <text x="200" y="380" text-anchor="middle" font-size="14">Town Plaza</text>
      </svg>
      
      <a href="#north" data-area="plaza" data-zoom="1">North Gate</a>
      <a href="#northeast" data-area="plaza" data-zoom="1">NE Shop</a>
      <a href="#east" data-area="plaza" data-zoom="1">East Gate</a>
      <a href="#southeast" data-area="plaza" data-zoom="1">SE Market</a>
      <a href="#south" data-area="plaza" data-zoom="1">South Gate</a>
      <a href="#southwest" data-area="plaza" data-zoom="1">SW Inn</a>
      <a href="#west" data-area="plaza" data-zoom="1">West Gate</a>
      <a href="#northwest" data-area="plaza" data-zoom="1">NW Temple</a>
    </svg-map>
  `,
};

export const Disabled: Story = {
  args: {
    zoom: 1,
    disabled: true,
  },
  render: (args) => html`
    <svg-map zoom="${args.zoom}" ?disabled="${args.disabled}">
      <svg slot="svg" data-zoom="1" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect id="area1" x="10" y="10" width="180" height="130" fill="lightblue" stroke="navy" stroke-width="2"/>
      </svg>
      <a href="#link1" data-area="area1" data-zoom="1">Link 1</a>
    </svg-map>
    <p>When disabled, the component does not render.</p>
  `,
};
