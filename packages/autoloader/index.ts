import components from "./components";

/**
 * Automatically loads components from JSR @web-components.
 * It adds a script tag with the component's source URL to the document head.
 * It also observes the document body for any added nodes and loads the corresponding components.
 */
const autoload = () => {
    components.forEach((component) => {
        if (!document.querySelector(component)) return;
        loadTag(component);
    });

    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
                const addedNodes = Array.from(mutation.addedNodes);
                addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const isIncluded = components.includes(node.nodeName.toLowerCase());
                        if (isIncluded) loadTag(isIncluded);
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
const loadTag = (name) => {
    if (!name) return;
    const script = document.createElement("script");
    script.type = "module";
    script.src = `https://esm.sh/jsr/@web-components/${encodeURIComponent(name)}`;
    script.async = true;
    script.fetchPriority = "high";
    document.head.appendChild(script);
};

window.addEventListener("DOMContentLoaded", autoload);
