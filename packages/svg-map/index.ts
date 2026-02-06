/**
 * Extended SVGElement type for storing reference to original image element
 */
interface SVGElementWithImageRef extends SVGElement {
  __imageElement?: HTMLImageElement;
}

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
      attributeFilter: ['data-area', 'data-max-zoom', 'data-min-zoom', 'data-zoom', 'src'],
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
   * Get all SVG elements from the light DOM (inline and external)
   */
  #getSvgElements(): SVGElement[] {
    const svgs: SVGElement[] = [];
    // Get inline SVG elements
    this.querySelectorAll('svg[slot="svg"]').forEach((el) => {
      if (el instanceof SVGElement) {
        svgs.push(el);
      }
    });
    // Get external SVG elements from img/picture tags
    this.querySelectorAll('img[slot="svg"], picture[slot="svg"] img').forEach((el) => {
      if (el instanceof HTMLImageElement && el.naturalWidth > 0) {
        // Create a container SVG element that represents the image
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGElementWithImageRef;
        svg.setAttribute('width', el.naturalWidth.toString());
        svg.setAttribute('height', el.naturalHeight.toString());
        svg.setAttribute('data-external-src', el.src);
        
        // Copy zoom attributes from img to svg
        const zoomAttr = el.getAttribute('data-zoom');
        const minZoomAttr = el.getAttribute('data-min-zoom');
        const maxZoomAttr = el.getAttribute('data-max-zoom');
        if (zoomAttr) svg.setAttribute('data-zoom', zoomAttr);
        if (minZoomAttr) svg.setAttribute('data-min-zoom', minZoomAttr);
        if (maxZoomAttr) svg.setAttribute('data-max-zoom', maxZoomAttr);
        
        // Store reference to original image
        svg.__imageElement = el;
        svgs.push(svg);
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

    // Find SVGs that match zoom range (min-zoom to max-zoom)
    const matchingSvgs = svgs.filter((svg) => {
      const minZoom = svg.getAttribute('data-min-zoom');
      const maxZoom = svg.getAttribute('data-max-zoom');
      const exactZoom = svg.getAttribute('data-zoom');

      // If exact zoom is specified, check for exact match
      if (exactZoom) {
        return parseFloat(exactZoom) === this.#currentZoom;
      }

      // Check if current zoom is within min/max range
      const min = minZoom ? parseFloat(minZoom) : -Infinity;
      const max = maxZoom ? parseFloat(maxZoom) : Infinity;
      
      return this.#currentZoom >= min && this.#currentZoom <= max;
    });

    if (matchingSvgs.length > 0) {
      // If multiple match, prefer the one with the narrowest range
      return matchingSvgs.reduce((best, current) => {
        const bestMin = parseFloat(best.getAttribute('data-min-zoom') || '-Infinity');
        const bestMax = parseFloat(best.getAttribute('data-max-zoom') || 'Infinity');
        const bestRange = bestMax - bestMin;

        const currMin = parseFloat(current.getAttribute('data-min-zoom') || '-Infinity');
        const currMax = parseFloat(current.getAttribute('data-max-zoom') || 'Infinity');
        const currRange = currMax - currMin;

        return currRange < bestRange ? current : best;
      });
    }

    // Fallback: Find closest zoom level
    let closest: SVGElement | null = null;
    let closestDiff = Infinity;

    svgs.forEach((svg) => {
      const zoomAttr = svg.getAttribute('data-zoom');
      const minZoom = svg.getAttribute('data-min-zoom');
      const maxZoom = svg.getAttribute('data-max-zoom');
      
      let compareZoom: number;
      if (zoomAttr) {
        compareZoom = parseFloat(zoomAttr);
      } else if (minZoom && maxZoom) {
        compareZoom = (parseFloat(minZoom) + parseFloat(maxZoom)) / 2;
      } else if (minZoom) {
        compareZoom = parseFloat(minZoom);
      } else if (maxZoom) {
        compareZoom = parseFloat(maxZoom);
      } else {
        return;
      }

      const diff = Math.abs(compareZoom - this.#currentZoom);
      if (diff < closestDiff) {
        closestDiff = diff;
        closest = svg;
      }
    });

    // If no zoom attribute found, use first SVG
    return closest || svgs[0];
  }

  /**
   * Check if an anchor should be visible at current zoom level
   */
  #isAnchorVisibleAtZoom(anchor: HTMLAnchorElement): boolean {
    const minZoom = anchor.getAttribute('data-min-zoom');
    const maxZoom = anchor.getAttribute('data-max-zoom');
    const exactZoom = anchor.getAttribute('data-zoom');

    // If no zoom restrictions, always visible
    if (!minZoom && !maxZoom && !exactZoom) return true;

    // Check exact zoom matches (comma-separated list)
    if (exactZoom) {
      const zoomLevels = exactZoom.split(',').map((z) => parseFloat(z.trim()));
      if (zoomLevels.some((z) => !isNaN(z) && z === this.#currentZoom)) {
        return true;
      }
    }

    // Check min/max zoom range
    const min = minZoom ? parseFloat(minZoom) : -Infinity;
    const max = maxZoom ? parseFloat(maxZoom) : Infinity;

    return this.#currentZoom >= min && this.#currentZoom <= max;
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
      const externalSrc = this.#currentSvg.getAttribute('data-external-src');
      
      if (externalSrc) {
        // For external SVG images, use an img element
        const img = document.createElement('img');
        img.src = externalSrc;
        img.style.display = 'block';
        
        // Get original image element to copy dimensions
        const originalImg = (this.#currentSvg as SVGElementWithImageRef).__imageElement;
        if (originalImg) {
          if (originalImg.width) img.width = originalImg.width;
          if (originalImg.height) img.height = originalImg.height;
          if (originalImg.alt) img.alt = originalImg.alt;
        }
        
        container.appendChild(img);
      } else {
        // For inline SVG, clone it
        const svgClone = this.#currentSvg.cloneNode(true) as SVGElement;
        svgClone.removeAttribute('slot');
        svgClone.style.display = 'block';
        container.appendChild(svgClone);
      }
    }

    // Add positioned anchors
    this.#linkPositions.forEach((pos, anchor) => {
      const anchorClone = anchor.cloneNode(true) as HTMLAnchorElement;
      anchorClone.removeAttribute('data-area');
      anchorClone.removeAttribute('data-zoom');
      anchorClone.removeAttribute('data-min-zoom');
      anchorClone.removeAttribute('data-max-zoom');
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
