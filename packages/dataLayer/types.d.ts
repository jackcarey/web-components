import ExpiringData from "./ExpiringData.class";

export type AnyEvent = Event | CustomEvent;

export type EmitEventDetail = {
    key: string;
    updatedAt: Date | undefined;
    status: Status,
    isStale: boolean,
    isError: boolean
    isPreviousData: boolean,
    checksum: string,
  };

export enum EmitNamesExpiringData {
    stale = 'stale',
    update = 'update',
};

export enum EmitNamesDataLayer {
    status = 'status',
    stale = 'stale', 
    update = 'update',
    checksum = 'checksum',
}

export type QueryFn = (() => Promise<any>) | (() => any);

export type ExpiringDataBooleanFn = (expiringData: ExpiringData) => boolean;

export type ExpiringDataFailureBooleanFn = (failureCount: number, expiringData: ExpiringData) => boolean;

export type ExpiringDataNumberFn = (
  failureCount: number,
  expiringData: ExpiringData
) => number;

export type BaseOptions = {
    //standard options
    ttlMs: number;
    useInterval: number;
    enabled: boolean | ExpiringDataBooleanFn;
    emitMode: EmitNamesDataLayer;
    //fetch options
    retry: boolean | ExpiringDataFailureBooleanFn;
    retryDelay: number | ExpiringDataNumberFn;  
    backgroundFetch?: boolean | ExpiringDataBooleanFn;
    focusFetch: boolean | ExpiringDataBooleanFn;
    reconnectFetch?: boolean | ExpiringDataBooleanFn;
};

export enum Status {
    idle = 'idle',
    pending = 'pending',
    success = 'success',
    error = 'error',
}