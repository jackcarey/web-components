// Define a class for the web component
export class CanIUse extends HTMLElement {
  static #allData = null;
  #data = null; // Private property to store the caniuse data
  #error; // Private property to store the error message
  // Use a constructor to initialize properties and attach a shadow DOM
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  get store() {
    return this.hasAttribute("store");
  }

  set store(val) {
    if (val) {
      this.setAttribute("store", "");
    } else {
      this.removeAttribute("store");
    }
  }

  get features() {
    if (this.hasAttribute("features")) return this.getAttribute("features").split(",").map(f => f.trim());
    return CanIUse.#allData?.data ? Object.keys(CanIUse.#allData?.data) : null ?? null;
  }
  set features(val) {
    if (val) {
      if (Array.isArray(val)) val = val.map(f => String(f)).sort().join(",");
      this.setAttribute("features", val);
    } else {
      this.removeAttribute("features");
    }
  }

  get agents() {
    if (this.hasAttribute("agents")) return this.getAttribute("agents").split(",").map(a => a.trim());
    return CanIUse.#allData?.agents ? Object.keys(CanIUse.#allData?.agents) : null ?? null;
  }

  set agents(val) {
    if (val) {
      if (Array.isArray(val)) val = val.map(a => String(a)).sort().join(",");
      this.setAttribute("agents", val);
    } else {
      this.removeAttribute("agents");
    }
  }

  get expanded() {
    return this.hasAttribute("expanded");
  }

  set expanded(val) {
    if (val) {
      this.setAttribute("expanded", "");
    } else {
      this.removeAttribute("expanded");
    }
  }

  static get observedAttributes() {
    return ["features", "agents", "expanded"];
  }

  static #filterData(features, agents) {
    if (typeof features === "string") features = features.toLowerCase().split(",").map(f => f.trim()).sort();
    if (typeof agents === "string") agents = agents.toLowerCase().split(",").map(a => a.trim()).sort();
    if (!CanIUse.#allData) return {
      agents: {},
      data: {}
    };
    return {
      agents: !agents?.length ? CanIUse.#allData.agents : Object.entries(CanIUse.#allData.agents)?.filter(([key, _]) => agents?.includes(key)),
      data: !features?.length ? CanIUse.#allData.data : Object.entries(CanIUse.#allData.data).filter(([key, _]) => features?.includes(key))
    };
  }

  static async getData(store = false) {
    let data = CanIUse.#allData ?? null;
    if (!data && store && sessionStorage.getItem("caniuse")) {
      try {
        data = JSON.parse(sessionStorage.getItem("caniuse"));
      } catch (e) {
        data = null;
      }
    }
    if (data) {
      const now = new Date();
      const updated = new Date(data?.updated);
      const diff = now - updated;
      const diffDays = diff / (1000 * 60 * 60 * 24);
      if (diffDays >= 7) {
        data = null;
      }
    }
    if (!data) {
      await fetch(
        `https://raw.githubusercontent.com/Fyrd/caniuse/main/fulldata-json/data-2.0.json`
      ).then((response) => {
        if (!response.ok) throw new Error(`CanIUse response was not ok: ${response.status} ${response.statusText}`);
        return response.json();
      }).then((json) => {
        data = json;
        CanIUse.#allData = data;
        if (store) {
          sessionStorage.setItem("caniuse", JSON.stringify(json));
        }
      }).catch((_) => {
        data = null;
      });
    }
    return data;
  }

  async attributeChangedCallback(name, _, newVal) {
    if (name === "features") {
      this.features = newVal.split(",").map(f => f.trim());
    }
    if (name === "agents") {
      this.agents = newVal.split(",").map(a => a.trim());
    }
    this.#render();
  }

  async connectedCallback() {
    CanIUse.observedAttributes.forEach(attr => {
      this.#upgradeProperty(attr);
    });
    this.#render();
  }

  #upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  async #render() {
    const { agents, data } = await CanIUse.getData(this.store).then(() => CanIUse.#filterData(this.features, this.agents));
    if (this.#error || !data) {
      const err = this.#error ? this.#error?.message ?? JSON.stringify(this.#error) : null;
      const msg = err ?? `Couldn't load caniuse data ${this.features?.join(',') ?? ''} ${this.agents?.join(',') ?? ''}`;
      this.shadow.innerHTML = `<p style="font-style:italic;">${msg}</p>`;
      return;
    }
    // Create the component's HTML structure
    const agentHeadings = agents.map(([agent_key, info]) => `<th title="${info.browser != info.long_name ? info.long_name : ""}" data-ciu="${agent_key}">${info.browser}</th>`);
    const headings = `<tr><th>Feature</th>${agentHeadings.join("")}</tr>`;
    console.log({ agents, data });
    const rows = data.map(([feature_key, entry]) => {
      const featureLinks = entry.links.map(link => `<li><a href="${link.url}" target="_blank">${link.title}</a></li>`);
      const titleCell = `<td><details ${this.expanded ? "open" : ""}><summary>${entry.title}</summary><p>${entry.description}</p><ul>${featureLinks}</ul></details></td>`;
      const agentCells = agents.map(([agent_key, _]) => [agent_key, entry.stats[agent_key]]).map(([agent_key, stats]) => {
        return `<td data-ciu="${agent_key}">${(() => Object.entries(stats).sort((a, b) => {
          const [a_version, a_support] = a;
          const [b_version, b_support] = b;
          return a_version.localeCompare(b_version);
        }).map(([version, support]) => {
          if (support === "n") return `❌ ${version}`;
          if (support === "y") return `✅ ${version}`;
          return `<span title="${'title'}">🟡 ${version}</span>`;
        }).filter(str => !str.startsWith('❌')))()}</td>`;
      });
    }).join("");

    this.shadow.innerHTML = `
      <style>
          /* Add some styles for the component */
          :host {
                  display: block;
                  width: max - content;
                  height: max - content;
                }
                      .title {
                  margin: 0;
                  font - weight: bold;
                }
                      table {
                  border - collapse: collapse;
                  width: 100 %;
                }
                th, {
                  padding: 0.5rem;
                  text- align: center;
                border: 1px solid #ccc;
              }
                      .supported {
              background - color: #cfc;
            }
                      .unsupported {
              background - color: #fcc;
            }
                      .unknown {
              background - color: #fff;
            }
                      .flagged {
              background - color: #ffc;
            }
                      tfoot{
              font - style: italic;
            }
          }
        </style>
        <table>
          <thead>${headings}</thead>
          <tbody>${rows}</tbody>
          <tfoot>
            <tr>
              <td colspan="${1 + this.agents.length}">Data from <a href="https://caniuse.com/" target="_blank">caniuse.com</a></td>
            </tr>
          </tfoot>
        </table>
        ${JSON.stringify(this.#data)}
`;

    // Create a table body element and append it to the shadow DOM
    let tableBody = this.shadow.querySelector("tbody");

    // Loop through the caniuse data and create a table row element for each browser and version pair
    for (let browser in this.data) {
      for (let version in this.data[browser]) {
        // Create a table row element
        let tableRow = document.createElement("tr");

        // Set the browser and version attributes on the table row element
        tableRow.setAttribute("browser", browser);
        tableRow.setAttribute("version", version);

        // Append the table row element to the table body element
        tableBody.appendChild(tableRow);

        // Get the support data and the on-by-default flag for the browser and version
        let support = this.data[browser][version].split(" ")[0]; // The support value is the first part of the string
        let onByDefault = this.data[browser][version].split(" ")[1]; // The on-by-default flag is the second part of the string

        // Create a span element to display the support status
        let span = document.createElement("span");

        // Check the support value and the on-by-default flag and assign a class and text to the span element
        if (support === "y" && onByDefault === "y") {
          // Full support and enabled by default
          span.className = "supported";
          span.textContent = "Yes";
          span.title = "Full support";
        } else if (support === "y" && onByDefault === "n") {
          // Full support but not enabled by default
          span.className = "flagged";
          span.textContent = "Yes (flagged)";
          span.title = "This feature is not enabled by default. It can be enabled by changing a browser setting.";
        } else if (support === "n") {
          // No support
          span.className = "unsupported";
          span.textContent = "No";
          span.title = "No support";
        } else {
          // Partial or unknown support
          span.className = "unknown";
          span.textContent = "?";
          span.title = "Partial or unknown support";
        }

        // Append the span element to the table row element
        tableRow.appendChild(span);
      }
    }
  }
}

// Register the custom element with the browser
customElements.define("can-i-use", CanIUse);