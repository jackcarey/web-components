import{C as H}from"./utils-CE4vwRpE.js";import{x as T}from"./lit-element-B-NARBzP.js";import"./iframe-D3e9vgii.js";const e=`BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Signing of the Declaration of Independence
DTSTART;TZID=America/New_York:17760704T120000
DTEND;TZID=America/New_York:17760704T130000
LOCATION:Philadelphia, PA
DESCRIPTION: The signing of the Declaration of Independence.
STATUS:CONFIRMED
SEQUENCE:1
BEGIN:VALARM
TRIGGER:-PT10M
DESCRIPTION:Event Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
BEGIN:VEVENT
SUMMARY:First Moon Landing
DTSTART;TZID=America/New_York:19690720T203000
DTEND;TZID=America/New_York:19690720T210000
LOCATION:Tranquility Base, Moon
DESCRIPTION: Neil Armstrong takes the first step on the moon.
STATUS:CONFIRMED
SEQUENCE:1
BEGIN:VALARM
TRIGGER:-PT10M
DESCRIPTION:Event Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
BEGIN:VEVENT
SUMMARY:Fall of the Berlin Wall
DTSTART;TZID=Europe/Berlin:19891109T180000
DTEND;TZID=Europe/Berlin:19891109T190000
LOCATION:Berlin, Germany
DESCRIPTION: The Berlin Wall falls, marking the end of the Cold War.
STATUS:CONFIRMED
SEQUENCE:1
BEGIN:VALARM
TRIGGER:-PT10M
DESCRIPTION:Event Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
BEGIN:VEVENT
SUMMARY:Invention of the World Wide Web
DTSTART;TZID=Europe/London:19890312T090000
DTEND;TZID=Europe/London:19890312T100000
LOCATION:CERN, Switzerland
DESCRIPTION: Tim Berners-Lee invents the World Wide Web.
STATUS:CONFIRMED
SEQUENCE:1
BEGIN:VALARM
TRIGGER:-PT10M
DESCRIPTION:Event Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
BEGIN:VEVENT
SUMMARY:First Flight of the Wright Brothers
DTSTART;TZID=America/New_York:19031217T103000
DTEND;TZID=America/New_York:19031217T110000
LOCATION:Kitty Hawk, NC
DESCRIPTION: The Wright Brothers successfully fly the first powered aircraft.
STATUS:CONFIRMED
SEQUENCE:1
BEGIN:VALARM
TRIGGER:-PT10M
DESCRIPTION:Event Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`,re={...H("i-cal")},r={args:{}},t={args:{events:e},tags:["a11y-serious"]},a={args:{src:"https://raw.githubusercontent.com/jackcarey/web-components/master/packages/i-cal/example.ics",refresh:360}},n={args:{src:"https://doesnotexist.example.com/calendar.ics"}},o={args:{events:e,locales:"en-GB"}},c={args:{events:e,locales:"ko-KR"}},J=`
i-cal#styled{
    background-color: #e0e0e0;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    text-align: center;
}
i-cal#styled::part(summary) { font-weight: bold; }
i-cal#styled::part(description) { font-style: italic; }
i-cal#styled::part(startDate)::before { content: "📅" }
i-cal#styled::part(endDate)::before { content: "🏁" }
i-cal#styled::part(location)::before { content: "📍" }`,l={args:{events:e},render:s=>T`<style>
                ${J}</style
            ><i-cal id="styled" events=${s.events}></i-cal>`},i={args:{events:e,locales:"en-GB"},render:s=>T`<i-cal id="custom" events=${s.events} locales="${s.locales}">
            <template>
                <style>
                    * {
                        list-style: none;
                        font-family: sans-serif;
                    }
                </style>
                <h2><slot name="summary"></slot></h2>
                <p><slot name="description"></slot><br /><slot name="location"></slot></p>
                <p><time><slot name="startDate"></slot></time> - <time><slot name="endDate"></time></slot></p>
            </template>
        </i-cal>`},m={args:{events:e},render:s=>T`<i-cal id="children" events=${s.events}>
            <h1>Other Children</h1>
        </i-cal>`},p={args:{events:e,since:"1970-01-01"}},E={args:{events:e,until:"1970-01-01"}},d={args:{events:e,since:"1950-01-01",until:"1990-01-01"}};var I,N,S;r.parameters={...r.parameters,docs:{...(I=r.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {}
}`,...(S=(N=r.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var A,D,u;t.parameters={...t.parameters,docs:{...(A=t.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    events: exampleICS
  },
  tags: ["a11y-serious"]
}`,...(u=(D=t.parameters)==null?void 0:D.docs)==null?void 0:u.source}}};var g,R,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    src: "https://raw.githubusercontent.com/jackcarey/web-components/master/packages/i-cal/example.ics",
    refresh: 360
  }
}`,...(h=(R=a.parameters)==null?void 0:R.docs)==null?void 0:h.source}}};var C,v,y;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    src: "https://doesnotexist.example.com/calendar.ics"
  }
}`,...(y=(v=n.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var f,O,M;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    events: exampleICS,
    locales: "en-GB"
  }
}`,...(M=(O=o.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var V,L,x;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    events: exampleICS,
    locales: "ko-KR"
  }
}`,...(x=(L=c.parameters)==null?void 0:L.docs)==null?void 0:x.source}}};var B,G,P;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    events: exampleICS
  },
  render: args => html\`<style>
                \${externalStyles}</style
            ><i-cal id="styled" events=\${args.events}></i-cal>\`
}`,...(P=(G=l.parameters)==null?void 0:G.docs)==null?void 0:P.source}}};var U,k,w;i.parameters={...i.parameters,docs:{...(U=i.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    events: exampleICS,
    locales: "en-GB"
  },
  render: args => html\`<i-cal id="custom" events=\${args.events} locales="\${args.locales}">
            <template>
                <style>
                    * {
                        list-style: none;
                        font-family: sans-serif;
                    }
                </style>
                <h2><slot name="summary"></slot></h2>
                <p><slot name="description"></slot><br /><slot name="location"></slot></p>
                <p><time><slot name="startDate"></slot></time> - <time><slot name="endDate"></time></slot></p>
            </template>
        </i-cal>\`
}`,...(w=(k=i.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var Y,F,b;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    events: exampleICS
  },
  render: args => html\`<i-cal id="children" events=\${args.events}>
            <h1>Other Children</h1>
        </i-cal>\`
}`,...(b=(F=m.parameters)==null?void 0:F.docs)==null?void 0:b.source}}};var W,Z,$;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    events: exampleICS,
    since: "1970-01-01"
  }
}`,...($=(Z=p.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var _,K,Q;E.parameters={...E.parameters,docs:{...(_=E.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    events: exampleICS,
    until: "1970-01-01"
  }
}`,...(Q=(K=E.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var j,q,z;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    events: exampleICS,
    since: "1950-01-01",
    until: "1990-01-01"
  }
}`,...(z=(q=d.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};const te=["Default","FixedEvents","FetchEvents","FetchError","BritishLocale","KoreanLocale","ExternalStyles","CustomTemplate","OtherChildren","Since1970","Until1970","Between1950And1990"];export{d as Between1950And1990,o as BritishLocale,i as CustomTemplate,r as Default,l as ExternalStyles,n as FetchError,a as FetchEvents,t as FixedEvents,c as KoreanLocale,m as OtherChildren,p as Since1970,E as Until1970,te as __namedExportsOrder,re as default};
//# sourceMappingURL=i-cal.stories-CYS0prms.js.map
