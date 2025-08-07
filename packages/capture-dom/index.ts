/**
 * Captures child DOM elements for use in 
 */
export class CaptureDOM extends HTMLElement {
    /**
     * @type {string[]} 
     */
    static get observedAttributes(): string[] {
        return ['element', 'file', 'mode', 'exportparts', 'audio', 'download', 'controlled', 'autoplay', 'background-color'];
    }

    #stream: MediaStream | null = null;

    #chunks: Blob[] = [];

    #mediaRecorder: MediaRecorder | null = null;

    #error: Error | null = null;

    #errorHandler(err: Error | null | undefined): void {
        if (err) {
            this.stopCapture();
            console.error(err);
            this.#error = err;
            this.#emitEvent('error');
            if (!this.controlled && (!this.shadowRoot || !this.shadowRoot.querySelector('#error'))) {
                this.#render();
            }
        }
        if (!this.controlled) {
            const errorEl = this.shadowRoot?.querySelector('#error');
            if (errorEl) {
                errorEl.textContent = err ? err.message ? err.message : JSON.stringify(err) : '';
            }
        }
    }

    #opfsHandle: FileSystemFileHandle | null = null;

    get #fileName(): string {
        return this.file ?? `${this.id ? `${this.id}-` : ''}${new Date().toISOString().replaceAll(":", "-")}.webm`;
    }

    async #setupOPFSHandle(): Promise<void> {
        if (!this.#opfsHandle || this.#opfsHandle.name !== this.#fileName) {
            const root = await navigator.storage.getDirectory();
            /**
             * @type {FileSystemFileHandle}
             */
            const draftHandle = await root.getFileHandle(this.#fileName, { create: true });
            this.#opfsHandle = draftHandle;
        }
    }

    #render(): void {
        try {
            if (!this.shadowRoot) {
                this.attachShadow({ mode: 'open' });
            }
            if (this.shadowRoot) {
                const template = this.querySelector('template');
                const downloadHtml = this.download ? `<a id="download" download href="" file="${this.#fileName}"><slot name="download" part="download"></slot></a>` : '';
                if (template) {
                    this.shadowRoot.innerHTML = (template.content.cloneNode(true) as HTMLElement).outerHTML;
                    if (!this.controlled) {
                        //if the template is missing control or target elements, add them. 
                        //The error element is optional in case consumers don't want to render it.
                        if (!this.shadowRoot.querySelector('#controls')) {
                            this.shadowRoot.innerHTML = `<div id="controls" part="controls"></div>` + this.shadowRoot.innerHTML;
                        }
                        if (!this.shadowRoot.querySelector('#target')) {
                            this.shadowRoot.innerHTML += `<div id="target" part="target"><slot></slot></div>`;
                        }

                        if (this.download && !this.shadowRoot.querySelector("#download")) {
                            this.querySelector('#controls')!.innerHTML += downloadHtml;
                        }
                    }
                } else {
                    if (this.controlled) {
                        this.shadowRoot.innerHTML = `<div id="target" part="target"><slot></slot></div>`;
                    } else {
                        this.shadowRoot.innerHTML = `
                        <div id="controls" part="controls">
                            <button id="start"><slot name="start"></slot></button>
                            <button id="stop"><slot name="stop"></slot></button>
                            ${downloadHtml}
                        </div>
                        <div id="error" part="error"></div>
                        <div id="target" part="target"><slot></slot></div>`;
                    }
                }

                if (!this.controlled && !this.shadowRoot.querySelector('#start')) {
                    const startButton = document.createElement('button');
                    startButton.id = 'start';
                    startButton.textContent = 'Start';
                    this.shadowRoot.querySelector('#controls')!.appendChild(startButton);
                }

                if (!this.controlled && !this.shadowRoot.querySelector('#stop')) {
                    const stopButton = document.createElement('button');
                    stopButton.id = 'stop';
                    stopButton.textContent = 'Stop';
                    this.shadowRoot.querySelector('#controls')!.appendChild(stopButton);
                }

                if (!this.controlled && this.download && !this.shadowRoot.querySelector('#download')) {
                    const downloadButton = document.createElement('button');
                    downloadButton.id = 'download';
                    downloadButton.textContent = 'Download';
                    this.shadowRoot.querySelector('#controls')!.appendChild(downloadButton);
                }

                if (!this.controlled) {
                    this.shadowRoot.querySelector('#start')?.addEventListener('click', this.startCapture.bind(this));
                    this.shadowRoot.querySelector('#stop')?.addEventListener('click', this.stopCapture.bind(this));

                    if (this.download) {
                        this.shadowRoot.querySelector('#download')?.addEventListener('click', this.downloadCapture.bind(this));
                    }

                    if (this.#error && this.shadowRoot.querySelector('#error')) {
                        this.shadowRoot.querySelector('#error')!.textContent = this.#error.message ? this.#error.message : 'An error occurred during capture.';
                    }
                }

                // these ensure the target is eligible for restriction.
                // A default background color can be inherited from the element if needed.
                const targetEl: HTMLElement | null = this.shadowRoot?.querySelector("#target") ?? null;
                if (targetEl) {
                    targetEl.style.isolation = "isolate";
                    targetEl.style.transformStyle = "flatten";
                    targetEl.style.backgroundColor = this.backgroundColor ?? "white"; // Ensure the target has a background color
                }
            }
        } catch (err) {
            this.#errorHandler(err);
        }
    }

    get element(): string | null {
        return this.getAttribute('element');
    }

    set element(selector: string | null | undefined) {
        if (selector?.length) {
            this.setAttribute('output-element', selector);
        } else {
            this.removeAttribute('output-element');
        }
    }

    get file(): string | null {
        return this.getAttribute('file');
    }

    set file(value: string | null | undefined) {
        if (value?.length) {
            this.setAttribute('file', value);
        } else {
            this.removeAttribute('file');
        }
    }

    get mode(): string | null {
        const explicit = this.getAttribute('mode');
        if (explicit) {
            return explicit;
        }
        if (this.element) return 'element';
        return null;
    }

    /**
     * Explicitly sets the mode of the capture.
     */
    set mode(value: "element" | "opfs" | "none" | null | undefined) {
        if (!value || value === 'none') {
            this.removeAttribute('mode');
        } else {
            const validModes = ['element', 'opfs', 'none'];
            if (!validModes.includes(value)) {
                this.#errorHandler(new Error(`Invalid mode: ${value}. Valid modes are ${validModes.sort().join(", ")}.`));
            }
        }
    }

    get download(): boolean {
        return this.hasAttribute('download');
    }

    set download(value: boolean | null | undefined) {
        if (value) {
            this.setAttribute('download', '');
        } else {
            this.removeAttribute('download');
        }
    }

    get controlled(): boolean {
        return this.hasAttribute('controlled');
    }

    set controlled(value: boolean | null | undefined) {
        if (value) {
            this.setAttribute('controlled', '');
        } else {
            this.removeAttribute('controlled');
        }
    }

    get error(): Error | null {
        return this.#error;
    }

    get blob(): Blob | null {
        return this.#chunks.length ? new Blob(this.#chunks, { type: 'video/webm' }) : null;
    }

    get captureUrl(): string | null {
        const blob = this.blob;
        if (blob) {
            return URL.createObjectURL(blob);
        }
        return null;
    }

    get track(): MediaStreamTrack | null {
        return this.#stream?.getVideoTracks()[0] || null;
    }

    get autoplay(): boolean {
        return this.hasAttribute('autoplay');
    }

    set autoplay(value: boolean | null | undefined) {
        if (value) {
            this.setAttribute('autoplay', '');
        } else {
            this.removeAttribute('autoplay');
        }
    }

    get backgroundColor(): string {
        return this.getAttribute('background-color') || 'white';
    }

    set backgroundColor(value: string | null | undefined) {
        if (value) {
            this.setAttribute('background-color', value);
        } else {
            this.removeAttribute('background-color');
        }
    }

    get audio(): boolean {
        return this.hasAttribute('audio');
    }

    set audio(value: boolean | null | undefined) {
        if (value) {
            this.setAttribute('audio', '');
        } else {
            this.removeAttribute('audio');
        }
    }

    /**
     * Emits a custom event with the given name and handles extra details.
     */
    #emitEvent(name: "started" | "stopped" | "error" | "download"): void {
        const eventName = `capture-dom-${name}`;
        const standardOptions = { bubbles: true, cancelable: false, composed: true };
        const standardDetail = { mode: this.mode, file: this.file, element: this.element };
        const dispatch = (extraDetail?: object) => {
            const evt = new CustomEvent(eventName, { ...standardOptions, detail: { ...standardDetail, ...extraDetail } });
            this.dispatchEvent(evt);
        };
        switch (name) {
            case 'error':
                dispatch({ error: this.#error });
                break;
            case 'stopped':
            case 'download':
                dispatch({ blob: this.blob, url: this.blob ? URL.createObjectURL(this.blob) : '' });
                break;
            case 'started':
            default:
                dispatch();
                break;
        }
    }

    /**
     * Starts the capture of the DOM element.
     * @returns {Promise<void>}
     */
    startCapture = async (): Promise<void> => {
        this.stopCapture();
        if (!this.isConnected) return;
        this.#errorHandler(null);
        /**
         * @type {MediaStreamConstraints}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
         */
        const displayMediaOptions = {
            video: {
                displaySurface: "window",
                // monitorTypeSurfaces: "exclude",
                // selfBrowserSurface: "exclude",
                autoGainControl: false,
                suppressLocalAudioPlayback: false,
                // sampleRate: 44100,
                // sampleSize: 16,
            },
            audio: this.hasAttribute('audio'),
            surfaceSwitching: "exclude",
            systemAudio: this.hasAttribute('audio') ? "include" : "exclude",
            preferCurrentTab: true,
        };
        try {
            this.#stream =
                await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            const targetEl = this.shadowRoot!.querySelector('#target');
            console.log('target Element', targetEl, this.shadowRoot);
            if (!targetEl) {
                throw new Error('No target element found. capture-dom requires a target with ID "target".');
            }
            const restrictionTarget = await RestrictionTarget.fromElement(this.shadowRoot.querySelector('#target'));
            if (!restrictionTarget) {
                throw new Error('No restriction target found. capture-dom requires a target with ID "target".');
            }
            console.log(this.#stream, this.track);
            await this.track?.restrictTo(restrictionTarget);
            switch (this.mode) {
                case 'element': {
                    if (!this.element) {
                        throw new Error('Element mode requires an "element" attribute to be set.');
                    }
                    if (!document.querySelector(this.element)) {
                        throw new Error(`No element found for selector: ${this.element}`);
                    } else {
                        const targetElement = document.querySelector(this.element);
                        if (targetElement instanceof HTMLVideoElement || targetElement instanceof HTMLAudioElement) {
                            targetElement.srcObject = this.#stream;
                            if (this.autoplay) {
                                targetElement.play();
                            }
                            if (this.audio) {
                                targetElement.muted = true; // Ensure audio is muted when capturing to avoid a feedback loop
                            }
                        } else {
                            throw new Error(`The element for selector "${this.element}" is not a video or audio element.`);
                        }
                    }
                }
                case 'opfs': {
                    if (!this.#opfsHandle) {
                        await this.#setupOPFSHandle();
                    }
                    break;
                }
                case null: {
                    //do nothing if there is no mode set
                    break;
                }
                default:
                    throw new Error(`Invalid mode: ${this.mode}.`);
            }
            if (this.#mediaRecorder) {
                this.#mediaRecorder.stop();
                this.#mediaRecorder = null;
            }
            this.#chunks = [];
            this.#mediaRecorder = new MediaRecorder(this.#stream, { mimeType: 'video/webm' });
            this.#mediaRecorder.addEventListener("dataavailable", ((e) => {
                this.#chunks.push(e.data);
                //we can write to the OPFS file as the stream is created
                if (this.mode === 'opfs' && this.#opfsHandle) {
                    this.#opfsHandle.write(e.data);
                }
                if (this.download) {
                    const downloadLink = (this.shadowRoot?.querySelector('#download') ?? null) as HTMLAnchorElement | null;
                    if (downloadLink) {
                        downloadLink.href = URL.createObjectURL(e.data);
                        downloadLink.download = this.#fileName;
                    }
                }
            }).bind(this));
            this.#mediaRecorder.addEventListener("stop", ((evt) => {
                if (this.element) {
                    const url = this.blob ? URL.createObjectURL(this.blob) : '';
                    const targetElement = document.querySelector(this.element);
                    if (targetElement instanceof HTMLVideoElement || targetElement instanceof HTMLAudioElement) {
                        targetElement.srcObject = null; // Clear the previous stream
                        targetElement.src = url; // Set the new blob URL
                        this.#emitEvent('stopped');
                    }
                } else {
                    this.#emitEvent('stopped');
                }
            }).bind(this));
            this.#mediaRecorder.addEventListener("error", this.#errorHandler.bind(this));
            this.setAttribute('recording', '');
            this.#mediaRecorder.start();
            this.#emitEvent('started');
        } catch (err) {
            this.#errorHandler(err);
        }
    }

    /**
     * Stops the capture and releases the media stream.
     */
    stopCapture = async (): Promise<void> => {
        this.removeAttribute('recording');
        if (this.#stream) {
            this.#stream.getTracks().forEach(track => track.stop());
            this.#stream = null;
        }
        if (this.#mediaRecorder) {
            this.#mediaRecorder.stop();
            this.#mediaRecorder = null;
        }
        if (this.#opfsHandle) {
            this.#opfsHandle = null;
        }
    }

    downloadCapture(): void {
        try {
            if (!this.blob) {
                this.#errorHandler(new Error('No capture data available to download.'));
            } else {
                this.#emitEvent('download');
            }
        } catch (err) {
            this.#errorHandler(err);
        }
    }

    connectedCallback(): void {
        this.#render();
    }

    disconnectedCallback(): void {
        this.stopCapture();
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
        const exportParts = ["controls", "start", "stop", "target", "error"];
        if (name === 'exportparts' && newValue !== exportParts.sort().join(',')) {
            this.setAttribute('exportparts', exportParts.sort().join(','));
        } else {
            this.stopCapture();
            this.#render();
        }
    }
}

if (customElements && !customElements.get('capture-dom')) {
    customElements.define('capture-dom', CaptureDOM);
}