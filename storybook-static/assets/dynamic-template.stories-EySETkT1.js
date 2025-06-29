import{C as _}from"./utils-D93jUd5a.js";import{x as e}from"./lit-element-nDyHA9i7.js";import"./iframe-D4AR5I4h.js";var p=Object.freeze,I=Object.defineProperty,o=(s,j)=>p(I(s,"raw",{value:p(s.slice())})),c,i,r;const H={..._("dynamic-template")},t={args:{}},l=e`
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
        </template>`,E=e`
    <template id="image-only-blog-post" exportparts="image">
                <slot name="image" part="image"></slot>
            </template>`,a={args:{},render:()=>e(c||(c=o([`
        <script type="module">
            import { DynamicTemplate } from "../packages/dynamic-template/index.js";
            customElements.define("blog-post", DynamicTemplate);
        <\/script>
        `,`
        <main data-dynamic-template="compact">
            `,`
        </main>
    `])),P,l)},n={args:{},render:()=>e(i||(i=o([`
        <script type="module">
            import { DynamicTemplate } from "../packages/dynamic-template/index.js";
            customElements.define("blog-post", DynamicTemplate);
        <\/script>
        <main data-dynamic-template="image-only">
            `,`
            `,`
        </main>
    `])),E,l)},m={args:{},render:()=>e(r||(r=o([`
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
            import { DynamicTemplate } from "../packages/dynamic-template/index.js";
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
    `])),P,E,l)};var d,g,y;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {}
}`,...(y=(g=t.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var u,h,T;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
        <script type="module">
            import { DynamicTemplate } from "../packages/dynamic-template/index.js";
            customElements.define("blog-post", DynamicTemplate);
        <\/script>
        \${compactBlogPostTemplateHtml}
        <main data-dynamic-template="compact">
            \${blogPostHtml}
        </main>
    \`
}`,...(T=(h=a.parameters)==null?void 0:h.docs)==null?void 0:T.source}}};var b,f,v;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
        <script type="module">
            import { DynamicTemplate } from "../packages/dynamic-template/index.js";
            customElements.define("blog-post", DynamicTemplate);
        <\/script>
        <main data-dynamic-template="image-only">
            \${imageOnlyBlogPostTemplate}
            \${blogPostHtml}
        </main>
    \`
}`,...(v=(f=n.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var x,S,D;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
            import { DynamicTemplate } from "../packages/dynamic-template/index.js";
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
}`,...(D=(S=m.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};const $=["Default","CompactTemplate","ImageOnlyTemplate","TemplateSelector"];export{a as CompactTemplate,t as Default,n as ImageOnlyTemplate,m as TemplateSelector,$ as __namedExportsOrder,H as default};
//# sourceMappingURL=dynamic-template.stories-EySETkT1.js.map
