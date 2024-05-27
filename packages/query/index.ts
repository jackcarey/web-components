import type { FetchFn, GlobalStore, Options, QueryResult, Retry, RetryDelay } from "./types.d.ts";

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

/**
 * Represents a query object that handles fetching and caching data.
 */
class Query {
    #key = "";
    #fetchFn: undefined | FetchFn;
    #options: Options = defaultOptions;
    #localResult = defaultResult;

    /**
     * Creates a new instance of the Query class.
     * @param key - The key used to identify the query.
     * @param fetchFn - The function used to fetch the data.
     * @param options - The options for the query.
     */
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

    /**
     * Gets the key of the query.
     */
    get key() {
        return this.#key;
    }

    /**
     * Fetches the data for the query.
     */
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

    /**
     * Gets the options of the query.
     */
    get options() {
        return this.#options;
    }

    /**
     * Checks if the query is using a global store.
     */
    get isGlobal() {
        return (
            this.#options?.globalStore &&
            ["memory", "opfs", "session"].includes(this.#options.globalStore)
        );
    }

    /**
     * Gets the option values of the query.
     */
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

    /**
     * Gets the status of the query.
     */
    get status() {
        return this.#localResult.error ? "error" : this.#localResult.status;
    }

    /**
     * Checks if the query is pending.
     */
    get isPending() {
        return this.#localResult.status === "pending";
    }

    /**
     * Checks if the query has encountered an error.
     */
    get isError() {
        return this.#localResult.error ? true : false;
    }

    /**
     * Gets the data of the query.
     */
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

    /**
     * Checks if the query is using previous data.
     */
    get isPreviousData() {
        const hasData = this.#localResult.data;
        const hasPrevious = this.#localResult.previousData;
        const hasInitial = this.#options?.initialData;
        return !hasData && hasPrevious && !hasInitial;
    }

    /**
     * Gets the timestamp when the data was last updated.
     */
    get dataUpdatedAt() {
        return this.#localResult.dataUpdatedAt;
    }

    /**
     * Checks if the query data is stale.
     */
    get isStale() {
        if (!this.#localResult.dataUpdatedAt) return true;
        const now = Date.now();
        const ttl = this.options?.ttl ?? 60000;
        const updatedMs = this.#localResult.dataUpdatedAt.getTime();
        return now - ttl >= updatedMs;
    }

    /**
     * Gets the error of the query.
     */
    get error() {
        return this.#localResult.error;
    }

    /**
     * Gets the timestamp when the error occurred.
     */
    get errorUpdatedAt() {
        return this.#localResult.errorUpdatedAt;
    }

    /**
     * Gets the timestamp when the query was last updated.
     */
    get updatedAt() {
        if (!this.#localResult.dataUpdatedAt) return this.#localResult.errorUpdatedAt;
        if (!this.#localResult.errorUpdatedAt) return this.#localResult.dataUpdatedAt;
        const dataNumber = new Date(this.#localResult.dataUpdatedAt).getTime();
        const errNumber = new Date(this.#localResult.errorUpdatedAt).getTime();
        return new Date(Math.max(dataNumber, errNumber));
    }

    /**
     * Gets the failure count of the query.
     */
    get failureCount() {
        return this.#localResult.failureCount;
    }

    /**
     * Returns a string representation of the query.
     */
    toString() {
        return JSON.stringify({ ...this.optionValues, ...this.#localResult });
    }

    /**
     * Returns the data value of the query.
     */
    valueOf() {
        return this.data;
    }
}

export default Query;
export { Query };
