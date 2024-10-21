import{s as u,z as g,e as S}from"./index-DxKRhftL.js";import{i as v}from"./tiny-invariant-BxWVcicq.js";import{Q as l}from"./index-CLeWWfmH.js";const{global:d}=__STORYBOOK_MODULE_GLOBAL__;var{window:b}=d;b.STORYBOOK_ENV="web-components";function c(e){if(!e)return!1;if(typeof e=="string")return!0;throw new Error('Provided component needs to be a string. e.g. component: "my-element"')}function f(e){if(!e)return!1;if(e.tags&&Array.isArray(e.tags)||e.modules&&Array.isArray(e.modules))return!0;throw new Error(`You need to setup valid meta data in your config.js via setCustomElements().
    See the readme of addon-docs for web components for more details.`)}function m(){return d.__STORYBOOK_CUSTOM_ELEMENTS__||d.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__}var{window:h,EventSource:C}=d,_;typeof module<"u"&&((_=module==null?void 0:module.hot)!=null&&_.decline)&&(module.hot.decline(),new C("__webpack_hmr").addEventListener("message",function(e){try{let{action:r}=JSON.parse(e.data);r==="built"&&h.location.reload()}catch{}}));const{logger:O}=__STORYBOOK_MODULE_CLIENT_LOGGER__,{useEffect:D,addons:M}=__STORYBOOK_MODULE_PREVIEW_API__;function w(e,r){var a,n;let t;switch(r){case"attributes":case"properties":t={name:((a=e.type)==null?void 0:a.text)||e.type};break;case"slots":t={name:"string"};break;default:t={name:"void"};break}return{name:e.name,required:!1,description:e.description,type:t,table:{category:r,type:{summary:((n=e.type)==null?void 0:n.text)||e.type},defaultValue:{summary:e.default!==void 0?e.default:e.defaultValue}}}}function A(e){let r=e.name.replace(/(-|_|:|\.|\s)+(.)?/g,(t,a,n)=>n?n.toUpperCase():"").replace(/^([A-Z])/,t=>t.toLowerCase());return r=`on${r.charAt(0).toUpperCase()+r.substr(1)}`,[{name:r,action:{name:e.name},table:{disable:!0}},w(e,"events")]}function o(e,r){return e&&e.filter(t=>t&&t.name).reduce((t,a)=>{if(a.kind==="method")return t;switch(r){case"events":A(a).forEach(n=>{v(n.name,`${n} should have a name property.`),t[n.name]=n});break;default:t[a.name]=w(a,r);break}return t},{})}var T=(e,r)=>{if(!c(e)||!f(r))return null;let t=r.tags.find(a=>a.name.toUpperCase()===e.toUpperCase());return t||O.warn(`Component not found in custom-elements.json: ${e}`),t},L=(e,r)=>{var a;if(!c(e)||!f(r))return null;let t;return(a=r==null?void 0:r.modules)==null||a.forEach(n=>{var s;(s=n==null?void 0:n.declarations)==null||s.forEach(i=>{i.tagName===e&&(t=i)})}),t||O.warn(`Component not found in custom-elements.json: ${e}`),t},y=(e,r)=>(r==null?void 0:r.version)==="experimental"?T(e,r):L(e,r),R=(e,r)=>{let t=y(e,r);return t&&{...o(t.members??[],"properties"),...o(t.properties??[],"properties"),...o(t.attributes??[],"attributes"),...o(t.events??[],"events"),...o(t.slots??[],"slots"),...o(t.cssProperties??[],"css custom properties"),...o(t.cssParts??[],"css shadow parts")}},I=e=>{let r=m();return R(e,r)},U=e=>{let r=y(e,m());return r&&r.description},Y=/<!--\?lit\$[0-9]+\$-->|<!--\??-->/g;function k(e){var a;let r=(a=e==null?void 0:e.parameters.docs)==null?void 0:a.source,t=e==null?void 0:e.parameters.__isArgsStory;return(r==null?void 0:r.type)===u.DYNAMIC?!1:!t||(r==null?void 0:r.code)||(r==null?void 0:r.type)===u.CODE}function B(e,r){var s,i;let t=e(),a=(i=(s=r==null?void 0:r.parameters.docs)==null?void 0:s.source)!=null&&i.excludeDecorators?r.originalStoryFn(r.args,r):t,n;if(D(()=>{let{id:p,unmappedArgs:E}=r;n&&M.getChannel().emit(S,{id:p,source:n,args:E})}),!k(r)){let p=window.document.createElement("div");a instanceof DocumentFragment?l(a.cloneNode(!0),p):l(a,p),n=p.innerHTML.replace(Y,"")}return t}var N=[B],F={docs:{extractArgTypes:I,extractComponentDescription:U,story:{inline:!0},source:{type:u.DYNAMIC,language:"html"}}},j=[g];export{j as argTypesEnhancers,N as decorators,F as parameters};
//# sourceMappingURL=entry-preview-docs-BXPALem4.js.map
