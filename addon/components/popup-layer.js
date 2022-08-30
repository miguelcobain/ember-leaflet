import { action } from '@ember/object';
import { later, cancel, next } from '@ember/runloop';

import DivOverlayLayer from 'ember-leaflet/components/div-overlay-layer';

/**
 * Used to open popups in certain places of the map.
 *
 * @class PopupLayer
 * @extends DivOverlayLayer
 */
export default class PopupLayer extends DivOverlayLayer {
  leafletOptions = [
    ...this.leafletOptions,

    /**
     * Max width of the popup, in pixels.
     * Defaults to `300`.
     *
     * @argument maxWidth
     * @type {Number}
     */
    'maxWidth',

    /**
     * Min width of the popup, in pixels.
     * Defaults to `50`.
     *
     * @argument minWidth
     * @type {Number}
     */
    'minWidth',

    /**
     * If set, creates a scrollable container of the given height
     * inside a popup if its content exceeds it.
     * Defaults to `null`.
     *
     * @argument maxHeight
     * @type {Number}
     */
    'maxHeight',

    /**
     * Set it to false if you don't want the map to do panning animation to fit the opened popup.
     * Defaults to `true`.
     *
     * @argument autoPan
     * @type {Boolean}
     */
    'autoPan',

    /**
     * The margin between the popup and the top left corner of the map view after autopanning was performed.
     * Defaults to `null`.
     *
     * @argument autoPanPaddingTopLeft
     * @type {Point}
     */
    'autoPanPaddingTopLeft',

    /**
     * The margin between the popup and the bottom right corner of the map view after autopanning was performed.
     * Defaults to `null`.
     *
     * @argument autoPanPaddingBottomRight
     * @type {Point}
     */
    'autoPanPaddingBottomRight',

    /**
     * Equivalent of setting both top left and bottom right autopan padding to the same value.
     * Defaults to `Point(5, 5)`.
     *
     * @argument autoPanPadding
     * @type {Point}
     */
    'autoPanPadding',

    /**
     * Set it to true if you want to prevent users from panning the popup off of the screen while it is open.
     * Defaults to `false`.
     *
     * @argument keepInView
     * @type {Boolean}
     */
    'keepInView',

    /**
     * Controls the presence of a close button in the popup.
     * Defaults to `true`.
     *
     * @argument closeButton
     * @type {Boolean}
     */
    'closeButton',

    /**
     * Set it to false if you want to override the default behavior of the popup closing when another popup is opened.
     * Defaults to `true`.
     *
     * @argument autoClose
     * @type {Boolean}
     */
    'autoClose',

    /**
     * Set it to false if you want to override the default behavior of the ESC key for closing of the popup.
     * Defaults to `true`.
     *
     * @argument closeOnEscapeKey
     * @type {Boolean}
     */
    'closeOnEscapeKey',

    /**
     * Set it if you want to override the default behavior of the popup closing when
     * user clicks on the map. Defaults to the map's closePopupOnClick option.
     * Defaults to `*`.
     *
     * @argument closeOnClick
     * @type {Boolean}
     */
    'closeOnClick'
  ];

  isOpen() {
    // leaflet 1 added an `isOpen` method
    return this._layer.isOpen ? this._layer.isOpen() : this._layer._isOpen;
  }

  /*
   * Action to yield to block
   */
  @action
  closePopup() {
    this._layer._close ? this._layer._close() : this._layer.close();
  }

  @action
  popupOpenDidChange() {
    if (this.args.popupOpen) {
      if (!this.isOpen()) {
        this.args.parent._layer.openPopup();
      }
    } else {
      if (this.isOpen()) {
        this.args.parent._layer.closePopup();
      }
    }
  }

  constructor() {
    super(...arguments);
    // Fix for starting popup open
    if (this.args.popupOpen) {
      this.shouldRender = true;
    }
  }

  createLayer() {
    return this.L.popup(this.options).setContent(this.destinationElement);
  }

  didCreateLayer() {
    this._addPopupListeners();
    this.popupOpenDidChange();
  }

  willDestroyLayer() {
    this.closePopup();
  }

  addToContainer() {
    this.args.parent._layer.bindPopup(this._layer);
  }

  removeFromContainer() {
    this.args.parent._layer.unbindPopup();
  }

  _onLayerRemove({ layer }) {
    if (layer === this._layer) {
      this._removePopupListeners();
      if (this.args.parent._layer._map._fadeAnimated) {
        this._destroyAfterAnimation = later(() => {
          if (!this.isDestroyed && !this.isDestroying) {
            this.shouldRender = false;
          }
        }, 200);
      } else {
        this.shouldRender = false;
      }
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
      // if we're currently waiting for the animation to end, cancel the wait
      cancel(this._destroyAfterAnimation);
      // this will make in-element render to the document fragment
      this.shouldRender = true;
      // ember-wormhole will render on the afterRender queue, so we need to render after that
      next(() => {
        if (this.shouldRender) {
          oldOnAdd.call(this._layer, map);
        }
      });
    };
  }

  _removePopupListeners() {
    this.args.parent._layer._map.removeEventListener('layerremove', this._onLayerRemove, this);
  }
}
