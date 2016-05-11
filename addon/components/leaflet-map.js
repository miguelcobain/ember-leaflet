import Ember from 'ember';
import BaseLayer from 'ember-leaflet/components/base-layer';
import ContainerMixin from 'ember-leaflet/mixins/container';
import toLatLng from 'ember-leaflet/macros/to-lat-lng';
import layout from '../templates/leaflet-map';
const { assert } = Ember;
const assign = Ember.assign || Ember.merge;

export default BaseLayer.extend(ContainerMixin, {
  tagName: 'div',
  layout,

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
    'zoom:setZoom', 'center:panTo:zoomPanOptions', 'maxBounds:setMaxBounds', 'bounds:fitBounds:fitBoundsOptions'
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
    let options = this.get('options');

    // Don't set center and zoom right now.
    // Let base layer bind the events first
    delete options.center;
    delete options.zoom;
    return this.L.map(this.element, options);
  },

  didCreateLayer() {
    //after base layer bound the events, we can now set the map's view
    assert('You must provide either valid `bounds` or a `center` (or `lat`/`lng`) and a `zoom` value.',
      (this.get('bounds') && (!this.get('center') && this.get('zoom') === undefined)) ||
      (!this.get('bounds') && (this.get('center') && this.get('zoom') !== undefined))
    );
    if (this.get('bounds')) {
      this._layer.fitBounds(this.get('bounds'), assign({reset: true}, this.get('fitBoundsOptions')));
    } else {

      this._layer.setView(this.get('center'), this.get('zoom'), assign({reset: true}, this.get('zoomPanOptions')));
    }
  }
});
