import{j as e}from"./index-CpnDKoW4.js";import{useMDXComponents as t}from"./index-Bo01w_M0.js";import"./_commonjsHelpers-CqkleIqs.js";function n(r){const s={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.h1,{id:"mutative",children:"mutative"}),`
`,e.jsxs(s.p,{children:["Persistent DOM mutation observations based on CSS query ",e.jsx(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors",rel:"nofollow",children:"selectors"}),". It's essentially a wrapper for a global ",e.jsx(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver",rel:"nofollow",children:"MutationObserver"})," that filters records to specific callbacks. The API is ",e.jsx(s.em,{children:"similar"})," to MutationObserver, but not the same."]}),`
`,e.jsx(s.p,{children:"The advantage is that observers can be set up independently/ahead of matching DOM elements, which is useful when working with SPAs or other reactive content."}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-javascript",children:`// pass a single selector and callback
Mutative.observe("p", (record) => console.log(record));

//pass multiple selectors with the same callback
Mutative.observe(["p", ".text", "*[data-text]"], (record) => console.log("text mutated", record));

//pass multiple selectors at once with different callbacks
Mutative.observe({
    "*[data-text]": (rec) => console.log(rec),
    p: (rec) => alert("paragraph edited"),
    output: (rec) => console.log("calculation updated", rec),
});

//Remove observations for the 'p' selector only
Mutative.disconnect("p");

// Pause all observations
Mutative.disconnect();

//Resume existing observations
Mutative.observe();
`})}),`
`,e.jsx(s.h3,{id:"observe",children:"observe()"}),`
`,e.jsxs(s.p,{children:["The parameters are different from the MutationObserver implementation. Instead of a ",e.jsx(s.code,{children:"target"})," and ",e.jsx(s.code,{children:"options"})," there is ",e.jsx(s.code,{children:"selectors"})," and ",e.jsx(s.code,{children:"callback"}),"."]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"selectors"})," - Several types are allowed:",`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"null"})," - If no arguments are passed, observation of existing selectors will resume."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"string"})," - a single CSS query selector."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"string[]"})," - multiple CSS query selectors that use the same ",e.jsx(s.code,{children:"callback"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"object"})," - CSS query selectors strings as keys, callbacks as values."]}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"callback"})," - Only required when ",e.jsx(s.code,{children:"selectors"})," is a string or array of strings. A function that accepts a MutationRecord as it's only parameter."]}),`
`]}),`
`,e.jsx(s.h3,{id:"disconnect",children:"disconnect()"}),`
`,e.jsxs(s.p,{children:["Mutations that have been detected but not yet reported to observers are ",e.jsx(s.em,{children:"not"})," discarded. Observer callbacks are triggered before disconnection. This method will either pause or remove observations and callbacks."]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"When called with no arguments:"})," acts the same as ",e.jsx(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/disconnect",rel:"nofollow",children:"disconnect()"}),", ignoring ",e.jsx(s.strong,{children:"all"})," ",e.jsx(s.em,{children:"future"})," mutations. Note: this does not clear the internal selector list, so calling ",e.jsx(s.code,{children:"observe()"})," again will continue with existing selectors."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"When passed with an argument:"})," The arguments follow the same formats as ",e.jsx(s.code,{children:"observe()"}),"'s ",e.jsx(s.code,{children:"selectors"})," parameter. Only observers with the passed selectors are removed. If no selectors remain, observation is paused (as if no arguments were passed)."]}),`
`]}),`
`,e.jsx(s.h3,{id:"takerecords",children:"takeRecords()"}),`
`,e.jsxs(s.p,{children:["Takes all records from the Mutative object, use carefully. See: ",e.jsx(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/takeRecords",rel:"nofollow",children:"takeRecords()"}),"."]}),`
`,e.jsx(s.h2,{id:"how-it-works",children:"How it works"}),`
`,e.jsxs(s.p,{children:["A single MutationObserver is created on the document ",e.jsx(s.code,{children:"body"})," with the first call of ",e.jsx(s.code,{children:"mutative.observe()"}),". MutationRecords are only passed to callbacks that have a matching selector for at least one of ",e.jsx(s.code,{children:"target"}),", ",e.jsx(s.code,{children:"addedNodes"}),", or ",e.jsx(s.code,{children:"removedNodes"}),"."]})]})}function c(r={}){const{wrapper:s}={...t(),...r.components};return s?e.jsx(s,{...r,children:e.jsx(n,{...r})}):n(r)}export{c as default};
//# sourceMappingURL=mutative-DqNpQIKU.js.map
