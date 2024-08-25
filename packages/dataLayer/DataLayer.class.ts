import ExpiringData, { EmitNamesExpiringData } from './ExpiringData.class';

import type { DataLayerOptions, DataLayerEvent, QueryFn } from './types';
import { EmitNamesDataLayer, Status } from './types';

export function isDataLayerEvent(evt: Event): boolean {
  if (!(evt instanceof CustomEvent)) {
    return false;
  }
  const { detail } = evt;
  const requiredKeys = [
    'key',
    'updatedAt',
    'status',
    'isStale',
    'isError',
    'isPreviousData',
    'checksum',
  ];
  const optionalKeys = ['data', 'error'];
  const keyCount = Object.keys(detail).length;
  if (keyCount === requiredKeys.length) {
    return requiredKeys.every((key) => key in detail);
  } else if (keyCount === requiredKeys.length + optionalKeys.length) {
    const hasRequired = requiredKeys.every((key) => key in detail);
    const hasOptional = optionalKeys.every((key) => key in detail);
    return hasRequired && hasOptional;
  }
  return false;
}

export class DataLayer extends EventTarget {
  #key: string = '';
  #expiringData = new ExpiringData(undefined, undefined, 0);
  #queryFn: any;
  #status: Status = Status.idle;
  #failureCount: number = 0;
  #timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
  #options: DataLayerOptions = {
    ttlMs: 0,
    useInterval: 300 * 1000, //5 minutes
    retry: (failureCount: number, _) => failureCount < 3, // retry upto 3 times by default
    retryDelay: (failureCount: number, _) => 1000 ** failureCount, // exponential backoff by default
    enabled: true,
    emitMode: EmitNamesDataLayer.update,
    backgroundFetch: false,
    focusFetch: true,
    reconnectFetch: true,
  };
  #broadcastChannel: BroadcastChannel | undefined;
  #rtcPeerConnection: RTCPeerConnection | undefined;
  #rtcDataChannel: RTCDataChannel | undefined;
  #ws: WebSocket | undefined;
  #sse: EventSource | undefined;

  /**
   * This method is used to emit events based on the `emitMode` option. By default, the `update` event is emitted.
   * @param emitType - The type of event to emit
   * @returns - A boolean indicating if the event was emitted
   */
  protected emitEvent = (emitType: EmitNamesDataLayer): boolean => {
    const detail: DataLayerEvent['detail'] = {
      key: this.#key,
      updatedAt: this.updatedAt,
      status: this.status,
      isStale: this.isStale,
      expiresAt: this.expiresAt,
      isError: this.isError,
      isPreviousData: this.isPreviousData,
      checksum: this.checksum,
    };
    const canEmitData = this.#options.emitMode === EmitNamesDataLayer.update;
    if (!canEmitData && emitType == EmitNamesDataLayer.update) {
      emitType = EmitNamesDataLayer.checksum;
    }
    if (emitType === EmitNamesDataLayer.update) {
      detail['data'] = this.data;
      detail['error'] = this.error;
    }
    const eventOptions = {
      detail,
      bubbles: true,
      cancelable: true,
      composed: true,
    };
    return this.dispatchEvent(new CustomEvent(emitType, eventOptions));
  };

  /**
   * This method is used to update the internal `expiringData` object and associated timestamps.
   * @param data - The new data to update the data layer with.
   * @param error - The new error to update the data layer with.
   */
  protected update = async (data?: any, error?: Error) => {
    this.#expiringData.update(data, error);
  };

  /**
   * This getter is used to determine if the query function should be retried. If the `retry` option is a function, it will be called with the internal `failureCount` and `expiringData` object.
   * @returns - A boolean indicating if the query function should be retried.
   */
  private get shouldRetry() {
    if (typeof this.#options.retry === 'function') {
      try {
        return this.#options.retry(this.#failureCount, this.#expiringData);
      } catch (e) {
        console.warn('DataLayer: shouldRetry', e);
        return false;
      }
    }
    return this.#options.retry ?? false;
  }

  /**
   * This getter is used to determine the delay before retrying the query function.
   * The default is an exponential backoff starting at 1 second.
   * @returns - The delay in milliseconds before retrying the query function.
   */
  private get retryDelay() {
    if (typeof this.#options.retryDelay === 'function') {
      try {
        return this.#options.retryDelay(this.#failureCount, this.#expiringData);
      } catch (e) {
        console.warn('DataLayer: retryDelay', e);
        return 100;
      }
    }
    return this.#options.retryDelay ?? 100;
  }

  /**
   * This method is used to execute the query function. It will update the status of the data layer based on the result of the query function.
   */
  protected executeQuery = async () => {
    if (!this.enabled) {
      this.status = Status.idle;
      return;
    } else {
      this.status = Status.pending;
      try {
        const data = await this.#queryFn();
        this.#failureCount = 0;
        this.status = Status.success;
        return await this.update(data);
      } catch (error) {
        this.#failureCount++;
        this.status = Status.error;
        await this.update(undefined, error);
        if (this.shouldRetry) {
          // this status is changed in addition to the error status
          // so that downstream eventHandlers can react to both
          this.status = Status.retrying;
          this.timeoutId = setTimeout(this.executeQuery, this.retryDelay);
        }
      }
    }
    if (this?.options?.useInterval && !this.timeoutId) {
      this.timeoutId = setInterval(
        this.executeQuery,
        this.#options.useInterval
      );
    }
  };

  /**
   * Directly consume a DataLayerEvent in order to either update the underlying data or trigger a new query.
   * @param evt - The DataLayerEvent to consume
   * @returns - A boolean indicating if the event was consumed
   */
  protected consumeEvent = (evt: DataLayerEvent | CustomEvent): boolean => {
    if (!isDataLayerEvent(evt)) {
      console.error(
        'DataLayer: cannot consume an invalid event with type ' + evt.type
      );
      return false;
    }
    const { detail } = evt;
    // keys don't match, so this event is not for this instance
    if (this.key !== detail.key) {
      return false;
    }
    // nothing has changed, so no need to update
    if (this.checksum === detail.checksum) {
      return false;
    }
    // if this instance is more recent, then there is no need to update
    const isMoreRecent =
      detail?.updatedAt && this.updatedAt && this.updatedAt < detail.updatedAt;
    if (!isMoreRecent) {
      return false;
    }
    // if the incoming data is not most recent, then fallback to this instance for changes
    if (detail.isPreviousData || detail.isStale) {
      return false;
    }
    // ignore in-progress status events as they are not actionable
    const isBusy = [Status.pending, Status.retrying].includes(detail.status);
    if (isBusy) {
      return false;
    }
    // the event is worth consuming, so update the data layer
    const { data, error } = detail;
    // if the event is undefined then
    const skipQuery = data || error;
    if (skipQuery) {
      this.update(data, error);
    } else {
      this.executeQuery();
    }
    return true;
  };

  /**
   * This method is used to invalidate the data layer. It trigger the `stale` event which then triggers query function execution.
   */
  protected invalidate() {
    this.#expiringData.invalidate();
  }

  private handleExpiringDataEvent = (evt: Event | CustomEvent) => {
    evt.stopImmediatePropagation();
    if (this.enabled) {
      switch (evt.type) {
        case EmitNamesExpiringData.stale:
          {
            this.emitEvent(EmitNamesDataLayer.stale);
            this.executeQuery();
          }
          break;
        default:
          {
            this.emitEvent(EmitNamesDataLayer.update);
          }
          break;
      }
    }
  };

  /**
   * Create a new DataLayer instance
   * @param key - The key for the data layer
   * @param queryFn - The function to execute to fetch/create data
   * @param options - The options for the data layer
   */
  public constructor(
    key: string,
    queryFn: QueryFn,
    options?: Partial<DataLayerOptions>
  ) {
    super();
    this.#key = key;
    this.#queryFn = queryFn;
    this.options = options;
    Object.values(EmitNamesDataLayer).forEach((emitType) => {
      this.#expiringData.addEventListener(
        emitType,
        this.handleExpiringDataEvent
      );
    });
  }

  /**
   * This method is used to read the current key.
   */
  public get key() {
    return this.#key;
  }

  /**
   * This method is used to read the current options.
   */
  public get options() {
    return this.#options;
  }

  /**
   * Set/update the options for the data layer. Partial options can be passed to update only the desired options.
   * @param options - Partial options to update the data layer.
   */
  public set options(options: Partial<DataLayerOptions> | undefined) {
    // merging allows for partial updates
    this.#options = { ...this.#options, ...options };
    this.#expiringData.ttlMs = this.#options.ttlMs ?? this.#expiringData.ttlMs;
    const { useInterval, focusFetch, reconnectFetch } = this.#options;
    if (useInterval) {
      this.timeoutId = setInterval(
        this.executeQuery,
        this.#options.useInterval
      );
    }
    if (focusFetch) {
      window.addEventListener('focus', this.executeQuery);
    } else {
      window.removeEventListener('focus', this.executeQuery);
    }
    if (reconnectFetch) {
      window.addEventListener('online', this.executeQuery);
    } else {
      window.removeEventListener('online', this.executeQuery);
    }
  }

  /**
   * This method is used to read the data.
   */
  get data() {
    return this.#expiringData.data;
  }

  /**
   * This getter is used to determine the last error that occurred when updating the data layer.
   */
  get error() {
    return this.#expiringData.error;
  }

  /**
   * This getter is used to determine the last time the data layer was updated. It will return `undefined` if the data layer has not been updated. It will return the maximum time of the last update and the last error.
   */
  get updatedAt() {
    return this.#expiringData.updatedAt;
  }

  /**
   * This getter is used to determine the checksum of the data layer.
   */
  get checksum() {
    return this.#expiringData.checksum;
  }

  /**
   * This getter is used to determine if the data layer is stale.
   */
  get isStale() {
    return this.#expiringData.isExpired;
  }

  /**
   * This getter is used to determine if the data layer has an error.
   */
  get isError() {
    return this.#expiringData.isError;
  }

  /**
   * This getter is used to determine if the data layer is using previous data.
   */
  get isPreviousData() {
    return this.#expiringData.isPreviousData;
  }

  /**
   * This getter is used to determine the expiration time of the data layer.
   */
  get expiresAt() {
    return this.#expiringData.expiresAt;
  }

  /**
   * This getter is used to determine the status of the data layer.
   */
  get status() {
    return this.#status;
  }

  /**
   * This setter is used to manage the status of the data layer. It will emit an event when the status changes.
   */
  private set status(status: Status) {
    this.#status = status;
    this.emitEvent(EmitNamesDataLayer.status);
  }

  /**
   * This getter is used to determine if the data layer is enabled. If the `enabled` option is a function, it will be called with the internal `expiringData` object.
   */
  get enabled() {
    // if backgroundFetch is disabled and the document is not focused, return false
    if (!this.options?.backgroundFetch && !document.hasFocus()) {
      return false;
    }
    if (typeof this.#options.enabled === 'function') {
      return this.#options.enabled(this.#expiringData);
    }
    return this.#options.enabled;
  }

  /**
   * This getter is used to manage the timeoutId for the query execution.
   */
  private get timeoutId() {
    return this.#timeoutId;
  }

  /**
   * This setter is used to manage the timeoutId for the query execution. It will clear the existing timeoutId if a new one is set.
   */
  private set timeoutId(timeoutId: ReturnType<typeof setTimeout> | undefined) {
    if (timeoutId === this.#timeoutId) {
      return;
    }
    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId);
    }
    if (timeoutId) {
      this.#timeoutId = timeoutId;
    }
  }

  /**
   * Overridden as an alias for `consumeEvent`, this method will not directly dispatch the passed event, but consume it and return a boolean indicating if the event was consumed. A new event will actually be dispatched if the event was consumed.
   * @param event
   * @returns
   */
  public dispatchEvent(event: DataLayerEvent): boolean {
    // it shouldn't be possible to dispatch just any event on this object
    // so the event is processed as if it were consumed
    return this.consumeEvent(event);
  }

  static transformMessageEventToDataLayerEvent = (
    evt: MessageEvent
  ): DataLayerEvent => {
    const asCustomEvent: DataLayerEvent = new CustomEvent(evt.data.type, {
      detail: evt.data,
    });
    return asCustomEvent;
  };

  setBroadcastChannel = (name?: string) => {
    if (!name) {
      this.#broadcastChannel?.close();
    } else {
      if (this.#broadcastChannel?.name !== name) {
        this.#broadcastChannel?.close();
        this.#broadcastChannel = undefined;
      }

      this.#broadcastChannel = new BroadcastChannel(name);
      this.#broadcastChannel.onmessage = (evt) => {
        this.consumeEvent(DataLayer.transformMessageEventToDataLayerEvent(evt));
      };
      Object.keys(EmitNamesDataLayer).forEach((emitType) => {
        this.addEventListener(emitType, this.#broadcastChannel!.postMessage);
      });
    }
  };

  setRTCDataChannel = (
    label: string,
    channelOptions: RTCDataChannelInit,
    peerOptions: RTCConfiguration
  ) => {
    if (!this.#rtcPeerConnection) {
      this.#rtcPeerConnection = new RTCPeerConnection(peerOptions);
    } else {
      this.#rtcPeerConnection.setConfiguration(peerOptions);
    }
    if (!label) {
      this.#rtcDataChannel?.close();
      this.#rtcDataChannel = undefined;
    } else {
      if (this.#rtcDataChannel?.label !== label) {
        this.#rtcDataChannel?.close();
      }
      this.#rtcDataChannel = this.#rtcPeerConnection.createDataChannel(
        label,
        channelOptions
      );
      this.#rtcDataChannel.onmessage = (evt) => {
        this.consumeEvent(DataLayer.transformMessageEventToDataLayerEvent(evt));
      };
      Object.keys(EmitNamesDataLayer).forEach((emitType) => {
        this.addEventListener(emitType, (evt) => {
          const { detail } = { detail: undefined, ...evt }; //this is for type coercion
          this.#rtcDataChannel?.send(JSON.stringify(detail));
        });
      });
    }
  };

  setWebSocket = (url: string | URL, protocols?: string | string[]) => {
    if (!url || this.#ws?.url !== url) {
      this.#ws?.close();
      this.#ws = undefined;
    }
    if (!this.#ws) {
      this.#ws = new WebSocket(url, protocols);
      this.#ws.onmessage = (evt) => {
        this.consumeEvent(DataLayer.transformMessageEventToDataLayerEvent(evt));
      };
      Object.keys(EmitNamesDataLayer).forEach((emitType) => {
        this.addEventListener(emitType, (evt) => {
          const { detail } = { detail: undefined, ...evt }; //this is for type coercion
          this.#ws?.send(JSON.stringify(detail));
        });
      });
    }
  };

  setSSE = (args: ConstructorParameters<typeof EventSource>) => {
    const [url, options] = args;
    const urlMatch = this.#sse?.url !== url;
    const credentialsMatch = this.#sse?.withCredentials === options?.withCredentials;
    if (!url || !urlMatch || !credentialsMatch) {
      this.#sse?.close();
      this.#sse = undefined;
    }
    if(!this.#sse){
      this.#sse = new EventSource(url, options);
      this.#sse.onmessage = (evt) => {
        this.consumeEvent(DataLayer.transformMessageEventToDataLayerEvent(evt));
      };
    }
  };
}

export default DataLayer;
