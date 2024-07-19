import { defaultResult } from './defaults';
import MemQuery from './MemQuery';
import { FetchFn, Options } from './types';

class OPFSQuery extends MemQuery {
  get #opfsHandle(): Promise<FileSystemFileHandle> {
    const opfsKey = `query:opfs-${this.key}`;
    return navigator.storage
      .getDirectory()
      .then((root) => root.getDirectoryHandle('opfs-query', { create: true }))
      .then((dir) => dir.getFileHandle(opfsKey, { create: true }));
  }

  constructor(key: any, fetchFn: FetchFn, options: Options) {
    super(key, fetchFn, options);
    this.#opfsHandle
      .then((handle) => handle.getFile())
      .then((file) => {
        file.text().then((text) => {
          if (!text) {
            this.invalidate();
            return;
          }
          const queryObj = JSON.parse(text);
          this._updateState(queryObj?.data, queryObj?.error);
          if(this.isStale) {
            this.invalidate();
          }
        });
      });
  }

  _emit(type: string = 'generic', _eventName?: string): void {
    super._emit(type, 'query:opfs');
  }

  _updateState(data: any | undefined, error: Error | undefined): void {
    this.#opfsHandle
      .then((handle) => handle.createWritable())
      .then((writable) => {
        super._updateState(data, error);
        writable.write(JSON.stringify(this.result));
      });
  }

  invalidate(): void {
    this.#opfsHandle
      .then((handle) => handle.createWritable())
      .then((writable) => {
        writable.write(
          JSON.stringify({
            stale: true,
            status: 'idle',
          })
        );
        super.invalidate();
      });
  }
}

export default OPFSQuery;
