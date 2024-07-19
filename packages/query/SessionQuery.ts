import MemQuery from './MemQuery';
import type { QueryResult } from './types';

class SessionQuery extends MemQuery {
    constructor(key: any, fetchFn: any, options: any) {
        super(key, fetchFn, options);
        const stored = sessionStorage.getItem(key);
        const { data, error} = JSON.parse(stored || '{}');
        if (data|| error) {
            this._updateState(data, error);
        }
        if(this.isStale) {
            this.invalidate();
        }
    }
  _emit(type: string = 'generic', _eventName?: string): void {
    super._emit(type, 'query:session');
  }

  _updateState(data: any | undefined, error: Error | undefined): void {
    super._updateState(data, error);
    sessionStorage.setItem(this.key, JSON.stringify(this.result));
  }

  invalidate(): void {
    sessionStorage.removeItem(this.key);
    super.invalidate();
  }
}

export default SessionQuery;
