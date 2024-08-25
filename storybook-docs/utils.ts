export const BindTemplate = (componentName: string) => {
    const fn = (argObject?:object )=>{
        const component = document.createElement(componentName);
        if(argObject === undefined) return component;
        Object.entries(argObject as object).forEach(([key, value]) => {
            component[key] = value;
        });
        return component;
    }
    return fn.bind({})
}