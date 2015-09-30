import Ember from 'ember';
import ContainerLayer from './leaflet-map';
/* global L */

export default Ember.Component.extend({
  L,

  containerLayer: Ember.computed(function() {
    return this.nearestOfType(ContainerLayer);
  }).readOnly(),

  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      if (!this._layer) {
        this._layer = this.createLayer();
      }
      if (this.get('containerLayer')) {
        this.get('containerLayer')._layer.addLayer(this._layer);
      }
    });
  },

  willDestroyElement() {
    this.destroyLayer();
    if (this.get('containerLayer')) {
      this.get('containerLayer').get('layer').removeLayer(this._layer);
    }
    this._layer = null;
  },

  createLayer: Ember.K,
  destroyLayer: Ember.K
});
