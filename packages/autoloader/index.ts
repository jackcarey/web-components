/**
   * @module
   * This module contains automatically loads all components from the JSR @web-components scope
   *
+  * @example
+  * ```html
+  * <script src="https://esm.sh/jsr/@web-components/autoloader"></script>
+  * ```
   */

window.addEventListener("DOMContentLoaded", () => {
    const components = ["can-i-use", "i-cal"];
    components.forEach((component) => {
        const script = document.createElement("script");
        script.src = `/packages/${component}.js`;
        document.head.appendChild(script);
    });
});
