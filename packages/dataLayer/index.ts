type ResultBoolean = boolean | ((result?: Result) => boolean);

type RetryFunction = (failureCount: number, error?: Error) => boolean;

type RetryOption = boolean | RetryFunction;

type RetryDelayFunction = (
  failureCount: number,
  error: Error | undefined
) => number;

type RetryDelayOption = number | RetryDelayFunction;

type EmitMode = boolean | number;

type UpdateStateFn = (data?: any, error?: Error) => void;

type Status = 'idle' | 'pending' | 'success' | 'error';

type PersistFunction =
  | ((result: Result) => boolean)
  | ((result: Result) => Promise<boolean>);

type PersistOption = undefined | 'opfs' | 'sessionstorage' | PersistFunction;

type RTCOption = string | ConstructorParameters<typeof RTCPeerConnection>;

type WebSocketOption =
  | string
  | {
      url: string | URL;
      options?: ConstructorParameters<typeof WebSocket>[1];
    };

type ServerSentEventOption =
  | string
  | {
      url: string | URL;
      options?: EventSourceInit;
    };

enum EmitType {
  'prop',
  'update',
}

type Options = {
  key: string;
  queryFn: Function;
  ttl?: number;
  useInterval?: boolean;
  usePreviousData?: ResultBoolean;
  retry?: RetryOption;
  retryDelay?: RetryDelayOption;
  backgroundFetch?: ResultBoolean;
  focusFetch?: ResultBoolean;
  reconnectFetch?: ResultBoolean;
  enabled?: ResultBoolean;
  emit?: EmitMode;
  invalidate?: UpdateStateFn;
  allowInvalidateOverride?: boolean;
  broadcastChannel?: string;
  RTCChannel?: RTCOption;
  webSocketURL?: WebSocketOption;
  sseURL?: ServerSentEventOption;
  persist?: PersistOption;
};

type Result = {
  data?: any;
  dataUpdatedAt?: Date;
  previousData?: any;
  previousDataUpdatedAt?: Date;
  isPreviousData: boolean;
  error?: Error;
  errorUpdatedAt?: Date;
  failureCount: number;
  status: Status;
  stale: boolean;
  checksum: number;
};

const defaultOptions: Options = {
  key: '',
  queryFn: () => {},
  ttl: 5000,
  useInterval: false,
  usePreviousData: false,
  retry: (failureCount: number, _error?: Error) => failureCount < 3, // retry upto 3 times by default
  retryDelay: (failureCount: number, _error?: Error) => 1000 ** failureCount, // exponential backoff by default
  backgroundFetch: false,
  focusFetch: false,
  reconnectFetch: false,
  enabled: true,
  emit: true,
  invalidate: undefined,
  allowInvalidateOverride: false,
  broadcastChannel: '',
  RTCChannel: '',
  webSocketURL: '',
  sseURL: '',
  persist: undefined,
};

const defaultResult: Result = {
  data: undefined,
  dataUpdatedAt: undefined,
  previousData: undefined,
  previousDataUpdatedAt: undefined,
  isPreviousData: false,
  error: undefined,
  errorUpdatedAt: undefined,
  failureCount: 0,
  status: 'idle',
  stale: false,
  checksum: 0,
};

class DataLayer extends EventTarget implements Result {
  /********************************************************************************
   * Instance properties and methods
   ********************************************************************************/
  #resultTarget: Result;
  #resultProxy: Result;
  #options: Options;
  #broadcastChannel?: BroadcastChannel;
  #rtcPeerConnection?: RTCPeerConnection;
  #rtcDataChannel?: RTCDataChannel;
  #webSocket?: WebSocket;
  #eventSource?: EventSource;
  #lastSSEId?: string;

  get options() {
    return this.#options;
  }

  #setData = (data?: any, error?: Error) => {
    this.#resultProxy.data = data;
    this.#resultProxy.error = error;
  };

  #handleMessageEvent = (event: MessageEvent) => {
    const { data: result, lastEventId } = event;
    const repeatSSE = lastEventId && lastEventId === this.#lastSSEId;
    if (result && !repeatSSE) {
      this.#setData(result.data, result.error);
    }
  };

  #configureBroadcastChannel = () => {
    this.#broadcastChannel?.close();
    if (this.options.broadcastChannel?.length) {
      this.#broadcastChannel = new BroadcastChannel(
        this.options.broadcastChannel
      );
      this.#broadcastChannel.onmessage = (event) => {
        this.#handleMessageEvent(event);
      };
    }
  };

  #configureRTC = () => {
    this.#rtcDataChannel?.close();
    this.#rtcPeerConnection?.close();
    if (this.options.RTCChannel) {
      if (this.options.RTCChannel) {
        //todo: handle custom ice servers, config etc
        this.#rtcPeerConnection = new RTCPeerConnection();
        //todo: make sure these options are correct
        this.#rtcDataChannel = this.#rtcPeerConnection.createDataChannel(
          this.options.RTCChannel as string
        );
        this.#rtcDataChannel.onmessage = (event) => {
            this.#handleMessageEvent(event);
        };
      }
    }
  };

  #configureServerSentEvents = () => {
    this.#eventSource?.close();
    if (this.options.sseURL) {
      const url = new URL(this.options.sseURL as string);
      this.#eventSource = new EventSource(url.toString());
      this.#eventSource.onmessage = (event) => {
        this.#handleMessageEvent(event);
      };
    }
  };

  #configureWebSocket = () => {
    this.#webSocket?.close();
    if (this.options.webSocketURL) {
      const url = new URL(this.options.webSocketURL as string);
      this.#webSocket = new WebSocket(url.toString());
      this.#webSocket.onmessage = (event) => {
        this.#handleMessageEvent(event);
      };
    }
  };

  #configureChannels = () => {
    this.#configureBroadcastChannel();
    this.#configureRTC();
    this.#configureServerSentEvents();
    this.#configureWebSocket();
  };

  set options(options: Options) {
    //the key can never be changed
    this.#options = { ...options, key: this.#options.key };
    this.#configureTimeouts();
    this.#configureChannels();
  }

  #emit = (eventType: EmitType, detail: any) => {
    if (!this.options.enabled) {
      return;
    }
    const typedDetail = { type: eventType, detail };
    this.dispatchEvent(new CustomEvent('dataLayer', { detail: typedDetail }));
    if (this.#broadcastChannel) {
      this.#broadcastChannel.postMessage(typedDetail);
    }
    //todo: rtc
    //todo: ws
  };

  #debounce = (fn: Function, delay: number): Function => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  #publishPropChange = (prop: string, value: any) => {
    if (!this.enabled) {
      return;
    }
    const emitIsDebounce =
      typeof this.options.emit === 'number' && this.options.emit > 0;
    if (this.options.emit === true) {
      this.#emit(EmitType.prop, { prop, value });
    } else if (emitIsDebounce) {
      this.#debounce(this.#emit, (this.options.emit as number) ?? 100)(
        EmitType.prop,
        { prop, value }
      );
    }
  };

  #fetchFn = async () => {
    if (!this.enabled) {
      return;
    }
    this.#resultProxy.status = 'pending';
    this.#options.queryFn().then((newData: any) => {
      this.#setData(newData, undefined);
    }).catch((error: Error) => {
      this.#setData(undefined, error);
    });
  }

  #configureTimeouts = () => {
    if (this.#options.useInterval) {
      setInterval(() => {
        this.#fetchFn();
      }, this.#options.ttl);
    }
  };

  invalidate = (data?: any, error?: Error) => {
    if (this.#options.allowInvalidateOverride) {
      this.#setData(data, error);
    } else {
      this.#setData();
    }
  };

  constructor(options: Options) {
    super();
    this.options = options;
    this.#resultTarget = defaultResult;
    this.#resultProxy = new Proxy(this.#resultTarget, {
      get: (target, prop, receiver) => {
        return Reflect.get(target, prop, receiver);
      },
      set: (target, prop, value, receiver) => {
        const result = Reflect.set(target, prop, value, receiver);
        if (result) {
          this.#publishPropChange(prop as string, value);
        }
        return result;
      },
    });
  }

  get data(): any {
    return this.#resultProxy.data;
  }

  get dataUpdatedAt(): Date | undefined {
    return this.#resultProxy.dataUpdatedAt;
  }

  get previousData(): any {
    return this.#resultProxy.previousData;
  }

  get previousDataUpdatedAt(): Date | undefined {
    return this.#resultProxy.previousDataUpdatedAt;
  }

  get isPreviousData(): boolean {
    return this.#resultProxy.isPreviousData;
  }

  get error(): Error | undefined {
    return this.#resultProxy.error;
  }

  get errorUpdatedAt(): Date | undefined {
    return this.#resultProxy.errorUpdatedAt;
  }

  get failureCount(): number {
    return this.#resultProxy?.failureCount ?? 0;
  }

  get status(): Status {
    return this.#resultProxy?.status ?? 'idle';
  }

  get stale(): boolean {
    const ttl = this.#options?.ttl ?? 0;
    const dataDt = this.dataUpdatedAt?.getTime() ?? 0;
    const previousDt = this.previousDataUpdatedAt?.getTime() ?? 0;
    const errorDt = this.errorUpdatedAt?.getTime() ?? 0;
    const maxDate = new Date(Math.max(dataDt, previousDt, errorDt));
    const ttlStale =
      ttl > 0 &&
      maxDate.setMilliseconds(maxDate.getMilliseconds() + ttl) < Date.now();
    return ttlStale;
  }

  get enabled() {
    return typeof this.#options.enabled === 'function'
      ? this.#options.enabled(this.#resultProxy)
      : this.#options.enabled ?? false;
  }

  get updatedAt(): Date {
    return new Date(
      Math.max(
        this.dataUpdatedAt?.getTime() ?? 0,
        this.errorUpdatedAt?.getTime() ?? 0
      )
    );
  }

  static #sortObject = (obj: any) => {
    return Object.keys(obj)
      .sort()
      .reduce((acc, key) => {
        const value = obj[key];
        acc[key] = typeof value === 'object' ? this.#sortObject(value) : value;
        return acc;
      }, {});
  };

  get checksum(): number {
    const jsonString = JSON.stringify(DataLayer.#sortObject(this.#resultProxy));
    let hash = 0;
    for (let i = 0; i < jsonString.length; i++) {
      const char = jsonString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32-bit integer
    }
    return hash;
  }

  /*******************************************************************************
   * Static properties and methods
   ******************************************************************************/
  static #instances: Map<string, DataLayer> = new Map();

  static has(key: string): boolean {
    return DataLayer.#instances.has(key);
  }

  static create(options: Options, update?: boolean): DataLayer | undefined {
    const canCreate = update || !DataLayer.has(options.key);
    if (canCreate) {
      const instance = new DataLayer(options);
      DataLayer.#instances.set(options.key, instance);
      return instance;
    } else {
      return DataLayer.read(options.key);
    }
  }

  static read(key: string): DataLayer | undefined {
    return DataLayer.#instances.get(key);
  }

  static update(options: Options, create?: boolean): boolean {
    const canUpdate = create || DataLayer.has(options.key);
    if (!canUpdate) {
      return false;
    }
    if (create) {
      DataLayer.create(options, true);
      return true;
    } else if (canUpdate) {
      DataLayer.#instances.set(options.key, new DataLayer(options));
      return true;
    } else {
      return false;
    }
  }

  static delete(key: string): boolean {
    //todo: instead, clean-up each instance 1 by 1 so that event listeners and events are handled and garbage collected properly
    return DataLayer.#instances.delete(key);
  }

  static clear(): void {
    //looping allows proper clean up of event listeners and events
    Object.keys(DataLayer.#instances).forEach((key) => {
      DataLayer.delete(key);
    });
  }

  static on(
    key: string,
    event: string,
    listener: EventListenerOrEventListenerObject
  ): void {
    const instance = DataLayer.read(key);
    if (instance) {
      instance.addEventListener(event, listener);
    }
  }

  static off(
    key: string,
    event: string,
    listener: EventListenerOrEventListenerObject
  ): void {
    const instance = DataLayer.read(key);
    if (instance) {
      instance.removeEventListener(event, listener);
    }
  }
}
