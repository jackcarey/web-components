//hacky type coercion to make the compiler happy
type WindowDPiP = Window & {
  documentPictureInPicture?: any & {
    window?: Window;
  };
};

export default class DocumentPiP extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'id', 'position', 'width', 'height'];
  }

  static get enabledId() {
    if (!document.pictureInPictureElement) {
      return undefined;
    }
    return document.pictureInPictureElement?.id;
  }

  #root: ShadowRoot;
  constructor() {
    super();
    this.#root = this.attachShadow({ mode: 'open' });
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val: Boolean) {
    this.toggleAttribute('disabled', Boolean(val));
  }

  async setPiP(val: boolean) {
    if (!val) {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      }
      return false;
    } else {
      // Open a Picture-in-Picture window.
      const pipWindow = await window.documentPictureInPicture.requestWindow({
        width: this.width ? parseInt(this.width) : 300,
        height: this.height ? parseInt(this.height) : 200,
      });

      pipWindow.addEventListener('pagehide', this.#pipWindowClosedFn);
    }
    // Returns null if no pip window is currently open
    if (!window.documentPictureInPicture.window) {
      // Open a Picture-in-Picture window.
      const pipWindow = await window.documentPictureInPicture.requestWindow({
        width: videoPlayer.clientWidth,
        height: videoPlayer.clientHeight + 50,
      });

      // Add pagehide listener to handle the case of the pip window being closed using the browser X button
      pipWindow.addEventListener('pagehide', (event) => {
        inPipMessage.style.display = 'none';
        playerContainer.append(videoPlayer);
      });

      // Copy style sheets over from the initial document
      // so that the player looks the same.
      [...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules]
            .map((rule) => rule.cssText)
            .join('');
          const style = document.createElement('style');

          style.textContent = cssRules;
          pipWindow.document.head.appendChild(style);
        } catch (e) {
          const link = document.createElement('link');

          link.rel = 'stylesheet';
          link.type = styleSheet.type;
          link.media = styleSheet.media;
          link.href = styleSheet.href;
          pipWindow.document.head.appendChild(link);
        }
      });

      // Move the player to the Picture-in-Picture window.
      pipWindow.document.body.append(videoPlayer);

      // Display a message to say it has been moved
      inPipMessage.style.display = 'block';
    } else {
      inPipMessage.style.display = 'none';
      playerContainer.append(videoPlayer);
      window.documentPictureInPicture.window.close();
    }
  }

  #checkboxChanged = ({ target }: Event) => {
    this.setPiP((target as HTMLInputElement).checked);
  };

  #pipWindowEnteredFn = (event: Event) => {
    const pipWindow = (window as WindowDPiP)?.documentPictureInPicture?.window;
    pipWindow?.addEventListener('pagehide', this.#pipWindowClosedFn);
    this.#render();
  };

  #pipWindowClosedFn = (event: PageTransitionEvent) => {
    this.#render();
  };

  #render() {
    const checked = !this.disabled && this.inUse;
    if (!Boolean('documentPictureInPicture' in window)) {
      this.#root.innerHTML = `<div id="not-available">
                    <slot name="not-available">PiP not available</slot>
                </div>`;
    } else {
      this.#root.innerHTML = `<input type="checkbox" id="pip-toggle" ${
        !this.disabled ? 'disabled' : ''
      } ${checked ? 'checked' : ''}/>
                <label id="pip-toggle-label" for="pip-toggle">
                    <slot name="toggle-label">Picture-in-Picture</slot>
                </label>
                <div id="in-use" style="display:none;">
                    <slot name="in-use">PiP</slot>
                </div>
            <div id="in-pip" style="display:none;">
                <slot name="in-pip">In PiP</slot>
            </div>
            <div id="pip-container">
                <div id="content">
                    <slot name="content"></slot>
                    <slot></slot>
                </div>
            </div>`;
      this.#root
        .querySelector('input')
        ?.addEventListener('change', this.#checkboxChanged);
    }
  }

  get position() {
    return this.getAttribute('position') ?? 'after';
  }

  set position(val: string) {
    if (!val) {
      this.removeAttribute('position');
    }
    if (['after', 'before'].includes(val)) {
      this.setAttribute('position', val);
    } else {
      this.setAttribute('position', 'after');
    }
  }

  get inUse() {
    return DocumentPiP.enabledId && DocumentPiP.enabledId === this.id;
  }

  get width(): string | null {
    return this.getAttribute('width');
  }

  set width(val: string) {
    const asNum = parseInt(val);
    if (!asNum || asNum < 0) {
      this.removeAttribute('width');
    } else {
      this.setAttribute('width', asNum.toString());
    }
  }

  get height(): string | null {
    return this.getAttribute('height') ?? '';
  }

  set height(val: string) {
    const asNum = parseInt(val);
    if (!asNum || asNum < 0) {
      this.removeAttribute('height');
    } else {
      this.setAttribute('height', asNum.toString());
    }
  }

  connectedCallback() {
    this.#render();
    if ('documentPictureInPicture' in window) {
      (window.documentPictureInPicture as WindowDPiP).addEventListener(
        'enter',
        this.#pipWindowEnteredFn
      );
    }
  }

  disconnectedCallback() {
    if ('documentPictureInPicture' in window) {
      (window.documentPictureInPicture as WindowDPiP).removeEventListener(
        'enter',
        this.#render
      );
      const pipWindow = (window as WindowDPiP)?.documentPictureInPicture
        ?.window;
      if (pipWindow) {
        pipWindow?.removeEventListener('pagehide', this.#pipWindowClosedFn);
      }
    }
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.#render();
    }
  }
}

if (customElements && !customElements.get('document-pip')) {
  customElements.define('document-pip', DocumentPiP);
}
