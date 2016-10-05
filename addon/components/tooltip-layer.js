import Ember from 'ember';
import DivOverlayLayer from 'ember-leaflet/components/div-overlay-layer';

const { computed, run } = Ember;

export default DivOverlayLayer.extend({

  leafletOptions: [
    'direction', 'permanent', 'sticky', 'interactive', 'opacity'
  ],

  // creates a document fragment that will hold the DOM
  destinationElement: computed(function() {
    return document.createElement('div');
  }),

  createLayer() {
    return this.L.tooltip(this.get('options')).setContent(this.get('destinationElement'));
  },

  didCreateLayer() {
    this._addPopupListeners();
  },

  willDestroyLayer() {
    this._removePopupListeners();
  },

  addToContainer() {
    this.get('containerLayer')._layer.bindTooltip(this._layer);
  },

  removeFromContainer() {
    this.get('containerLayer')._layer.unbindTooltip();
  },

  _onLayerRemove({layer}) {
    if (layer === this._layer) {
      this.set('shouldRender', false);
    }
  },

  _addPopupListeners() {
    // we need to hijack the `onAdd` method because we need to
    // render the template *before* the popup is opened.
    // This way, the popup will set its dimensions according to the rendered DOM.
    let oldOnAdd = this._layer.onAdd;
    this._layer.onAdd = (map) => {
      // trigger _initLayout manually, otherwise Tooltip doesn't have the container set
      // to calculate initial position
      if (!this._layer._container) {
    		this._layer._initLayout();
    	}
      // this will make wormwhole render to the document fragment
      this.set('shouldRender', true);
      // ember-wormhole will render on the afterRender queue, so we need to render after that
      run.next(() => {
        oldOnAdd.call(this._layer, map);
      });
    };
    // we need to user `layerremove` event becase it's the only one that fires
    // *after* the popup was completely removed from the map
    let containerLayer = this.get('containerLayer');
    containerLayer._layer._map.addEventListener('layerremove', this._onLayerRemove, this);
  },

  _removePopupListeners() {
    let containerLayer = this.get('containerLayer');
    containerLayer._layer._map.removeEventListener('layerremove', this._onLayerRemove, this);
  }
});
