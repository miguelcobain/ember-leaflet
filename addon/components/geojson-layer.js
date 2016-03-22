import Ember from 'ember';
import BaseLayer from 'ember-leaflet/components/base-layer';
import PathLayer from 'ember-leaflet/components/path-layer';
/* global L */

/**
 * An ember-leaflet wrapper for L.geoJson, which renders GeoJson data onto a
 * map as features.
 *
 * Takes:
 *   - geoJSON: the GeoJSON object to render
 *   - all standard leaflet options for L.geoJson
 */
export default BaseLayer.extend({
  leafletOptions: [
    'stroke', 'color', 'weight', 'opacity', 'fill', 'fillColor',
    'fillOpacity', 'fillRule', 'dashArray', 'lineCap', 'lineJoin',
    'clickable', 'pointerEvents', 'className', 'pointToLayer',
    'style', 'onEachFeature', 'filter', 'coordsToLatLng'
  ],

  leafletEvents: [
    'click', 'dblclick', 'mousedown', 'mouseover', 'mouseout',
    'contextmenu', 'add', 'remove', 'popupopen', 'popupclose'
  ],

  geoJSON: null,
  _lastPushedToLeaflet: null,

  didReceiveAttrs() {
    const currentGeoJSON = this.get('geoJSON');
    if (currentGeoJSON !== this.get('_lastPushedToLeaflet')) {
      this.pushDataToLeaflet(currentGeoJSON);
    }
  },

  pushDataToLeaflet(geoJSON) {
    if (!this._layer) {
      return;
    }

    this.set('_lastPushedToLeaflet', geoJSON);

    //recall that GeoJSON layers are actually layer groups -- we have to clear
    //their contents first...
    this._layer.clearLayers();

    if (!geoJSON) {
      //(can't add new data if we don't have anything to add)
      return;
    }
    //...then add new data to recreate the child layers in an updated form
    this._layer.addData(geoJSON);
  },

  createLayer() {
    return L.geoJson(null, this.get('options'));
  },

  didCreateLayer() {
    this._super(...arguments);
    this.pushDataToLeaflet(this.get('geoJSON'));
  }
});
