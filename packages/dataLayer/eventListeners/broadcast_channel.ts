import { AnyEvent } from "../types";

export default const createBroadcastChannelListener = (channelName: string) => {
    const broadcastChannel = new BroadcastChannel(channelName);
    broadcastChannel.onmessage = (evt) => {
        console.log('BroadcastChannel message:', evt);
    };
    const listener => (evt: AnyEvent) => {
        
    }
    }