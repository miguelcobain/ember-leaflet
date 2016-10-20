import Ember from 'ember';
import DivOverlayLayer from 'ember-leaflet/components/div-overlay-layer';

const { observer, run } = Ember;

export default DivOverlayLayer.extend({

  leafletOptions: [
    'maxWidth', 'minWidth', 'maxHeight', 'autoPan', 'autoPanPaddingTopLeft',
    'autoPanPaddingBottomRight', 'autoPanPadding', 'keepInView', 'closeButton',
    'autoClose'
  ],

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

  popupOpenDidChange: observer('popupOpen', function() {
    if (this.get('popupOpen')) {
      if (!this.isOpen()) { this.get('parentComponent')._layer.openPopup(); }
    } else {
      if (this.isOpen()) { this.get('parentComponent')._layer.closePopup(); }
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
    this._removePopupListeners();
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
      if (this.get('parentComponent')._layer._map._fadeAnimated) {
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
      // if we're currently waiting for the animation to end, cancel the wait
      run.cancel(this._destroyAfterAnimation);
      // this will make wormwhole render to the document fragment
      this.set('shouldRender', true);
      // ember-wormhole will render on the afterRender queue, so we need to render after that
      run.next(() => {
        oldOnAdd.call(this._layer, map);
      });
    };
    // we need to user `layerremove` event becase it's the only one that fires
    // *after* the popup was completely removed from the map
    let parentComponent = this.get('parentComponent');
    parentComponent._layer._map.addEventListener('layerremove', this._onLayerRemove, this);
  },

  _removePopupListeners() {
    let parentComponent = this.get('parentComponent');
    parentComponent._layer._map.removeEventListener('layerremove', this._onLayerRemove, this);
  }
});
