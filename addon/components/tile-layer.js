import BaseLayer from 'ember-leaflet/components/base-layer';

/**
 * Used to load and display tile layers on the map. Note that most tile servers require attribution.
 *
 * @class TileLayer
 * @extends BaseLayer
 */
export default class TileLayer extends BaseLayer {
  leafletRequiredOptions = [...this.leafletRequiredOptions, 'url'];

  leafletOptions = [
    ...this.leafletOptions,

    /**
     * The minimum zoom level down to which this layer will be displayed (inclusive).
     * Defaults to `0`.
     *
     * @argument minZoom
     * @type {Number}
     */
    'minZoom',

    /**
     * The maximum zoom level up to which this layer will be displayed (inclusive).
     * Defaults to `18`.
     *
     * @argument maxZoom
     * @type {Number}
     */
    'maxZoom',

    /**
     * Subdomains of the tile service. Can be passed in the form of one string
     * (where each letter is a subdomain name) or an array of strings.
     * Defaults to `'abc'`.
     *
     * @argument subdomains
     * @type {String|String[]}
     */
    'subdomains',

    /**
     * URL to the tile image to show in place of the tile that failed to load.
     * Defaults to `''`.
     *
     * @argument errorTileUrl
     * @type {String}
     */
    'errorTileUrl',

    /**
     * The zoom number used in tile URLs will be offset with this value.
     * Defaults to `0`.
     *
     * @argument zoomOffset
     * @type {Number}
     */
    'zoomOffset',

    /**
     * If true, inverses Y axis numbering for tiles (turn this on for TMS services).
     * Defaults to `false`.
     *
     * @argument tms
     * @type {Boolean}
     */
    'tms',

    /**
     * If set to true, the zoom number used in tile URLs will be reversed (maxZoom - zoom instead of zoom)
     * Defaults to `false`.
     *
     * @argument zoomReverse
     * @type {Boolean}
     */
    'zoomReverse',

    /**
     * If true and user is on a retina display, it will request four tiles of half
     * the specified size and a bigger zoom level in place of one to utilize the high resolution.
     * Defaults to `false`.
     *
     * @argument detectRetina
     * @type {Boolean}
     */
    'detectRetina',

    /**
     * Whether the crossOrigin attribute will be added to the tiles. If a String is provided,
     * all tiles will have their crossOrigin attribute set to the String provided.
     * This is needed if you want to access tile pixel data.
     * Refer to CORS Settings for valid String values.
     * Defaults to `false`.
     *
     * @argument crossOrigin
     * @type {Boolean|String}
     */
    'crossOrigin',

    /**
     * Whether the referrerPolicy attribute will be added to the tiles.
     * If a String is provided, all tiles will have their referrerPolicy attribute set
     * to the String provided. This may be needed if your map's rendering context has a strict
     * default but your tile provider expects a valid referrer (e.g. to validate an API token).
     * Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy)
     * for valid String values.
     * Defaults to `false`.
     *
     * @argument referrerPolicy
     * @type {Boolean|String}
     */
    'referrerPolicy',

    // GridLayer options

    /**
     * Width and height of tiles in the grid. Use a number if width and height are equal,
     * or L.point(width, height) otherwise.
     * Defaults to `256`.
     *
     * @argument tileSize
     * @type {Number|Point}
     */
    'tileSize',

    /**
     * Opacity of the tiles.
     * Defaults to `1.0`.
     *
     * @argument opacity
     * @type {Number}
     */
    'opacity',

    /**
     * Load new tiles only when panning ends. true by default on mobile browsers,
     * in order to avoid too many requests and keep smooth navigation. false otherwise
     * in order to display new tiles during panning, since it is easy to pan outside
     * the keepBuffer option in desktop browsers.
     * Defaults to `(depends)`.
     *
     * @argument updateWhenIdle
     * @type {Boolean}
     */
    'updateWhenIdle',

    /**
     * By default, a smooth zoom animation (during a touch zoom or a flyTo()) will update grid
     * layers every integer zoom level. Setting this option to false will update
     * the grid layer only when the smooth animation ends.
     * Defaults to `true`.
     *
     * @argument updateWhenZooming
     * @type {Boolean}
     */
    'updateWhenZooming',

    /**
     * Tiles will not update more than once every updateInterval milliseconds when panning.
     * Defaults to `200`.
     *
     * @argument updateInterval
     * @type {Number}
     */
    'updateInterval',

    /**
     * The explicit zIndex of the tile layer.
     * Defaults to `1`.
     *
     * @argument zIndex
     * @type {Number}
     */
    'zIndex',

    /**
     * Maximum zoom number the tile source has available. If it is specified, the tiles on all
     * zoom levels higher than maxNativeZoom will be loaded from maxNativeZoom level and auto-scaled.
     * Defaults to `undefined`.
     *
     * @argument maxNativeZoom
     * @type {Number}
     */
    'maxNativeZoom',

    /**
     * Minimum zoom number the tile source has available. If it is specified, the tiles on all zoom
     * levels lower than minNativeZoom will be loaded from minNativeZoom level and auto-scaled.
     * Defaults to `undefined`.
     *
     * @argument minNativeZoom
     * @type {Number}
     */
    'minNativeZoom',

    /**
     * Whether the layer is wrapped around the antimeridian. If true, the GridLayer will only be displayed
     * once at low zoom levels. Has no effect when the map CRS doesn't wrap around. Can be used in combination
     * with bounds to prevent requesting tiles outside the CRS limits.
     * Defaults to `false`.
     *
     * @argument noWrap
     * @type {Boolean}
     */
    'noWrap',

    /**
     * A custom class name to assign to the tile layer. Empty by default.
     * Defaults to `''`.
     *
     * @argument className
     * @type {String}
     */
    'className',

    /**
     * When panning the map, keep this many rows and columns of tiles before unloading them.
     * Defaults to `2`.
     *
     * @argument keepBuffer
     * @type {Number}
     */
    'keepBuffer'
  ];

  leafletEvents = [
    ...this.leafletEvents,

    /**
     * Fired when the grid layer starts loading tiles.
     *
     * @argument onLoading
     * @type {Function}
     */
    'loading',

    /**
     * Fired when a tile is removed (e.g. when a tile goes off the screen).
     *
     * @argument onTileunload
     * @type {Function}
     */
    'tileunload',

    /**
     * Fired when a tile is requested and starts loading.
     *
     * @argument onTileloadstart
     * @type {Function}
     */
    'tileloadstart',

    /**
     * Fired when there is an error loading a tile.
     *
     * @argument onTileerror
     * @type {Function}
     */
    'tileerror',

    /**
     * Fired when a tile loads.
     *
     * @argument onTileload
     * @type {Function}
     */
    'tileload',

    /**
     * Fired when a tile was loading but is now not wanted.
     *
     * @argument onTileabort
     * @type {Function}
     */
    'tileabort',

    /**
     * Fired when the grid layer loaded all visible tiles.
     *
     * @argument onLoad
     * @type {Function}
     */
    'load'
  ];

  leafletDescriptors = [...this.leafletDescriptors, 'url:setUrl:noRedraw', 'zIndex', 'opacity'];

  createLayer() {
    return this.L.tileLayer(...this.requiredOptions, this.options);
  }
}
