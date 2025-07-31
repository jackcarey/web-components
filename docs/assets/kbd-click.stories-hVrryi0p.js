import{C as u,a as g}from"./utils-BaFf26T9.js";import{x as n}from"./iframe-DXaciqSX.js";import m from"./index-k3KnM4uq.js";const f=t=>n` <style>
            kbd-click {
                display: contents;
            }
            button {
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
        </kbd-click>`,y={...u("kbd-click",void 0,{decorators:[...g("kbd-click",void 0),t=>(customElements.get("kbd-click")||customElements.define("kbd-click",m),n`${t()}`)]}),render:f},e={args:{}},o={args:{caseSensitive:!0,filter:"A, B, C"},render:t=>n` <style>
                kbd-click {
                    display: contents;
                }
                button {
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
                }</style
            ><kbd-click
                ${t.passive?"passive":""}
                ${t.capture?"capture":""}
                ${t.allowRepeat?"allow-repeat":""}
                filter="${t.filter||""}"
                case-sensitive
            >
                <p>
                    Case-sensitive, hold <kbd>shift</kbd> then press a letter. Press
                    <button onclick="alert('from A button')"><kbd>A</kbd></button>,
                    <button onclick="alert('from B button')"><kbd>B</kbd></button>, or
                    <button onclick="alert('from C button')"><kbd>C</kbd></button>
                    to trigger a click event.
                </p>
            </kbd-click>`},r={args:{filter:"A"},render:t=>n` <style>
                kbd-click {
                    display: contents;
                }
                button {
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
                }</style
            ><kbd-click
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
            </kbd-click>`};var i,s,a;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {}
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var l,b,c;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    caseSensitive: true,
    filter: "A, B, C"
  },
  render: (args: Args) => {
    return html\` <style>
                kbd-click {
                    display: contents;
                }
                button {
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
                }</style
            ><kbd-click
                \${args.passive ? "passive" : ""}
                \${args.capture ? "capture" : ""}
                \${args.allowRepeat ? "allow-repeat" : ""}
                filter="\${args.filter || ""}"
                case-sensitive
            >
                <p>
                    Case-sensitive, hold <kbd>shift</kbd> then press a letter. Press
                    <button onclick="alert('from A button')"><kbd>A</kbd></button>,
                    <button onclick="alert('from B button')"><kbd>B</kbd></button>, or
                    <button onclick="alert('from C button')"><kbd>C</kbd></button>
                    to trigger a click event.
                </p>
            </kbd-click>\`;
  }
}`,...(c=(b=o.parameters)==null?void 0:b.docs)==null?void 0:c.source}}};var d,p,k;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    filter: "A"
  },
  render: (args: Args) => {
    return html\` <style>
                kbd-click {
                    display: contents;
                }
                button {
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
                }</style
            ><kbd-click
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
}`,...(k=(p=r.parameters)==null?void 0:p.docs)==null?void 0:k.source}}};const v=["Basic","CaseSensitive","Filtered"];export{e as Basic,o as CaseSensitive,r as Filtered,v as __namedExportsOrder,y as default};
//# sourceMappingURL=kbd-click.stories-hVrryi0p.js.map
