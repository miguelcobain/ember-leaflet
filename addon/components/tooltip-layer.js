import Ember from 'ember';
import DivOverlayLayer from 'ember-leaflet/components/div-overlay-layer';

const { run, computed } = Ember;

export default DivOverlayLayer.extend({

  leafletOptions: [
    'direction', 'permanent', 'sticky', 'interactive', 'opacity'
  ],

  // if this tooltip is permanent, we need to render the content immediately
  shouldRender: computed.reads('permanent'),

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
    this.get('parentComponent')._layer.bindTooltip(this._layer);
  },

  removeFromContainer() {
    this.get('parentComponent')._layer.unbindTooltip();
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
    let parentComponent = this.get('parentComponent');
    parentComponent._layer._map.addEventListener('layerremove', this._onLayerRemove, this);
  },

  _removePopupListeners() {
    let parentComponent = this.get('parentComponent');
    parentComponent._layer._map.removeEventListener('layerremove', this._onLayerRemove, this);
  }
});
