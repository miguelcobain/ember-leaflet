import Ember from 'ember';
import BaseLayer from './base-layer';

export default BaseLayer.extend({
  tagName: '',

  //location: Ember.computed.collect('lat', 'lng'),

  createLayer() {
    return this.L.marker();
  },

  latLng: Ember.computed({
    get(key) {
      console.log('getting ' + key + ' from ' + this.toString() + '...');
      let getterName = 'get' + Ember.String.classify(key);
      Ember.assert(
        this.constructor + ' must have a ' + getterName + ' getter function.',
        !!this._layer && !!this._layer[getterName]);
      let value = this._layer[getterName].call(this._layer);
      return value;
    },
    set(key, value) {
      console.log('setting ' + key + ' from ' + this.toString() + '...');
      /*if (!this._layer) {
        this._layer = this.createLayer();
      }
      let setterName = 'set' + Ember.String.classify(key);
      Ember.assert(
        this.constructor + ' must have a ' + setterName + ' setter function.',
        !!this._layer && !!this._layer[setterName]);
      this._layer[setterName].call(this._layer, value);*/
      return value;
    }
  })
});
