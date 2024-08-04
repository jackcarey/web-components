import ExpiringData from './ExpiringData.class';
import {
  BaseOptions,
  EmitEventDetail,
  EmitNamesDataLayer,
  EmitNamesExpiringData,
  QueryFn,
  Status,
} from './types';
export class BaseDataLayer extends EventTarget {
  #key: string = '';
  #expiringData = new ExpiringData(undefined, undefined, 0);
  #queryFn: any;
  #status: Status = Status.idle;
  #failureCount: number = 0;
  #timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
  #options: BaseOptions = {
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

  protected emitEvent = (emitType: EmitNamesDataLayer) => {
    const detail: EmitEventDetail = {
      key: this.#key,
      updatedAt: this.updatedAt,
      status: this.status,
      isStale: this.isStale,
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
    this.dispatchEvent(new CustomEvent(emitType, eventOptions));
  };

  protected update = async (data?: any, error?: Error) => {
    this.#expiringData.update(data, error);
  };

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
        this.update(data);
      } catch (error) {
        this.#failureCount++;
        this.status = Status.error;
        this.update(undefined, error);
        if (this.shouldRetry) {
          this.timeoutId = setTimeout(this.executeQuery, this.retryDelay);
        }
      }
    }
    if (this?.options?.useInterval && !this.#timeoutId) {
      this.timeoutId = setInterval(
        this.executeQuery,
        this.#options.useInterval
      );
    }
  };

  protected handleMessage = (evt: MessageEvent) => {
    const { type, detail } = evt.data;
    const matchingKey = this.key === detail.key;
    const somethingHasChanged = this.checksum !== detail.checksum;
    const isStale = this.isStale;
    const isMoreRecent = this.updatedAt < detail.updatedAt;
    const isPreviousData = detail.isPreviousData;
    if (matchingKey && somethingHasChanged && isMoreRecent && !isPreviousData) {
      const { data, error } = detail;
      const avoidQuery = data || error;
      if (avoidQuery) {
        this.update(data, error);
      } else {
        this.executeQuery();
      }
    }
    this.update();
  };

  private handleExpiringDataEvent = (evt: Event | CustomEvent) => {
    evt.stopImmediatePropagation();
    const detail = (evt as CustomEvent)?.detail;
    console.debug('BaseDataLayer: handleExpiringDataEvent', evt);
    if (this.enabled) {
      const eventOptions = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail,
      };
      switch (evt.type) {
        case EmitNamesExpiringData.stale:
          {
            this.emitEvent(EmitNamesDataLayer.stale);
            this.executeQuery();
          }
          break;
        case EmitNamesExpiringData.update:
          {
            this.emitEvent(EmitNamesDataLayer.update);
          }
          break;
        default:
          break;
      }
    }
  };

  public constructor(
    key: string,
    queryFn: QueryFn,
    options?: Partial<BaseOptions>
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

  public get key() {
    return this.#key;
  }

  public get options() {
    return this.#options;
  }

  public set options(options: Partial<BaseOptions> | undefined) {
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

  get data() {
    return this.#expiringData.data;
  }

  get error() {
    return this.#expiringData.error;
  }

  get updatedAt() {
    return this.#expiringData.updatedAt;
  }

  get checksum() {
    return this.#expiringData.checksum;
  }

  get isStale() {
    return this.#expiringData.isExpired;
  }

  get isError() {
    return this.#expiringData.isError;
  }

  get isPreviousData() {
    return this.#expiringData.isPreviousData;
  }

  get expiresAt() {
    return this.#expiringData.expiresAt;
  }

  get status() {
    return this.#status;
  }

  private set status(status: Status) {
    this.#status = status;
    this.emitEvent(EmitNamesDataLayer.status);
  }

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
}

export default BaseDataLayer;
