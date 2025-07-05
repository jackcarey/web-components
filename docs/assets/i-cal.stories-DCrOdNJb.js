import{C as Q}from"./utils-D1S3XHhR.js";import{x as d}from"./iframe-Cif-wrrZ.js";const e=`BEGIN:VCALENDAR
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
END:VCALENDAR`,H={...Q("i-cal")},r={args:{events:e},tags:["a11y-serious"]},t={args:{src:"https://raw.githubusercontent.com/jackcarey/web-components/master/packages/i-cal/example.ics",refresh:360}},a={args:{src:"https://doesnotexist.example.com/calendar.ics"}},n={args:{events:e,locales:"en-GB"}},o={args:{events:e,locales:"ko-KR"}},j=`
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
i-cal#styled::part(location)::before { content: "📍" }`,l={args:{events:e},render:s=>d`<style>
                ${j}</style
            ><i-cal id="styled" events=${s.events}></i-cal>`},c={args:{events:e,locales:"en-GB"},render:s=>d`<i-cal id="custom" events=${s.events} locales="${s.locales}">
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
        </i-cal>`},i={args:{events:e},render:s=>d`<i-cal id="children" events=${s.events}>
            <h1>Other Children</h1>
        </i-cal>`},m={args:{events:e,since:"1970-01-01"}},E={args:{events:e,until:"1970-01-01"}},p={args:{events:e,since:"1950-01-01",until:"1990-01-01"}};var T,I,N;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    events: exampleICS
  },
  tags: ["a11y-serious"]
}`,...(N=(I=r.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var S,A,D;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    src: "https://raw.githubusercontent.com/jackcarey/web-components/master/packages/i-cal/example.ics",
    refresh: 360
  }
}`,...(D=(A=t.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var u,g,R;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    src: "https://doesnotexist.example.com/calendar.ics"
  }
}`,...(R=(g=a.parameters)==null?void 0:g.docs)==null?void 0:R.source}}};var h,C,v;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    events: exampleICS,
    locales: "en-GB"
  }
}`,...(v=(C=n.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var y,O,f;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    events: exampleICS,
    locales: "ko-KR"
  }
}`,...(f=(O=o.parameters)==null?void 0:O.docs)==null?void 0:f.source}}};var M,V,L;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    events: exampleICS
  },
  render: args => html\`<style>
                \${externalStyles}</style
            ><i-cal id="styled" events=\${args.events}></i-cal>\`
}`,...(L=(V=l.parameters)==null?void 0:V.docs)==null?void 0:L.source}}};var x,B,G;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(G=(B=c.parameters)==null?void 0:B.docs)==null?void 0:G.source}}};var P,U,k;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    events: exampleICS
  },
  render: args => html\`<i-cal id="children" events=\${args.events}>
            <h1>Other Children</h1>
        </i-cal>\`
}`,...(k=(U=i.parameters)==null?void 0:U.docs)==null?void 0:k.source}}};var w,Y,F;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    events: exampleICS,
    since: "1970-01-01"
  }
}`,...(F=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:F.source}}};var b,W,Z;E.parameters={...E.parameters,docs:{...(b=E.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    events: exampleICS,
    until: "1970-01-01"
  }
}`,...(Z=(W=E.parameters)==null?void 0:W.docs)==null?void 0:Z.source}}};var $,_,K;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    events: exampleICS,
    since: "1950-01-01",
    until: "1990-01-01"
  }
}`,...(K=(_=p.parameters)==null?void 0:_.docs)==null?void 0:K.source}}};const J=["FixedEvents","FetchEvents","FetchError","BritishLocale","KoreanLocale","ExternalStyles","CustomTemplate","OtherChildren","Since1970","Until1970","Between1950And1990"];export{p as Between1950And1990,n as BritishLocale,c as CustomTemplate,l as ExternalStyles,a as FetchError,t as FetchEvents,r as FixedEvents,o as KoreanLocale,i as OtherChildren,m as Since1970,E as Until1970,J as __namedExportsOrder,H as default};
//# sourceMappingURL=i-cal.stories-DCrOdNJb.js.map
