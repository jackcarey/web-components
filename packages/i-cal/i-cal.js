class ICalComponent extends HTMLElement {
  #refreshInterval = null;
  #eventsList = [];
  #lastFetched = null;
  #root;

  static #validRefreshInterval = (val) =>
    (val && !isNaN(parseInt(val)) && val > 0) ? parseInt(val) : 0;

  #clearRefreshInterval() {
    if (this.#refreshInterval) {
      clearInterval(this.#refreshInterval);
      this.#refreshInterval = null;
    }
  }
  #setRefreshInterval(seconds) {
    this.#clearRefreshInterval();
    seconds = ICalComponent.#validRefreshInterval(seconds);
    if (!seconds) return;
    this.#refreshInterval = setInterval(() => {
      this.#fetchEvents().then(() => this.#render());
    }, seconds * 1000);
  }

  static #parseICalData(data) {
    const jcal = window.ICAL.parse(data);
    const comp = new ICAL.Component(jcal);
    const vevents = comp.getAllSubcomponents("vevent");
    console.log({ vevents })
    return vevents;
  }

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["src", "events", "refresh"];
  }

  connectedCallback() {
    console.log("connected");
    if (this.src && !this.events) {
      this.#fetchEvents().then(() => this.#render());
    } else {
      this.#render();
    }
  }

  get src() {
    return this.getAttribute("src");
  }

  set src(newVal) {
    if (newVal) {
      this.setAttribute("src", newVal);
    } else {
      this.removeAttribute("src");
    }
  }

  get events() {
    return (
      this.getAttribute("events")?.trim()
    );
  }

  set events(newVal) {
    if (newVal) {
      this.setAttribute("events", newVal);
    } else {
      this.removeAttribute("events");
    }
  }

  get refresh() {
    return ICalComponent.#validRefreshInterval(this.getAttribute("refresh"));
  }
  set refresh(newVal) {
    newVal = ICalComponent.#validRefreshInterval(newValue);
    if (newVal) {
      this.setAttribute("refresh", newValue);
    } else {
      this.removeAttribute("refresh");
    }
  }

  get hasFixedEvents() {
    const attrStr = this.getAttribute("events");
    return attrStr && attrStr.trim()?.length > 0 ? true : false;
  }

  async #fetchEvents() {
    return await fetch(this.src).then(async (resp) => {
      if (resp.ok) {
        const data = await resp.text();
        this.#lastFetched = Date.now();
        this.#eventsList = ICalComponent.#parseICalData(data);
      } else {
        console.error(
          `Failed to fetch iCal data from ${this.src}`,
          resp.status,
          resp.statusText
        );
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    console.log(`attributeChanged`, { name, oldValue, newValue });
    if (name === "src" && !newValue) {
      this.#clearRefreshInterval();
    }
    if (name === "refresh") {
      this.#setRefreshInterval();
    }
    if (name === "events") {
      //todo": parse the events string and store it in the eventsList
      if (newValue) {
        this.#eventsList = ICalComponent.#parseICalData(newValue);
      }
      if (this.hasFixedEvents) {
        this.#clearRefreshInterval();
      }
    }
    this.#render();
  }

  async #render() {
    console.log("rendering");
    const refreshMs = this.refresh * 1000;
    const staleBefore = Date.now() - refreshMs;
    const hasEvents = this.events && this.events.length > 0;
    const isOld =
      !this.hasFixedEvents &&
      this.src &&
      this.#lastFetched &&
      this.#lastFetched <= staleBefore;
    if (!hasEvents || isOld) {

    }

    let templateNode = this.querySelector("template");
    if (!templateNode) {
      templateNode = document.createElement("template");
      templateNode.innerHTML = `
                <style></style>
                <p><slot name="title"></slot></p>
                <p><slot name="start"></slot></p>
                <p><slot name="end"></slot></p>
                <p><slot name="description"></slot></p>
            `;
    }
    //make sure to use only one style tag
    const templateStyle = templateNode.querySelector("style");
    let styleClone = null;
    if (templateStyle) {
      styleClone = templateStyle.cloneNode(true);
      templateNode.removeChild(templateStyle);
    }
    this.#root.innerHTML = `<p>${this.hasFixedEvents ? "fixed" : "fetch"
      }</p>${styleClone ? styleClone.outerHTML : ""}${this.#eventsList
        .map((eventStr) => {
          //todo: properly render event objects inside the template
          const clone = templateNode?.content?.cloneNode(true);
          if (clone) {
            const eventAttrs = ["title", "start", "end", "description"];
            eventAttrs.forEach((attr) => {
              const slot = clone.querySelector(`slot[name="${attr}"]`);
              if (slot) {
                slot.innerHTML = eventStr[attr];
              }
            });
            return clone.outerHTML;
          } else {

          }
          return `<div>${eventStr}</div>`;
        })
        .join("")}<slot></slot>`;
    this.#root.appendChild(clone);
  }
}

customElements.whenDefined("jc-cal").then(() => {
  console.log("jc-cal defined");
});

window.addEventListener("DOMContentLoaded", () => {
  const icalDep = "https://unpkg.com/ical.js/dist/ical.es5.cjs";
  if (!window.ICAL) {
    console.log("loading ical.js")
    const script = document.createElement("script");
    script.src = icalDep;
    document.head.appendChild(script);
  }
  customElements.define("i-cal", ICalComponent);
});