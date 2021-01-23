import InteractiveLayer from 'ember-leaflet/components/interactive-layer';

/**
 * An abstract class that contains options and constants shared between vector overlays (Polygon, Polyline, Circle). Do not use it directly.
 *
 * @class PathLayer
 * @extends InteractiveLayer
 */
export default class PathLayer extends InteractiveLayer {
  leafletOptions = [
    ...this.leafletOptions,
    'stroke',
    'color',
    'weight',
    'opacity',
    'lineCap',
    'lineJoin',
    'dashArray',
    'fill',
    'fillColor',
    'fillOpacity',
    'fillRule',
    'clickable',
    'pointerEvents',
    'className'
  ];

  leafletEvents = [...this.leafletEvents, 'add', 'remove', 'popupopen', 'popupclose'];

  leafletStyleProperties = [
    ...this.leafletStyleProperties,

    /**
     * Whether to draw stroke along the path. Set it to false to disable borders
     * on polygons or circles. Defaults to `true`.
     *
     * @argument stroke
     * @type {Boolean}
     */
    'stroke',

    /**
     * Stroke color. Defaults to `'#3388ff'`.
     *
     * @argument color
     * @type {String}
     */
    'color',

    /**
     * Stroke width in pixels. Defaults to `3`.
     *
     * @argument weight
     * @type {Number}
     */
    'weight',

    /**
     * Stroke opacity. Defaults to `1.0`.
     *
     * @argument opacity
     * @type {Number}
     */
    'opacity',

    /**
     * A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap)
     * of the stroke. Defaults to `'round'`.
     *
     * @argument lineCap
     * @type {String}
     */
    'lineCap',

    /**
     * A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin)
     * of the stroke. Defaults to `'round'`.
     *
     * @argument lineJoin
     * @type {String}
     */
    'lineJoin',

    /**
     * A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray).
     * Doesn't work on Canvas-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
     *
     * @argument dashArray
     * @type {String}
     */
    'dashArray',

    /**
     * A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset).
     * Doesn't work on Canvas-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
     *
     * @argument dashOffset
     * @type {String}
     */
    'dashOffset',

    /**
     * Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
     *
     * @argument fill
     * @type {Boolean}
     */
    'fill',

    /**
     * Fill color. Defaults to the value of the color argument.
     *
     * @argument fillColor
     * @type {String}
     */
    'fillColor',

    /**
     * Fill opacity. Defaults to `0.2`.
     *
     * @argument fillOpacity
     * @type {Number}
     */
    'fillOpacity',

    /**
     * A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
     *
     * @argument fillRule
     * @type {String}
     */
    'fillRule',

    /**
     * When true, a mouse event on this path will trigger the same event on the map. Defaults to `true`.
     *
     * @argument bubblingMouseEvents
     * @type {Boolean}
     */
    'bubblingMouseEvents',

    /**
     * Use this specific instance of Renderer for this path. Takes precedence over the map's default renderer.
     *
     * @argument renderer
     * @type {Renderer}
     */
    'renderer',

    /**
     * Custom class name set on an element. Only for SVG renderer.
     *
     * @argument className
     * @type {String}
     */
    'className'
  ];
}
