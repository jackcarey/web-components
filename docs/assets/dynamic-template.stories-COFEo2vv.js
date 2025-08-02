import{C as f,a as x}from"./utils-DnHB_N_y.js";import{x as e}from"./iframe-C9fnTVbi.js";import{DynamicTemplate as P}from"./index-BWxOUyKi.js";var l=Object.freeze,H=Object.defineProperty,v=(t,_)=>l(H(t,"raw",{value:l(t.slice())})),s,p;const O={...f("dynamic-template",void 0,{decorators:[...x("dynamic-template",void 0),t=>(customElements.get("blog-post")||customElements.define("blog-post",P),e`${t()}`)]})},S=e(s||(s=v([`<script type="module">
        <\/script>`]))),m=e`
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
            </blog-post>`,T=e`
    <template id="compact-blog-post" exportparts="heading">
        <heading part="heading"><slot name="heading"></slot></heading>
        </template>`,$=e`
    <template id="image-only-blog-post" exportparts="image">
                <slot name="image" part="image"></slot>
            </template>`,a={args:{},render:()=>e`
                ${S}
        ${T}
        <main data-dynamic-template="compact">
            ${m}
        </main>
    `},n={args:{},render:()=>e`
        ${S}
        <main data-dynamic-template="image-only">
            ${$}
            ${m}
        </main>
    `},o={args:{},render:()=>e(p||(p=v([`
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
    `])),T,$,m)};var c,r,i;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
                \${defineScriptHtml}
        \${compactBlogPostTemplateHtml}
        <main data-dynamic-template="compact">
            \${blogPostHtml}
        </main>
    \`
}`,...(i=(r=a.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};var d,g,h;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
        \${defineScriptHtml}
        <main data-dynamic-template="image-only">
            \${imageOnlyBlogPostTemplate}
            \${blogPostHtml}
        </main>
    \`
}`,...(h=(g=n.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var u,y,b;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(b=(y=o.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};const E=["CompactTemplate","ImageOnlyTemplate","TemplateSelector"];export{a as CompactTemplate,n as ImageOnlyTemplate,o as TemplateSelector,E as __namedExportsOrder,O as default};
//# sourceMappingURL=dynamic-template.stories-COFEo2vv.js.map
