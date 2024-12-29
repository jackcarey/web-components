class h extends HTMLElement{static get observedAttributes(){return["value","limit"]}attributeChangedCallback(t){(t==="value"||t==="limit")&&this.render()}connectedCallback(){this.render()}render(){const t=this.getAttribute("value")||"",i=this.getAttribute("limit"),a=i?parseInt(i,10):t.length,{fontSize:l,width:r}=window.getComputedStyle(this),d=parseFloat(l)/2,c=parseFloat(r)/d,o=Math.min(a,c),e=this.dir==="rtl",n=Math.floor(o/2),s=t.substring(t.length-n);this.innerHTML=`
        <style>
        .middle-truncate > * {
            display: inline-block;
            white-space: nowrap;
            max-width: ${n}ch;
            vertical-align: bottom;
        }
        .middle-truncate .${e?"end":"start"}{
            overflow: clip;
            text-overflow: ellipsis;
            }
            .middle-truncate .${e?"start":"end"}{
                overflow: hidden;
                margin-left: -0.5ch;
            }
            </style>
      <span class="middle-truncate" title="${t}">
        <span class="start">${e?s:t}</span>
        <span class="end" aria-hidden="true">${e?t:s}</span>
      </span>
    `}}customElements.define("middle-truncate",h);
//# sourceMappingURL=index-DtGD2Obj.js.map
