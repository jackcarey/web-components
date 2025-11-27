import{C as m,a as f}from"./utils-B4_lRDvb.js";import{x as e}from"./iframe-Dty1tNkP.js";import g from"./index-D0l53fT8.js";import"./preload-helper-Dp1pzeXC.js";const s=e` <style>
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
        cursor: pointer;
    }
    kbd:active {
        box-shadow: 0 1px 1px rgb(100 100 100 / 0.2), 0 2px 0 0 rgb(255 255 255 / 0.7) inset,
            inset -1px -1px #a3a3a3;
    }
</style>`,v=t=>e`${s}
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
        </kbd-click>`,w={...m("kbd-click",void 0,{decorators:[...f("kbd-click",void 0),t=>(customElements.get("kbd-click")||customElements.define("kbd-click",g),e`${t()}`)]}),render:v},r={args:{}},o={args:{caseSensitive:!0,filter:"A, B, C"},render:t=>e` ${s}<kbd-click
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
            </kbd-click>`},n={args:{filter:"A"},render:t=>e`${s}<kbd-click
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
            </kbd-click>`};var a,c,i;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {}
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var l,b,d;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    caseSensitive: true,
    filter: "A, B, C"
  },
  render: (args: Args) => {
    return html\` \${stylesHtml}<kbd-click
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
}`,...(d=(b=o.parameters)==null?void 0:b.docs)==null?void 0:d.source}}};var k,p,u;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    filter: "A"
  },
  render: (args: Args) => {
    return html\`\${stylesHtml}<kbd-click
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
}`,...(u=(p=n.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const B=["Basic","CaseSensitive","Filtered"];export{r as Basic,o as CaseSensitive,n as Filtered,B as __namedExportsOrder,w as default};
//# sourceMappingURL=kbd-click.stories-BTMtzWbS.js.map
