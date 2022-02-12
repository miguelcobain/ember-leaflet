import { next } from '@ember/runloop';

import DivOverlayLayer from 'ember-leaflet/components/div-overlay-layer';

/**
 * Used to display small texts on top of map layers.
 *
 * @class TooltipLayer
 * @extends DivOverlayLayer
 */
export default class TooltipLayer extends DivOverlayLayer {
  leafletOptions = [
    ...this.leafletOptions,

    /**
     * Direction where to open the tooltip.
     * Possible values are: right, left, top, bottom, center, auto.
     * auto will dynamically switch between right and left according to the tooltip position on the map.
     * Defaults to `'auto'`.
     *
     * @argument direction
     * @type {String}
     */
    'direction',

    /**
     * Whether to open the tooltip permanently or only on mouseover.
     * Defaults to `false`.
     *
     * @argument permanent
     * @type {Boolean}
     */
    'permanent',

    /**
     * If true, the tooltip will follow the mouse instead of being fixed at the feature center.
     * Defaults to `false`.
     *
     * @argument sticky
     * @type {Boolean}
     */
    'sticky',

    /**
     * If true, the tooltip will listen to the feature events.
     * Defaults to `false`.
     *
     * @argument interactive
     * @type {Boolean}
     */
    'interactive',

    /**
     * Tooltip container opacity.
     * Defaults to `0.9`.
     *
     * @argument opacity
     * @type {Number}
     */
    'opacity'
  ];

  constructor() {
    super(...arguments);
    // if this tooltip is permanent, we need to render the content immediately
    if (this.args.permanent) {
      this.shouldRender = true;
    }
  }

  createLayer() {
    return this.L.tooltip(this.options).setContent(this.destinationElement);
  }

  didCreateLayer() {
    this._addPopupListeners();
  }

  addToContainer() {
    this.args.parent._layer.bindTooltip(this._layer);
  }

  removeFromContainer() {
    this.args.parent._layer.unbindTooltip();
  }

  _onLayerRemove({ layer }) {
    if (layer === this._layer) {
      this._removePopupListeners();
      this.shouldRender = false;
    }
  }

  _addPopupListeners() {
    // we need to hijack the `onAdd` method because we need to
    // render the template *before* the popup is opened.
    // This way, the popup will set its dimensions according to the rendered DOM.
    let oldOnAdd = this._layer.onAdd;
    this._layer.onAdd = (map) => {
      // we need to user `layerremove` event becase it's the only one that fires
      // *after* the popup was completely removed from the map
      map.addEventListener('layerremove', this._onLayerRemove, this);
      // trigger _initLayout manually, otherwise Tooltip doesn't have the container set
      // to calculate initial position
      if (!this._layer._container) {
        this._layer._initLayout();
      }
      // this will make in-element render to the document fragment
      this.shouldRender = true;
      // in element will render on the afterRender queue, so we need to render after that
      next(() => {
        if (this.shouldRender) {
          oldOnAdd.call(this._layer, map);
        }
      });
    };
  }

  _removePopupListeners() {
    let parentComponent = this.args.parent;
    parentComponent._layer._map.removeEventListener('layerremove', this._onLayerRemove, this);
  }
}
