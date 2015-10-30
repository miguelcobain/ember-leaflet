import Ember from 'ember';
import BaseLayer from 'ember-leaflet/components/base-layer';
import ParentMixin from 'ember-leaflet/mixins/parent';
const { A } = Ember;

export default BaseLayer.extend(ParentMixin, {

  _childLayers: null,

  init() {
    this._super(...arguments);
    this.set('_childLayers', new A());
  },

  registerChild(childLayer) {
    this._childLayers.addObject(childLayer);

    //If container already setup setup child immediatly
    if (this._layer) {
      childLayer.layerSetup();
    }
  },

  unregisterChild(childLayer) {
    this._childLayers.removeObject(childLayer);

    //If container already setup teardown child immediatly
    if (this._layer) {
      childLayer.layerTeardown();
    }
  }

});