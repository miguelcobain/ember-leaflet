import InteractiveLayer from 'ember-leaflet/components/interactive-layer';

/**
 * Used to load and display a single image over specific bounds of the map.
 *
 * @class ImageLayer
 * @extends InteractiveLayer
 */
export default class ImageLayer extends InteractiveLayer {
  leafletRequiredOptions = [
    ...this.leafletRequiredOptions,

    /**
     * The URL of the image
     *
     * @argument url
     * @type {String}
     */
    'url',

    /**
     * The geographical bounds the image is tied to.
     *
     * @argument bounds
     * @type {LatLngBounds}
     */
    'bounds'
  ];

  leafletOptions = [
    ...this.leafletOptions,

    /**
     * The opacity of the image overlay. Defaults to `1.0`.
     *
     * @argument opacity
     * @type {Number}
     */
    'opacity',

    /**
     * Text for the alt attribute of the image (useful for accessibility).
     *
     * @argument alt
     * @type {String}
     */
    'alt',

    /**
     * If `true`, the image overlay will emit mouse events when clicked or hovered.
     * Defaults to `false`.
     *
     * @argument interactive
     * @type {Boolean}
     */
    'interactive',

    /**
     * Whether the crossOrigin attribute will be added to the image. If a String is provided, the image
     * will have its crossOrigin attribute set to the String provided. This is needed if you want to access
     * image pixel data. Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes)
     * for valid String values. Defaults to `false`.
     *
     * @argument crossOrigin
     * @type {Boolean|String}
     */
    'crossOrigin',

    /**
     * URL to the overlay image to show in place of the overlay that failed to load.
     *
     * @argument errorOverlayUrl
     * @type {String}
     */
    'errorOverlayUrl',

    /**
     * The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
     * Defaults to `1`.
     *
     * @argument zIndex
     * @type {Number}
     */
    'zIndex',

    /**
     * A custom class name to assign to the image. Empty by default.
     *
     * @argument className
     * @type {String}
     */
    'className'
  ];

  leafletDescriptors = [...this.leafletDescriptors, 'url', 'opacity', 'bounds'];

  leafletEvents = [
    ...this.leafletEvents,

    /**
     * Fired when the ImageOverlay layer has loaded its image
     *
     * @argument onLoad
     * @type {Function}
     */
    'load',

    /**
     * Fired when the ImageOverlay layer fails to load its image
     *
     * @argument onError
     * @type {Function}
     */
    'error'
  ];

  createLayer() {
    return this.L.imageOverlay(...this.requiredOptions, this.options);
  }
}
