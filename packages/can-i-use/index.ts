import list from "./feature-list";

/**
 * !function(){document.addEventListener("DOMContentLoaded",function(){for(var e=document.getElementsByClassName("ciu_embed"),t=0;t<e.length;t++){var a=e[t],i=a.getAttribute("data-feature"),n=a.getAttribute("data-periods"),s=a.getAttribute("data-accessible-colours")||"false",r=a.getAttribute("data-image-base")||"none";if(i){var o="https://caniuse.bitsofco.de/embed/index.html",d='<iframe src="'+o+"?feat="+i+"&periods="+n+"&accessible-colours="+s+"&image-base="+r+'" frameborder="0" width="100%" height="400px"></iframe>';a.innerHTML=d}else a.innerHTML="A feature was not included. Go to <a href='https://caniuse.bitsofco.de/#how-to-use'>https://caniuse.bitsofco.de/#how-to-use</a> to generate an embed."}var c=window.addEventListener?"addEventListener":"attachEvent";(0,window[c])("attachEvent"==c?"onmessage":"message",function(t){var a=t.data;if("string"==typeof a&&a.indexOf("ciu_embed")>-1)for(var i=a.split(":")[1],n=a.split(":")[2],s=0;s<e.length;s++){var r=e[s];if(r.getAttribute("data-feature")===i){var o=parseInt(n)+30;r.childNodes[0].height=o+"px";break}}},!1)})}();
 */

class CanIuseComponent extends HTMLElement {
    static get observedAttributes() {
        return ["feature"];
    }
    #root: ShadowRoot | undefined;
    connectedCallback() {
        if (!this.#root) {
            this.#root = this.attachShadow({ mode: "open" });
        }
        this.render();
    }
    disconnectedCallback() {
        this.#root = undefined;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (name === "feature") {
            if (!list.includes(newValue)) {
                this.feature = oldValue;
            }
        }
        this.render();
    }
    get feature() {
        return this.getAttribute("feature") ?? "custom-elementsv1";
    }
    set feature(value) {
        if (!value) {
            this.removeAttribute("feature");
        } else {
            this.setAttribute("feature", value);
        }
    }
    get periods() {
        return this.getAttribute("periods") ?? "future_1,current,past_1,past_2";
    }
    set periods(value) {
        if (!value) {
            this.removeAttribute("periods");
        } else {
            this.setAttribute("periods", value);
        }
    }
    get accessibleColours() {
        return this.getAttribute("accessible-colours") ?? "false";
    }
    set accessibleColours(value) {
        if (!value) {
            this.removeAttribute("accessible-colours");
        } else {
            this.setAttribute("accessible-colours", String(value ? true : false));
        }
    }
    render() {
        if (!this.#root) return;
        //todo: render the iframe embed
        this.#root.innerHTML = `<p class="ciu_embed" data-feature="${this.feature}" data-periods="${
            this.periods
        }" data-accessible-colours="${this.accessibleColours ? true : false}">
        <picture>
        <source type="image/webp" srcset="https://caniuse.bitsofco.de/image/${this.feature}.webp">
        <source type="image/png" srcset="https://caniuse.bitsofco.de/image/${this.feature}.png">
        <img src="https://caniuse.bitsofco.de/image/${
            this.feature
        }.jpg" alt="Data on support for the ${
            this.feature
        } feature across the major browsers from caniuse.com">
        </picture>
        </p>`;
    }
}

customElements.define("can-i-use", CanIuseComponent);

export default CanIuseComponent;
