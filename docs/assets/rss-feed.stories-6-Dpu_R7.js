import{C as M}from"./utils-Bk6qYvED.js";import{x as e}from"./iframe-CZ9ljJln.js";const L={...M("rss-feed")},s={args:{proxy:"https://corsproxy.io/?url="}},r={args:{},render:()=>e`
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <h2><slot name="title"></slot></h2>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        `},t={args:{},render:()=>e`
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <h2><slot name="title"></slot></h2>
                    <time><slot name="pubDate"></slot></time>
                    <p><slot name="content"></slot></p>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        `},o={args:{},render:()=>e`
            <style>
                rss-feed {
                    display: grid;
                    gap: 1rem;
                    grid-template-columns: 1fr 1fr;
                    font-family: sans-serif;
                    margin: 1rem;
                }
                rss-feed h2 {
                    font-size: 1.5rem;
                    margin: 0;
                }
                rss-feed time {
                    font-size: 0.75rem;
                    color: gray;
                }
                rss-feed p {
                    font-size: 1rem;
            </style>
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <div>
                        <h2><slot name="title"></slot></h2>
                        <time><slot name="pubDate"></slot></time>
                        <p><slot name="contentSnippet"></slot></p>
                    </div>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        `},n={args:{},render:()=>e`
            <rss-feed proxy="https://corsproxy.io/?url=" link="_blank">
                <template>
                    <h2><slot name="title"></slot></h2>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        `},l={args:{},render:()=>e`
            <rss-feed
                proxy="https://corsproxy.io/?url="
                link="_blank"
                customFields="media:thumbnail"
            >
                <template>
                    <h2><slot name="title"></slot></h2>
                    <span><slot name="media:thumbnail"></slot></span>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        `},a={args:{},render:()=>e`
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <h2><slot name="title"></slot></h2>
                </template>
                <source src="https://www1.cbn.com/rss-cbn-news-world.xml" />
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml" />
                <source src="https://www.aljazeera.com/xml/rss/all.xml" />
                <source src="https://www.theguardian.com/world/rss" />
                <source src="https://www.npr.org/rss/rss.php?id=1004" />
                <source src="http://www.dictionary.com/wordoftheday/wotd.rss" />
            </rss-feed>
        `};var c,p,m;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    proxy: "https://corsproxy.io/?url="
  }
}`,...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var d,i,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <h2><slot name="title"></slot></h2>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        \`
}`,...(u=(i=r.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var h,f,w;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <h2><slot name="title"></slot></h2>
                    <time><slot name="pubDate"></slot></time>
                    <p><slot name="content"></slot></p>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        \`
}`,...(w=(f=t.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var x,y,b;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
            <style>
                rss-feed {
                    display: grid;
                    gap: 1rem;
                    grid-template-columns: 1fr 1fr;
                    font-family: sans-serif;
                    margin: 1rem;
                }
                rss-feed h2 {
                    font-size: 1.5rem;
                    margin: 0;
                }
                rss-feed time {
                    font-size: 0.75rem;
                    color: gray;
                }
                rss-feed p {
                    font-size: 1rem;
            </style>
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <div>
                        <h2><slot name="title"></slot></h2>
                        <time><slot name="pubDate"></slot></time>
                        <p><slot name="contentSnippet"></slot></p>
                    </div>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        \`
}`,...(b=(y=o.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var g,k,S;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
            <rss-feed proxy="https://corsproxy.io/?url=" link="_blank">
                <template>
                    <h2><slot name="title"></slot></h2>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        \`
}`,...(S=(k=n.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var z,D,_;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
            <rss-feed
                proxy="https://corsproxy.io/?url="
                link="_blank"
                customFields="media:thumbnail"
            >
                <template>
                    <h2><slot name="title"></slot></h2>
                    <span><slot name="media:thumbnail"></slot></span>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        \`
}`,...(_=(D=l.parameters)==null?void 0:D.docs)==null?void 0:_.source}}};var C,v,F;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <h2><slot name="title"></slot></h2>
                </template>
                <source src="https://www1.cbn.com/rss-cbn-news-world.xml" />
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml" />
                <source src="https://www.aljazeera.com/xml/rss/all.xml" />
                <source src="https://www.theguardian.com/world/rss" />
                <source src="https://www.npr.org/rss/rss.php?id=1004" />
                <source src="http://www.dictionary.com/wordoftheday/wotd.rss" />
            </rss-feed>
        \`
}`,...(F=(v=a.parameters)==null?void 0:v.docs)==null?void 0:F.source}}};const T=["Default","TitleOnly","Detailed","Styled","WithLink","CustomFields","MultipleSources"];export{l as CustomFields,s as Default,t as Detailed,a as MultipleSources,o as Styled,r as TitleOnly,n as WithLink,T as __namedExportsOrder,L as default};
//# sourceMappingURL=rss-feed.stories-6-Dpu_R7.js.map
