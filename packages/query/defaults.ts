import { Options, Retry, RetryDelay, QueryResult } from "./types";

export const defaultOptions: Options = {
    ttl: 0,
    retry: ((failureCount: number, _error: Error) => failureCount < 3) as Retry,
    retryDelay: ((failureCount: number, _error: Error) =>
      1000 * 2 ** failureCount) as RetryDelay,
    useInterval: false,
    backgroundFetch: false,
    focusRefetch: false,
    offlineRefetch: false,
    reconnectRefetch: false,
    enabled: true,
    initialData: undefined,
  };
  
  export const defaultResult: QueryResult = {
    key: '',
    status: 'idle',
    data: undefined,
    previousData: undefined,
    dataUpdatedAt: undefined,
    error: undefined,
    errorUpdatedAt: undefined,
    failureCount: 0,
    stale: false,
  };
