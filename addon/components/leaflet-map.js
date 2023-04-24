import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';
import BaseLayer from 'ember-leaflet/components/base-layer';
import { action } from '@ember/object';

import TileLayer from './tile-layer';
import WmsTileLayer from './wms-tile-layer';
import MarkerLayer from './marker-layer';
import CircleLayer from './circle-layer';
import CircleMarkerLayer from './circle-marker-layer';
import ImageLayer from './image-layer';
import VideoLayer from './video-layer';
import PolylineLayer from './polyline-layer';
import PolygonLayer from './polygon-layer';
import GeojsonLayer from './geojson-layer';
import RectangleLayer from './rectangle-layer';

/**
 * The central class of ember-leaflet — it is used to create a map on a page and manipulate it.
 *
 * @class LeafletMap
 * @extends BaseLayer
 *
 * @yield {TileLayer} tile-layer
 * @yield {WmsTileLayer} wms-tile-layer
 * @yield {MarkerLayer} marker-layer
 * @yield {CircleLayer} circle-layer
 * @yield {CircleMarkerLayer} circle-marker-layer
 * @yield {ImageLayer} image-layer
 * @yield {VideoLayer} video-layer
 * @yield {PolylineLayer} polyline-layer
 * @yield {PolygonLayer} polygon-layer
 * @yield {GeojsonLayer} geojson-layer
 * @yield {RectangleLayer} rectangle-layer
 */
export default class LeafletMap extends BaseLayer {
  @service emberLeaflet;

  @action
  mergeComponents(obj) {
    if (!this.mergedComponents) {
      this.mergedComponents = obj;
    } else {
      Object.assign(this.mergedComponents, obj);
    }
  }

  leafletOptions = [
    ...this.leafletOptions,
    // Map state options

    /**
     * Initial geographic center of the map
     *
     * @argument center
     * @type {LatLng}
     */
    'center',

    /**
     * Initial map zoom level
     *
     * @argument zoom
     * @type {Number}
     */
    'zoom',

    /**
     * Minimum zoom level of the map.
     *
     * @argument minZoom
     * @type {Number}
     */
    'minZoom',

    /**
     * Maximum zoom level of the map.
     *
     * @argument maxZoom
     * @type {Number}
     */
    'maxZoom',

    /**
     * When this option is set, the map restricts the view to the given geographical bounds,
     * ouncing the user back if the user tries to pan outside the view.
     *
     * @argument maxBounds
     * @type {LatLngBounds}
     */
    'maxBounds',

    /**
     * The Coordinate Reference System to use. Don't change this if you're not sure what it means.
     *
     * @argument crs
     * @type {CRS}
     */
    'crs',

    // Interaction options

    /**
     * Set it to false if you don't want popups to close when user clicks the map.
     * Defaults to `true`.
     *
     * @argument closePopupOnClick
     * @type {Boolean}
     */
    'closePopupOnClick',

    /**
     * Forces the map's zoom level to always be a multiple of this.
     * By default, the zoom level snaps to the nearest integer;
     * lower values (e.g. 0.5 or 0.1) allow for greater granularity.
     * A value of 0 means the zoom level will not be snapped.
     * Defaults to `1`.
     *
     * @argument zoomSnap
     * @type {Number}
     */
    'zoomSnap',

    /**
     * Controls how much the map's zoom level will change after a zoomIn(), zoomOut(),
     * pressing + or - on the keyboard, or using the zoom controls.
     * Values smaller than 1 (e.g. 0.5) allow for greater granularity.
     * Defaults to `1`.
     *
     * @argument zoomDelta
     * @type {Number}
     */
    'zoomDelta',

    /**
     * Whether the map automatically handles browser window resize to update itself.
     * Defaults to `true`.
     *
     * @argument trackResize
     * @type {Boolean}
     */
    'trackResize',

    /**
     * Whether the map can be zoomed to a rectangular area specified by dragging
     * the mouse while pressing the shift key.
     * Defaults to `true`.
     *
     * @argument trackResize
     * @type {Boolean}
     */
    'boxZoom',

    /**
     * Whether the map can be zoomed in by double clicking on it and zoomed out
     * by double clicking while holding shift. If passed 'center', double-click zoom
     * will zoom to the center of the view regardless of where the mouse was.
     * Defaults to `true`.
     *
     * @argument doubleClickZoom
     * @type {Boolean|String}
     */
    'doubleClickZoom',

    /**
     * Whether the map be draggable with mouse/touch or not.
     * Defaults to `true`.
     *
     * @argument dragging
     * @type {Boolean}
     */
    'dragging',

    // Touch interaction options

    /**
     * Enables mobile hacks for supporting instant taps (fixing 200ms click delay
     * on iOS/Android) and touch holds (fired as contextmenu events).
     * Defaults to `true`.
     *
     * @argument tap
     * @type {Boolean}
     */
    'tap',

    /**
     * The max number of pixels a user can shift his finger during touch for it to be
     * considered a valid tap.
     * Defaults to `15`.
     *
     * @argument tapTolerance
     * @type {Number}
     */
    'tapTolerance',

    /**
     * Whether the map be draggable with mouse/touch or not.
     * Defaults to `*`.
     *
     * @argument touchZoom
     * @type {Boolean|String}
     */
    'touchZoom',

    /**
     * Set it to false if you don't want the map to zoom beyond min/max zoom
     * and then bounce back when pinch-zooming.
     * Defaults to `true`.
     *
     * @argument bounceAtZoomLimits
     * @type {Boolean}
     */
    'bounceAtZoomLimits',

    // Mouse wheel options

    /**
     * Whether the map can be zoomed by using the mouse wheel. If passed 'center',
     * it will zoom to the center of the view regardless of where the mouse was.
     * Defaults to `true`.
     *
     * @argument scrollWheelZoom
     * @type {Boolean|String}
     */
    'scrollWheelZoom',

    /**
     * Limits the rate at which a wheel can fire (in milliseconds).
     * By default user can't zoom via wheel more often than once per 40 ms.
     * Defaults to `40`.
     *
     * @argument wheelDebounceTime
     * @type {Number}
     */
    'wheelDebounceTime',

    /**
     * How many scroll pixels mean a change of one full zoom level.
     * Smaller values will make wheel-zooming faster (and vice versa).
     * Defaults to `60`.
     *
     * @argument wheelPxPerZoomLevel
     * @type {Number}
     */
    'wheelPxPerZoomLevel',

    // Keyboard navigation options

    /**
     * Makes the map focusable and allows users to navigate the map with keyboard arrows and +/- keys.
     * Defaults to `true`.
     *
     * @argument keyboard
     * @type {Boolean}
     */
    'keyboard',

    /**
     * Amount of pixels to pan when pressing an arrow key.
     * Defaults to `80`.
     *
     * @argument keyboardPanDelta
     * @type {Number}
     */
    'keyboardPanDelta',

    // Panning Inertia Options

    /**
     * If enabled, panning of the map will have an inertia effect where
     * the map builds momentum while dragging and continues moving in the
     * same direction for some time. Feels especially nice on touch devices.
     * Enabled by default unless running on old Android devices.
     * Defaults to `*`.
     *
     * @argument inertia
     * @type {Boolean}
     */
    'inertia',

    /**
     * The rate with which the inertial movement slows down, in pixels/second².
     * Defaults to `3000`.
     *
     * @argument inertiaDeceleration
     * @type {Number}
     */
    'inertiaDeceleration',

    /**
     * Max speed of the inertial movement, in pixels/second.
     * Defaults to `Infinity`.
     *
     * @argument inertiaMaxSpeed
     * @type {Number}
     */
    'inertiaMaxSpeed',

    /**
     * Defaults to `0.2`.
     *
     * @argument easeLinearity
     * @type {Number}
     */
    'easeLinearity',

    /**
     * With this option enabled, the map tracks when you pan to another "copy"
     * of the world and seamlessly jumps to the original one so that all overlays
     * like markers and vector layers are still visible.
     * Defaults to `false`.
     *
     * @argument worldCopyJump
     * @type {Boolean}
     */
    'worldCopyJump',

    /**
     * If maxBounds is set, this option will control how solid the bounds are when
     * dragging the map around. The default value of 0.0 allows the user to drag outside
     * the bounds at normal speed, higher values will slow down map dragging outside bounds,
     * and 1.0 makes the bounds fully solid, preventing the user from dragging outside the bounds.
     * Defaults to `0.0`.
     *
     * @argument maxBoundsViscosity
     * @type {Number}
     */
    'maxBoundsViscosity',

    // Control options

    /**
     * Whether a attribution control is added to the map by default.
     * Defaults to `true`.
     *
     * @argument attributionControl
     * @type {Boolean}
     */
    'attributionControl',

    /**
     * Whether a zoom control is added to the map by default.
     * Defaults to `true`.
     *
     * @argument zoomControl
     * @type {Boolean}
     */
    'zoomControl',

    // Animation options

    /**
     * Whether the map zoom animation is enabled. By default it's
     * enabled in all browsers that support CSS3 Transitions except Android.
     * Defaults to `true`.
     *
     * @argument zoomAnimation
     * @type {Boolean}
     */
    'zoomAnimation',

    /**
     * Won't animate zoom if the zoom difference exceeds this value.
     * Defaults to `4`.
     *
     * @argument zoomAnimationThreshold
     * @type {Number}
     */
    'zoomAnimationThreshold',

    /**
     * Whether the tile fade animation is enabled. By default it's
     * enabled in all browsers that support CSS3 Transitions except Android.
     * Defaults to `true`.
     *
     * @argument fadeAnimation
     * @type {Boolean}
     */
    'fadeAnimation',

    /**
     * Whether markers animate their zoom with the zoom animation, if disabled they will
     * disappear for the length of the animation. By default it's enabled in all
     * browsers that support CSS3 Transitions except Android.
     * Defaults to `true`.
     *
     * @argument markerZoomAnimation
     * @type {Boolean}
     */
    'markerZoomAnimation',

    /**
     * Defines the maximum size of a CSS translation transform.
     * The default value should not be changed unless a web browser positions
     * layers in the wrong place after doing a large panBy.
     * Defaults to `2^23`.
     *
     * @argument transform3DLimit
     * @type {Boolean}
     */
    'transform3DLimit'
  ];

  // Events this map can respond to.
  leafletEvents = [
    ...this.leafletEvents,

    // Layer events

    /**
     * Fired when the base layer is changed through the layers control.
     *
     * @argument onBaselayerchange
     * @type {Function}
     */
    'baselayerchange',

    /**
     * Fired when an overlay is selected through the layers control.
     *
     * @argument onOverlayadd
     * @type {Function}
     */
    'overlayadd',

    /**
     * Fired when an overlay is deselected through the layers control.
     *
     * @argument onOverlayremove
     * @type {Function}
     */
    'overlayremove',

    /**
     * Fired when a new layer is added to the map.
     *
     * @argument onLayeradd
     * @type {Function}
     */
    'layeradd',

    /**
     * Fired when some layer is removed from the map
     *
     * @argument onLayerremove
     * @type {Function}
     */
    'layerremove',

    // Map state change events

    /**
     * Fired when the number of zoomlevels on the map is changed due to adding or removing a layer.
     *
     * @argument onZoomlevelschange
     * @type {Function}
     */
    'zoomlevelschange',

    /**
     * Fired when the map is resized.
     *
     * @argument onResize
     * @type {Function}
     */
    'resize',

    /**
     * Fired when the map is destroyed with remove method.
     *
     * @argument onUnload
     * @type {Function}
     */
    'unload',

    /**
     * Fired when the map needs to redraw its content
     * (this usually happens on map zoom or load).
     * Very useful for creating custom overlays.
     *
     * @argument onViewreset
     * @type {Function}
     */
    'viewreset',

    /**
     * Fired when the map is initialized (when its center and zoom are set for the first time).
     *
     * @argument onLoad
     * @type {Function}
     */
    'load',

    /**
     * Fired when the map zoom is about to change (e.g. before zoom animation).
     *
     * @argument onZoomstart
     * @type {Function}
     */
    'zoomstart',

    /**
     * Fired when the view of the map starts changing (e.g. user starts dragging the map).
     *
     * @argument onMovestart
     * @type {Function}
     */
    'movestart',

    /**
     * Fired repeatedly during any change in zoom level, including zoom and fly animations.
     *
     * @argument onZoom
     * @type {Function}
     */
    'zoom',

    /**
     * Fired repeatedly during any movement of the map, including pan and fly animations.
     *
     * @argument onMove
     * @type {Function}
     */
    'move',

    /**
     * Fired when the map has changed, after any animations.
     *
     * @argument onZoomend
     * @type {Function}
     */
    'zoomend',

    /**
     * Fired when the center of the map stops changing
     * (e.g. user stopped dragging the map).
     *
     * @argument onMoveend
     * @type {Function}
     */
    'moveend',

    // Popup events

    /**
     * Fired when the map starts autopanning when opening a popup.
     *
     * @argument onAutopanstart
     * @type {Function}
     */
    'autopanstart',

    // Location events

    /**
     * Fired when geolocation (using the locate method) failed.
     *
     * @argument onLocationerror
     * @type {Function}
     */
    'locationerror',

    /**
     * Fired when geolocation (using the locate method) went successfully.
     *
     * @argument onLocationfound
     * @type {Function}
     */
    'locationfound',

    // Interaction events

    /**
     * Fired when the user clicks (or taps) the map.
     *
     * @argument onClick
     * @type {Function}
     */
    'click',

    /**
     * Fired when the user double-clicks (or double-taps) the map.
     *
     * @argument onDblclick
     * @type {Function}
     */
    'dblclick',

    /**
     * Fired when the user pushes the mouse button on the map.
     *
     * @argument onMousedown
     * @type {Function}
     */
    'mousedown',

    /**
     * Fired when the user releases the mouse button on the map.
     *
     * @argument onMouseup
     * @type {Function}
     */
    'mouseup',

    /**
     * Fired when the mouse enters the map.
     *
     * @argument onMouseover
     * @type {Function}
     */
    'mouseover',

    /**
     * Fired when the mouse leaves the map.
     *
     * @argument onMouseout
     * @type {Function}
     */
    'mouseout',

    /**
     * Fired while the mouse moves over the map.
     *
     * @argument onMousemove
     * @type {Function}
     */
    'mousemove',

    /**
     * Fired when the user pushes the right mouse button on the map,
     * prevents default browser context menu from showing if there are
     * listeners on this event. Also fired on mobile when the user holds
     * a single touch for a second (also called long press).
     *
     * @argument onContextmenu
     * @type {Function}
     */
    'contextmenu',

    /**
     * Fired when the user presses a key from the keyboard that produces
     * a character value while the map is focused.
     *
     * @argument onKeypress
     * @type {Function}
     */
    'keypress',

    /**
     * Fired when the user presses a key from the keyboard while the map is focused.
     * Unlike the keypress event, the keydown event is fired for keys that produce
     * a character value and for keys that do not produce a character value.
     *
     * @argument onKeydown
     * @type {Function}
     */
    'keydown',

    /**
     * Fired when the user releases a key from the keyboard while the map is focused.
     *
     * @argument onKeyup
     * @type {Function}
     */
    'keyup',

    /**
     * Fired before mouse click on the map (sometimes useful when you want something to happen on click before any existing click handlers start running).
     *
     * @argument onPreclick
     * @type {Function}
     */
    'preclick',

    // Other events

    /**
     * Fired at least once per zoom animation. For continuous zoom, like pinch zooming,
     * fired once per frame during zoom.
     *
     * @argument onZoomanim
     * @type {Function}
     */
    'zoomanim'
  ];

  leafletDescriptors = [
    ...this.leafletDescriptors,
    'zoom:setZoom:zoomPanOptions',
    'minZoom',
    'maxZoom',
    'center:panTo:zoomPanOptions',
    'bounds:fitBounds:fitBoundsOptions',
    'maxBounds'
  ];

  componentsToYield = [
    ...this.componentsToYield,
    ...this.emberLeaflet.components,
    { name: 'tile-layer', as: 'tile', component: TileLayer },
    { name: 'wms-tile-layer', as: 'wms-tile', component: WmsTileLayer },
    { name: 'marker-layer', as: 'marker', component: MarkerLayer },
    { name: 'circle-layer', as: 'circle', component: CircleLayer },
    { name: 'circle-marker-layer', as: 'circle-marker', component: CircleMarkerLayer },
    { name: 'image-layer', as: 'image', component: ImageLayer },
    { name: 'video-layer', as: 'video', component: VideoLayer },
    { name: 'polyline-layer', as: 'polyline', component: PolylineLayer },
    { name: 'polygon-layer', as: 'polygon', component: PolygonLayer },
    { name: 'geojson-layer', as: 'geojson', component: GeojsonLayer },
    { name: 'rectangle-layer', as: 'rectangle', component: RectangleLayer }
  ];

  // required to supress glimmer component error message for acessing bounds property
  bounds = undefined;

  get center() {
    if (this.args.center) {
      return this.args.center;
    } else if (!this.fastboot?.isFastBoot) {
      let [lat, lng] = [this.args.lat, this.args.lng];
      return this.L.latLng(lat, lng);
    }

    return null;
  }

  // By default all layers try to register in a container layer.
  // It is not the case of the map itself as it is the topmost container.
  registerWithParent() {}
  unregisterWithParent() {}

  createLayer(element) {
    let options = this.options;

    // Don't set center and zoom right now.
    // Let base layer bind the events first
    delete options.center;
    delete options.zoom;
    return this.L.map(element, options);
  }

  // Manually call `remove` method in the case of the root map layer.
  @action
  willDestroyParent() {
    let layer = this._layer;
    super.willDestroyParent(...arguments);
    layer.remove();
  }

  didCreateLayer() {
    // after base layer bound the events, we can now set the map's view
    assert(
      'You must provide either valid `bounds` or a `center` (or `lat`/`lng`) and a `zoom` value.',
      (this.args.bounds && !this.center && this.args.zoom === undefined) ||
        (!this.args.bounds && this.center && this.args.zoom !== undefined)
    );
    if (this.args.bounds) {
      this._layer.fitBounds(this.args.bounds, Object.assign({ reset: true }, this.args.fitBoundsOptions));
    } else {
      this._layer.setView(this.center, this.args.zoom, Object.assign({ reset: true }, this.args.zoomPanOptions));
    }
  }
}
