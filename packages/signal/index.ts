/**
 * Options for configuring a signal.
 * 
 * @typedef {Object} SignalOptions
 * @property {string} name - The name of the signal.
 * @property {boolean} [useSuffix] - Whether to emit the event as `signal-[name]` (true) or just `signal` (false). The name is always included in the event detail.
 * @property {boolean} [bubbles] - Whether the signal bubbles up through the DOM.
 * @property {boolean} [cancelable] - Whether the signal emit event can be canceled.
 * @property {EventTarget} [target] - Something other than 'this' for emit events to be dispatched on.
 */
export type SignalOptions = {
    name: string;
    useSuffix?: boolean;
    bubbles?: boolean;
    cancelable?: boolean;
};
type ProxyValue<T> = (string extends keyof T ? T[keyof T & string] : any) | (symbol extends keyof T ? T[keyof T & symbol] : any);
type EmitArgs<T> = ["set", prop: string | symbol, oldValue: any, value: any]
    | ["defineProperty", prop: string | symbol, attributes: PropertyDescriptor]
    | ["delete", prop: string | symbol, oldValue: ProxyValue<T>]
    | ["setPrototypeOf", proto: object | null]
    | ["data"];

export default class Signal<T extends object> extends EventTarget implements ProxyHandler<T> {
    private data: T;
    private options: SignalOptions;

    constructor(data: T, options: SignalOptions) {
        super();
        this.data = data;
        this.options = options;
        return new Proxy(this.data, this) as unknown as T & Signal<T>;
    }

    private emit(...args: EmitArgs<T>): boolean {
        const timestamp = Date.now();
        const [action, prop, value] = args;
        const { bubbles, cancelable, name, useSuffix } = this.options;
        const eventName = 'signal' + (useSuffix && name.length) ? `${name}` : '';
        const detail = {
            action, prop, value, timestamp, data: this.data
        };
        const event = new CustomEvent(eventName, { bubbles, cancelable, detail });
        return super.dispatchEvent(event);
    }

    get(_target: T, property: string | symbol, receiver: any) {
        if (property === "addEventListener" || property === "removeEventListener") {
            return Reflect.get(EventTarget.prototype, property, this);
        } else if (property === "dispatchEvent") {
            return (_evt: Event) => this.emit("data");
        }
        return Reflect.get(this.data, property, receiver);
    }

    set(_target: T, prop: string | symbol, value: any, receiver: any): boolean {
        const oldValue = Reflect.get(this.data, prop, receiver);
        const isSuccessful = Reflect.set(this.data, prop, value, receiver);
        if (isSuccessful) {
            this.emit("set", prop, oldValue, value);
        }
        return isSuccessful;
    }

    deleteProperty(_target: T, prop: string | symbol): boolean {
        const oldValue = Reflect.get(this.data, prop);
        const result = Reflect.deleteProperty(this.data, prop);
        if (result) {
            this.emit("delete", prop, oldValue);
        }
        return result;
    }

    defineProperty(_target: T, prop: string | symbol, attributes: PropertyDescriptor): boolean {
        const isSuccessful = Reflect.defineProperty(this.data, prop, attributes);
        if (isSuccessful) {
            this.emit("defineProperty", prop, attributes);
        }
        return isSuccessful;
    }
    setPrototypeOf(_target: T, proto: object | null): boolean {
        const isSuccessful = Reflect.setPrototypeOf(this.data, proto);
        if (isSuccessful) {
            this.emit("setPrototypeOf", proto);
        }
        return isSuccessful;
    }
}