window.addEventListener("DOMContentLoaded", () => {
    const components = ["can-i-use","i-cal"];
    components.forEach(component => {
        const script = document.createElement('script');
        script.src = `/packages/${component}.js`;
        document.head.appendChild(script);
    });
});