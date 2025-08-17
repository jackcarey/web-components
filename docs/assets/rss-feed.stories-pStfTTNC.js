import{C as _}from"./utils-DEQ7wb9-.js";import{x as e}from"./iframe-qlbfcv1L.js";import"./preload-helper-Dp1pzeXC.js";const M={..._("rss-feed")},s={args:{},render:()=>e`
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <h2><slot name="title"></slot></h2>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        `},r={args:{},render:()=>e`
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <h2><slot name="title"></slot></h2>
                    <time><slot name="pubDate"></slot></time>
                    <p><slot name="content"></slot></p>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        `},t={args:{},render:()=>e`
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
        `},o={args:{},render:()=>e`
            <rss-feed proxy="https://corsproxy.io/?url=" link="_blank">
                <template>
                    <h2><slot name="title"></slot></h2>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        `},n={args:{},render:()=>e`
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
        `},l={args:{},render:()=>e`
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
        `};var a,m,c;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
            <rss-feed proxy="https://corsproxy.io/?url=">
                <template>
                    <h2><slot name="title"></slot></h2>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        \`
}`,...(c=(m=s.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var p,d,i;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(i=(d=r.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var u,h,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(f=(h=t.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var w,x,y;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {},
  render: () => html\`
            <rss-feed proxy="https://corsproxy.io/?url=" link="_blank">
                <template>
                    <h2><slot name="title"></slot></h2>
                </template>
                <source src="http://feeds.bbci.co.uk/news/world/rss.xml"
            /></rss-feed>
        \`
}`,...(y=(x=o.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var b,g,k;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(k=(g=n.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};var S,z,D;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(D=(z=l.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};const O=["TitleOnly","Detailed","Styled","WithLink","CustomFields","MultipleSources"];export{n as CustomFields,r as Detailed,l as MultipleSources,t as Styled,s as TitleOnly,o as WithLink,O as __namedExportsOrder,M as default};
//# sourceMappingURL=rss-feed.stories-pStfTTNC.js.map
