import{j as e}from"./index-DTcoQwQS.js";import{useMDXComponents as a}from"./index-DDH4e_a9.js";import{M as o,c as s}from"./index-y6Z4WkwY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-Oc23Yqwo.js";import"./index-Cu4lwwaE.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";const i=`# i-cal\r
\r
> Renders ics data in a web component.\r
\r
[![i-cal](https://jsr.io/badges/@web-components/i-cal)](https://jsr.io/@web-components/i-cal) [![score](https://jsr.io/badges/@web-components/i-cal/score)](https://jsr.io/@web-components/i-cal/score)\r
\r
**version:** 1.1.8\r
\r
**license:** [LGPL-3](./LICENSE.md)\r
\r
## Using this package\r
\r
**Browser:** via the ESM CDN: [https://esm.sh/jsr/@web-components/i-cal](https://esm.sh/jsr/@web-components/i-cal) \r
\r
\`\`\`html\r
<script src="https://esm.sh/jsr/@web-components/i-cal" type="module"><\/script>\r
\`\`\`\r
\r
#### Deno\r
\r
\`\`\`\r
deno add jsr:@web-components/i-cal\r
\`\`\`\r
\r
**NPM:** JSR provides [NPM compatibility](https://jsr.io/docs/npm-compatibility). You can install this package with:\r
\r
\`\`\`\r
npx jsr add @web-components/i-cal\r
\`\`\`\r
\r
## Documentation\r
\r
- **Open [i-cal on Storybook](https://jackcarey.co.uk/web-components/storybook-static/?path=/docs/components-i-cal)**.\r
\r
The \`i-cal\` component renders ics formatted text as an ordered list. It has the following attributes:

-   \`src\`: The URL of an ics file.
-   \`refresh\`: The number of seconds until the \`src\` is automatically refreshed. 0 = never. Default: 0.
-   \`events\`: Text in [iCalendar format](https://icalendar.org/).
-   \`since\`: Events that end before this valid [datetime string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format) will not be shown.
-   \`until\`: Events that start after this valid [datetime string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format) will not be shown.
-   \`locales\`: Valid locale string, or comma-separated strings for the [DateTime format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters). Default: browser locale
-   \`localeOptions\`: Valid JSON localOptions string for the [DateTime format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters). Default: browser locale

**Children**

All children will be appended _after_ the event list. You can pass a \`<template/>\` element as a child to use for each list item. You should know:

-   Only the first template child will be used.
-   Slots within the template will be replaced by their respective event attributes from the list below, if a value for the attribute exists. Other slots will be unaffected.
-   The parent of \`startDate\` and \`endDate\` slots will have its \`datetime\` attribute set in ISO-8601 format.

**Default template**

The default template displays all event attributes in an unordered list. Each list item has a [part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part) so that it can be styled.

**Event attributes**

-   attendees
-   color
-   description
-   duration
-   endDate
-   exceptions
-   location
-   organizer
-   recurrenceId
-   sequence
-   startDate
-   strictExceptions
-   summary
-   uid
\r
\r
---\r
\r
Made by [jackcarey](https://jackcarey.co.uk).\r
`;function r(t){return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"components/i-cal/Documentation"}),`
`,e.jsx(s,{children:i})]})}function f(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r()}export{f as default};
//# sourceMappingURL=i-cal-i9VeNyMd.js.map
