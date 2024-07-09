import MemQuery from "./MemQuery";
import { QueryResult } from "./types";

class SessionQuery extends MemQuery {
    get _result(): QueryResult | undefined {
        const asStr = sessionStorage.getItem(this.key);
        if (asStr) {
            return JSON.parse(asStr);
        }
        return undefined;
    }

    set _result(result: QueryResult) {
        const asStr = JSON.stringify(result);
        sessionStorage.setItem(this.key, asStr);
    }
    _dispatchEvent() {
        super._dispatchEvent("query:opfs");
    }
}

export default SessionQuery;
