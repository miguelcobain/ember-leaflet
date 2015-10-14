import Ember from 'ember';
import BaseLayer from './base-layer';

export default BaseLayer.extend({
  tagName: 'div',

  // Events this map can respond to.
  leafletEvents: [
    'click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout',
    'mousemove', 'contextmenu', 'focus', 'blur', 'preclick', 'load',
    'unload', 'viewreset', 'movestart', 'move', 'moveend', 'dragstart',
    'drag', 'dragend', 'zoomstart', 'zoomend', 'zoomlevelschange',
    'resize', 'autopanstart', 'layeradd', 'layerremove',
    'baselayerchange', 'overlayadd', 'overlayremove', 'locationfound',
    'locationerror', 'popupopen', 'popupclose'
  ],

  leafletProperties: [
    'zoom'
  ],

  center: Ember.computed('lat', 'lng', {
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

  //override because the base map needs to be rendered
  //before everything else and not on afterRender
  didInsertElement() {
    this._layer = this.createLayer();
    this._addObservers();
    this._addEventListeners();
  },

  createLayer() {
    return this.L.map(this.element, {
      center: this.get('center'),
      zoom: this.get('zoom')
    });
  },

  /**
   * Leaflet events. Used to sync properties with emberland.
   */
  zoomstart() {
    this.set('isZooming', true);
  },

  zoomend() {
    this.setProperties({isZooming: false, zoom: this._layer.getZoom()});
    // if two zooms are called at once, a zoom could get queued. So
    // set zoom to the queued one if relevant.
    if(this._queuedZoom) {
      if(this._queuedZoom !== this._layer.getZoom()) {
        this._layer.setZoom(this._queuedZoom); }
      this._queuedZoom = null;
    }
  },

  movestart() {
    this.set('isMoving', true);
  },

  moveend() {
    this.set('isMoving', false);
  },

  move() {
    this.set('center', this._layer.getCenter());
  }
});
