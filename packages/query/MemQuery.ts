import { defaultOptions, defaultResult } from './defaults';
import type { FetchFn, Options, QueryResult } from './types';

class MemQuery extends EventTarget {
  static #queries = new Map();
  static #toKey(key: any): string {
    if (typeof key === 'string' || typeof key === 'number') {
    } else if (Array.isArray(key)) {
      return JSON.stringify(key);
    } else if (typeof key === 'object') {
      const keys = Object.keys(key).sort();
      const obj = Object.create(null);
      for (const k of keys) {
        obj[k] = key[k];
      }
      return JSON.stringify(obj);
    }
    return String(key);
  }

  static has(key: any): boolean {
    return MemQuery.#queries.has(this.#toKey(key));
  }

  static create(key: any, fetchFn: FetchFn, options: Options): void {
    if (!MemQuery.has(key)) {
      const query = new MemQuery(key, fetchFn, options);
      query.addEventListener('query', (e) => {
        console.log(`STATIC MemQuery event: ${e.type}`, e);
      });
      MemQuery.#queries.set(
        this.#toKey(key),
        new MemQuery(key, fetchFn, options)
      );
    }
  }

  static read(key: any) {
    return MemQuery.#queries.get(this.#toKey(key));
  }

  static update(key: any, newFetchFn: FetchFn, newOptions: Options) {
    if (MemQuery.has(key)) {
      MemQuery.delete(key);
      MemQuery.create(key, newFetchFn, newOptions);
    }
  }

  static delete(key: any): boolean {
    const query = MemQuery.read(key);
    if (query) {
      query.#timeoutId && clearTimeout(query.#timeoutId);
    }
    query.removeAllEventListeners();
    return MemQuery.#queries.delete(this.#toKey(key));
  }

  static clear(): boolean {
    let result = false;
    MemQuery.#queries.forEach(({ key }) => {
      const res = MemQuery.delete(key);
      if (res) {
        result = true;
      }
    });
    return result;
  }

  static invalidate(key: any) {
    return MemQuery.read(key)?.invalidate();
  }

  #key: string;
  #createdAt: Date;
  #fetchFn: FetchFn;
  #options: Options;
  #timeoutId: ReturnType<typeof setTimeout> | undefined;
  #isFocused: boolean;
  #isOnline: boolean;
  #result: QueryResult;

  constructor(key: any, fetchFn: FetchFn, options: Options) {
    super();
    this.#key = MemQuery.#toKey(key);
    this.#createdAt = new Date();
    this.#fetchFn = fetchFn;
    this.options = options;
    if (this?.options?.initialData) {
      this._updateState(this.options.initialData, undefined);
    }
    if (this.isStale) {
      this.invalidate();
    }
    if (window) {
      window.addEventListener('focus', () => {
        this.#isFocused = true;
        if (this.options?.focusRefetch) {
          this.#refetch();
        }
      });
      window.addEventListener('blur', () => {
        this.#isFocused = false;
      });
      window.addEventListener('online', () => {
        this.#isOnline = true;
        if (this.options?.reconnectRefetch) {
          this.#refetch();
        }
      });
      window.addEventListener('offline', () => {
        this.#isOnline = false;
      });
    }
  }

  get key(): string {
    return this.#key;
  }

  get fetchFn(): Function {
    return this.#fetchFn;
  }

  get options(): Options {
    return this.#options;
  }

  set options(options: Options) {
    this.#options = {
      useInterval: false,
      ...defaultOptions,
      ...options,
    };
  }

  get updatedAt(): Date {
    if(!this.result){
        return new Date(-Infinity)
    }
    return new Date(
      Math.max(
        this.result.dataUpdatedAt?.getTime() ?? 0,
        this.result.errorUpdatedAt?.getTime() ?? 0,
        this.#createdAt.getTime()
      )
    );
  }

  get result(): QueryResult {
    if (this.isStale) {
      this.#refetch();
    }
    const res = this.#result;
    return {
      ...defaultResult,
      ...res,
      key: this.#key,
      stale: this.isStale,
    };
  }

  get isEnabled(): boolean {
    if (!this.#isFocused && !this.options?.backgroundFetch) {
      return false;
    }
    if (!this.#isOnline && !this.options?.offlineRefetch) {
      return false;
    }
    return typeof this.options?.enabled === 'function'
      ? this.options.enabled()
      : this.options?.enabled ?? false;
  }

  get isStale(): boolean {
    const ttl = this.#options?.ttl ?? 0;
    const ttlStale = ttl > 0 && this.updatedAt.getTime() + ttl < Date.now();
    return this.result.stale || ttlStale;
  }

  _emit(type: string = 'generic', eventName?: string): void {
    if (this.options?.emitEvents === false) {
      return;
    }
    const detail = {
      result: this.result,
      type,
    };
    this.dispatchEvent(
      new CustomEvent(`query`, { detail, bubbles: true, cancelable: false })
    );
  }

  _updateState(data: any | undefined, error: Error | undefined): void {
    const now = new Date();
    this.#result = {
      ...this.result,
      data,
      dataUpdatedAt: data ? now : undefined,
      error,
      errorUpdatedAt: error ? now : undefined,
      failureCount: error ? this.result.failureCount + 1 : 0,
      status: error ? 'error' : data ? 'success' : 'idle',
    };
    const eventType = error ? 'error' : data ? 'success' : 'idle';
    this._emit(eventType);
  }

  async #refetch(): Promise<void> {
    if (!this.isEnabled) {
      return;
    }

    if (this.result.status === 'pending') {
      return;
    }

    this.#result = {
      ...this.result,
      stale: this.isStale,
      status: 'pending',
    };

    try {
      const data = await this.#fetchFn();
      this._updateState(data, undefined);
    } catch (error) {
      this._updateState(undefined, error);
      const retry = this.options?.retry;
      const retryDelay = this.options?.retryDelay;
      const shouldRetry =
        typeof retry === 'function'
          ? retry(this.result.failureCount, error)
          : retry;
      const delay =
        typeof retryDelay === 'function'
          ? retryDelay(this.result.failureCount, error)
          : retryDelay;
      if (shouldRetry) {
        setTimeout(() => {
          this.#refetch();
        }, delay);
      }
    }
  }

  #setUpTimeout(): void {
    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId);
      this.#timeoutId = undefined;
    }
    const ttl = this.#options?.ttl ?? 0;
    if (ttl) {
      if (this.options?.useInterval) {
        this.#timeoutId = setInterval(() => {
          this.#refetch();
        }, ttl);
      } else {
        this.#timeoutId = setTimeout(() => {
          this.#refetch();
        }, ttl);
      }
    }
  }

  invalidate(): void {
    this.#result = {
      ...this.result,
      stale: true,
      status: 'idle',
    };
    this.#refetch();
    this.#setUpTimeout();
  }

  toString(): string {
    return JSON.stringify(this.result);
  }
  toJson(): object {
    return this.result;
  }
  valueOf(): any {
    return (
      this.result?.data ??
      this?.result?.previousData ??
      this?.options?.initialData
    );
  }
}

export default MemQuery;
