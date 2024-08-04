import type { EmitNamesExpiringData } from './types';

type ExpiringDataInner = {
  data: any | undefined;
  error?: Error | undefined;
};

export default class ExpiringData extends EventTarget {
  #data: any | undefined;
  #error: Error | undefined;
  #ttlMs: number = 0;
  #keepPreviousData: boolean = true;
  #previousData: any | undefined;
  #constructedAt: Date = new Date();
  #updatedAt: Date = this.#constructedAt;
  #timeoutId: ReturnType<typeof setTimeout> | undefined;
  #checksum: string = '';

  #sortObject = (obj: ExpiringDataInner) => {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(this.#sortObject).sort();
    }
    const sortedKeys = Object.keys(obj).sort();
    const result: any = {};
    sortedKeys.forEach((key) => {
      result[key] = this.#sortObject(obj[key]);
    });
    return result;
  };

  #createChecksum = async (data?: any, error?: Error) => {
    const sortedString = JSON.stringify(this.#sortObject({ data, error }));
    const encoder = new TextEncoder();
    const encoded = encoder.encode(sortedString);
    const hashBuffer = await crypto.subtle.digest('SHA-1', encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  #emitEvent(eventName: EmitNamesExpiringData) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: this,
        bubbles: true,
        cancelable: true,
        composed: true,
      })
    );
  }

  #createTimeout() {
    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId);
    }
    if (this.#ttlMs > 0) {
      this.#timeoutId = setTimeout(() => {
        this.#emitEvent(EmitNamesExpiringData.stale);
      }, this.#ttlMs);
    }
  }

  update(data: any | undefined, error?: Error) {
    const usingData = this.#keepPreviousData ? (data ?? this.#previousData) : data;
    this.#createChecksum(usingData, error)
      .then((checksum) => {
        if (checksum !== this.#checksum) {
          this.#checksum = checksum;
          this.#data = usingData;
          this.#error = error;
          this.#updatedAt = new Date();
          this.#createTimeout();
          this.#emitEvent(EmitNamesExpiringData.update);
        }
      })
      .catch(console.error);
  }

  constructor(data: any | undefined, error?: Error, ttlMs?: number, keepPreviousData?: boolean) {
    super();
    this.#ttlMs = ttlMs && ttlMs > 0 ? ttlMs : 0;
    this.#keepPreviousData = keepPreviousData ?? true;
    this.update(data, error);
  }

  get data(): any | undefined {
    return this.#data;
  }

  get error(): Error | undefined {
    return this.#error;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }

  get checksum(): string {
    return this.#checksum;
  }

  get ttlMs(): number {
    return this.#ttlMs;
  }

  set ttlMs(ttlMs: number) {
    const oldVal = this.#ttlMs;
    const val = Number(ttlMs);
    if (val < 0) {
      throw new Error('ttlMs must be a positive number');
    }
    if (val !== oldVal) {
      this.#ttlMs = ttlMs;
      this.#createTimeout();
    }
  }

  get isExpired(): boolean {
    return (
      this.#ttlMs > 0 &&
      new Date().getTime() - this.updatedAt.getTime() > this.#ttlMs
    );
  }

  get isError(): boolean {
    return this.#error !== undefined;
  }

  get isPreviousData(): boolean {
    return this.#keepPreviousData && this.#previousData !== undefined && !this.#data;
  }

  expiresAt(): Date | undefined {
    if (this.#ttlMs === 0) {
      return undefined;
    }
    return new Date(this.updatedAt.getTime() + this.#ttlMs);
  }
}
