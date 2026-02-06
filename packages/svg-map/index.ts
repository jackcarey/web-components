/**
 * A web component that plots anchor tags onto SVG images with zoom-based switching.
 * Works like a cross between an image map and a navigational map.
 */
class SVGMap extends HTMLElement {
  static observedAttributes = ['zoom', 'disabled'];

  #currentZoom: number = 1;
  #mutationObserver: MutationObserver | null = null;
  #currentSvg: SVGElement | null = null;
  #linkPositions: Map<HTMLAnchorElement, { x: number; y: number }> = new Map();

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#setupMutationObserver();
    this.#render();
  }

  disconnectedCallback() {
    this.#mutationObserver?.disconnect();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === 'zoom') {
      this.#currentZoom = this.zoom;
      this.#render();
    } else if (name === 'disabled') {
      this.#render();
    }
  }

  #setupMutationObserver() {
    this.#mutationObserver?.disconnect();

    if (this.disabled) return;

    this.#mutationObserver = new MutationObserver(() => {
      this.#render();
    });

    this.#mutationObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-zoom', 'data-area'],
    });
  }

  get zoom(): number {
    const val = parseFloat(this.getAttribute('zoom') || '1');
    return isNaN(val) ? 1 : Math.max(0.1, val);
  }

  set zoom(value: number | string) {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (!isNaN(num)) {
      this.setAttribute('zoom', String(Math.max(0.1, num)));
    }
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * Get all SVG elements from the light DOM
   */
  #getSvgElements(): SVGElement[] {
    const svgs: SVGElement[] = [];
    this.querySelectorAll('svg[slot="svg"]').forEach((el) => {
      if (el instanceof SVGElement) {
        svgs.push(el);
      }
    });
    return svgs;
  }

  /**
   * Get all anchor elements from the light DOM
   */
  #getAnchorElements(): HTMLAnchorElement[] {
    const anchors: HTMLAnchorElement[] = [];
    this.querySelectorAll('a[data-area]').forEach((el) => {
      if (el instanceof HTMLAnchorElement) {
        anchors.push(el);
      }
    });
    return anchors;
  }

  /**
   * Select the appropriate SVG for the current zoom level
   */
  #selectSvgForZoom(): SVGElement | null {
    const svgs = this.#getSvgElements();
    if (svgs.length === 0) return null;

    // Find exact match first
    const exactMatch = svgs.find((svg) => {
      const zoomAttr = svg.getAttribute('data-zoom');
      return zoomAttr && parseFloat(zoomAttr) === this.#currentZoom;
    });
    if (exactMatch) return exactMatch;

    // Find closest zoom level
    let closest: SVGElement | null = null;
    let closestDiff = Infinity;

    svgs.forEach((svg) => {
      const zoomAttr = svg.getAttribute('data-zoom');
      if (zoomAttr) {
        const svgZoom = parseFloat(zoomAttr);
        const diff = Math.abs(svgZoom - this.#currentZoom);
        if (diff < closestDiff) {
          closestDiff = diff;
          closest = svg;
        }
      }
    });

    // If no zoom attribute found, use first SVG
    return closest || svgs[0];
  }

  /**
   * Check if an anchor should be visible at current zoom level
   */
  #isAnchorVisibleAtZoom(anchor: HTMLAnchorElement): boolean {
    const zoomAttr = anchor.getAttribute('data-zoom');
    if (!zoomAttr) return true; // No zoom restriction

    const zoomLevels = zoomAttr.split(',').map((z) => parseFloat(z.trim()));
    return zoomLevels.some((z) => !isNaN(z) && z === this.#currentZoom);
  }

  /**
   * Get the bounding box and center of an SVG element
   */
  #getElementBounds(element: SVGGraphicsElement): {
    bbox: DOMRect;
    center: { x: number; y: number };
  } | null {
    try {
      const bbox = element.getBBox();
      return {
        bbox,
        center: {
          x: bbox.x + bbox.width / 2,
          y: bbox.y + bbox.height / 2,
        },
      };
    } catch (e) {
      return null;
    }
  }

  /**
   * Calculate positions for anchors within an area
   */
  #calculateAnchorPositions(
    areaId: string,
    anchors: HTMLAnchorElement[]
  ): Map<HTMLAnchorElement, { x: number; y: number }> {
    const positions = new Map<HTMLAnchorElement, { x: number; y: number }>();
    
    if (!this.#currentSvg || anchors.length === 0) return positions;

    const areaElement = this.#currentSvg.querySelector(`#${CSS.escape(areaId)}`);
    if (!areaElement || !(areaElement instanceof SVGGraphicsElement)) {
      return positions;
    }

    const bounds = this.#getElementBounds(areaElement);
    if (!bounds) return positions;

    const { bbox } = bounds;
    const tagName = areaElement.tagName.toLowerCase();

    // For paths and complex shapes, distribute along the perimeter or path
    if (tagName === 'path' || tagName === 'line' || tagName === 'polyline') {
      const pathLength = (areaElement as SVGGeometryElement).getTotalLength?.() || 0;
      if (pathLength > 0) {
        anchors.forEach((anchor, index) => {
          const ratio = anchors.length === 1 ? 0.5 : index / (anchors.length - 1);
          const point = (areaElement as SVGGeometryElement).getPointAtLength(
            pathLength * ratio
          );
          positions.set(anchor, { x: point.x, y: point.y });
        });
      }
    } else if (tagName === 'circle') {
      // Distribute in a circle pattern
      const circle = areaElement as SVGCircleElement;
      const cx = circle.cx.baseVal.value;
      const cy = circle.cy.baseVal.value;
      const r = circle.r.baseVal.value * 0.6; // Use 60% of radius to keep inside

      anchors.forEach((anchor, index) => {
        const angle = (2 * Math.PI * index) / anchors.length;
        positions.set(anchor, {
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle),
        });
      });
    } else {
      // For rectangles and other enclosed shapes, distribute in a grid pattern
      const cols = Math.ceil(Math.sqrt(anchors.length));
      const rows = Math.ceil(anchors.length / cols);

      anchors.forEach((anchor, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        
        const x = bbox.x + (bbox.width * (col + 1)) / (cols + 1);
        const y = bbox.y + (bbox.height * (row + 1)) / (rows + 1);
        
        positions.set(anchor, { x, y });
      });
    }

    return positions;
  }

  /**
   * Main render function
   */
  #render() {
    if (!this.shadowRoot || this.disabled) return;

    // Select appropriate SVG for current zoom
    this.#currentSvg = this.#selectSvgForZoom();

    // Get all anchors
    const allAnchors = this.#getAnchorElements();

    // Filter anchors by zoom level
    const visibleAnchors = allAnchors.filter((a) => this.#isAnchorVisibleAtZoom(a));

    // Group anchors by area
    const anchorsByArea = new Map<string, HTMLAnchorElement[]>();
    visibleAnchors.forEach((anchor) => {
      const area = anchor.getAttribute('data-area');
      if (area) {
        if (!anchorsByArea.has(area)) {
          anchorsByArea.set(area, []);
        }
        anchorsByArea.get(area)!.push(anchor);
      }
    });

    // Calculate positions for all anchors
    this.#linkPositions.clear();
    anchorsByArea.forEach((anchors, areaId) => {
      const positions = this.#calculateAnchorPositions(areaId, anchors);
      positions.forEach((pos, anchor) => {
        this.#linkPositions.set(anchor, pos);
      });
    });

    // Render the shadow DOM
    this.#updateShadowDOM();
  }

  /**
   * Update the shadow DOM with current state
   */
  #updateShadowDOM() {
    if (!this.shadowRoot) return;

    // Clear shadow DOM
    this.shadowRoot.innerHTML = '';

    // Create container
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.display = 'inline-block';

    // Clone and add current SVG
    if (this.#currentSvg) {
      const svgClone = this.#currentSvg.cloneNode(true) as SVGElement;
      svgClone.removeAttribute('slot');
      svgClone.style.display = 'block';
      container.appendChild(svgClone);
    }

    // Add positioned anchors
    this.#linkPositions.forEach((pos, anchor) => {
      const anchorClone = anchor.cloneNode(true) as HTMLAnchorElement;
      anchorClone.removeAttribute('data-area');
      anchorClone.removeAttribute('data-zoom');
      anchorClone.style.position = 'absolute';
      anchorClone.style.left = `${pos.x}px`;
      anchorClone.style.top = `${pos.y}px`;
      anchorClone.style.transform = 'translate(-50%, -50%)';
      anchorClone.style.padding = '0.25em 0.5em';
      anchorClone.style.background = 'rgba(255, 255, 255, 0.9)';
      anchorClone.style.border = '1px solid #333';
      anchorClone.style.borderRadius = '3px';
      anchorClone.style.fontSize = '12px';
      anchorClone.style.textDecoration = 'none';
      anchorClone.style.color = '#0066cc';
      anchorClone.style.whiteSpace = 'nowrap';
      anchorClone.style.cursor = 'pointer';
      container.appendChild(anchorClone);
    });

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: inline-block;
      }
      a:hover {
        background: rgba(255, 255, 255, 1) !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
    `;
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);
  }
}

export { SVGMap };

if (customElements && !customElements.get('svg-map')) {
  customElements.define('svg-map', SVGMap);
}
