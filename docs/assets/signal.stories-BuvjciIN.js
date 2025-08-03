import r from"./index-jeR3H6yP.js";import{x as v}from"./iframe-BhiHi7KR.js";const O={},a=(o,t,e)=>{const s=`#${`signal-${Math.floor(Math.random()*1e3)}`}`;return v`<div id="${s}"><p>
            Story '<code>${o.name}</code>' | If the DOM does not update below, check the
            browser console.
        </p>
        ${e?v`<p>${e}</p>`:""}
        <pre><output>${t?JSON.stringify(t,null,2):""}<output></pre></div>`},i={decorators:[(o,t)=>{const e=new r({foo:"bar"});return e.addEventListener("signal",n=>console.log("listener on signal",n)),e.fizz="bang",e.bang="fizz",a(t,e)}]},l={decorators:[(o,t)=>{document.addEventListener("signal",n=>console.log("document story signal",t.name,n));const e=new r({foo:"bar"},{target:document});return e.addEventListener("signal",n=>console.log("listener on signal",n)),e.fizz="bang",e.bang="fizz",a(t,e,"This story adds the 'document' as the EventTarget for the Signal")}]},c={decorators:[(o,t)=>{const e=new r({},{target:document}),n=s=>console.log("listener on signal",s);e.addEventListener("signal",n);for(let s=0;s<1e3;++s)e[s]=s*2;return a(t,e)}]},d={decorators:[(o,t)=>{const e=new r({});e.addEventListener("signal",m=>console.log("listener on signal",m));let n=0;const s=setInterval(()=>{e[n]=performance.now(),n+=1},500);return setTimeout(()=>{clearInterval(s)},1e4),a(t,e,"New events are triggered every 500ms for 10 seconds. The DOM will not change.")}]},g={decorators:[(o,t)=>{const e="customName",n=new r({},{name:e,useSuffix:!0});n.addEventListener("signal",u=>console.error("This should never trigger!",u)),n.addEventListener(`signal-${e}`,u=>console.log(`listener for signal-${e}`,u));let s=0;const m=setInterval(()=>{n[s]=performance.now(),s+=1},500);return setTimeout(()=>{clearInterval(m)},3e3),a(t,n,"The 'useSuffix' option appends the signal name to the end of the emitted event type, should you wish to change it.")}]};var f,p,h;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  decorators: [(_story, context) => {
    const s = new Signal({
      foo: "bar"
    });
    s.addEventListener("signal", evt => console.log("listener on signal", evt));
    s.fizz = "bang";
    s.bang = "fizz";
    return signalHtml(context, s);
  }]
}`,...(h=(p=i.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var w,y,S;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  decorators: [(_story, context) => {
    document.addEventListener("signal", evt => console.log(\`document story signal\`, context.name, evt));
    const s = new Signal({
      foo: "bar"
    }, {
      target: document
    });
    s.addEventListener("signal", evt => console.log("listener on signal", evt));
    s.fizz = "bang";
    s.bang = "fizz";
    return signalHtml(context, s, "This story adds the 'document' as the EventTarget for the Signal");
  }]
}`,...(S=(y=l.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var x,I,E;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  decorators: [(_story, context) => {
    const s = new Signal({}, {
      target: document
    });
    const listener = evt => console.log("listener on signal", evt);
    s.addEventListener("signal", listener);
    for (let i = 0; i < 1000; ++i) {
      s[i] = i * 2;
    }
    return signalHtml(context, s);
  }]
}`,...(E=(I=c.parameters)==null?void 0:I.docs)==null?void 0:E.source}}};var z,L,T;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  decorators: [(_story, context) => {
    const s = new Signal({});
    s.addEventListener("signal", evt => console.log("listener on signal", evt));
    let i = 0;
    const intervalId = setInterval(() => {
      s[i] = performance.now();
      i += 1;
    }, 500);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 10000);
    return signalHtml(context, s, "New events are triggered every 500ms for 10 seconds. The DOM will not change.");
  }]
}`,...(T=(L=d.parameters)==null?void 0:L.docs)==null?void 0:T.source}}};var b,_,$;g.parameters={...g.parameters,docs:{...(b=g.parameters)==null?void 0:b.docs,source:{originalSource:`{
  decorators: [(_story, context) => {
    const signalName = "customName";
    const s = new Signal({}, {
      name: signalName,
      useSuffix: true
    });
    s.addEventListener("signal", evt => console.error(\`This should never trigger!\`, evt));
    s.addEventListener(\`signal-\${signalName}\`, evt => console.log(\`listener for signal-\${signalName}\`, evt));
    let i = 0;
    const intervalId = setInterval(() => {
      s[i] = performance.now();
      i += 1;
    }, 500);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);
    return signalHtml(context, s, "The 'useSuffix' option appends the signal name to the end of the emitted event type, should you wish to change it.");
  }]
}`,...($=(_=g.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};const H=["Default","WithDocumentTarget","LotsOfProperties","Interval","UseSuffix"];export{i as Default,d as Interval,c as LotsOfProperties,g as UseSuffix,l as WithDocumentTarget,H as __namedExportsOrder,O as default};
//# sourceMappingURL=signal.stories-BuvjciIN.js.map
