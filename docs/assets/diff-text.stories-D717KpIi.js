import{C as oe,a as ie}from"./utils-BaFf26T9.js";import{x as p}from"./iframe-DXaciqSX.js";import{DiffText as de}from"./index-DmxYItOB.js";var b=Object.freeze,ge=Object.defineProperty,te=(e,f)=>b(ge(e,"raw",{value:b(f||e.slice())})),u,x;const ce=e=>p`<style>
            diff-text {
                display: block;
                border: 1px solid #ccc;
                min-height: 1em;
            }
            .diff-text-removed {
                background-color: #ffcccc;
                text-decoration: line-through;
            }
            .diff-text-added {
                background-color: #ccffcc;
            }
        </style>
        <b>#original text:</b><br />
        <p id="original" title="The original title">
            The FIVE boxing Wizards jump quickly. (original span)
        </p>
        <b>#changed text:</b><br />
        <p id="changed" title="A changed title">
            the five boxing wizards jump quickly. (changed span)
        </p>
        <b>Diff Text Component:</b>
        <p>
            <diff-text
                original="${e.original}"
                changed="${e.changed}"
                original-src="${e["original-src"]}"
                changed-src="${e["changed-src"]}"
                mode="${e.mode}"
                compare="${e.compare}"
                ignore-case="${e["ignore-case"]}"
                refetch="${e.refetch}"
            ></diff-text>
            ${e.options?p(u||(u=te([`<script>
                      const diffText = document.querySelector("diff-text");
                      diffText.options = `,`;
                  <\/script>`])),e.options):""}
        </p>
        <b>Args:</b><br />
        <pre>${JSON.stringify(e,null,2)}</pre>`,pe={...oe("diff-text",void 0,{decorators:[...ie("diff-text",void 0),e=>(customElements.get("diff-text")||customElements.define("diff-text",de),p`${e()}`)]}),render:ce,parameters:{chromatic:{disableSnapshot:!0}}},a={args:{original:"#original",changed:"#changed"},parameters:{chromatic:{disableSnapshot:!1}}},r={args:{original:"#original",changed:"#changed",mode:"chars"},parameters:{chromatic:{disableSnapshot:!1}}},n={args:{original:"#original",changed:"#changed","ignore-case":!0},parameters:{chromatic:{disableSnapshot:!1}}},t={args:{original:"#original",changed:"#changed",mode:"chars","ignore-case":!0},parameters:{chromatic:{disableSnapshot:!1}}},c={args:{original:"#original",changed:"#changed",mode:"chars"},render:(e,f)=>{const se=ce(e);return p(x||(x=te(["",`
            <script>
                let originalText = document.querySelector("#original");
                let changedText = document.querySelector("#changed");
                const setOriginal = () => {
                    originalText.textContent = \`This will change 250ms. \${new Date().toISOString()}\`;
                };
                setInterval(setOriginal, 250);
                setOriginal();
                const setChanged = () => {
                    changedText.textContent = \`This will change every second. \${new Date().toISOString()}\`;
                };
                setChanged();
                setInterval(setChanged, 1000);
            <\/script>`],["",`
            <script>
                let originalText = document.querySelector("#original");
                let changedText = document.querySelector("#changed");
                const setOriginal = () => {
                    originalText.textContent = \\\`This will change 250ms. \\\${new Date().toISOString()}\\\`;
                };
                setInterval(setOriginal, 250);
                setOriginal();
                const setChanged = () => {
                    changedText.textContent = \\\`This will change every second. \\\${new Date().toISOString()}\\\`;
                };
                setChanged();
                setInterval(setChanged, 1000);
            <\/script>`])),se)}},s={name:"Original Src (remote text)",args:{"original-src":"https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",changed:"#changed"},parameters:{chromatic:{disableSnapshot:!1}}},o={name:"Changed Src (remote text)",args:{original:"#original","changed-src":"https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt"},parameters:{chromatic:{disableSnapshot:!1}}},i={name:"Both Src (remote text)",args:{"original-src":"https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt","changed-src":"https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt"},parameters:{chromatic:{disableSnapshot:!1}}},d={name:"Refresh (every 30 seconds)",args:{mode:"json","original-src":"http://numbersapi.com/random/math?json","changed-src":"http://numbersapi.com/random/math?json",refetch:30}},g={name:"Compare by attribute (title)",args:{original:"#original",changed:"#changed",compare:"title",mode:"chars"},parameters:{chromatic:{disableSnapshot:!1}}},m={name:"Compare by lines",args:{"original-src":"https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text","changed-src":"https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",mode:"lines"}},l={name:"Compare arrays",args:{"original-src":"https://jsonplaceholder.typicode.com/comments?postId=1","changed-src":"https://jsonplaceholder.typicode.com/comments?postId=2",mode:"arrays"}},h={name:"Callback (on diff)",args:{original:"#original",changed:"#changed",mode:"chars",options:`{
            callback: (diff) => {
                console.log("Diff callback:", diff);
                return diff;
            }
        }`},parameters:{chromatic:{disableSnapshot:!1}}};var S,C,y;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    original: "#original",
    changed: "#changed"
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(y=(C=a.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};var T,O,j;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    original: "#original",
    changed: "#changed",
    mode: "chars"
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(j=(O=r.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var w,I,k;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    original: "#original",
    changed: "#changed",
    "ignore-case": true
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(k=(I=n.parameters)==null?void 0:I.docs)==null?void 0:k.source}}};var v,$,D;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    original: "#original",
    changed: "#changed",
    mode: "chars",
    "ignore-case": true
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(D=($=t.parameters)==null?void 0:$.docs)==null?void 0:D.source}}};var _,q,A;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    original: "#original",
    changed: "#changed",
    mode: "chars"
  },
  render: (args: Args, context) => {
    const originalStory = renderFn(args, context);
    return html\`\${originalStory}
            <script>
                let originalText = document.querySelector("#original");
                let changedText = document.querySelector("#changed");
                const setOriginal = () => {
                    originalText.textContent = \\\`This will change 250ms. \\\${new Date().toISOString()}\\\`;
                };
                setInterval(setOriginal, 250);
                setOriginal();
                const setChanged = () => {
                    changedText.textContent = \\\`This will change every second. \\\${new Date().toISOString()}\\\`;
                };
                setChanged();
                setInterval(setChanged, 1000);
            <\/script>\`;
  }
}`,...(A=(q=c.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};var z,E,R;s.parameters={...s.parameters,docs:{...(z=s.parameters)==null?void 0:z.docs,source:{originalSource:`{
  name: "Original Src (remote text)",
  args: {
    "original-src": "https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",
    changed: "#changed"
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(R=(E=s.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var F,W,B;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: "Changed Src (remote text)",
  args: {
    original: "#original",
    "changed-src": "https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt"
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(B=(W=o.parameters)==null?void 0:W.docs)==null?void 0:B.source}}};var L,P,J;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: "Both Src (remote text)",
  args: {
    "original-src": "https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",
    "changed-src": "https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt"
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(J=(P=i.parameters)==null?void 0:P.docs)==null?void 0:J.source}}};var M,N,V;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: "Refresh (every 30 seconds)",
  args: {
    mode: "json",
    "original-src": "http://numbersapi.com/random/math?json",
    "changed-src": "http://numbersapi.com/random/math?json",
    refetch: 30
  }
}`,...(V=(N=d.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var G,H,K;g.parameters={...g.parameters,docs:{...(G=g.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: "Compare by attribute (title)",
  args: {
    original: "#original",
    changed: "#changed",
    compare: "title",
    mode: "chars"
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(K=(H=g.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};var Q,U,X;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  name: "Compare by lines",
  args: {
    "original-src": "https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",
    "changed-src": "https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",
    mode: "lines"
  }
}`,...(X=(U=m.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,Z,ee;l.parameters={...l.parameters,docs:{...(Y=l.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: "Compare arrays",
  args: {
    "original-src": "https://jsonplaceholder.typicode.com/comments?postId=1",
    "changed-src": "https://jsonplaceholder.typicode.com/comments?postId=2",
    mode: "arrays"
  }
}`,...(ee=(Z=l.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ae,re,ne;h.parameters={...h.parameters,docs:{...(ae=h.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  name: "Callback (on diff)",
  args: {
    original: "#original",
    changed: "#changed",
    mode: "chars",
    options: \`{
            callback: (diff) => {
                console.log("Diff callback:", diff);
                return diff;
            }
        }\`
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(ne=(re=h.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};const fe=["Default","CompareChars","IgnoreCase","IgnoreCaseChars","WithChangingText","OriginalSrc","ChangedSrc","OriginalAndChangedSrc","Refresh","CompareAttr","Lines","Arrays","Callback"];export{l as Arrays,h as Callback,o as ChangedSrc,g as CompareAttr,r as CompareChars,a as Default,n as IgnoreCase,t as IgnoreCaseChars,m as Lines,i as OriginalAndChangedSrc,s as OriginalSrc,d as Refresh,c as WithChangingText,fe as __namedExportsOrder,pe as default};
//# sourceMappingURL=diff-text.stories-D717KpIi.js.map
