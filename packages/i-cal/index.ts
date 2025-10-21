/**
 * @module
 * This module contains a custom elment to render ical data
 *
 * @example
 * ```html
 * <script src="https://esm.sh/jsr/@web-components/i-cal"></script>
 * <i-cal src="https://example.com/calendar.ics"></can-i-use>
 * ```
 */

import ICAL from "ical.js";

const internalTemplateHTML = `
                 <ul>
                   <style></style>
                   <li part="summary"><slot name="summary"></slot></li>
                   <li part="description"><slot name="description"></slot></li>
                   <li part="location"><slot name="location"></slot></li>
                   <li part="startDate"><time><slot name="startDate"></slot></time></li>
                   <li part="endDate"><time><slot name="endDate"></slot></time></li>
                   <li><slot name="duration"></slot></li>
                   <li><slot name="organizer"></slot></li>
                   <li><slot name="attendees"></slot></li>
                 </ul>
             `;

/**
 * Represents a custom web component for displaying iCal events.
 */
class ICalComponent extends HTMLElement {
    #refreshInterval: ReturnType<typeof setTimeout> | number | undefined;
    #determinedCalScale: string = "gregory";
    #eventsList: any[] = [];
    #error: Error | string | undefined;
    #root;

    static #validRefreshSeconds = (val) =>
        val && !isNaN(parseInt(val)) && val > 0 ? parseInt(val) : 0;

    #clearRefreshInterval() {
        if (this.#refreshInterval) {
            clearInterval(this.#refreshInterval);
            this.#refreshInterval = undefined;
        }
    }
    #setRefreshInterval(seconds) {
        this.#clearRefreshInterval();
        const useSeconds = ICalComponent.#validRefreshSeconds(seconds);
        if (!useSeconds) return;
        if (this.src) {
            // set up future refreshes
            this.#refreshInterval = setInterval(() => {
                this.#fetchEvents().then(() => this.#render());
            }, useSeconds * 1000);
            // set up immediate refresh
            this.#fetchEvents().then(() => this.#render());
        }
    }

    #parseICalData(data) {
        try {
            // https://github.com/kewisch/ical.js/wiki#item-model-layer
            const jcalData = ICAL.parse(data);
            const comp = new ICAL.Component(jcalData);
            const calScale = comp.getFirstPropertyValue("calscale") ?? "gregory";
            console.debug(`calScale: ${calScale}`);
            if (calScale === "GREGORIAN") {
                this.#determinedCalScale = "gregory";
            } else {
                this.#determinedCalScale = String(calScale).toLowerCase();
            }
            const vevents = comp.getAllSubcomponents("vevent");
            const events = vevents.map((vevent) => new ICAL.Event(vevent));
            console.debug(events);
            return events;
        } catch (e) {
            console.warn(`Couldn't parse ical data: ${e?.message ?? JSON.stringify(e)}`);
            return [];
        }
    }

    static #extractAllValues(obj) {
        const proto = Object.getPrototypeOf(obj);
        const props = Object.getOwnPropertyNames(proto).filter((name) => {
            if (name.startsWith("_")) return false;
            if (["constructor"].includes(name)) return false;
            if (typeof obj[name] === "function") return false;
            return true;
        });
        return Object.fromEntries(props.map((name) => [name, obj[name]]));
    }

    static get observedAttributes() {
        return ["src", "events", "refresh", "since", "until", "locales", "localeOptions"];
    }

    constructor() {
        super();
        this.#root = this.attachShadow({ mode: "open" });
        this.#upgradeAllProperties();
    }
    #upgradeProperty(prop) {
        if (this && this.hasOwnProperty(prop)) {
          let value = this[prop];
          delete this[prop];
          this[prop] = value;
        }
      }
      #upgradeAllProperties() {
        ICalComponent.observedAttributes.forEach(this.#upgradeProperty);
      }

    connectedCallback() {
        if (this.refresh) {
            this.#setRefreshInterval(this.refresh);
        } else if (this.src && !this.events) {
            this.#fetchEvents().then(() => this.#render());
        } else {
            this.#render();
        }
    }

    disconnectedCallback() {
        this.#clearRefreshInterval();
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
        return this.getAttribute("events")?.trim();
    }

    set events(newVal) {
        if (newVal) {
            this.setAttribute("events", newVal);
        } else {
            this.removeAttribute("events");
        }
    }

    setEventsList(newVal) {
        this.#eventsList = newVal;
        this.#render();
    }

    get filteredEvents() {
        let startDt: Date | undefined = undefined;
        // if the date values cannot be parsed they will be ignored
        if (this.since) {
            try {
                startDt = this.since ? new Date(this.since) : undefined;
            } catch (_) {}
        }
        let endDt: Date | undefined = undefined;
        if (this.until) {
            try {
                endDt = this.until ? new Date(this.until) : undefined;
            } catch (_) {}
        }
        const filteredEvents =
            this.#eventsList?.filter((event) => {
                //remove events that are outside the date range
                const start = event.startDate.toJSDate();
                const end = event.endDate.toJSDate();
                if (startDt && start < startDt) return false;
                if (endDt && end > endDt) return false;
                return true;
            }) ?? [];
        return filteredEvents;
    }

    get until() {
        return this.getAttribute("until");
    }

    set until(newVal) {
        if (newVal) {
            this.setAttribute("until", newVal);
        } else {
            this.removeAttribute("until");
        }
    }

    get since() {
        return this.getAttribute("since");
    }

    set since(newVal) {
        if (newVal) {
            this.setAttribute("since", newVal);
        } else {
            this.removeAttribute("since");
        }
    }

    get calScale() {
        return this.#determinedCalScale.toLowerCase();
    }

    get locales() {
        return this.getAttribute("locales")?.split(",") ?? [];
    }

    set locales(newVal) {
        if (newVal) {
            this.setAttribute("locales", Array.isArray(newVal) ? newVal.join(",") : newVal);
        } else {
            this.removeAttribute("locales");
        }
    }

    get localeOptions() {
        const parsed = JSON.parse(this.getAttribute("localeOptions") ?? "{}");
        return { calendar: this.calScale, ...parsed };
    }

    set localeOptions(newVal) {
        if (newVal) {
            this.setAttribute("localeOptions", JSON.stringify(newVal));
        } else {
            this.removeAttribute("localeOptions");
        }
    }

    get refresh(): number {
        return ICalComponent.#validRefreshSeconds(this.getAttribute("refresh"));
    }
    set refresh(newVal: number | string) {
        newVal = ICalComponent.#validRefreshSeconds(newVal);
        if (newVal) {
            this.setAttribute("refresh", String(newVal));
        } else {
            this.removeAttribute("refresh");
        }
    }

    get hasFixedEvents() {
        return !this.src || this.src.trim().length === 0;
    }

    async #fetchEvents() {
        if (this.src) {
            return await fetch(this.src)
                .then(async (resp) => {
                    if (resp.ok) {
                        const data = await resp.text();
                        this.#eventsList = this.#parseICalData(data);
                        this.#error = undefined;
                    } else {
                        this.#error = `${resp.status} ${resp.statusText}`.trim();
                    }
                })
                .catch((e) => {
                    this.#error = `${e?.message ?? JSON.stringify(e)}`.trim();
                });
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue == newValue) return;
        switch (name) {
            case "src": {
                if (!newValue) {
                    this.#clearRefreshInterval();
                } else {
                    this.#setRefreshInterval(this.refresh);
                }
                break;
            }
            case "refresh": {
                this.#setRefreshInterval(this.refresh);
                break;
            }
            case "events": {
                if (newValue) {
                    try {
                        this.#eventsList = this.#parseICalData(newValue);
                    } catch (e) {
                        this.#error = `Failed to parse events: ${e?.message ?? JSON.stringify(e)}`;
                    }
                } else {
                    this.#eventsList = [];
                }
                if (this.hasFixedEvents) {
                    this.#clearRefreshInterval();
                }
                this.#render();
            }
            default: {
                this.#render();
                break;
            }
        }
    }

    async #render() {
        let templateNode = this.querySelector("template");
        if (!templateNode) {
            templateNode = document.createElement("template");
            templateNode.innerHTML = internalTemplateHTML;
        }
        //make sure to use only one style tag across all event items
        const templateStyle = templateNode.querySelector("style");
        let styleClone: Element | undefined = undefined;
        if (templateStyle) {
            styleClone = templateStyle.cloneNode(true) as Element;
            templateNode.removeChild(templateStyle);
        }
        const otherChildrenSlot = `<slot></slot>`;
        if (this.#error) {
            this.#root.innerHTML = `${styleClone?.outerHTML ?? ""}<slot name="error" class="error"><p class="error">${this.#error}</p></slot>${otherChildrenSlot}`;
        } else if (this.filteredEvents.length == 0) {
            this.#root.innerHTML = `${styleClone?.outerHTML ?? ""}<slot name="empty" class="empty"></slot>${otherChildrenSlot}`;
        } else {
            this.#root.innerHTML = `${styleClone?.outerHTML ?? ""}<ol>${this.filteredEvents
                .map((event) => {
                    const thisEventNode = templateNode.content.cloneNode(true) as Element;
                    const allValuesEvent = ICalComponent.#extractAllValues(event);
                    Object.entries(allValuesEvent).forEach(([key, value]) => {
                        if (value || value === 0) {
                            console.debug(`looking for slots`, key, value);
                            thisEventNode
                                .querySelectorAll(`slot[name="${key}"]`)
                                .forEach((slot: Element) => {
                                    console.debug(`- found slot`, key, value);
                                    const slotParent = slot.parentElement;
                                    if (slotParent && ["startDate", "endDate"].includes(key)) {
                                        const jsDate = (value as any).toJSDate() as Date;
                                        const machineDate = jsDate.toISOString();
                                        const readableDate = jsDate.toLocaleString(
                                            this.locales,
                                            this.localeOptions
                                        );
                                        try {
                                            (slotParent as HTMLTimeElement).dateTime = machineDate;
                                        } catch (e) {}
                                        slotParent.innerHTML = readableDate;
                                    } else {
                                        slot.replaceWith(String(value));
                                    }
                                });
                        }
                    });
                    console.debug(`thisEventNode`, thisEventNode, String(thisEventNode));
                    const li = document.createElement("li");
                    li.appendChild(thisEventNode);
                    return li.outerHTML;
                })
                .join("")}</ol>${otherChildrenSlot}`;
        }
    }

    valueOf() {
        return this.#eventsList;
    }

    toJSON() {
        return this.#eventsList;
    }

    toString() {
        return JSON.stringify(this.#eventsList);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    if (!customElements.get("i-cal")) {
        customElements.define("i-cal", ICalComponent);
    }
});
