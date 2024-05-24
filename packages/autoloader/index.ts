window.addEventListener("DOMContentLoaded", () => {
    const components = ["can-i-use","i-cal"];
    components.forEach(component => {
        if(!document.querySelector(component)) return;
        const script = document.createElement('script');
        script.type = 'module';
        script.src = `https://esm.sh/jsr/@web-components/${component}`;
        document.head.appendChild(script);
    });

    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const addedNodes = Array.from(mutation.addedNodes);
                addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const componentName = node.tagName.toLowerCase();
                        if (components.includes(componentName)) {
                            const script = document.createElement('script');
                            script.src = `/packages/${componentName}.js`;
                            document.head.appendChild(script);
                        }
                    }
                });
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});