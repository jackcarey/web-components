const d={"can-i-use":"1.0.8","i-cal":"1.1.8","middle-truncate":"0.0.1"},r=()=>{Object.entries(d).forEach(([t,e])=>{document.querySelector(t)&&c(t)}),new MutationObserver(t=>{for(let e of t)e.type==="childList"&&Array.from(e.addedNodes).forEach(n=>{if(n.nodeType===Node.ELEMENT_NODE){const s=n.nodeName.toLowerCase();Object.keys(d).includes(s)&&c(s)}})}).observe(document.body,{childList:!0,subtree:!0})},c=o=>{if(!o)return;const t=d[o]??"latest",e=document.createElement("script");e.type="module",e.async=!0,e.src=`https://esm.sh/jsr/@web-components/${encodeURIComponent(o)}${t==="latest"?"":`@${t}`}`,document.head.appendChild(e)};window.addEventListener("DOMContentLoaded",r);
//# sourceMappingURL=index-Bmjmz0_R.js.map
