window.addEventListener("load", () => {
    const components = ["i-cal","can-i-use"];
    components.forEach(component => {
        const script = document.createElement('script');
        script.src = `/packages/${component}.js`;
        document.head.appendChild(script);
    });
})