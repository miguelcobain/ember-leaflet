import PathLayer from 'ember-leaflet/components/path-layer';


/**
 * A class that extends `PathLayer` with a `@locations` argument.
 * Layers that require multiple points extend this class.
 *
 * @class ArrayPathLayer
 * @extends PathLayer
 */
export default class ArrayPathLayer extends PathLayer {

  /**
   * An array of geographical points.
   *
   * @argument locations
   * @type {LatLng[]}
   */

  leafletRequiredOptions = [...this.leafletRequiredOptions, 'locations'];

  leafletDescriptors = [...this.leafletDescriptors, 'locations:setLatLngs'];
}
