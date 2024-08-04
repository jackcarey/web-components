import BroadcastDataLayer, {
  BroadcastDataLayerOptions,
} from './BroadcastDataLayer.class';
import { AnyEvent, EmitNamesDataLayer, QueryFn } from './types';

export type RTCDataLayerOptions = BroadcastDataLayerOptions & {
  peerConnection?: ConstructorParameters<typeof RTCPeerConnection>[0];
  dataChannel?: RTCDataChannelInit;
};

export default class RTCDataLayer extends BroadcastDataLayer {
  #rtcPeerConnection: RTCPeerConnection | undefined = undefined;

  #rtcDataChannel: RTCDataChannel | undefined = undefined;

  #configureRTCDataChannel = (name: string) => {
    if (
      this.#rtcDataChannel &&
      (!name || name !== this.#rtcDataChannel.label)
    ) {
      this.#rtcDataChannel.close();
    }
    if (name) {
      this.#rtcPeerConnection = new RTCPeerConnection(
        this.options?.peerConnection
      );
      this.#rtcDataChannel = this.#rtcPeerConnection?.createDataChannel(
        name,
        this.options?.dataChannel
      );
      this.#rtcDataChannel.onmessage = this.handleMessage;
    }
  };

  #postMessage(evt: AnyEvent) {
    if (evt.type !== EmitNamesDataLayer.status) {
      this.#rtcDataChannel?.send(JSON.stringify(evt));
    }
  }

  constructor(key: string, queryFn: QueryFn, options?: RTCDataLayerOptions) {
    super(key, queryFn, options);
    this.options = { channelName: options?.channelName };
    Object.values(EmitNamesDataLayer).forEach((emitType) => {
      this.addEventListener(emitType, this.#postMessage);
    });
  }

  set options(options: Partial<RTCDataLayerOptions> | undefined) {
    const stdOptions = { ...this.options, ...options };
    if (stdOptions.channelName) {
      this.#configureRTCDataChannel(stdOptions.channelName);
    }
    delete stdOptions.channelName;
    super.options = stdOptions;
  }

  get channelName() {
    return this.#rtcDataChannel?.label;
  }
}
