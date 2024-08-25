import ExpiringData from "./ExpiringData.class";

export enum EmitNamesDataLayer {
    status = 'status',
    stale = 'stale', 
    update = 'update',
    checksum = 'checksum',
}

export enum Status {
    idle = 'idle',
    pending = 'pending',
    retrying = 'retrying',
    success = 'success',
    error = 'error',
}

export type QueryFn = (() => Promise<any>) | (() => any);

export type ExpiringDataBooleanFn = (expiringData: ExpiringData) => boolean;

export type ExpiringDataFailureBooleanFn = (failureCount: number, expiringData: ExpiringData) => boolean;

export type ExpiringDataNumberFn = (
  failureCount: number,
  expiringData: ExpiringData
) => number;

export type DataLayerEventDetail = {
  key: string;
  updatedAt: Date | undefined;
  status: Status,
  isStale: boolean,
  expiresAt: Date | undefined,
  isError: boolean
  isPreviousData: boolean,
  checksum: string,
  data?: any,
  error?: Error,
};

export type DataLayerEvent = CustomEvent<DataLayerEventDetail>;

export type DataLayerOptions = {
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
    reconnectFetch: boolean | ExpiringDataBooleanFn;
};