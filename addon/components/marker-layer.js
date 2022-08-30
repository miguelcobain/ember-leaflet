import InteractiveLayer from 'ember-leaflet/components/interactive-layer';

/**
 * Marker is used to display clickable/draggable icons on the map. Extends InteractiveLayer.
 *
 * @class MarkerLayer
 * @extends InteractiveLayer
 */
export default class MarkerLayer extends InteractiveLayer {
  /**
   * The latitude where the marker will be placed at.
   * You can provide a `@location` instead of `@lat` and `@lng`.
   *
   * @argument lat
   * @type {Number}
   */

  /**
   * The longitude where the marker will be placed at.
   * You can provide a `@location` instead of `@lat` and `@lng`.
   *
   * @argument lng
   * @type {Number}
   */

  leafletRequiredOptions = [
    ...this.leafletRequiredOptions,

    /**
     * A geographical point where the marker will be placed at.
     * This is an alternative to providing `@lat` and `@lng`.
     *
     * @argument location
     * @type {LatLng}
     */
    'location'
  ];

  leafletOptions = [
    ...this.leafletOptions,

    /**
     * Icon instance to use for rendering the marker. See Icon documentation
     * for details on how to customize the marker icon.
     * If not specified, a common instance of L.Icon.Default is used.
     *
     * @argument icon
     * @type {Icon}
     */
    'icon',

    /**
     * Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
     * Defaults to `true`.
     *
     * @argument keyboard
     * @type {Boolean}
     */
    'keyboard',

    /**
     * Text for the browser tooltip that appear on marker hover (no tooltip by default).
     * Defaults to `''`.
     *
     * @argument title
     * @type {String}
     */
    'title',

    /**
     * Text for the alt attribute of the icon image (useful for accessibility).
     * Defaults to `''`.
     *
     * @argument alt
     * @type {String}
     */
    'alt',

    /**
     * By default, marker images zIndex is set automatically based on its latitude.
     * Use this option if you want to put the marker on top of all others (or below),
     * specifying a high value like 1000 (or high negative value, respectively).
     * Defaults to `0`.
     *
     * @argument zIndexOffset
     * @type {Number}
     */
    'zIndexOffset',

    /**
     * The opacity of the marker.
     * Defaults to `1.0`.
     *
     * @argument opacity
     * @type {Number}
     */
    'opacity',

    /**
     * If true, the marker will get on top of others when you hover the mouse over it.
     * Defaults to `false`.
     *
     * @argument riseOnHover
     * @type {Boolean}
     */
    'riseOnHover',

    /**
     * The z-index offset used for the riseOnHover feature.
     * Defaults to `250`.
     *
     * @argument riseOffset
     * @type {Number}
     */
    'riseOffset',

    /**
     * Map pane where the markers icon will be added.
     * Defaults to `'markerPane'`.
     *
     * @argument pane
     * @type {String}
     */
    'pane',

    /**
     * Map pane where the markers icon will be added.
     * Defaults to `'shadowPane'`.
     *
     * @argument shadowPane
     * @type {String}
     */
    'shadowPane',

    /**
     * When `true`, a mouse event on this marker will trigger the same event
     * on the map (unless L.DomEvent.stopPropagation is used).
     * Defaults to `false`.
     *
     * @argument bubblingMouseEvents
     * @type {Boolean}
     */
    'bubblingMouseEvents',

    /**
     * When `true`, the map will pan whenever the marker is focused
     * (via e.g. pressing `tab` on the keyboard) to ensure the marker
     * is visible within the map's bounds.
     * Defaults to `true`.
     *
     * @argument autoPanOnFocus
     * @type {Boolean}
     */
    'autoPanOnFocus',

    // Draggable marker options

    /**
     * Whether the marker is draggable with mouse/touch or not.
     * Defaults to `false`.
     *
     * @argument draggable
     * @type {Boolean}
     */
    'draggable',

    /**
     * Whether to pan the map when dragging this marker near its edge or not.
     * Defaults to `false`.
     *
     * @argument autoPan
     * @type {Boolean}
     */
    'autoPan',

    /**
     * Distance (in pixels to the left/right and to the top/bottom) of the map edge to start panning the map.
     * Defaults to `Point(50, 50)`.
     *
     * @argument autoPan
     * @type {Point}
     */
    'autoPanPadding',

    /**
     * Number of pixels the map should pan by.
     * Defaults to `10`.
     *
     * @argument autoPanSpeed
     * @type {Number}
     */
    'autoPanSpeed'
  ];

  leafletEvents = [
    ...this.leafletEvents,

    /**
     * Fired when the marker is moved via setLatLng or by dragging.
     * Old and new coordinates are included in event arguments as oldLatLng, latlng.
     *
     * @argument onMove
     * @type {Function}
     */
    'move',

    /**
     * Fired when the user starts dragging the marker.
     *
     * @argument onDragstart
     * @type {Function}
     */
    'dragstart',

    /**
     * Fired when the marker starts moving (because of dragging).
     *
     * @argument onMovestart
     * @type {Function}
     */
    'movestart',

    /**
     * Fired repeatedly while the user drags the marker.
     *
     * @argument onDrag
     * @type {Function}
     */
    'drag',

    /**
     * Fired when the user stops dragging the marker.
     *
     * @argument onDragend
     * @type {Function}
     */
    'dragend',

    /**
     * Fired when the marker stops moving (because of dragging).
     *
     * @argument onMoveend
     * @type {Function}
     */
    'moveend'
  ];

  leafletDescriptors = [
    ...this.leafletDescriptors,
    'zIndexOffset',
    'opacity',
    'location:setLatLng',
    {
      arg: 'draggable',
      updateFn(layer, value) {
        if (value) {
          layer.dragging.enable();
        } else {
          layer.dragging.disable();
        }
      }
    },
    {
      arg: 'icon',
      // there was an old leaflet bug where draggability is lost on icon change
      updateFn(layer, value) {
        let enabled = layer.dragging.enabled();
        layer.setIcon(value);

        if (enabled) {
          layer.dragging.enable();
        } else {
          layer.dragging.disable();
        }
      }
    }
  ];

  get location() {
    if (this.args.location) {
      return this.args.location;
    } else if (!this.fastboot?.isFastBoot) {
      let [lat, lng] = [this.args.lat, this.args.lng];
      return this.L.latLng(lat, lng);
    }

    return null;
  }

  createLayer() {
    return this.L.marker(...this.requiredOptions, this.options);
  }
}
