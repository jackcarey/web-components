import MemQuery from "./MemQuery";

class OPFSQuery extends MemQuery {
    get _result() {
        return this.#result;
    }

    set _result(result: QueryResult) {
        this.#result = result;
    }
    _dispatchEvent() {
        super._dispatchEvent("query:opfs");
    }
}

export default OPFSQuery;
