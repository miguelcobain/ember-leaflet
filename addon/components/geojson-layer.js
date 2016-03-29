import Ember from 'ember';
import BaseLayer from 'ember-leaflet/components/base-layer';
import StyleMixin from 'ember-leaflet/mixins/style';
/* global L */

/**
 * An ember-leaflet wrapper for L.geoJson, which renders GeoJson data onto a
 * map as features.
 *
 * Takes:
 *   - geoJSON: the GeoJSON object to render
 *   - all standard leaflet options for L.geoJson
 */
export default BaseLayer.extend(StyleMixin, {
  leafletRequiredOptions: ['geoJSON'],

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

  didUpdateAttrs({ newAttrs }) {
    if (newAttrs.geoJSON) {
      this.pushDataToLeaflet(newAttrs.geoJSON.value);
    }
  },

  pushDataToLeaflet(geoJSON) {
    if (!this._layer) {
      return;
    }

    //recall that GeoJSON layers are actually layer groups -- we have to clear
    //their contents first...
    this._layer.clearLayers();

    if (geoJSON) {
      //...then add new data to recreate the child layers in an updated form
      this._layer.addData(geoJSON);
    }
  },

  createLayer() {
    return L.geoJson(...this.get('requiredOptions'), this.get('options'));
  }
});
