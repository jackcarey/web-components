import{C as ge,a as me}from"./utils-SvnO37ji.js";import{x as a}from"./iframe-DXcwr4NL.js";import{DiffText as he}from"./index-0yzVpPKN.js";var x=Object.freeze,pe=Object.defineProperty,de=(e,b)=>x(pe(e,"raw",{value:x(b||e.slice())})),y,C;const S=e=>a`<style>
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
            ${e.options?a(y||(y=de([`<script>
                      const diffText = document.querySelector("diff-text");
                      diffText.options = `,`;
                  <\/script>`])),e.options):""}
        </p>
        <b>Args:</b><br />
        <pre>${JSON.stringify(e,null,2)}</pre>`,Se={...ge("diff-text",void 0,{decorators:[...me("diff-text",void 0),e=>(customElements.get("diff-text")||customElements.define("diff-text",he),a`${e()}`)]}),render:S,parameters:{chromatic:{disableSnapshot:!0}}},r={args:{originalSelector:"#original",changedSelector:"#changed"},parameters:{chromatic:{disableSnapshot:!1}}},t={args:{originalSelector:"#original",changedSelector:"#changed",mode:"chars"},parameters:{chromatic:{disableSnapshot:!1}}},n={args:{originalSelector:"#original",changedSelector:"#changed","ignore-case":!0},parameters:{chromatic:{disableSnapshot:!1}}},c={args:{originalSelector:"#original",changedSelector:"#changed",mode:"chars","ignore-case":!0},parameters:{chromatic:{disableSnapshot:!1}}},o={args:{originalSelector:"#original",changedSelector:"#changed",mode:"chars"},render:(e,b)=>{const u=S(e);return a(C||(C=de(["",`
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
            <\/script>`])),u)}},s={name:"Original Src (remote text)",args:{"original-src":"https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",changedSelector:"#changed"},parameters:{chromatic:{disableSnapshot:!1}}},i={name:"Changed Src (remote text)",args:{originalSelector:"#original","changed-src":"https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt"},parameters:{chromatic:{disableSnapshot:!1}}},l={name:"Both Src (remote text)",args:{"original-src":"https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt","changed-src":"https://gist.githubusercontent.com/jackcarey/d8098b3784dcce32f9a4266c89bc1148/raw/abb8bb4d96fadb307997bf1592283b727910f798/other-text.txt"},parameters:{chromatic:{disableSnapshot:!1}}},d={name:"Refresh (every 30 seconds)",args:{mode:"json","original-src":"http://numbersapi.com/random/math?json","changed-src":"http://numbersapi.com/random/math?json",refetch:30}},g={name:"Compare by attribute (title)",args:{originalSelector:"#original",changedSelector:"#changed",compare:"title",mode:"chars"},parameters:{chromatic:{disableSnapshot:!1}}},m={name:"Compare by lines",args:{"original-src":"https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text","changed-src":"https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",mode:"lines"}},h={name:"Compare arrays",args:{"original-src":"https://jsonplaceholder.typicode.com/comments?postId=1","changed-src":"https://jsonplaceholder.typicode.com/comments?postId=2",mode:"arrays"}},p={name:"Callback (on diff)",args:{originalSelector:"#original",changedSelector:"#changed",mode:"chars",options:`{
            callback: (diff) => {
                console.log("Diff callback:", diff);
                return diff;
            }
        }`},parameters:{chromatic:{disableSnapshot:!1}}},f={name:"Text Input (with diff)",args:{"original-src":"https://gist.githubusercontent.com/jackcarey/8ba2b5b02fb1371171e268f4a557e7bf/raw/0ea3c70a4ecc6183c6a63c820eabfc15a4c97c71/text.txt",changedSelector:"#text",compare:"value"},render:(e,b)=>{const u=S(e);return a`<div>
                <textarea id="text" style="width: 80ch;" rows="10" cols="80">
The quick brown fox jumps over the lazy dog.</textarea
                >
            </div>
            ${u}`}};var w,T,v;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    originalSelector: "#original",
    changedSelector: "#changed"
  },
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  }
}`,...(v=(T=r.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var j,I,O;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(O=(I=t.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var k,$,D;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(D=($=n.parameters)==null?void 0:$.docs)==null?void 0:D.source}}};var q,A,_;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(_=(A=c.parameters)==null?void 0:A.docs)==null?void 0:_.source}}};var z,E,F;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(F=(E=o.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var R,W,B;s.parameters={...s.parameters,docs:{...(R=s.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(B=(W=s.parameters)==null?void 0:W.docs)==null?void 0:B.source}}};var L,P,J;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(J=(P=i.parameters)==null?void 0:P.docs)==null?void 0:J.source}}};var M,N,V;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(V=(N=l.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var G,H,K;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: "Refresh (every 30 seconds)",
  args: {
    mode: "json",
    "original-src": "http://numbersapi.com/random/math?json",
    "changed-src": "http://numbersapi.com/random/math?json",
    refetch: 30
  }
}`,...(K=(H=d.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};var Q,U,X;g.parameters={...g.parameters,docs:{...(Q=g.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(X=(U=g.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,Z,ee;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: "Compare by lines",
  args: {
    "original-src": "https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",
    "changed-src": "https://baconipsum.com/api/?type=meat-and-filler&paras=3&format=text",
    mode: "lines"
  }
}`,...(ee=(Z=m.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ae,re,te;h.parameters={...h.parameters,docs:{...(ae=h.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  name: "Compare arrays",
  args: {
    "original-src": "https://jsonplaceholder.typicode.com/comments?postId=1",
    "changed-src": "https://jsonplaceholder.typicode.com/comments?postId=2",
    mode: "arrays"
  }
}`,...(te=(re=h.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var ne,ce,oe;p.parameters={...p.parameters,docs:{...(ne=p.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
}`,...(oe=(ce=p.parameters)==null?void 0:ce.docs)==null?void 0:oe.source}}};var se,ie,le;f.parameters={...f.parameters,docs:{...(se=f.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
}`,...(le=(ie=f.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};const xe=["Default","CompareChars","IgnoreCase","IgnoreCaseChars","WithChangingText","OriginalSrc","ChangedSrc","OriginalAndChangedSrc","Refresh","CompareAttr","Lines","Arrays","Callback","textInput"];export{h as Arrays,p as Callback,i as ChangedSrc,g as CompareAttr,t as CompareChars,r as Default,n as IgnoreCase,c as IgnoreCaseChars,m as Lines,l as OriginalAndChangedSrc,s as OriginalSrc,d as Refresh,o as WithChangingText,xe as __namedExportsOrder,Se as default,f as textInput};
//# sourceMappingURL=diff-text.stories-Ca0ZMJXG.js.map
