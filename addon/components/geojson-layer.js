import { action } from '@ember/object';
import BaseLayer from './base-layer';
import PopupLayer from './popup-layer';
import TooltipLayer from './tooltip-layer';

/**
 * Represents a GeoJSON object or an array of GeoJSON objects. Allows you to render GeoJSON
 * data and display it on the map.
 *
 * @class GeojsonLayer
 * @extends BaseLayer
 */
export default class GeojsonLayer extends BaseLayer {
  leafletRequiredOptions = [
    ...this.leafletRequiredOptions,

    /**
     * An object in GeoJSON format to display on the map.
     *
     * @argument geoJSON
     * @type {Object}
     */
    'geoJSON'
  ];

  leafletOptions = [
    ...this.leafletOptions,

    /**
     * A Function defining how GeoJSON points spawn Leaflet layers. It is internally called when data is added,
     * passing the GeoJSON point feature and its LatLng.
     *
     * @argument pointToLayer
     * @type {Function}
     */
    'pointToLayer',

    /**
     * A Function defining the Path options for styling GeoJSON lines and polygons, called internally when data is added.
     *
     * @argument style
     * @type {Function}
     */
    'style',

    /**
     * A Function that will be called once for each created Feature, after it has been created and styled. Useful
     * for attaching events and popups to features.
     *
     * @argument onEachFeature
     * @type {Function}
     */
    'onEachFeature',

    /**
     * A Function that will be used to decide whether to include a feature or not.
     *
     * @argument filter
     * @type {Function}
     */
    'filter',

    /**
     * A Function that will be used for converting GeoJSON coordinates to LatLngs.
     * The default is the coordsToLatLng static method.
     *
     * @argument coordsToLatLng
     * @type {Function}
     */
    'coordsToLatLng',

    /**
     * Whether default Markers for `Point` type Features inherit from group options.
     * Defaults to `false`.
     *
     * @argument markersInheritOptions
     * @type {Boolean}
     */
    'markersInheritOptions'
  ];

  leafletEvents = [
    ...this.leafletEvents,

    /**
     * Fired when a layer is added to this FeatureGroup.
     *
     * @argument onLayeradd
     * @type {Function}
     */
    'layeradd',

    /**
     * Fired when a layer is removed from this FeatureGroup.
     *
     * @argument onLayerremove
     * @type {Function}
     */
    'layerremove'
  ];

  leafletDescriptors = [...this.leafletDescriptors, 'style'];

  componentsToYield = [
    ...this.componentsToYield,
    { name: 'popup-layer', as: 'popup', component: PopupLayer },
    { name: 'tooltip-layer', as: 'tooltip', component: TooltipLayer }
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
