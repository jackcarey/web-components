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


/**
 * A class that extends `EventTarget` and implements `ProxyHandler` to provide reactive data binding and event dispatching.
 * 
 * @template T - The type of the data object being proxied. Defaults to `object`.
 * 
 * @extends EventTarget
 * @implements ProxyHandler<T>
 * 
 * @property {T} data - The data object being proxied.
 * @property {SignalOptions | undefined} options - Optional configuration for the signal.
 * 
 * @example
 * ```typescript
 *
 * const signal = new Signal({});
 * 
 * signal.addEventListener("signal", (event) => {
 *   console.log(event.detail);
 * });
 * 
 * signal.foo = "bar"; // Triggers the event
 * ```
 */
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

    /**
     * Emits a custom event with the specified arguments.
     *
     * @template T - The type of the event data.
     * @param {EmitArgs<T>} args - The arguments to include in the event detail.
     * @returns {boolean} - Returns `true` if the event was successfully dispatched and not canceled, otherwise `false`.
     *
     */
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

    /**
     * Intercepts property access on the target object.
     *
     * @template T - The type of the target object.
     * @param {T} _target - The target object.
     * @param {string | symbol} property - The name or symbol of the property being accessed.
     * @param {any} receiver - The proxy or an object that inherits from the proxy.
     * @returns {ProxyValue<T>} - The value of the property being accessed.
     */
    get(_target: T, property: string | symbol, receiver: any): ProxyValue<T> {
        if (property === "addEventListener" || property === "removeEventListener") {
            return Reflect.get(EventTarget.prototype, property, this).bind(this);
        } else { }
        return Reflect.get(this.data, property, receiver);
    }

    /**
     * Sets the value of a property on the target object.
     *
     * @param _target - The target object on which to set the property.
     * @param prop - The name or symbol of the property to set.
     * @param value - The new value for the property.
     * @param receiver - The proxy or object that initially received the request.
     * @returns A boolean indicating whether the property was successfully set.
     *
     * @remarks
     * If the property is successfully set, an event is emitted with the action "set",
     * the property name, the old value, and the new value.
     */
    set(_target: T, prop: string | symbol, value: any, receiver: any): boolean {
        const oldValue = Reflect.get(this.data, prop, receiver);
        const isSuccessful = Reflect.set(this.data, prop, value, receiver);
        if (isSuccessful) {
            this.emit({ action: "set", prop, oldValue, value });
        }
        return isSuccessful;
    }

    /**
     * Deletes a property from the target object.
     *
     * @param _target - The target object from which the property will be deleted.
     * @param prop - The name or symbol of the property to delete.
     * @returns A boolean indicating whether the property was successfully deleted.
     *
     * @template T - The type of the target object.
     * @remarks
     * If the property is successfully deleted, an event is emitted with the action "deleteProperty",
     * the property name, and the old value.
     */
    deleteProperty(_target: T, prop: string | symbol): boolean {
        const oldValue = Reflect.get(this.data, prop);
        const result = Reflect.deleteProperty(this.data, prop);
        if (result) {
            this.emit({ action: "delete", prop, oldValue });
        }
        return result;
    }

    /**
     * Defines a new property directly on an object, or modifies an existing property on an object, and returns a boolean indicating whether the operation was successful.
     *
     * @param _target - The target object on which to define the property.
     * @param prop - The name or Symbol of the property to be defined or modified.
     * @param attributes - The descriptor for the property being defined or modified.
     * @returns A boolean indicating whether the property was successfully defined.
     * @remarks
     * If the property is successfully defined, an event is emitted with the action "defineProperty",
     * the property name, and the value attributes.
     */
    defineProperty(_target: T, prop: string | symbol, attributes: PropertyDescriptor): boolean {
        const isSuccessful = Reflect.defineProperty(this.data, prop, attributes);
        if (isSuccessful) {
            this.emit({ action: "defineProperty", prop, attributes });
        }
        return isSuccessful;
    }

    /**
     * Sets the prototype of the target object to the specified prototype.
     *
     * @param _target - The target object whose prototype is to be set.
     * @param prototype - The new prototype object or null.
     * @returns A boolean indicating whether the prototype was successfully set.
     *
     * @emits {Object} - Emits an event with the action "setPrototypeOf" and the new prototype.
     * @remarks
     * If the prototype is successfully set, an event is emitted with the action "setPrototypeOf" and the new prototype.
     */
    setPrototypeOf(_target: T, prototype: object | null): boolean {
        const isSuccessful = Reflect.setPrototypeOf(this.data, prototype);
        if (isSuccessful) {
            this.emit({ action: "setPrototypeOf", prototype });
        }
        return isSuccessful;
    }
}