import Ember from 'ember';
import BaseLayer from './base-layer';
import DraggabilityMixin from 'ember-leaflet/mixins/draggability';
import PopupMixin from 'ember-leaflet/mixins/popup';
import layout from '../templates/components/marker-layer';

export default BaseLayer.extend(DraggabilityMixin, PopupMixin, {
  layout,

  leafletRequiredOptions: [
    'location'
  ],

  leafletOptions: [
    'icon', 'clickable', 'draggable', 'keyboard', 'title',
    'alt', 'zIndexOffset', 'opacity', 'riseOnHover', 'riseOffset'
  ],

  leafletEvents: [
    'click', 'dblclick', 'mousedown', 'mouseover', 'mouseout',
    'contextmenu', 'dragstart', 'drag', 'dragend', 'move', 'remove',
    'popupopen', 'popupclose'
  ],

  leafletProperties: [
    'icon', 'zIndexOffset', 'opacity', 'location:setLatLng'
  ],

  location: Ember.computed('lat', 'lng', {
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
    return this.L.marker(...this.get('requiredOptions'), this.get('options'));
  }
});
