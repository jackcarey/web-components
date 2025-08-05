/**
 * Dynamically render the components DOM using corresponding templates.
 * This allows for a single component to have multiple themes or styles based on the template used.
 * The template is selected based on the closest ancestor element with a `data-dynamic-template`
 * attribute and the tag name of the component.
 * If no template is found, the light DOM content is used as-is.
 */
export class DynamicTemplate extends HTMLElement {
    static datasetAttribute = 'dynamic-template';
    static defaultTemplate: string | null | undefined = undefined;
    private static observer: MutationObserver | null = null;
    private static instances: Set<DynamicTemplate> = new Set();

    constructor() {
        super();
    }
    connectedCallback() {
        DynamicTemplate.instances.add(this);
        // the mutation observer needn't exist before any element instances are connected
        if (!DynamicTemplate.observer) {
            DynamicTemplate.observer = new MutationObserver((mutations) => {
                for (const instance of DynamicTemplate.instances) {
                    //only re-rendering elements that are affected by the mutation
                    const isChildOfMutation = mutations.some(mutation => {
                        return mutation.target.contains(instance);
                    });
                    if (isChildOfMutation) {
                        instance.render();
                    }
                }
            });
            DynamicTemplate.observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: [`data-${DynamicTemplate.datasetAttribute}`]
            });
        }
        this.render();
    }
    disconnectedCallback() {
        DynamicTemplate.instances.delete(this);
        // Disconnect observer if no instances remain
        if (DynamicTemplate.instances.size === 0 && DynamicTemplate.observer) {
            DynamicTemplate.observer.disconnect();
            DynamicTemplate.observer = null;
        }
    }
    protected get templateName(): string | undefined {
        const dataEl = this.closest(`[data-${DynamicTemplate.datasetAttribute}]`);
        const templateName = (dataEl as HTMLElement).dataset.dynamicTemplate;
        return templateName;
    }
    protected get templateId(): string | undefined {
        const tagName = this.tagName.toLowerCase();
        const templateId = this.templateName ? `${this.templateName}-${tagName}` : DynamicTemplate.defaultTemplate?.length ? DynamicTemplate.defaultTemplate : undefined;
        return templateId;
    }
    protected render(templateId?: string) {
        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open',
                delegatesFocus: true
            });
        }
        const usingTemplateId: string | undefined = templateId || this.templateId;
        const template = usingTemplateId ? document.querySelector(`template[id="${usingTemplateId}"]`) as HTMLTemplateElement | null : null;

        const exportedParts = template?.getAttribute('exportparts');
        if (exportedParts) {
            this.setAttribute('exportparts', exportedParts);
        } else {
            this.removeAttribute('exportparts');
        }

        if (template) {
            const clone = (template as HTMLTemplateElement).content.cloneNode(true) as DocumentFragment;
            this.shadowRoot!.innerHTML = '';
            this.shadowRoot!.appendChild(clone);
        } else {
            //setting the innerHTML directly allows the `slot` attributes to be ignored.
            this.shadowRoot!.innerHTML = this.innerHTML;
        }
    }
}