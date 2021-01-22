import { action } from '@ember/object';
import { later, cancel, next } from '@ember/runloop';

import DivOverlayLayer from 'ember-leaflet/components/div-overlay-layer';

export default class PopupLayer extends DivOverlayLayer {
  leafletOptions = [
    ...this.leafletOptions,
    'maxWidth',
    'minWidth',
    'maxHeight',
    'autoPan',
    'autoPanPaddingTopLeft',
    'autoPanPaddingBottomRight',
    'autoPanPadding',
    'keepInView',
    'closeButton',
    'autoClose'
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
    this._layer._close();
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
    this._layer.onAdd = map => {
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
