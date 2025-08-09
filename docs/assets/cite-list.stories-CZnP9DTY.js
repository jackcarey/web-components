import{C as k,a as M}from"./utils-GJDr8CH2.js";import{x as o}from"./iframe-Cf7u7duI.js";import{CiteList as T}from"./index-BBKkNEja.js";import"./preload-helper-Dp1pzeXC.js";var s=Object.freeze,$=Object.defineProperty,D=(t,h)=>s($(t,"raw",{value:s(t.slice())})),d;const p=t=>o`<article>
            <p>This is a paragraph with a <cite>citation 1</cite>.</p>
            <p>Another paragraph with a <cite>citation 2</cite>.</p>
            <p>And another one with a <cite>citation 3</cite>.</p>
            <p>And another one with a <cite>citation 4</cite>.</p>
            <p>And another one with a <cite>citation 5</cite>.</p>
            <p>And another one with a <cite>citation 6</cite>.</p>
            <p>And another one with a <cite>citation 7</cite>.</p>
            <p>And another one with a <cite>citation 8</cite>.</p>
            <p>And another one with a <cite>citation 9</cite>.</p>
            <p>And another one with a <cite>citation 10</cite>.</p>
        </article>
        <hr />
        <cite-list
            selector=${t.selector??""}
            limit=${t.limit??0}
            link=${t!=null&&t.link?"true":void 0}
        ></cite-list>`,F={...k("cite-list",void 0,{decorators:[...M("cite-list",void 0),t=>(customElements.get("cite-list")||customElements.define("cite-list",T),o`${t()}`)]}),render:p},e={args:{selector:"article"}},i={args:{}},n={args:{selector:"article",limit:5}},a={args:{selector:"article",link:!0},render:(t,h)=>{const r=p(t);return o`${r}
            <article>
                <p>
                    This is a paragraph with a <cite>citation 1</cite>. It should be linked to the
                    original citation.
                </p>
                <p>Another paragraph with a <cite>citation 2</cite>.</p>
                <p>And another one with a <cite>citation 3</cite>.</p>
                <p>And another one with a <cite>citation 4</cite>.</p>
                <p>And another one with a <cite>citation 5</cite>.</p>
                <p>And another one with a <cite>citation 6</cite>.</p>
                <p>And another one with a <cite>citation 7</cite>.</p>
                <p>And another one with a <cite>citation 8</cite>.</p>
                <p>And another one with a <cite>citation 9</cite>.</p>
                <p>And another one with a <cite>citation 10</cite>.</p>
                <p>And another one with a <cite>citation 11</cite>.</p>
                <p>And another one with a <cite>citation 12</cite>.</p>
                <p>And another one with a <cite>citation 13</cite>.</p>
                <p>And another one with a <cite>citation 14</cite>.</p>
                <p>And another one with a <cite>citation 15</cite>.</p>
                <p>And another one with a <cite>citation 16</cite>.</p>
                <p>And another one with a <cite>citation 17</cite>.</p>
                <p>And another one with a <cite>citation 18</cite>.</p>
                <p>And another one with a <cite>citation 19</cite>.</p>
                <p>And another one with a <cite>citation 20</cite>.</p>
                <p>And another one with a <cite>citation 21</cite>.</p>
                <p>And another one with a <cite>citation 22</cite>.</p>
                <p>And another one with a <cite>citation 23</cite>.</p>
                <p>And another one with a <cite>citation 24</cite>.</p>
                <p>And another one with a <cite>citation 25</cite>.</p>
                <p>And another one with a <cite>citation 26</cite>.</p>
                <p>And another one with a <cite>citation 27</cite>.</p>
                <p>And another one with a <cite>citation 28</cite>.</p>
                <p>And another one with a <cite>citation 29</cite>.</p>
                <p>And another one with a <cite>citation 30</cite>.</p>
            </article>
            <style>
                cite-list a {
                    color: blue;
                    text-decoration: underline;
                }
            </style>`}},c={args:{selector:"article"},render:(t,h)=>{const r=p(t);return o(d||(d=D(["",`
            <p>
                A script updates the article above. The <code>cite-list</code> will automatically
                update to reflect changes in the 'cite' elements.
            </p>
            <script>
                setInterval(() => {
                    const isAdding = Math.random() > 0.75;
                    if (isAdding) {
                        const newCite = document.createElement("cite");
                        newCite.textContent = "New citation " + (Date.now() % 1000);
                        const article = document.querySelector("article");
                        if (article) {
                            article.appendChild(newCite);
                        }
                    } else {
                        const cites = document.querySelectorAll("cite");
                        if (cites.length > 0) {
                            const randomIndex = Math.floor(Math.random() * cites.length);
                            cites[randomIndex].innerText =
                                "updated citation " + (Date.now() % 1000);
                        }
                    }
                }, 1000);
            <\/script>`])),r)}};var l,w,A;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    selector: "article"
  }
}`,...(A=(w=e.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var m,u,g;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {}
}`,...(g=(u=i.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var f,C,S;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    selector: "article",
    limit: 5
  }
}`,...(S=(C=n.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var x,y,v;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    selector: "article",
    link: true
  },
  render: (args, context) => {
    const originalStory = renderFn(args, context);
    return html\`\${originalStory}
            <article>
                <p>
                    This is a paragraph with a <cite>citation 1</cite>. It should be linked to the
                    original citation.
                </p>
                <p>Another paragraph with a <cite>citation 2</cite>.</p>
                <p>And another one with a <cite>citation 3</cite>.</p>
                <p>And another one with a <cite>citation 4</cite>.</p>
                <p>And another one with a <cite>citation 5</cite>.</p>
                <p>And another one with a <cite>citation 6</cite>.</p>
                <p>And another one with a <cite>citation 7</cite>.</p>
                <p>And another one with a <cite>citation 8</cite>.</p>
                <p>And another one with a <cite>citation 9</cite>.</p>
                <p>And another one with a <cite>citation 10</cite>.</p>
                <p>And another one with a <cite>citation 11</cite>.</p>
                <p>And another one with a <cite>citation 12</cite>.</p>
                <p>And another one with a <cite>citation 13</cite>.</p>
                <p>And another one with a <cite>citation 14</cite>.</p>
                <p>And another one with a <cite>citation 15</cite>.</p>
                <p>And another one with a <cite>citation 16</cite>.</p>
                <p>And another one with a <cite>citation 17</cite>.</p>
                <p>And another one with a <cite>citation 18</cite>.</p>
                <p>And another one with a <cite>citation 19</cite>.</p>
                <p>And another one with a <cite>citation 20</cite>.</p>
                <p>And another one with a <cite>citation 21</cite>.</p>
                <p>And another one with a <cite>citation 22</cite>.</p>
                <p>And another one with a <cite>citation 23</cite>.</p>
                <p>And another one with a <cite>citation 24</cite>.</p>
                <p>And another one with a <cite>citation 25</cite>.</p>
                <p>And another one with a <cite>citation 26</cite>.</p>
                <p>And another one with a <cite>citation 27</cite>.</p>
                <p>And another one with a <cite>citation 28</cite>.</p>
                <p>And another one with a <cite>citation 29</cite>.</p>
                <p>And another one with a <cite>citation 30</cite>.</p>
            </article>
            <style>
                cite-list a {
                    color: blue;
                    text-decoration: underline;
                }
            </style>\`;
  }
}`,...(v=(y=a.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var _,b,I;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    selector: "article"
  },
  render: (args, context) => {
    const originalStory = renderFn(args, context);
    return html\`\${originalStory}
            <p>
                A script updates the article above. The <code>cite-list</code> will automatically
                update to reflect changes in the 'cite' elements.
            </p>
            <script>
                setInterval(() => {
                    const isAdding = Math.random() > 0.75;
                    if (isAdding) {
                        const newCite = document.createElement("cite");
                        newCite.textContent = "New citation " + (Date.now() % 1000);
                        const article = document.querySelector("article");
                        if (article) {
                            article.appendChild(newCite);
                        }
                    } else {
                        const cites = document.querySelectorAll("cite");
                        if (cites.length > 0) {
                            const randomIndex = Math.floor(Math.random() * cites.length);
                            cites[randomIndex].innerText =
                                "updated citation " + (Date.now() % 1000);
                        }
                    }
                }, 1000);
            <\/script>\`;
  }
}`,...(I=(b=c.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};const O=["ArticleSelector","NoSelector","Limit","Link","ChangingCitations"];export{e as ArticleSelector,c as ChangingCitations,n as Limit,a as Link,i as NoSelector,O as __namedExportsOrder,F as default};
//# sourceMappingURL=cite-list.stories-CZnP9DTY.js.map
