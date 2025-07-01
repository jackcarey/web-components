import{C as _,a as C}from"./utils-C3e5pcp5.js";import{x as e}from"./lit-element-nDyHA9i7.js";import{DynamicTemplate as I}from"./index-ZUpbfJB3.js";import"./iframe-CdECdCnv.js";var s=Object.freeze,B=Object.defineProperty,$=(t,N)=>s(B(t,"raw",{value:s(t.slice())})),p,r;const q={..._("dynamic-template",void 0,{decorators:[...C("dynamic-template",void 0),t=>(customElements.get("blog-post")||customElements.define("blog-post",I),e`${t()}`)]})},a={storyName:"Default (no content)",args:{}},x=e(p||(p=$([`<script type="module">
        <\/script>`]))),l=e`
            <blog-post>
                <h1 slot="heading">Some title</h1>
                <img src="https://picsum.photos/200" alt="Image" slot="image">
                <p>Some text</p>
            </blog-post>
            <blog-post>
                <h1 slot="heading">Some title 2</h1>
                <img src="https://picsum.photos/200" alt="Image" slot="image">
                <p>Some text 2</p>
            </blog-post>
            <blog-post>
                <h1 slot="heading">Some title 3</h1>
                <img src="https://picsum.photos/200" alt="Image" slot="image">
                <p>Some text 3</p>
            </blog-post>`,P=e`
    <template id="compact-blog-post" exportparts="heading">
        <heading part="heading"><slot name="heading"></slot></heading>
        </template>`,H=e`
    <template id="image-only-blog-post" exportparts="image">
                <slot name="image" part="image"></slot>
            </template>`,n={args:{},render:()=>e`
                ${x}
        ${P}
        <main data-dynamic-template="compact">
            ${l}
        </main>
    `},o={args:{},render:()=>e`
        ${x}
        <main data-dynamic-template="image-only">
            ${H}
            ${l}
        </main>
    `},m={args:{},render:()=>e(r||(r=$([`
        <heading>
            <h1>Template selector</h1>
            <label for="template-select">Select template:</label>
            <select id="template-select" name="template-select">
                <option value="compact">Compact</option>
                <option value="image-only">Image onlys</option>
                <option value="this-template-does-not-exist">Non-existent</option>
            </select>
        </heading>
        <script type="module">
            const select = document.getElementById("template-select");
            select.addEventListener("change", (event) => {
                const templateName = event.target.value;
                const main = document.querySelector("main");
                main.dataset.dynamicTemplate = templateName;
            });
        <\/script>
        <main data-dynamic-template="compact">
            `,`
            `,`
            `,`
        </main>
    `])),P,H,l)};var c,i,d;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  storyName: "Default (no content)",
  args: {}
}`,...(d=(i=a.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var g,u,h;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
                \${defineScriptHtml}
        \${compactBlogPostTemplateHtml}
        <main data-dynamic-template="compact">
            \${blogPostHtml}
        </main>
    \`
}`,...(h=(u=n.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var y,b,v;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
        \${defineScriptHtml}
        <main data-dynamic-template="image-only">
            \${imageOnlyBlogPostTemplate}
            \${blogPostHtml}
        </main>
    \`
}`,...(v=(b=o.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var S,f,T;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
        <heading>
            <h1>Template selector</h1>
            <label for="template-select">Select template:</label>
            <select id="template-select" name="template-select">
                <option value="compact">Compact</option>
                <option value="image-only">Image onlys</option>
                <option value="this-template-does-not-exist">Non-existent</option>
            </select>
        </heading>
        <script type="module">
            const select = document.getElementById("template-select");
            select.addEventListener("change", (event) => {
                const templateName = event.target.value;
                const main = document.querySelector("main");
                main.dataset.dynamicTemplate = templateName;
            });
        <\/script>
        <main data-dynamic-template="compact">
            \${compactBlogPostTemplateHtml}
            \${imageOnlyBlogPostTemplate}
            \${blogPostHtml}
        </main>
    \`
}`,...(T=(f=m.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};const w=["Default","CompactTemplate","ImageOnlyTemplate","TemplateSelector"];export{n as CompactTemplate,a as Default,o as ImageOnlyTemplate,m as TemplateSelector,w as __namedExportsOrder,q as default};
//# sourceMappingURL=dynamic-template.stories-Besm-T_4.js.map
