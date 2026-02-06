import{C as H}from"./utils-9QYUgmz0.js";import{x as t}from"./iframe-BWuQHxz2.js";import"./preload-helper-Dp1pzeXC.js";const O={...H("svg-map"),argTypes:{zoom:{control:{type:"number",min:.5,max:3,step:.5},description:"Current zoom level"},disabled:{control:"boolean",description:"Disable the component"}}},e={args:{zoom:1},render:a=>t`
    <svg-map zoom="${a.zoom}">
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
  `},o={args:{zoom:1},render:a=>t`
    <div>
      <p>Use the zoom control above to switch between zoom levels. Different SVGs and links appear at different zoom levels.</p>
      <svg-map zoom="${a.zoom}">
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
  `},r={args:{zoom:1},render:a=>t`
    <svg-map zoom="${a.zoom}">
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
  `},i={args:{zoom:1},render:a=>t`
    <p>Links are distributed along the path for linear/open shapes:</p>
    <svg-map zoom="${a.zoom}">
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
  `},d={args:{zoom:1},render:a=>t`
    <p>Links are distributed in a circular pattern around the center:</p>
    <svg-map zoom="${a.zoom}">
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
  `},n={args:{zoom:1,disabled:!0},render:a=>t`
    <svg-map zoom="${a.zoom}" ?disabled="${a.disabled}">
      <svg slot="svg" data-zoom="1" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect id="area1" x="10" y="10" width="180" height="130" fill="lightblue" stroke="navy" stroke-width="2"/>
      </svg>
      <a href="#link1" data-area="area1" data-zoom="1">Link 1</a>
    </svg-map>
    <p>When disabled, the component does not render.</p>
  `},s={args:{zoom:1},render:a=>t`
    <div>
      <p>SVGs and links can use <code>data-min-zoom</code> and <code>data-max-zoom</code> to define ranges instead of exact values. Adjust zoom to see different content appear/disappear.</p>
      <svg-map zoom="${a.zoom}">
        <!-- Overview SVG: visible from zoom 0.5 to 1.5 -->
        <svg slot="svg" data-min-zoom="0.5" data-max-zoom="1.5" width="500" height="400" xmlns="http://www.w3.org/2000/svg">
          <rect id="country" x="50" y="50" width="400" height="300" fill="#e8f5e9" stroke="#2e7d32" stroke-width="3"/>
          <text x="250" y="30" text-anchor="middle" font-size="18" fill="#2e7d32">Country Map (zoom 0.5-1.5)</text>
        </svg>
        
        <!-- Regional SVG: visible from zoom 1.5 to 2.5 -->
        <svg slot="svg" data-min-zoom="1.5" data-max-zoom="2.5" width="500" height="400" xmlns="http://www.w3.org/2000/svg">
          <rect id="country" x="50" y="50" width="400" height="300" fill="#fff3e0" stroke="#e65100" stroke-width="3"/>
          <rect id="region1" x="70" y="70" width="180" height="130" fill="#ffe0b2" stroke="#e65100" stroke-width="2"/>
          <rect id="region2" x="270" y="70" width="160" height="130" fill="#ffe0b2" stroke="#e65100" stroke-width="2"/>
          <rect id="region3" x="70" y="220" width="360" height="110" fill="#ffe0b2" stroke="#e65100" stroke-width="2"/>
          <text x="250" y="30" text-anchor="middle" font-size="18" fill="#e65100">Regional Map (zoom 1.5-2.5)</text>
        </svg>
        
        <!-- City SVG: visible from zoom 2.5 onwards -->
        <svg slot="svg" data-min-zoom="2.5" width="500" height="400" xmlns="http://www.w3.org/2000/svg">
          <rect id="country" x="50" y="50" width="400" height="300" fill="#e1f5fe" stroke="#01579b" stroke-width="3"/>
          <circle id="city1" cx="150" cy="120" r="30" fill="#81d4fa" stroke="#01579b" stroke-width="2"/>
          <circle id="city2" cx="350" cy="120" r="30" fill="#81d4fa" stroke="#01579b" stroke-width="2"/>
          <circle id="city3" cx="150" cy="280" r="30" fill="#81d4fa" stroke="#01579b" stroke-width="2"/>
          <circle id="city4" cx="350" cy="280" r="30" fill="#81d4fa" stroke="#01579b" stroke-width="2"/>
          <text x="250" y="30" text-anchor="middle" font-size="18" fill="#01579b">City Map (zoom 2.5+)</text>
        </svg>
        
        <!-- Country-level links: visible 0.5-1.5 -->
        <a href="#capital" data-area="country" data-min-zoom="0.5" data-max-zoom="1.5">Capital</a>
        <a href="#info" data-area="country" data-min-zoom="0.5" data-max-zoom="1.5">Country Info</a>
        
        <!-- Regional links: visible 1.5-2.5 -->
        <a href="#north" data-area="region1" data-min-zoom="1.5" data-max-zoom="2.5">North Region</a>
        <a href="#east" data-area="region2" data-min-zoom="1.5" data-max-zoom="2.5">East Region</a>
        <a href="#south" data-area="region3" data-min-zoom="1.5" data-max-zoom="2.5">South Region</a>
        
        <!-- City links: visible 2.5+ -->
        <a href="#city1" data-area="city1" data-min-zoom="2.5">Alpha City</a>
        <a href="#city2" data-area="city2" data-min-zoom="2.5">Beta City</a>
        <a href="#city3" data-area="city3" data-min-zoom="2.5">Gamma City</a>
        <a href="#city4" data-area="city4" data-min-zoom="2.5">Delta City</a>
      </svg-map>
    </div>
  `},l={args:{zoom:1},render:a=>t`
    <div>
      <p>Example with 20 links distributed in a grid pattern within one large region:</p>
      <svg-map zoom="${a.zoom}">
        <svg slot="svg" data-zoom="1" width="600" height="500" xmlns="http://www.w3.org/2000/svg">
          <rect id="campus" x="50" y="50" width="500" height="400" fill="#f5f5f5" stroke="#424242" stroke-width="3"/>
          <text x="300" y="35" text-anchor="middle" font-size="16" fill="#424242">University Campus - 20 Buildings</text>
        </svg>
        
        <!-- 20 links in the campus area -->
        <a href="#lib" data-area="campus" data-zoom="1">Library</a>
        <a href="#gym" data-area="campus" data-zoom="1">Gymnasium</a>
        <a href="#cafe" data-area="campus" data-zoom="1">Cafeteria</a>
        <a href="#lab1" data-area="campus" data-zoom="1">Lab A</a>
        <a href="#lab2" data-area="campus" data-zoom="1">Lab B</a>
        <a href="#hall1" data-area="campus" data-zoom="1">Hall 1</a>
        <a href="#hall2" data-area="campus" data-zoom="1">Hall 2</a>
        <a href="#hall3" data-area="campus" data-zoom="1">Hall 3</a>
        <a href="#admin" data-area="campus" data-zoom="1">Admin</a>
        <a href="#theater" data-area="campus" data-zoom="1">Theater</a>
        <a href="#pool" data-area="campus" data-zoom="1">Pool</a>
        <a href="#dorm1" data-area="campus" data-zoom="1">Dorm A</a>
        <a href="#dorm2" data-area="campus" data-zoom="1">Dorm B</a>
        <a href="#dorm3" data-area="campus" data-zoom="1">Dorm C</a>
        <a href="#music" data-area="campus" data-zoom="1">Music Hall</a>
        <a href="#art" data-area="campus" data-zoom="1">Art Studio</a>
        <a href="#med" data-area="campus" data-zoom="1">Medical</a>
        <a href="#eng" data-area="campus" data-zoom="1">Engineering</a>
        <a href="#sci" data-area="campus" data-zoom="1">Science</a>
        <a href="#park" data-area="campus" data-zoom="1">Park</a>
      </svg-map>
    </div>
  `},m={args:{zoom:1},render:a=>t`
    <div>
      <p>SVG images can be external files referenced via <code>&lt;img&gt;</code> tag. The component detects areas by their bounding boxes.</p>
      <svg-map zoom="${a.zoom}">
        <!-- External SVG via img tag for zoom level 1 -->
        <img 
          slot="svg" 
          data-zoom="1" 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='400'%3E%3Crect id='zone1' x='50' y='50' width='180' height='130' fill='%23ffcdd2' stroke='%23c62828' stroke-width='2'/%3E%3Crect id='zone2' x='270' y='50' width='180' height='130' fill='%23c8e6c9' stroke='%232e7d32' stroke-width='2'/%3E%3Ccircle id='zone3' cx='160' cy='300' r='60' fill='%23fff9c4' stroke='%23f57f17' stroke-width='2'/%3E%3Cpath id='zone4' d='M 270 250 L 450 250 L 360 370 Z' fill='%23b3e5fc' stroke='%2301579b' stroke-width='2'/%3E%3Ctext x='250' y='30' text-anchor='middle' font-size='18' fill='%23333'%3EExternal SVG Map%3C/text%3E%3C/svg%3E"
          alt="Map with zones"
          width="500"
          height="400"
        />
        
        <!-- Note: Links reference areas by ID, but external SVG positioning uses bounding box approach -->
        <a href="#red" data-area="zone1" data-zoom="1">Red Zone</a>
        <a href="#green" data-area="zone2" data-zoom="1">Green Zone</a>
        <a href="#yellow" data-area="zone3" data-zoom="1">Yellow Zone</a>
        <a href="#blue" data-area="zone4" data-zoom="1">Blue Zone</a>
      </svg-map>
      <p><em>Note: External SVGs position links using estimated bounding boxes since the SVG DOM isn't directly accessible. For precise positioning, use inline SVG.</em></p>
    </div>
  `};var h,g,c;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    zoom: 1
  },
  render: args => html\`
    <svg-map zoom="\${args.zoom}">
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
  \`
}`,...(c=(g=e.parameters)==null?void 0:g.docs)==null?void 0:c.source}}};var f,z,p;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    zoom: 1
  },
  render: args => html\`
    <div>
      <p>Use the zoom control above to switch between zoom levels. Different SVGs and links appear at different zoom levels.</p>
      <svg-map zoom="\${args.zoom}">
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
  \`
}`,...(p=(z=o.parameters)==null?void 0:z.docs)==null?void 0:p.source}}};var w,x,v;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    zoom: 1
  },
  render: args => html\`
    <svg-map zoom="\${args.zoom}">
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
  \`
}`,...(v=(x=r.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var u,k,y;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    zoom: 1
  },
  render: args => html\`
    <p>Links are distributed along the path for linear/open shapes:</p>
    <svg-map zoom="\${args.zoom}">
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
  \`
}`,...(y=(k=i.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};var b,S,C;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    zoom: 1
  },
  render: args => html\`
    <p>Links are distributed in a circular pattern around the center:</p>
    <svg-map zoom="\${args.zoom}">
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
  \`
}`,...(C=(S=d.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var G,E,D;n.parameters={...n.parameters,docs:{...(G=n.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    zoom: 1,
    disabled: true
  },
  render: args => html\`
    <svg-map zoom="\${args.zoom}" ?disabled="\${args.disabled}">
      <svg slot="svg" data-zoom="1" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect id="area1" x="10" y="10" width="180" height="130" fill="lightblue" stroke="navy" stroke-width="2"/>
      </svg>
      <a href="#link1" data-area="area1" data-zoom="1">Link 1</a>
    </svg-map>
    <p>When disabled, the component does not render.</p>
  \`
}`,...(D=(E=n.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var L,M,R;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    zoom: 1
  },
  render: args => html\`
    <div>
      <p>SVGs and links can use <code>data-min-zoom</code> and <code>data-max-zoom</code> to define ranges instead of exact values. Adjust zoom to see different content appear/disappear.</p>
      <svg-map zoom="\${args.zoom}">
        <!-- Overview SVG: visible from zoom 0.5 to 1.5 -->
        <svg slot="svg" data-min-zoom="0.5" data-max-zoom="1.5" width="500" height="400" xmlns="http://www.w3.org/2000/svg">
          <rect id="country" x="50" y="50" width="400" height="300" fill="#e8f5e9" stroke="#2e7d32" stroke-width="3"/>
          <text x="250" y="30" text-anchor="middle" font-size="18" fill="#2e7d32">Country Map (zoom 0.5-1.5)</text>
        </svg>
        
        <!-- Regional SVG: visible from zoom 1.5 to 2.5 -->
        <svg slot="svg" data-min-zoom="1.5" data-max-zoom="2.5" width="500" height="400" xmlns="http://www.w3.org/2000/svg">
          <rect id="country" x="50" y="50" width="400" height="300" fill="#fff3e0" stroke="#e65100" stroke-width="3"/>
          <rect id="region1" x="70" y="70" width="180" height="130" fill="#ffe0b2" stroke="#e65100" stroke-width="2"/>
          <rect id="region2" x="270" y="70" width="160" height="130" fill="#ffe0b2" stroke="#e65100" stroke-width="2"/>
          <rect id="region3" x="70" y="220" width="360" height="110" fill="#ffe0b2" stroke="#e65100" stroke-width="2"/>
          <text x="250" y="30" text-anchor="middle" font-size="18" fill="#e65100">Regional Map (zoom 1.5-2.5)</text>
        </svg>
        
        <!-- City SVG: visible from zoom 2.5 onwards -->
        <svg slot="svg" data-min-zoom="2.5" width="500" height="400" xmlns="http://www.w3.org/2000/svg">
          <rect id="country" x="50" y="50" width="400" height="300" fill="#e1f5fe" stroke="#01579b" stroke-width="3"/>
          <circle id="city1" cx="150" cy="120" r="30" fill="#81d4fa" stroke="#01579b" stroke-width="2"/>
          <circle id="city2" cx="350" cy="120" r="30" fill="#81d4fa" stroke="#01579b" stroke-width="2"/>
          <circle id="city3" cx="150" cy="280" r="30" fill="#81d4fa" stroke="#01579b" stroke-width="2"/>
          <circle id="city4" cx="350" cy="280" r="30" fill="#81d4fa" stroke="#01579b" stroke-width="2"/>
          <text x="250" y="30" text-anchor="middle" font-size="18" fill="#01579b">City Map (zoom 2.5+)</text>
        </svg>
        
        <!-- Country-level links: visible 0.5-1.5 -->
        <a href="#capital" data-area="country" data-min-zoom="0.5" data-max-zoom="1.5">Capital</a>
        <a href="#info" data-area="country" data-min-zoom="0.5" data-max-zoom="1.5">Country Info</a>
        
        <!-- Regional links: visible 1.5-2.5 -->
        <a href="#north" data-area="region1" data-min-zoom="1.5" data-max-zoom="2.5">North Region</a>
        <a href="#east" data-area="region2" data-min-zoom="1.5" data-max-zoom="2.5">East Region</a>
        <a href="#south" data-area="region3" data-min-zoom="1.5" data-max-zoom="2.5">South Region</a>
        
        <!-- City links: visible 2.5+ -->
        <a href="#city1" data-area="city1" data-min-zoom="2.5">Alpha City</a>
        <a href="#city2" data-area="city2" data-min-zoom="2.5">Beta City</a>
        <a href="#city3" data-area="city3" data-min-zoom="2.5">Gamma City</a>
        <a href="#city4" data-area="city4" data-min-zoom="2.5">Delta City</a>
      </svg-map>
    </div>
  \`
}`,...(R=(M=s.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var V,Z,$;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    zoom: 1
  },
  render: args => html\`
    <div>
      <p>Example with 20 links distributed in a grid pattern within one large region:</p>
      <svg-map zoom="\${args.zoom}">
        <svg slot="svg" data-zoom="1" width="600" height="500" xmlns="http://www.w3.org/2000/svg">
          <rect id="campus" x="50" y="50" width="500" height="400" fill="#f5f5f5" stroke="#424242" stroke-width="3"/>
          <text x="300" y="35" text-anchor="middle" font-size="16" fill="#424242">University Campus - 20 Buildings</text>
        </svg>
        
        <!-- 20 links in the campus area -->
        <a href="#lib" data-area="campus" data-zoom="1">Library</a>
        <a href="#gym" data-area="campus" data-zoom="1">Gymnasium</a>
        <a href="#cafe" data-area="campus" data-zoom="1">Cafeteria</a>
        <a href="#lab1" data-area="campus" data-zoom="1">Lab A</a>
        <a href="#lab2" data-area="campus" data-zoom="1">Lab B</a>
        <a href="#hall1" data-area="campus" data-zoom="1">Hall 1</a>
        <a href="#hall2" data-area="campus" data-zoom="1">Hall 2</a>
        <a href="#hall3" data-area="campus" data-zoom="1">Hall 3</a>
        <a href="#admin" data-area="campus" data-zoom="1">Admin</a>
        <a href="#theater" data-area="campus" data-zoom="1">Theater</a>
        <a href="#pool" data-area="campus" data-zoom="1">Pool</a>
        <a href="#dorm1" data-area="campus" data-zoom="1">Dorm A</a>
        <a href="#dorm2" data-area="campus" data-zoom="1">Dorm B</a>
        <a href="#dorm3" data-area="campus" data-zoom="1">Dorm C</a>
        <a href="#music" data-area="campus" data-zoom="1">Music Hall</a>
        <a href="#art" data-area="campus" data-zoom="1">Art Studio</a>
        <a href="#med" data-area="campus" data-zoom="1">Medical</a>
        <a href="#eng" data-area="campus" data-zoom="1">Engineering</a>
        <a href="#sci" data-area="campus" data-zoom="1">Science</a>
        <a href="#park" data-area="campus" data-zoom="1">Park</a>
      </svg-map>
    </div>
  \`
}`,...($=(Z=l.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var A,B,F;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    zoom: 1
  },
  render: args => html\`
    <div>
      <p>SVG images can be external files referenced via <code>&lt;img&gt;</code> tag. The component detects areas by their bounding boxes.</p>
      <svg-map zoom="\${args.zoom}">
        <!-- External SVG via img tag for zoom level 1 -->
        <img 
          slot="svg" 
          data-zoom="1" 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='400'%3E%3Crect id='zone1' x='50' y='50' width='180' height='130' fill='%23ffcdd2' stroke='%23c62828' stroke-width='2'/%3E%3Crect id='zone2' x='270' y='50' width='180' height='130' fill='%23c8e6c9' stroke='%232e7d32' stroke-width='2'/%3E%3Ccircle id='zone3' cx='160' cy='300' r='60' fill='%23fff9c4' stroke='%23f57f17' stroke-width='2'/%3E%3Cpath id='zone4' d='M 270 250 L 450 250 L 360 370 Z' fill='%23b3e5fc' stroke='%2301579b' stroke-width='2'/%3E%3Ctext x='250' y='30' text-anchor='middle' font-size='18' fill='%23333'%3EExternal SVG Map%3C/text%3E%3C/svg%3E"
          alt="Map with zones"
          width="500"
          height="400"
        />
        
        <!-- Note: Links reference areas by ID, but external SVG positioning uses bounding box approach -->
        <a href="#red" data-area="zone1" data-zoom="1">Red Zone</a>
        <a href="#green" data-area="zone2" data-zoom="1">Green Zone</a>
        <a href="#yellow" data-area="zone3" data-zoom="1">Yellow Zone</a>
        <a href="#blue" data-area="zone4" data-zoom="1">Blue Zone</a>
      </svg-map>
      <p><em>Note: External SVGs position links using estimated bounding boxes since the SVG DOM isn't directly accessible. For precise positioning, use inline SVG.</em></p>
    </div>
  \`
}`,...(F=(B=m.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};const P=["Default","ZoomBasedSwitching","MultipleLinksInArea","PathDistribution","CircleDistribution","Disabled","MinMaxZoomRanges","ManyLinksInRegion","ExternalSVGImage"];export{d as CircleDistribution,e as Default,n as Disabled,m as ExternalSVGImage,l as ManyLinksInRegion,s as MinMaxZoomRanges,r as MultipleLinksInArea,i as PathDistribution,o as ZoomBasedSwitching,P as __namedExportsOrder,O as default};
//# sourceMappingURL=svg-map.stories-DeXy4RHl.js.map
