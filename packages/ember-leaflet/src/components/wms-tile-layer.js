import TileLayer from 'ember-leaflet/components/tile-layer';

/**
 * Used to display WMS services as tile layers on the map.
 *
 * @class WmsTileLayer
 * @extends TileLayer
 */
export default class WmsTileLayer extends TileLayer {
  leafletOptions = [
    ...this.leafletOptions,

    /**
     * (required) Comma-separated list of WMS layers to show.
     * Defaults to `''`.
     *
     * @argument layers
     * @type {String}
     */
    'layers',

    /**
     * Comma-separated list of WMS styles.
     * Defaults to `''`.
     *
     * @argument styles
     * @type {String}
     */
    'styles',

    /**
     * WMS image format (use 'image/png' for layers with transparency).
     * Defaults to `'image/jpeg'`.
     *
     * @argument format
     * @type {String}
     */
    'format',

    /**
     * If true, the WMS service will return images with transparency.
     * Defaults to `false`.
     *
     * @argument transparent
     * @type {Boolean}
     */
    'transparent',

    /**
     * Version of the WMS service to use
     * Defaults to `'1.1.1'`.
     *
     * @argument version
     * @type {String}
     */
    'version',

    /**
     * Coordinate Reference System to use for the WMS requests,
     * defaults to map CRS. Don't change this if you're not sure what it means.
     * Defaults to `null`.
     *
     * @argument crs
     * @type {CRS}
     */
    'crs',

    /**
     * If true, WMS request parameter keys will be uppercase.
     * Defaults to `false`.
     *
     * @argument uppercase
     * @type {Boolean}
     */
    'uppercase'
  ];

  createLayer() {
    return this.L.tileLayer.wms(...this.requiredOptions, this.options);
  }
}
