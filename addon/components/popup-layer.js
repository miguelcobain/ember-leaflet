import { observer } from '@ember/object';
import { run } from '@ember/runloop';
import DivOverlayLayer from 'ember-leaflet/components/div-overlay-layer';

export default DivOverlayLayer.extend({

  leafletOptions: Object.freeze([
    'maxWidth', 'minWidth', 'maxHeight', 'autoPan', 'autoPanPaddingTopLeft',
    'autoPanPaddingBottomRight', 'autoPanPadding', 'keepInView', 'closeButton',
    'autoClose'
  ]),

  isOpen() {
    // leaflet 1 added an `isOpen` method
    return this._layer.isOpen ? this._layer.isOpen() : this._layer._isOpen;
  },

  /*
   * Action to yield to block
   */
  closePopup() {
    this._layer._close();
  },

  // eslint-disable-next-line ember/no-observers
  popupOpenDidChange: observer('popupOpen', function() {
    if (this.get('popupOpen')) {
      if (!this.isOpen()) {
        this.get('parentComponent')._layer.openPopup();
      }
    } else {
      if (this.isOpen()) {
        this.get('parentComponent')._layer.closePopup();
      }
    }
  }),

  init() {
    this._super(...arguments);
    // Fix for starting popup open
    if (this.get('popupOpen')) {
      this.set('shouldRender', true);
    }
  },

  createLayer() {
    return this.L.popup(this.get('options')).setContent(this.get('destinationElement'));
  },

  didCreateLayer() {
    this._addPopupListeners();
    this.popupOpenDidChange();
  },

  willDestroyLayer() {
    this.closePopup();
  },

  addToContainer() {
    this.get('parentComponent')._layer.bindPopup(this._layer);
  },

  removeFromContainer() {
    this.get('parentComponent')._layer.unbindPopup();
  },

  _onLayerRemove({ layer }) {
    if (layer === this._layer) {
      let map = this.get('parentComponent')._layer._map;
      map.removeEventListener('layerremove', this._onLayerRemove, this);
      if (map._fadeAnimated) {
        this._destroyAfterAnimation = run.later(() => {
          if (!this.get('isDestroyed') && !this.get('isDestroying')) {
            this.set('shouldRender', false);
          }
        }, 200);
      } else {
        this.set('shouldRender', false);
      }
    }
  },

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
      run.cancel(this._destroyAfterAnimation);
      // this will make wormwhole render to the document fragment
      this.set('shouldRender', true);
      // ember-wormhole will render on the afterRender queue, so we need to render after that
      run.next(() => {
        oldOnAdd.call(this._layer, map);
      });
    };
  }
});
