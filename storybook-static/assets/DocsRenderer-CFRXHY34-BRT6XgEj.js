const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-Bo01w_M0.js","./index-CpnDKoW4.js","./_commonjsHelpers-CqkleIqs.js"])))=>i.map(i=>d[i]);
import{_ as h}from"./iframe-JOyJMw3E.js";import{r as a,R as n}from"./index-CpnDKoW4.js";import{am as E,an as d,ao as R,ap as v,aq as f}from"./index-DVxWyBgX.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-D-8MO0q_.js";import"./index-DPS9-N-h.js";import"./index-DrFu-skq.js";var s={},l;function w(){if(l)return s;l=1;var e=E();return s.createRoot=e.createRoot,s.hydrateRoot=e.hydrateRoot,s}var _=w(),i=new Map;function y(){return globalThis.IS_REACT_ACT_ENVIRONMENT}var x=({callback:e,children:t})=>{let r=a.useRef();return a.useLayoutEffect(()=>{r.current!==e&&(r.current=e,e())},[e]),t};typeof Promise.withResolvers>"u"&&(Promise.withResolvers=()=>{let e=null,t=null;return{promise:new Promise((r,o)=>{e=r,t=o}),resolve:e,reject:t}});var C=async(e,t,r)=>{let o=await D(t,r);if(y()){o.render(e);return}let{promise:u,resolve:c}=Promise.withResolvers();return o.render(a.createElement(x,{callback:c},e)),u},g=(e,t)=>{let r=i.get(e);r&&(r.unmount(),i.delete(e))},D=async(e,t)=>{let r=i.get(e);return r||(r=_.createRoot(e,t),i.set(e,r)),r},M={code:d,a:R,...v},A=class extends a.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e){let{showException:t}=this.props;t(e)}render(){let{hasError:e}=this.state,{children:t}=this.props;return e?null:n.createElement(n.Fragment,null,t)}},L=class{constructor(){this.render=async(e,t,r)=>{let o={...M,...t==null?void 0:t.components},u=f;return new Promise((c,p)=>{h(async()=>{const{MDXProvider:m}=await import("./index-Bo01w_M0.js");return{MDXProvider:m}},__vite__mapDeps([0,1,2]),import.meta.url).then(({MDXProvider:m})=>C(n.createElement(A,{showException:p,key:Math.random()},n.createElement(m,{components:o},n.createElement(u,{context:e,docsParameter:t}))),r)).then(()=>c())})},this.unmount=e=>{g(e)}}};export{L as DocsRenderer,M as defaultComponents};
//# sourceMappingURL=DocsRenderer-CFRXHY34-BRT6XgEj.js.map
