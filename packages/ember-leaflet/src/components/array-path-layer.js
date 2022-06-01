import PathLayer from 'ember-leaflet/components/path-layer';

/**
 * A class that extends `PathLayer` with a `@locations` argument.
 * Layers that require multiple points extend this class.
 *
 * @class ArrayPathLayer
 * @extends ember-leaflet/components/path-layer~PathLayer
 */
export default class ArrayPathLayer extends PathLayer {
  leafletRequiredOptions = [
    ...this.leafletRequiredOptions,

    /**
     * An array of geographical points.
     *
     * @argument locations
     * @type {LatLng[]}
     */
    'locations'
  ];

  leafletDescriptors = [...this.leafletDescriptors, 'locations:setLatLngs'];
}
