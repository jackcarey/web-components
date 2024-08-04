import { BaseDataLayer } from './BaseDataLayer.class';
import type { BroadcastDataLayerOptions } from './BroadcastDataLayer.class';
import type { AnyEvent, EmitNamesDataLayer, QueryFn } from './types';

export type WebSocketDataLayerOptions = BroadcastDataLayerOptions & {
  wsURL?: string | URL;
};

export default class WebSocketDataLayer extends BaseDataLayer {
  #ws: WebSocket | undefined = undefined;

  #configureWebSocket = (url: string) => {
    if (this.#ws && (!url || url !== this.#ws.url)) {
      this.#ws.close();
    }
    if (url) {
      this.#ws = new WebSocket(url);
      this.#ws.onmessage = this.handleMessage;
    }
  };

  #postMessage(evt: AnyEvent) {
    if (evt.type !== EmitNamesDataLayer.status) {
      this.#ws?.send(JSON.stringify(evt));
    }
  }

  constructor(
    key: string,
    queryFn: QueryFn,
    options?: WebSocketDataLayerOptions
  ) {
    super(key, queryFn, options);
    this.options = { wsURL: options?.wsURL };
    Object.values(EmitNamesDataLayer).forEach((emitType) => {
      this.addEventListener(emitType, this.#postMessage);
    });
  }

  set options(options: Partial<WebSocketDataLayerOptions> | undefined) {
    const stdOptions = { ...this.options, ...options };
    if (stdOptions.wsURL) {
      this.#configureWebSocket(stdOptions.wsURL.toString());
    }
    delete stdOptions.wsURL;
    super.options = stdOptions;
  }

  get url() {
    return this.#ws?.url;
  }
}
