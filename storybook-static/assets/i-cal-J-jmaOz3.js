import{j as e}from"./index-CpnDKoW4.js";import{useMDXComponents as r}from"./index-Bo01w_M0.js";import{ae as o,al as i}from"./index-CLAcPfU8.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DH7QNDB1.js";import"../sb-preview/runtime.js";import"./index-D-8MO0q_.js";import"./index-DPS9-N-h.js";import"./index-DrFu-skq.js";const s=`The \`i-cal\` component renders ics formatted text as an ordered list. It has the following attributes:

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
`;function n(t){return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"components/i-cal/Documentation"}),`
`,e.jsx(i,{children:s})]})}function v(t={}){const{wrapper:a}={...r(),...t.components};return a?e.jsx(a,{...t,children:e.jsx(n,{...t})}):n()}export{v as default};
//# sourceMappingURL=i-cal-J-jmaOz3.js.map
