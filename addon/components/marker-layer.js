import Ember from 'ember';
import BaseLayer from './base-layer';
import DraggabilityMixin from 'ember-leaflet/mixins/draggability';

export default BaseLayer.extend(DraggabilityMixin, {
  tagName: '',

  leafletEvents: ['click', 'dblclick', 'mousedown', 'mouseover', 'mouseout',
    'contextmenu', 'dragstart', 'drag', 'dragend', 'move', 'remove',
    'popupopen', 'popupclose'],

  leafletProperties: [
    'icon', 'zIndexOffset', 'opacity', 'latLng'
  ],

  latLng: Ember.computed('lat', 'lng', {
    get() {
      let [lat, lng] = [this.get('lat'), this.get('lng')];
      return this.L.latLng(lat, lng);
    },
    set(key, value) {
      this.setProperties({
        lat: value.lat,
        lng: value.lng
      });
      return value;
    }
  }),

  createLayer() {
    return this.L.marker(this.get('latLng'));
  }
});
