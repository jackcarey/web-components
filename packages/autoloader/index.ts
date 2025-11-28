import components from "./components";

/**
 * Automatically loads components from JSR @web-components.
 * It adds a script tag with the component's source URL to the document head.
 * It also observes the document body for any added nodes and loads the corresponding components.
 */
const autoload = () => {
    //load from current DOM
    Object.entries(components).forEach(([tagName]) => {
        if (!document.querySelector(tagName)) return;
        loadTag(tagName);
    });

    //load components when the DOM changes
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
                const addedNodes = Array.from(mutation.addedNodes);
                addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const nodeTagName = node.nodeName.toLowerCase();
                        const isIncluded = Object.keys(components).includes(nodeTagName);
                        if (isIncluded) loadTag(nodeTagName);
                    }
                });
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
};

/**
 * Loads a web component by dynamically creating a script tag and appending it to the document head.
 * @param name - The name of the web component to load.
 */
const loadTag = (name: string) => {
    if (!name) return;
    if (customElements.get(name)) return; // Prevent loading if already defined
    const version = components[name] ?? "latest";
    const script = document.createElement("script");
    script.type = "module";
    script.async = true;
    script.src = `https://esm.sh/jsr/@web-components/${encodeURIComponent(name)}${version === "latest" ? "" : `@${version}`
        }`;
    const alreadyExists = document.querySelector(`script[src="${script.src}"]`);
    if (alreadyExists) return; // Prevent loading the same script multiple times
    document.head.appendChild(script);
};

window.addEventListener("DOMContentLoaded", autoload);
