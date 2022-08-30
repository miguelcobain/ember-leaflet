import ImageLayer from 'ember-leaflet/components/image-layer';

/**
 * Used to load and display a video player over specific bounds of the map.
 * A video overlay uses the <video> HTML5 element.
 *
 * @class VideoLayer
 * @extends ImageLayer
 */
export default class VideoLayer extends ImageLayer {
  leafletRequiredOptions = [
    ...this.leafletRequiredOptions,

    /**
     * The URL of the video (or array of URLs, or even a video element) and the geographical bounds it is tied to.
     *
     * @argument video
     * @type {String|Array|HTMLVideoElement}
     */
    'video',

    /**
     * The geographical bounds the video is tied to.
     *
     * @argument bounds
     * @type {LatLngBounds}
     */
    'bounds'
  ];

  leafletOptions = [
    ...this.leafletOptions,

    /**
     * Whether the video starts playing automatically when loaded.
     * Defaults to `true`.
     *
     * @argument autoplay
     * @type {Boolean}
     */
    'autoplay',

    /**
     * Whether the video will loop back to the beginning when played.
     * Defaults to `true`.
     *
     * @argument loop
     * @type {Boolean}
     */
    'loop',

    /**
     * Whether the video will save aspect ratio after the projection.
     * Relevant for supported browsers. See browser compatibility
     * Defaults to `true`.
     *
     * @argument keepAspectRatio
     * @type {Boolean}
     */
    'keepAspectRatio',

    /**
     * Whether the video starts on mute when loaded.
     * Defaults to `false`.
     *
     * @argument muted
     * @type {Boolean}
     */
    'muted',

    /**
     * Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
     * Defaults to `true`.
     *
     * @argument playsInline
     * @type {Boolean}
     */
    'playsInline',

    /**
     * When true, a mouse event on this layer will trigger the same event on the map.
     * Defaults to `true`.
     *
     * @argument bubblingMouseEvents
     * @type {Boolean}
     */
    'bubblingMouseEvents'
  ];

  leafletDescriptors = [...this.leafletDescriptors, 'url', 'opacity', 'bounds'];

  createLayer() {
    return this.L.videoOverlay(...this.requiredOptions, this.options);
  }
}
