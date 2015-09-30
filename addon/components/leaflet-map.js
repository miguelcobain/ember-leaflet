import Ember from 'ember';
import BaseLayer from './base-layer';

export default BaseLayer.extend({

  center: Ember.computed.collect('lat', 'lng'),

  //override because the base map needs to be rendered
  //before everything else and not on afterRender
  didInsertElement() {
    this._layer = this.createLayer();
  },

  createLayer() {
    return this.L.map(this.element, {
      center: this.get('center'),
      zoom: this.get('zoom')
    });
  }
});
