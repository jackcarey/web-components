import BroadcastDataLayer, { BroadcastDataLayerOptions } from "./BroadcastDataLayer.class";
import { QueryFn } from "./types";

type SSEDataLayerOptions = BroadcastDataLayerOptions & {
    sseURL?: string | URL;
};

export default class SSEDataLayer extends BroadcastDataLayer {
    #sse: EventSource | undefined = undefined;

    #configureSSE = (url: string) => {
        if (this.#sse && (!url || url !== this.#sse.url)) {
            this.#sse.close();
        }
        if (url) {
            this.#sse = new EventSource(url);
            this.#sse.onmessage = this.handleMessage;
        }
    };

    constructor(key: string, queryFn: QueryFn, options?: SSEDataLayerOptions) {
        super(key, queryFn, options);
        this.options = { sseURL: options?.sseURL };
    }

    set options(options: Partial<SSEDataLayerOptions> | undefined) {
        const stdOptions = { ...this.options, ...options };
        if (stdOptions.sseURL) {
            this.#configureSSE(stdOptions.sseURL.toString());
        }
        delete stdOptions.sseURL;
        super.options = stdOptions;
    }

    get url() {
        return this.#sse?.url;
    }
}