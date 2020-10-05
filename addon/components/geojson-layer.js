import { action } from '@ember/object';
import BaseLayer from 'ember-leaflet/components/base-layer';

/**
 * @public
 * An ember-leaflet wrapper for L.geoJson, which renders GeoJson data onto a
 * map as features.
 *
 * Takes:
 *   - geoJSON: the GeoJSON object to render
 *   - all standard leaflet options for L.geoJson
 */
export default class GeojsonLayer extends BaseLayer {
  leafletRequiredOptions = [...this.leafletRequiredOptions, 'geoJSON'];

  leafletOptions = [
    ...this.leafletOptions,
    'stroke',
    'color',
    'weight',
    'opacity',
    'fill',
    'fillColor',
    'fillOpacity',
    'fillRule',
    'dashArray',
    'lineCap',
    'lineJoin',
    'clickable',
    'pointerEvents',
    'className',
    'pointToLayer',
    'style',
    'onEachFeature',
    'filter',
    'coordsToLatLng'
  ];

  leafletEvents = [
    ...this.leafletEvents,
    'click',
    'dblclick',
    'mousedown',
    'mouseover',
    'mouseout',
    'contextmenu',
    'add',
    'remove',
    'popupopen',
    'popupclose'
  ];

  leafletDescriptors = [...this.leafletDescriptors, 'style'];

  leafletStyleProperties = [
    ...this.leafletStyleProperties,
    'stroke',
    'color',
    'weight',
    'opacity',
    'fill',
    'fillColor',
    'fillOpacity',
    'fillRule',
    'dashArray',
    'lineCap',
    'lineJoin',
    'clickable',
    'pointerEvents',
    'className'
  ];

  @action
  didChangeGeojson(geoJSON) {
    if (geoJSON) {
      this.pushDataToLeaflet(geoJSON);
    }
  }

  pushDataToLeaflet(geoJSON) {
    if (!this._layer) {
      return;
    }

    // recall that GeoJSON layers are actually layer groups -- we have to clear
    // their contents first...
    this._layer.clearLayers();

    // we need to update the group layers options before re-adding geojson
    // otherwise, they wouldn't get the changes that could be happening meanwhile
    this._layer.options = this.options;

    if (geoJSON) {
      // ...then add new data to recreate the child layers in an updated form
      this._layer.addData(geoJSON);
    }
  }

  createLayer() {
    return this.L.geoJson(...this.requiredOptions, this.options);
  }
}
