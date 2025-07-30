import{C as p,a as m}from"./utils-ClLhtqi4.js";import{x as a}from"./iframe-U9cpPYW2.js";import f from"./index-k3KnM4uq.js";const g=t=>a` <style>
            kbd-click {
                display: contents;
            }
            kbd {
                background-color: #eee;
                border-radius: 3px;
                border: 1px solid #b4b4b4;
                box-shadow: 0 1px 1px rgb(0 0 0 / 0.2), 0 2px 0 0 rgb(255 255 255 / 0.7) inset;
                color: #333;
                display: inline-block;
                font-size: 0.85em;
                font-weight: 700;
                line-height: 1;
                padding: 2px 4px;
                white-space: nowrap;
            }
        </style>
        <kbd-click
            ${t.passive?"passive":""}
            ${t.capture?"capture":""}
            ${t.allowRepeat?"allow-repeat":""}
            filter="${t.filter||""}"
        >
            <p>
                Press <button onclick="alert('from A button')"><kbd>A</kbd></button>,
                <button onclick="alert('from B button')"><kbd>B</kbd></button>, or
                <button onclick="alert('from C button')"><kbd>C</kbd></button>
                to trigger a click event.
            </p>
        </kbd-click>`,A={...p("kbd-click",void 0,{decorators:[...m("kbd-click",void 0),t=>(customElements.get("kbd-click")||customElements.define("kbd-click",f),a`${t()}`)]}),render:g},e={args:{}},r={args:{caseSensitive:!0,filter:"A, B, C"},render:t=>a` <kbd-click
            ${t.passive?"passive":""}
            ${t.capture?"capture":""}
            ${t.allowRepeat?"allow-repeat":""}
            filter="${t.filter||""}"
            case-sensitive
        >
            <p>
                Case-sensitive, use 'shift' then press a letter. Press
                <button onclick="alert('from A button')"><kbd>A</kbd></button>,
                <button onclick="alert('from B button')"><kbd>B</kbd></button>, or
                <button onclick="alert('from C button')"><kbd>C</kbd></button>
                to trigger a click event.
            </p>
        </kbd-click>`},o={args:{filter:"A"},render:t=>a` <kbd-click
            ${t.passive?"passive":""}
            ${t.capture?"capture":""}
            ${t.allowRepeat?"allow-repeat":""}
            filter="${t.filter||""}"
        >
            <p>
                Filtered only to 'A'. Press
                <button onclick="alert('from A button')"><kbd>A</kbd></button>,
                <button onclick="alert('from B button')"><kbd>B</kbd></button>, or
                <button onclick="alert('from C button')"><kbd>C</kbd></button>
                to trigger a click event.
            </p>
        </kbd-click>`};var s,c,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {}
}`,...(n=(c=e.parameters)==null?void 0:c.docs)==null?void 0:n.source}}};var i,l,b;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    caseSensitive: true,
    filter: "A, B, C"
  },
  render: (args: Args) => {
    return html\` <kbd-click
            \${args.passive ? "passive" : ""}
            \${args.capture ? "capture" : ""}
            \${args.allowRepeat ? "allow-repeat" : ""}
            filter="\${args.filter || ""}"
            case-sensitive
        >
            <p>
                Case-sensitive, use 'shift' then press a letter. Press
                <button onclick="alert('from A button')"><kbd>A</kbd></button>,
                <button onclick="alert('from B button')"><kbd>B</kbd></button>, or
                <button onclick="alert('from C button')"><kbd>C</kbd></button>
                to trigger a click event.
            </p>
        </kbd-click>\`;
  }
}`,...(b=(l=r.parameters)==null?void 0:l.docs)==null?void 0:b.source}}};var k,d,u;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    filter: "A"
  },
  render: (args: Args) => {
    return html\` <kbd-click
            \${args.passive ? "passive" : ""}
            \${args.capture ? "capture" : ""}
            \${args.allowRepeat ? "allow-repeat" : ""}
            filter="\${args.filter || ""}"
        >
            <p>
                Filtered only to 'A'. Press
                <button onclick="alert('from A button')"><kbd>A</kbd></button>,
                <button onclick="alert('from B button')"><kbd>B</kbd></button>, or
                <button onclick="alert('from C button')"><kbd>C</kbd></button>
                to trigger a click event.
            </p>
        </kbd-click>\`;
  }
}`,...(u=(d=o.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const B=["Basic","CaseSensitive","Filtered"];export{e as Basic,r as CaseSensitive,o as Filtered,B as __namedExportsOrder,A as default};
//# sourceMappingURL=kbd-click.stories-Cggopj-7.js.map
