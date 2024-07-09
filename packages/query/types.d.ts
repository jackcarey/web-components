export type FetchFn = () => Promise<any>;

export type Retry = boolean | ((failureCount: number, error: Error | undefined) => boolean);
export type RetryDelay = number | ((failureCount: number, error: Error | undefined) => number);

export type Enabled = boolean | (() => boolean);

export type Options =
    | undefined
    | null
    | {
          ttl?: number;
          retry?: Retry;
          retryDelay?: RetryDelay;
          useInterval: boolean;
          backgroundFetch?: boolean;
          focusRefetch?: boolean;
          offlineRefetch?: boolean;
          reconnectRefetch?: boolean;
          enabled?: Enabled;
          initialData?: any;
      };

export type Status = "idle" | "pending" | "error" | "success";

export type QueryResult = {
    status: Status;
    key: string;
    data: any;
    previousData?: any;
    dataUpdatedAt: undefined | Date;
    error: undefined | Error;
    errorUpdatedAt: Date | undefined;
    failureCount: number;
    stale: boolean;
};
