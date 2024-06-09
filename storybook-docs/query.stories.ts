export default {
    title: "Utilities/query",
};

export const Default = () => {
    const component = document.createElement("code");
    component.innerHTML = `<script src="https://esm.sh/jsr/@web-components/query" type="module"></script><p>see code</p>`;
    return component;
};
