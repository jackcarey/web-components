import { FetchFn, GlobalStore, Options, QueryResult, Retry, RetryDelay } from "./types";

const defaultOptions: Options = {
    retry: ((failureCount: number, error: Error) => failureCount < 3) as Retry,
    retryDelay: ((failureCount: number, error: Error) => 1000 * 2 ** failureCount) as RetryDelay,
    useInterval: false,
    backgroundFetch: false,
    focusRefetch: false,
    reconnectRefetch: false,
    enabled: true,
    initialData: undefined,
};

const defaultResult: QueryResult = {
    status: "pending",
    data: undefined,
    previousData: undefined,
    dataUpdatedAt: undefined,
    error: undefined,
    errorUpdatedAt: undefined,
    failureCount: 0,
};

class Query {
    #key = "";
    #fetchFn: undefined | FetchFn;
    #options: Options = defaultOptions;
    //todo: handle global store
    #localResult = defaultResult;
    constructor(key: any, fetchFn: FetchFn, options: Options) {
        this.#key = ["string", "number"].includes(typeof key) ? String(key) : JSON.stringify(key);
        this.#fetchFn = fetchFn;
        this.#options = {
            ...defaultOptions,
            ...options,
            useInterval: options?.useInterval ?? false,
        };
        this.refetch();
    }

    get key() {
        return this.#key;
    }

    //todo: handle global store
    refetch() {
        if (this.#fetchFn) {
            this.#localResult.status = "pending";
            this.#fetchFn()
                .then((data) => {
                    this.#localResult = {
                        ...this.#localResult,
                        status: "success",
                        data,
                        previousData: data,
                        dataUpdatedAt: new Date(),
                        error: undefined,
                        errorUpdatedAt: undefined,
                    };
                })
                .catch((err) => {
                    this.#localResult = {
                        ...this.#localResult,
                        status: "error",
                        data: undefined,
                        error: err,
                        errorUpdatedAt: new Date(),
                    };
                });
        }
    }

    get options() {
        return this.#options;
    }

    get isGlobal() {
        return (
            this.#options?.globalStore &&
            ["memory", "opfs", "session"].includes(this.#options.globalStore)
        );
    }

    get optionValues() {
        const opts = { ...defaultOptions, ...this.#options };
        if (typeof this.#options?.retry === "function") {
            opts.retry = this.#options.retry(this.failureCount, this.error);
        }
        if (typeof this.#options?.retryDelay === "function") {
            opts.retryDelay = this.#options.retryDelay(this.failureCount, this.error);
        }
        if (typeof this.#options?.enabled === "function") {
            opts.enabled = this.#options.enabled();
        }
        return opts as Options;
    }

    get status() {
        return this.#localResult.error ? "error" : this.#localResult.status;
    }

    get isPending() {
        return this.#localResult.status === "pending";
    }

    get isError() {
        return this.#localResult.error ? true : false;
    }

    get data() {
        if (this.isStale) {
            this.refetch();
        }
        return (
            this.#localResult.data ??
            this.#localResult.previousData ??
            this.#options?.initialData ??
            undefined
        );
    }

    get isPreviousData() {
        const hasData = this.#localResult.data;
        const hasPrevious = this.#localResult.previousData;
        const hasInitial = this.#options?.initialData;
        return !hasData && hasPrevious && !hasInitial;
    }

    get dataUpdatedAt() {
        return this.#localResult.dataUpdatedAt;
    }

    get isStale() {
        if (!this.#localResult.dataUpdatedAt) return true;
        const now = Date.now();
        const ttl = this.options?.ttl ?? 60000;
        const updatedMs = this.#localResult.dataUpdatedAt.getTime();
        return now - ttl >= updatedMs;
    }

    get error() {
        return this.#localResult.error;
    }

    get errorUpdatedAt() {
        return this.#localResult.errorUpdatedAt;
    }

    get updatedAt() {
        if (!this.#localResult.dataUpdatedAt) return this.#localResult.errorUpdatedAt;
        if (!this.#localResult.errorUpdatedAt) return this.#localResult.dataUpdatedAt;
        const dataNumber = new Date(this.#localResult.dataUpdatedAt).getTime();
        const errNumber = new Date(this.#localResult.errorUpdatedAt).getTime();
        return new Date(Math.max(dataNumber, errNumber));
    }

    get failureCount() {
        return this.#localResult.failureCount;
    }

    toString() {
        return JSON.stringify({ ...this.optionValues, ...this.#localResult });
    }

    valueOf() {
        return this.data;
    }
}

class StaticQuery {}
