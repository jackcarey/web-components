import BaseDataLayer from './BaseDataLayer.class';
import type { AnyEvent, BaseOptions, EmitNamesDataLayer, QueryFn } from './types';

export type BroadcastDataLayerOptions = Partial<BaseOptions> & {
  channelName: string;
};

export default class BroadcastDataLayer extends BaseDataLayer {
  #broadcastChannel: BroadcastChannel | undefined = undefined;

  #configureBroadcastChannel = (name: string) => {
    if (
      this.#broadcastChannel &&
      (!name || name !== this.#broadcastChannel.name)
    ) {
      this.#broadcastChannel.close();
    }
    this.#broadcastChannel = new BroadcastChannel(name);
    this.#broadcastChannel.onmessage = this.handleMessage;
  };

  #postMessage(evt: AnyEvent) {
    if (evt.type !== EmitNamesDataLayer.status) {
      this.#broadcastChannel?.postMessage(evt);
    }
  }

  constructor(
    key: string,
    queryFn: QueryFn,
    options?: BroadcastDataLayerOptions
  ) {
    super(key, queryFn, options);
    this.options = { channelName: options?.channelName };
    Object.values(EmitNamesDataLayer).forEach((emitType) => {
      this.addEventListener(emitType, this.#postMessage);
    });
  }

  set options(options: Partial<BroadcastDataLayerOptions> | undefined) {
    const stdOptions = { ...this.options, ...options };
    if (stdOptions.channelName) {
      this.#configureBroadcastChannel(stdOptions.channelName);
    }
    delete stdOptions.channelName;
    super.options = stdOptions;
  }

  get channelName() {
    return this.#broadcastChannel?.name;
  }
}
