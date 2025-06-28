import{C}from"./utils-D74ZNMAl.js";import{x as r}from"./iframe-_KhOljr_.js";const{within:T}=__STORYBOOK_MODULE_TEST__,w={...C("search-dom")},t={args:{}},m=r`<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li>Item 4</li>
    <li>Item 5</li>
    <li>Item 6</li>
    <li>Item 7</li>
    <li>Item 8</li>
    <li>Item 9</li>
    <li>Item 10</li>
    <li>Item 11</li>
    <li>Item 12</li>
    <li>Item 13</li>
    <li>Item 14</li>
    <li>Item 15</li>
    <li>Item 16</li>
    <li>Item 17</li>
    <li>Item 18</li>
    <li>Item 19</li>
    <li>Item 20</li>
    <li>Item A</li>
    <li>Item B</li>
    <li>Item C</li>
    <li>Item D</li>
    <li>Item E</li>
    <li>Item F</li>
    <li>Item G</li>
    <li>Item H</li>
    <li>Item I</li>
    <li>Item J</li>
    <li>Item K</li>
    <li>Item L</li>
    <li>Item M</li>
    <li>Item N</li>
    <li>Item O</li>
    <li>Item P</li>
    <li>Item Q</li>
    <li>Item R</li>
    <li>Item S</li>
    <li>Item T</li>
    <li>Item U</li>
    <li>Item V</li>
    <li>Item W</li>
    <li>Item X</li>
    <li>Item Y</li>
    <li>Item Z</li>
</ul>`,i={args:{},render:e=>r`<search-dom target="ul" items="li">
                <input type="search" />
            </search-dom>
            ${m}`},l={args:{},render:e=>r`<search-dom target="ul" items="li" mode="matchCase">
                <input type="search" />
            </search-dom>
            ${m}`},a={args:{},render:e=>r`<search-dom target="ul" items="li" mode="matchCase">
                <input type="search" data-testid="input" />
            </search-dom>
            ${m}`,play:async({canvasElement:e,step:v})=>{const s=T(e).getByTestId("input");await v("Type 'Item 2'",async()=>{s.focus(),s.value="Item 1",s.dispatchEvent(new Event("input",{bubbles:!0}))})}};var n,c,o;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {}
}`,...(o=(c=t.parameters)==null?void 0:c.docs)==null?void 0:o.source}}};var u,I,p;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  render: _args => {
    return html\`<search-dom target="ul" items="li">
                <input type="search" />
            </search-dom>
            \${ulHtml}\`;
  }
}`,...(p=(I=i.parameters)==null?void 0:I.docs)==null?void 0:p.source}}};var d,h,g;l.parameters={...l.parameters,docs:{...(d=l.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {},
  render: _args => {
    return html\`<search-dom target="ul" items="li" mode="matchCase">
                <input type="search" />
            </search-dom>
            \${ulHtml}\`;
  }
}`,...(g=(h=l.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var y,E,_;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {},
  render: _args => {
    return html\`<search-dom target="ul" items="li" mode="matchCase">
                <input type="search" data-testid="input" />
            </search-dom>
            \${ulHtml}\`;
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const inputEl = canvas.getByTestId("input") as HTMLInputElement;
    await step("Type 'Item 2'", async () => {
      inputEl.focus();
      inputEl.value = "Item 1";
      inputEl.dispatchEvent(new Event("input", {
        bubbles: true
      }));
    });
  }
}`,...(_=(E=a.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};const D=["Default","Demo","MatchCase","AutoFilled"];export{a as AutoFilled,t as Default,i as Demo,l as MatchCase,D as __namedExportsOrder,w as default};
//# sourceMappingURL=search-dom.stories-B9y7B0Yo.js.map
