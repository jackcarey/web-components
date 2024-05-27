import type {
    FetchFn,
    GlobalStore,
    Options,
    QueryResult,
    Retry,
    RetryDelay,
    Status,
} from "./types.d.ts";

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
    get key(): string {
        return this.#key;
    }

    /**
     * Fetches the data for the query.
     */
    refetch(): void {
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
    get options(): Options {
        return this.#options;
    }

    /**
     * Checks if the query is using a global store.
     */
    get isGlobal(): Boolean {
        const hasGlobalStore = this.#options?.globalStore ? true : false;
        return (
            hasGlobalStore &&
            ["memory", "opfs", "session"].includes(this.#options?.globalStore as string)
        );
    }

    /**
     * Gets the option values of the query.
     */
    get optionValues(): Options {
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
    get status(): Status {
        return this.#localResult.error ? "error" : this.#localResult.status;
    }

    /**
     * Checks if the query is pending.
     */
    get isPending(): Boolean {
        return this.#localResult.status === "pending";
    }

    /**
     * Checks if the query has encountered an error.
     */
    get isError(): Boolean {
        return this.#localResult.error ? true : false;
    }

    /**
     * Gets the data of the query.
     */
    get data(): unknown {
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
    get isPreviousData(): Boolean {
        const hasData = this.#localResult.data;
        const hasPrevious = this.#localResult.previousData;
        const hasInitial = this.#options?.initialData;
        return !hasData && hasPrevious && !hasInitial;
    }

    /**
     * Gets the timestamp when the data was last updated.
     */
    get dataUpdatedAt(): Date | undefined {
        return this.#localResult?.dataUpdatedAt ?? undefined;
    }

    /**
     * Checks if the query data is stale.
     */
    get isStale(): Boolean {
        if (!this.#localResult.dataUpdatedAt) return true;
        const now = Date.now();
        const ttl = this.options?.ttl ?? 60000;
        const updatedMs = this.#localResult.dataUpdatedAt.getTime();
        return now - ttl >= updatedMs;
    }

    /**
     * Gets the error of the query.
     */
    get error(): Error | undefined {
        return this.#localResult?.error ?? undefined;
    }

    /**
     * Gets the timestamp when the error occurred.
     */
    get errorUpdatedAt(): Date | undefined {
        return this.#localResult?.errorUpdatedAt ?? undefined;
    }

    /**
     * Gets the timestamp when the query was last updated.
     */
    get updatedAt(): Date | undefined {
        if (!this.#localResult.dataUpdatedAt) return this.#localResult.errorUpdatedAt;
        const dataNumber = this.#localResult?.dataUpdatedAt
            ? new Date(this.#localResult.dataUpdatedAt).getTime()
            : undefined;
        const errNumber = this.#localResult?.errorUpdatedAt
            ? new Date(this.#localResult.errorUpdatedAt)?.getTime()
            : undefined;
        const hasNumber = dataNumber || errNumber;
        return !hasNumber ? undefined : new Date(Math.max(dataNumber ?? 0, errNumber ?? 0));
    }

    /**
     * Gets the failure count of the query.
     */
    get failureCount(): number {
        return this.#localResult.failureCount;
    }

    /**
     * Returns a string representation of the query.
     */
    toString(): string {
        return JSON.stringify({ ...this.optionValues, ...this.#localResult });
    }

    /**
     * Returns the data value of the query.
     */
    valueOf(): unknown {
        return this.data;
    }
}

export default Query;
export { Query };
