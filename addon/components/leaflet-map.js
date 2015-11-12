import ContainerLayer from 'ember-leaflet/components/container-layer';
import toLatLng from 'ember-leaflet/macros/to-lat-lng';

export default ContainerLayer.extend({
  tagName: 'div',

  leafletOptions: [
    // Map state options
    'center', 'zoom', 'minZoom', 'maxZoom', 'maxBounds', 'crs',
    // Interaction options
    'dragging', 'touchZoom', 'scrollWheelZoom', 'doubleClickZoom', 'boxZoom',
    'tap', 'tapTolerance', 'trackResize', 'worldCopyJump', 'closePopupOnClick',
    'bounceAtZoomLimits',
    // Keyboard navigation options
    'keyboard', 'keyboardPanOffset', 'keyboardZoomOffset',
    // Panning Inertia Options
    'inertia', 'inertiaDeceleration', 'inertiaMaxSpeed', 'inertiaThreshold',
    // Control options
    'zoomControl', 'attributionControl',
    // Animation options
    'fadeAnimation', 'zoomAnimation', 'zoomAnimationThreshold', 'markerZoomAnimation'
  ],

  // Events this map can respond to.
  leafletEvents: [
    'click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout',
    'mousemove', 'contextmenu', 'focus', 'blur', 'preclick', 'load',
    'unload', 'viewreset', 'movestart', 'move', 'moveend', 'dragstart',
    'drag', 'dragend', 'zoomstart', 'zoomend', 'zoomlevelschange',
    'resize', 'autopanstart', 'layeradd', 'layerremove',
    'baselayerchange', 'overlayadd', 'overlayremove', 'locationfound',
    'locationerror', 'popupopen', 'popupclose'
  ],

  leafletProperties: [
    'zoom:setZoom', 'center:panTo'
  ],

  center: toLatLng(),

  // Since no parent container layer is controling the rendering flow,
  // we need to implement render hooks and call `layerSetup` and `layerTeardown` ourselves.
  //
  // This is the only case where it happens, because this is a real DOM element,
  // and its rendering flow reverts back to Ember way.
  containerLayer: null,

  didInsertElement() {
    this._super(...arguments);
    this.layerSetup();
    this.get('_childLayers').invoke('layerSetup');
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('_childLayers').invoke('layerTeardown');
    this.get('_childLayers').clear();
    this.layerTeardown();
  },

  // By default all layers try to register in a container layer.
  // It is not the case of the map itself as it is the topmost container.
  registerWithParent() { },
  unregisterWithParent() { },

  createLayer() {
    return this.L.map(this.element, this.get('options'));
  }
});
