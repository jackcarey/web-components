import{C as Se,a as ye}from"./utils-Ne3suSHS.js";import{x as t}from"./iframe-BHeXILAi.js";import{DiffText as Ce}from"./index-B3yqPV8f.js";import"./preload-helper-Dp1pzeXC.js";var C=Object.freeze,ke=Object.defineProperty,xe=(e,x)=>C(ke(e,"raw",{value:C(x||e.slice())})),k,v;const y=e=>t`<style>
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
                original-selector="${e.originalSelector}"
                changed-selector="${e.changedSelector}"
                original-src="${e["original-src"]}"
                changed-src="${e["changed-src"]}"
                mode="${e.mode}"
                compare="${e.compare}"
                ignore-case="${e["ignore-case"]}"
                refetch="${e.refetch}"
            ></diff-text>
            ${e.options?t(k||(k=xe([`<script>
                      const diffText = document.querySelector("diff-text");
                      diffText.options = `,`;
                  <\/script>`])),e.options):""}
        </p>
        <b>Args:</b><br />
        <pre>${JSON.stringify(e,null,2)}</pre>`,Ie={...Se("diff-text",void 0,{decorators:[...ye("diff-text",void 0),e=>(customElements.get("diff-text")||customElements.define("diff-text",Ce),t`${e()}`)]}),render:y,parameters:{chromatic:{disableSnapshot:!0}}},r={args:{originalSelector:"#original",changedSelector:"#changed"},parameters:{chromatic:{disableSnapshot:!1}}},a={args:{originalSelector:"#original",changedSelector:"#changed",mode:"chars"},parameters:{chromatic:{disableSnapshot:!1}}},n={args:{originalSelector:"#original",changedSelector:"#changed","ignore-case":!0},parameters:{chromatic:{disableSnapshot:!1}}},c={args:{originalSelector:"#original",changedSelector:"#changed",mode:"chars","ignore-case":!0},parameters:{chromatic:{disableSnapshot:!1}}},o={args:{originalSelector:"#original",changedSelector:"#changed",mode:"chars"},render:(e,x)=>{const S=y(e);return t(v||(v=xe(["",`
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
            <\/script>`])),S)}},s={name:"Original Src (remote text)",args:{"original-src":"https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",changedSelector:"#changed"},parameters:{chromatic:{disableSnapshot:!1}}},i={name:"Changed Src (remote text)",args:{originalSelector:"#original","changed-src":"https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt"},parameters:{chromatic:{disableSnapshot:!1}}},d={name:"Both Src (remote text)",args:{"original-src":"https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt","changed-src":"https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt"},parameters:{chromatic:{disableSnapshot:!1}}},l={name:"Refresh (every 30 seconds)",args:{mode:"json","original-src":"http://numbersapi.com/random/math?json","changed-src":"http://numbersapi.com/random/math?json",refetch:30}},g={name:"Compare by attribute (title)",args:{originalSelector:"#original",changedSelector:"#changed",compare:"title",mode:"chars"},parameters:{chromatic:{disableSnapshot:!1}}},m={name:"Compare by lines",args:{"original-src":"https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text","changed-src":"https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",mode:"lines"}},h={name:"Compare arrays",args:{"original-src":"https://jsonplaceholder.typicode.com/comments?postId=1","changed-src":"https://jsonplaceholder.typicode.com/comments?postId=2",mode:"arrays"}},p={name:"Callback (on diff)",args:{originalSelector:"#original",changedSelector:"#changed",mode:"chars",options:`{
            callback: (diff) => {
                console.log("Diff callback:", diff);
                return diff;
            }
        }`},parameters:{chromatic:{disableSnapshot:!1}}},f={name:"Text Input (with diff)",args:{"original-src":"https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",changedSelector:"#text",compare:"value"},render:(e,x)=>{const S=y(e);return t`<div>
                <textarea id="text" style="width: 80ch;" rows="10" cols="80">
The quick brown fox jumps over the lazy dog.</textarea
                >
            </div>
            ${S}`}},b={render:()=>t`<style>
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
        </style><diff-text contenteditable original="The quick brown fox jumps over the lazy dog." changed="The slow blue fox jumps over the sleepy dog."></diff-text>`},u={name:"Content editable (self)",render:()=>t`<style>
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
        </style><diff-text contenteditable id="diff-self" original="The quick brown fox jumps over the lazy dog." changed-selector="#diff-self"></diff-text>`};var w,T,j;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    originalSelector: "#original",
    changedSelector: "#changed"
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(j=(T=r.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};var I,O,$;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    originalSelector: "#original",
    changedSelector: "#changed",
    mode: "chars"
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...($=(O=a.parameters)==null?void 0:O.docs)==null?void 0:$.source}}};var q,D,z;n.parameters={...n.parameters,docs:{...(q=n.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    originalSelector: "#original",
    changedSelector: "#changed",
    "ignore-case": true
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(z=(D=n.parameters)==null?void 0:D.docs)==null?void 0:z.source}}};var A,_,E;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    originalSelector: "#original",
    changedSelector: "#changed",
    mode: "chars",
    "ignore-case": true
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(E=(_=c.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};var F,R,W;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    originalSelector: "#original",
    changedSelector: "#changed",
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
}`,...(W=(R=o.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var B,L,P;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Original Src (remote text)",
  args: {
    "original-src": "https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",
    changedSelector: "#changed"
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(P=(L=s.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var J,M,N;i.parameters={...i.parameters,docs:{...(J=i.parameters)==null?void 0:J.docs,source:{originalSource:`{
  name: "Changed Src (remote text)",
  args: {
    originalSelector: "#original",
    "changed-src": "https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt"
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(N=(M=i.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};var V,G,H;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(H=(G=d.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var K,Q,U;l.parameters={...l.parameters,docs:{...(K=l.parameters)==null?void 0:K.docs,source:{originalSource:`{
  name: "Refresh (every 30 seconds)",
  args: {
    mode: "json",
    "original-src": "http://numbersapi.com/random/math?json",
    "changed-src": "http://numbersapi.com/random/math?json",
    refetch: 30
  }
}`,...(U=(Q=l.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,Z;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: "Compare by attribute (title)",
  args: {
    originalSelector: "#original",
    changedSelector: "#changed",
    compare: "title",
    mode: "chars"
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,te,re;m.parameters={...m.parameters,docs:{...(ee=m.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  name: "Compare by lines",
  args: {
    "original-src": "https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",
    "changed-src": "https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",
    mode: "lines"
  }
}`,...(re=(te=m.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};var ae,ne,ce;h.parameters={...h.parameters,docs:{...(ae=h.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  name: "Compare arrays",
  args: {
    "original-src": "https://jsonplaceholder.typicode.com/comments?postId=1",
    "changed-src": "https://jsonplaceholder.typicode.com/comments?postId=2",
    mode: "arrays"
  }
}`,...(ce=(ne=h.parameters)==null?void 0:ne.docs)==null?void 0:ce.source}}};var oe,se,ie;p.parameters={...p.parameters,docs:{...(oe=p.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  name: "Callback (on diff)",
  args: {
    originalSelector: "#original",
    changedSelector: "#changed",
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
}`,...(ie=(se=p.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var de,le,ge;f.parameters={...f.parameters,docs:{...(de=f.parameters)==null?void 0:de.docs,source:{originalSource:`{
  name: "Text Input (with diff)",
  args: {
    "original-src": "https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",
    changedSelector: "#text",
    compare: "value"
  },
  render: (args: Args, context) => {
    const originalStory = renderFn(args, context);
    return html\`<div>
                <textarea id="text" style="width: 80ch;" rows="10" cols="80">
The quick brown fox jumps over the lazy dog.</textarea
                >
            </div>
            \${originalStory}\`;
  }
}`,...(ge=(le=f.parameters)==null?void 0:le.docs)==null?void 0:ge.source}}};var me,he,pe;b.parameters={...b.parameters,docs:{...(me=b.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: () => {
    return html\`<style>
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
        </style><diff-text contenteditable original="The quick brown fox jumps over the lazy dog." changed="The slow blue fox jumps over the sleepy dog."></diff-text>\`;
  }
}`,...(pe=(he=b.parameters)==null?void 0:he.docs)==null?void 0:pe.source}}};var fe,be,ue;u.parameters={...u.parameters,docs:{...(fe=u.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  name: "Content editable (self)",
  render: () => {
    return html\`<style>
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
        </style><diff-text contenteditable id="diff-self" original="The quick brown fox jumps over the lazy dog." changed-selector="#diff-self"></diff-text>\`;
  }
}`,...(ue=(be=u.parameters)==null?void 0:be.docs)==null?void 0:ue.source}}};const Oe=["Default","CompareChars","IgnoreCase","IgnoreCaseChars","WithChangingText","OriginalSrc","ChangedSrc","OriginalAndChangedSrc","Refresh","CompareAttr","Lines","Arrays","Callback","textInput","ContentEditable","ContentEditableSelf"];export{h as Arrays,p as Callback,i as ChangedSrc,g as CompareAttr,a as CompareChars,b as ContentEditable,u as ContentEditableSelf,r as Default,n as IgnoreCase,c as IgnoreCaseChars,m as Lines,d as OriginalAndChangedSrc,s as OriginalSrc,l as Refresh,o as WithChangingText,Oe as __namedExportsOrder,Ie as default,f as textInput};
//# sourceMappingURL=diff-text.stories-1MGv8nkO.js.map
