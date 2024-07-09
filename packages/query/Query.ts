import { FetchFn, Options, QueryResult, Retry, RetryDelay, Status } from "./types";

const defaultOptions: Options = {
    ttl: 0,
    retry: ((failureCount: number, _error: Error) => failureCount < 3) as Retry,
    retryDelay: ((failureCount: number, _error: Error) => 1000 * 2 ** failureCount) as RetryDelay,
    useInterval: false,
    backgroundFetch: false,
    focusRefetch: false,
    offlineRefetch: false,
    reconnectRefetch: false,
    enabled: true,
    initialData: undefined,
};

const defaultResult: QueryResult = {
    key: "",
    status: "idle",
    data: undefined,
    previousData: undefined,
    dataUpdatedAt: undefined,
    error: undefined,
    errorUpdatedAt: undefined,
    failureCount: 0,
    stale: false,
};

class Query {
    static #queries = new Map();
    static #toKey(key: any): string {
        if (typeof key === "string" || typeof key === "number") {
        } else if (Array.isArray(key)) {
            return JSON.stringify(key);
        } else if (typeof key === "object") {
            const keys = Object.keys(key).sort();
            const obj = Object.create(null);
            for (const k of keys) {
                obj[k] = key[k];
            }
            return JSON.stringify(obj);
        }
        return String(key);
    }

    static has(key: any) {
        return Query.#queries.has(this.#toKey(key));
    }

    static create(key: any, fetchFn: FetchFn, options: Options) {
        if (!Query.has(key)) {
            Query.#queries.set(this.#toKey(key), new Query(key, fetchFn, options));
        }
    }

    static read(key: any) {
        return Query.#queries.get(this.#toKey(key));
    }

    static update(key: any, newFetchFn: FetchFn, newOptions: Options) {
        if (Query.has(key)) {
            Query.delete(key);
            Query.create(key, newFetchFn, newOptions);
        }
    }

    static delete(key: any) {
        return Query.#queries.delete(this.#toKey(key));
    }

    static clear() {
        return Query.#queries.clear();
    }

    static invalidate(key: any) {
        return Query.read(key)?.invalidate();
    }

    #key: string;
    #createdAt: Date;
    #fetchFn: FetchFn;
    #options: Options;
    #timeoutId: number | undefined;
    #isFocused: boolean;
    #isOnline: boolean;
    #result: QueryResult;
    constructor(key: any, fetchFn: FetchFn, options: Options) {
        this.#key = Query.#toKey(key);
        this.#createdAt = new Date();
        this.#fetchFn = fetchFn;
        this.options = options;
        this.invalidate();
        if (window) {
            window.addEventListener("focus", () => {
                this.#isFocused = true;
                if (this.options?.focusRefetch) {
                    this.#refetch();
                }
            });
            window.addEventListener("blur", () => {
                this.#isFocused = false;
            });
            window.addEventListener("online", () => {
                this.#isOnline = true;
                if (this.options?.reconnectRefetch) {
                    this.#refetch();
                }
            });
            window.addEventListener("offline", () => {
                this.#isOnline = false;
            });
        }
    }

    get key() {
        return this.#key;
    }

    get fetchFn() {
        return this.#fetchFn;
    }

    get options() {
        return this.#options;
    }

    set options(options: Options) {
        this.#options = {
            useInterval: false,
            ...defaultOptions,
            ...options,
        };
    }

    get updatedAt() {
        return new Date(
            Math.max(
                this.#result.dataUpdatedAt?.getTime() ?? 0,
                this.#result.errorUpdatedAt?.getTime() ?? 0,
                this.#createdAt.getTime()
            )
        );
    }

    get result(): QueryResult {
        const res = this.#result;
        if (this.isStale) {
            this.#refetch();
        }
        return {
            ...defaultResult,
            ...res,
            key: this.#key,
            stale: this.isStale,
        };
    }

    get isEnabled() {
        if (!this.#isFocused && !this.options?.backgroundFetch) {
            return false;
        }
        if (!this.#isOnline && !this.options?.offlineRefetch) {
            return false;
        }
        return typeof this.options?.enabled === "function"
            ? this.options.enabled()
            : this.options?.enabled ?? false;
    }

    get isStale() {
        const ttl = this.#options?.ttl ?? 0;
        return ttl > 0 && this.updatedAt.getTime() + ttl < Date.now();
    }

    #dispatchEvent(type?: string) {
        new EventTarget().dispatchEvent(
            new CustomEvent(type?.length ? type : "query", {
                bubbles: true,
                detail: this.result,
            })
        );
    }

    #updateState(data: any | undefined, error: Error | undefined) {
        const now = new Date();
        this.#result = {
            ...this.#result,
            data,
            dataUpdatedAt: data ? now : undefined,
            error,
            errorUpdatedAt: error ? now : undefined,
        };
        if (error) {
            this.#result.failureCount++;
        } else {
            this.#result.failureCount = 0;
        }
        this.#result.status = error ? "error" : data ? "success" : "idle";
        this.#dispatchEvent();
    }

    async #refetch() {
        if (!this.isEnabled) {
            return;
        }

        if (this.#result.status === "pending") {
            return;
        }

        this.#result = {
            ...this.#result,
            stale: this.isStale,
            status: "pending",
        };
        try {
            const data = await this.#fetchFn();
            this.#updateState(data, undefined);
        } catch (error) {
            this.#updateState(undefined, error);
            const retry = this.options?.retry;
            const retryDelay = this.options?.retryDelay;
            const shouldRetry =
                typeof retry === "function" ? retry(this.#result.failureCount, error) : retry;
            const delay =
                typeof retryDelay === "function"
                    ? retryDelay(this.#result.failureCount, error)
                    : retryDelay;
            if (shouldRetry) {
                setTimeout(() => {
                    this.#refetch();
                }, delay);
            }
        }
    }

    #setUpTimeout() {
        if (this.#timeoutId) {
            clearTimeout(this.#timeoutId);
            this.#timeoutId = undefined;
        }
        const ttl = this.#options?.ttl ?? 0;
        if (ttl) {
            if (this.options?.useInterval) {
                this.#timeoutId = setInterval(() => {
                    this.#refetch();
                }, ttl);
            } else {
                this.#timeoutId = setTimeout(() => {
                    this.#refetch();
                }, ttl);
            }
        }
    }

    invalidate() {
        this.#updateState(undefined, undefined);
        this.#refetch();
        this.#setUpTimeout();
    }

    toString() {
        return JSON.stringify(this.#result);
    }
    toJson() {
        return this.#result;
    }
    valueOf() {
        return this.#result?.data ?? this?.result?.previousData ?? this?.options?.initialData;
    }
}

export default Query;
