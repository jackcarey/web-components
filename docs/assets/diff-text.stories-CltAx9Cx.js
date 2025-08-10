import{C as fe,a as be}from"./utils-myoyepET.js";import{x as a}from"./iframe-P89-WGuW.js";import{DiffText as ue}from"./index-BdF9DUtU.js";import"./preload-helper-Dp1pzeXC.js";var y=Object.freeze,Se=Object.defineProperty,pe=(e,u)=>y(Se(e,"raw",{value:y(u||e.slice())})),C,w;const x=e=>a`<style>
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
            ${e.options?a(C||(C=pe([`<script>
                      const diffText = document.querySelector("diff-text");
                      diffText.options = `,`;
                  <\/script>`])),e.options):""}
        </p>
        <b>Args:</b><br />
        <pre>${JSON.stringify(e,null,2)}</pre>`,Te={...fe("diff-text",void 0,{decorators:[...be("diff-text",void 0),e=>(customElements.get("diff-text")||customElements.define("diff-text",ue),a`${e()}`)]}),render:x,parameters:{chromatic:{disableSnapshot:!0}}},r={args:{originalSelector:"#original",changedSelector:"#changed"},parameters:{chromatic:{disableSnapshot:!1}}},t={args:{originalSelector:"#original",changedSelector:"#changed",mode:"chars"},parameters:{chromatic:{disableSnapshot:!1}}},n={args:{originalSelector:"#original",changedSelector:"#changed","ignore-case":!0},parameters:{chromatic:{disableSnapshot:!1}}},c={args:{originalSelector:"#original",changedSelector:"#changed",mode:"chars","ignore-case":!0},parameters:{chromatic:{disableSnapshot:!1}}},o={args:{originalSelector:"#original",changedSelector:"#changed",mode:"chars"},render:(e,u)=>{const S=x(e);return a(w||(w=pe(["",`
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
            <\/script>`])),S)}},s={name:"Original Src (remote text)",args:{"original-src":"https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",changedSelector:"#changed"},parameters:{chromatic:{disableSnapshot:!1}}},i={name:"Changed Src (remote text)",args:{originalSelector:"#original","changed-src":"https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt"},parameters:{chromatic:{disableSnapshot:!1}}},l={name:"Both Src (remote text)",args:{"original-src":"https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt","changed-src":"https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt"},parameters:{chromatic:{disableSnapshot:!1}}},d={name:"Refresh (every 30 seconds)",args:{mode:"json","original-src":"http://numbersapi.com/random/math?json","changed-src":"http://numbersapi.com/random/math?json",refetch:30}},g={name:"Compare by attribute (title)",args:{originalSelector:"#original",changedSelector:"#changed",compare:"title",mode:"chars"},parameters:{chromatic:{disableSnapshot:!1}}},m={name:"Compare by lines",args:{"original-src":"https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text","changed-src":"https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",mode:"lines"}},h={name:"Compare arrays",args:{"original-src":"https://jsonplaceholder.typicode.com/comments?postId=1","changed-src":"https://jsonplaceholder.typicode.com/comments?postId=2",mode:"arrays"}},p={name:"Callback (on diff)",args:{originalSelector:"#original",changedSelector:"#changed",mode:"chars",options:`{
            callback: (diff) => {
                console.log("Diff callback:", diff);
                return diff;
            }
        }`},parameters:{chromatic:{disableSnapshot:!1}}},f={name:"Text Input (with diff)",args:{"original-src":"https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",changedSelector:"#text",compare:"value"},render:(e,u)=>{const S=x(e);return a`<div>
                <textarea id="text" style="width: 80ch;" rows="10" cols="80">
The quick brown fox jumps over the lazy dog.</textarea
                >
            </div>
            ${S}`}},b={render:()=>a`<diff-text contenteditable original="The quick brown fox jumps over the lazy dog." changed="The slow blue fox jumps over the sleepy dog."></diff-text>`};var T,v,j;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    originalSelector: "#original",
    changedSelector: "#changed"
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(j=(v=r.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var k,I,O;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(O=(I=t.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var $,q,D;n.parameters={...n.parameters,docs:{...($=n.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
}`,...(D=(q=n.parameters)==null?void 0:q.docs)==null?void 0:D.source}}};var A,_,z;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(z=(_=c.parameters)==null?void 0:_.docs)==null?void 0:z.source}}};var E,F,R;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(R=(F=o.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var W,B,L;s.parameters={...s.parameters,docs:{...(W=s.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(L=(B=s.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var P,J,M;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(M=(J=i.parameters)==null?void 0:J.docs)==null?void 0:M.source}}};var N,V,G;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(G=(V=l.parameters)==null?void 0:V.docs)==null?void 0:G.source}}};var H,K,Q;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: "Refresh (every 30 seconds)",
  args: {
    mode: "json",
    "original-src": "http://numbersapi.com/random/math?json",
    "changed-src": "http://numbersapi.com/random/math?json",
    refetch: 30
  }
}`,...(Q=(K=d.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var U,X,Y;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(Y=(X=g.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,ae;m.parameters={...m.parameters,docs:{...(Z=m.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  name: "Compare by lines",
  args: {
    "original-src": "https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",
    "changed-src": "https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",
    mode: "lines"
  }
}`,...(ae=(ee=m.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var re,te,ne;h.parameters={...h.parameters,docs:{...(re=h.parameters)==null?void 0:re.docs,source:{originalSource:`{
  name: "Compare arrays",
  args: {
    "original-src": "https://jsonplaceholder.typicode.com/comments?postId=1",
    "changed-src": "https://jsonplaceholder.typicode.com/comments?postId=2",
    mode: "arrays"
  }
}`,...(ne=(te=h.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var ce,oe,se;p.parameters={...p.parameters,docs:{...(ce=p.parameters)==null?void 0:ce.docs,source:{originalSource:`{
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
}`,...(se=(oe=p.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};var ie,le,de;f.parameters={...f.parameters,docs:{...(ie=f.parameters)==null?void 0:ie.docs,source:{originalSource:`{
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
}`,...(de=(le=f.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ge,me,he;b.parameters={...b.parameters,docs:{...(ge=b.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: () => {
    return html\`<diff-text contenteditable original="The quick brown fox jumps over the lazy dog." changed="The slow blue fox jumps over the sleepy dog."></diff-text>\`;
  }
}`,...(he=(me=b.parameters)==null?void 0:me.docs)==null?void 0:he.source}}};const ve=["Default","CompareChars","IgnoreCase","IgnoreCaseChars","WithChangingText","OriginalSrc","ChangedSrc","OriginalAndChangedSrc","Refresh","CompareAttr","Lines","Arrays","Callback","textInput","ContentEditable"];export{h as Arrays,p as Callback,i as ChangedSrc,g as CompareAttr,t as CompareChars,b as ContentEditable,r as Default,n as IgnoreCase,c as IgnoreCaseChars,m as Lines,l as OriginalAndChangedSrc,s as OriginalSrc,d as Refresh,o as WithChangingText,ve as __namedExportsOrder,Te as default,f as textInput};
//# sourceMappingURL=diff-text.stories-CltAx9Cx.js.map
