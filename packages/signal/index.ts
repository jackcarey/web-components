/**
 * Options for configuring a signal.
 * 
 * @typedef {Object} SignalOptions
 * @property {string} name - The name of the signal.
 * @property {boolean} [useSuffix] - Whether to emit the event as `signal-[name]` (true) or just `signal` (false). The name is always included in the event detail.
 * @property {boolean} [bubbles] - Whether the signal bubbles up through the DOM.
 * @property {boolean} [cancelable] - Whether the signal emit event can be canceled.
 */
export type SignalOptions = {
    name?: string;
    useSuffix?: boolean;
    bubbles?: boolean;
    cancelable?: boolean;
    target?: EventTarget;
};
type ProxyValue<T> = (string extends keyof T ? T[keyof T & string] : any) | (symbol extends keyof T ? T[keyof T & symbol] : any);
type EmitArgs<T> = { action: "set", prop: string | symbol, oldValue: any, value: any }
    | { action: "defineProperty", prop: string | symbol, attributes: PropertyDescriptor }
    | { action: "delete", prop: string | symbol, oldValue: ProxyValue<T> }
    | { action: "setPrototypeOf", prototype: object | null }
    | { action: "data" };

export default class Signal<T extends Object = object> extends EventTarget implements ProxyHandler<T> {
    [x: string | number | symbol]: any; //allows for any key to be dynamically defined
    private data: T;
    private options: SignalOptions | undefined;

    constructor(data: T, options?: SignalOptions) {
        super();
        this.data = data ?? {};
        this.options = options;
        return new Proxy(this.data, this) as unknown as T & Signal<T>;
    }

    private emit(args: EmitArgs<T>): boolean {
        const timestamp = Date.now();
        const { bubbles = true, cancelable = true, name = "", useSuffix = false } = this.options ?? {};
        const eventName = `signal${(useSuffix && name?.length) ? `-${name}` : ''}`;
        const detail = { ...args, name, timestamp, data: this.data };
        const event = new CustomEvent(eventName, { bubbles, cancelable, detail });
        const tgt = this.options?.target;
        const tgtCanContinue = (tgt && tgt["dispatchEvent"]) ? tgt?.dispatchEvent(event) : false;
        let superResult: boolean | undefined = undefined;
        if (tgtCanContinue) {
            superResult = super.dispatchEvent(event);
        }
        return tgtCanContinue ? (superResult ?? true) : false;
    }

    get(_target: T, property: string | symbol, receiver: any): ProxyValue<T> {
        if (property === "addEventListener" || property === "removeEventListener") {
            return Reflect.get(EventTarget.prototype, property, this).bind(this);
        } else { }
        return Reflect.get(this.data, property, receiver);
    }

    set(_target: T, prop: string | symbol, value: any, receiver: any): boolean {
        const oldValue = Reflect.get(this.data, prop, receiver);
        const isSuccessful = Reflect.set(this.data, prop, value, receiver);
        if (isSuccessful) {
            this.emit({ action: "set", prop, oldValue, value });
        }
        return isSuccessful;
    }

    deleteProperty(_target: T, prop: string | symbol): boolean {
        const oldValue = Reflect.get(this.data, prop);
        const result = Reflect.deleteProperty(this.data, prop);
        if (result) {
            this.emit({ action: "delete", prop, oldValue });
        }
        return result;
    }

    defineProperty(_target: T, prop: string | symbol, attributes: PropertyDescriptor): boolean {
        const isSuccessful = Reflect.defineProperty(this.data, prop, attributes);
        if (isSuccessful) {
            this.emit({ action: "defineProperty", prop, attributes });
        }
        return isSuccessful;
    }

    setPrototypeOf(_target: T, prototype: object | null): boolean {
        const isSuccessful = Reflect.setPrototypeOf(this.data, prototype);
        if (isSuccessful) {
            this.emit({ action: "setPrototypeOf", prototype });
        }
        return isSuccessful;
    }
}