import MemQuery from "./MemQuery";
import { QueryResult } from "./types";

class OPFSQuery extends MemQuery {
    get #opfsRoot() {
        return navigator.storage.getDirectory();
    }
    get #opfsKey() {
        return `query:opfs-${this.key}`;
    }
    get _result(): QueryResult | undefined {
        const root = await this.#opfsRoot;
        const handle = await root.getFileHandle(this.#opfsKey, {
            create: false,
        });
    }

    set _result(result: QueryResult) {
        const asStr = JSON.stringify(result);
        sessionStorage.setItem(this.key, asStr);
    }
    _dispatchEvent() {
        super._dispatchEvent("query:opfs");
    }
}

export default OPFSQuery;
