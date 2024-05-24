export type FetchFn = () => Promise<any>;

/**
 * Represents the type of store where 'any' looks across all stores, 'this' looks in the current object, 'memory' looks in the static class store, 'opfs' looks in the opfs cache, 'local' looks in the localSession storage, and 'session' looks in the sessionStorage.
 * @typedef {'any' | 'this' | 'memory' | 'opfs' | 'session'} store
 */
export enum GlobalStore {
    memory = "memory",
    opfs = "opfs",
    session = "session",
}

export type Retry = boolean | ((failureCount: number, error: Error | undefined) => boolean);
export type RetryDelay = number | ((failureCount: number, error: Error | undefined) => number);

export type Enabled = boolean | (() => boolean);

export type Options =
    | undefined
    | null
    | {
          globalStore?: GlobalStore;
          ttl?: number;
          retry?: Retry;
          retryDelay?: RetryDelay;
          useInterval: boolean;
          backgroundFetch?: boolean;
          focusRefetch?: boolean;
          reconnectRefetch?: boolean;
          enabled?: Enabled;
          initialData?: any;
      };

export type Status = "pending" | "error" | "success";

export type QueryResult = {
    status: Status;
    data: any;
    previousData?: any;
    dataUpdatedAt: undefined | Date;
    error: undefined | Error;
    errorUpdatedAt: Date | undefined;
    failureCount: number;
};
