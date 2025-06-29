import{C as H}from"./utils-IjI6mWK9.js";import{x as e}from"./lit-element-nDyHA9i7.js";import"./iframe-BERqZ0wL.js";var s=Object.freeze,_=Object.defineProperty,x=(l,I)=>s(_(l,"raw",{value:s(l.slice())})),p,c;const O={...H("dynamic-template")},t={storyName:"Default (no content)",args:{}},$=e(p||(p=x([`<script type="module">
            import { DynamicTemplate } from "/web-components/packages/dynamic-template/index.js";
            customElements.define("blog-post", DynamicTemplate);
        <\/script>`]))),o=e`
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
        </template>`,D=e`
    <template id="image-only-blog-post" exportparts="image">
                <slot name="image" part="image"></slot>
            </template>`,a={args:{},render:()=>e`
                ${$}
        ${P}
        <main data-dynamic-template="compact">
            ${o}
        </main>
    `},n={args:{},render:()=>e`
        ${$}
        <main data-dynamic-template="image-only">
            ${D}
            ${o}
        </main>
    `},m={args:{},render:()=>e(c||(c=x([`
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
            import { DynamicTemplate } from "/web-components/packages/dynamic-template/index.js";
            customElements.define("blog-post", DynamicTemplate);
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
    `])),P,D,o)};var r,i,d;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  storyName: "Default (no content)",
  args: {}
}`,...(d=(i=t.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var g,u,y;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
                \${defineScriptHtml}
        \${compactBlogPostTemplateHtml}
        <main data-dynamic-template="compact">
            \${blogPostHtml}
        </main>
    \`
}`,...(y=(u=a.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var h,b,f;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
        \${defineScriptHtml}
        <main data-dynamic-template="image-only">
            \${imageOnlyBlogPostTemplate}
            \${blogPostHtml}
        </main>
    \`
}`,...(f=(b=n.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var T,S,v;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
            import { DynamicTemplate } from "/web-components/packages/dynamic-template/index.js";
            customElements.define("blog-post", DynamicTemplate);
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
}`,...(v=(S=m.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};const C=["Default","CompactTemplate","ImageOnlyTemplate","TemplateSelector"];export{a as CompactTemplate,t as Default,n as ImageOnlyTemplate,m as TemplateSelector,C as __namedExportsOrder,O as default};
//# sourceMappingURL=dynamic-template.stories-BM33gBeF.js.map
