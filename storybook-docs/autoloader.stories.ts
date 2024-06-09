export default {
    title: "Utilities/autoloader",
};

export const Default = () => {
    const component = document.createElement("code");
    component.innerHTML = `<script src="https://esm.sh/jsr/@web-components/autoloader" type="module"></script><p>see code</p>`;
    return component;
};
