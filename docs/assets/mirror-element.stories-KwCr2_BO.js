import{C as f,a as h}from"./utils-TwAgiKOc.js";import{x as n}from"./iframe-5a84rVnP.js";import{MirrorElement as v}from"./index-KeQgfBWm.js";import"./preload-helper-Dp1pzeXC.js";var o=Object.freeze,y=Object.defineProperty,C=(e,g)=>o(y(e,"raw",{value:o(e.slice())})),a;const d=e=>n`<div id="target">
            <p>paragraph 1</p>
        </div>
        <mirror-element selector=${e.selector}></mirror-element>`,D={...f("mirror-element",void 0,{decorators:[...h("mirror-element",void 0),e=>(customElements.get("mirror-element")||customElements.define("mirror-element",v),n`${e()}`)]}),render:d},r={args:{selector:"#target"}},t={args:{selector:"#target"},render:(e,g)=>{const u=d(e);return n(a||(a=C(["",`
            <p>
                The first paragraph will change every second and the
                <code>mirror-element</code> will copy it.
            </p>
            <script>
                setInterval(() => {
                    document.querySelector("#target p").innerText = Date.now();
                }, 1000);
            <\/script>`])),u)}};var s,c,i;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    selector: "#target"
  }
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var m,l,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    selector: "#target"
  },
  render: (args, context) => {
    const originalStory = renderFn(args, context);
    return html\`\${originalStory}
            <p>
                The first paragraph will change every second and the
                <code>mirror-element</code> will copy it.
            </p>
            <script>
                setInterval(() => {
                    document.querySelector("#target p").innerText = Date.now();
                }, 1000);
            <\/script>\`;
  }
}`,...(p=(l=t.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const E=["Default","ChangingChildren"];export{t as ChangingChildren,r as Default,E as __namedExportsOrder,D as default};
//# sourceMappingURL=mirror-element.stories-KwCr2_BO.js.map
