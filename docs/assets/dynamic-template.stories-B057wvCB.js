import{C as T,a as S}from"./utils-BGnRfRiN.js";import{x as e}from"./iframe-z7QUzD2A.js";import{DynamicTemplate as f}from"./index-BHme9soo.js";import"./preload-helper-Dp1pzeXC.js";var l=Object.freeze,x=Object.defineProperty,P=(t,$)=>l(x(t,"raw",{value:l(t.slice())})),s;const O={...T("dynamic-template",void 0,{decorators:[...S("dynamic-template",void 0),t=>(customElements.get("blog-post")||customElements.define("blog-post",f),e`${t()}`)]})},m=e`
            <blog-post>
                <h1 slot="heading">Some title</h1>
                <img src="https://picsum.photos/100" alt="Image" slot="image">
                <p>Some text</p>
            </blog-post>
            <blog-post>
                <h1 slot="heading">Some title 2</h1>
                <img src="https://picsum.photos/100" alt="Image" slot="image">
                <p>Some text 2</p>
            </blog-post>
            <blog-post>
                <h1 slot="heading">Some title 3</h1>
                <img src="https://picsum.photos/100" alt="Image" slot="image">
                <p>Some text 3</p>
            </blog-post>`,v=e`
    <template id="compact-blog-post" exportparts="heading">
        <heading part="heading"><slot name="heading"></slot></heading>
        </template>`,b=e`
    <template id="image-only-blog-post" exportparts="image">
                <slot name="image" part="image"></slot>
            </template>`,a={args:{},render:()=>e`
        ${v}
        <main data-dynamic-template="compact">
            ${m}
        </main>
    `},n={args:{},render:()=>e`
        <main data-dynamic-template="image-only">
            ${b}
            ${m}
        </main>
    `},o={args:{},render:()=>e(s||(s=P([`
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
    `])),v,b,m)};var p,c,r;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
        \${compactBlogPostTemplateHtml}
        <main data-dynamic-template="compact">
            \${blogPostHtml}
        </main>
    \`
}`,...(r=(c=a.parameters)==null?void 0:c.docs)==null?void 0:r.source}}};var i,g,d;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
        <main data-dynamic-template="image-only">
            \${imageOnlyBlogPostTemplate}
            \${blogPostHtml}
        </main>
    \`
}`,...(d=(g=n.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};var h,u,y;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(y=(u=o.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};const E=["CompactTemplate","ImageOnlyTemplate","TemplateSelector"];export{a as CompactTemplate,n as ImageOnlyTemplate,o as TemplateSelector,E as __namedExportsOrder,O as default};
//# sourceMappingURL=dynamic-template.stories-B057wvCB.js.map
