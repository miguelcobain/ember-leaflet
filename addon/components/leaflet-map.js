import { assert } from '@ember/debug';
import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';
import BaseLayer from 'ember-leaflet/components/base-layer';
import { action } from '@ember/object';

export default class LeafletMap extends BaseLayer {
  @service emberLeaflet;

  @action
  mergeComponents(obj) {
    if (!this.mergedComponents) {
      this.mergedComponents = obj;
    } else {
      assign(this.mergedComponents, obj);
    }
  }

  leafletOptions = [
    ...this.leafletOptions,
    // Map state options
    'center',
    'zoom',
    'minZoom',
    'maxZoom',
    'maxBounds',
    'crs',
    // Interaction options
    'dragging',
    'touchZoom',
    'scrollWheelZoom',
    'doubleClickZoom',
    'boxZoom',
    'tap',
    'tapTolerance',
    'trackResize',
    'worldCopyJump',
    'closePopupOnClick',
    'bounceAtZoomLimits',
    'wheelPxPerZoomLevel',
    'zoomDelta',
    'zoomSnap',
    // Keyboard navigation options
    'keyboard',
    'keyboardPanOffset',
    'keyboardZoomOffset',
    // Panning Inertia Options
    'inertia',
    'inertiaDeceleration',
    'inertiaMaxSpeed',
    'inertiaThreshold',
    'easeLinearity',
    'worldCopyJump',
    'maxBoundsViscosity',
    // Control options
    'zoomControl',
    'attributionControl',
    // Animation options
    'fadeAnimation',
    'zoomAnimation',
    'zoomAnimationThreshold',
    'markerZoomAnimation'
  ];

  // Events this map can respond to.
  leafletEvents = [
    ...this.leafletEvents,
    'click',
    'dblclick',
    'mousedown',
    'mouseup',
    'mouseover',
    'mouseout',
    'mousemove',
    'contextmenu',
    'focus',
    'blur',
    'preclick',
    'load',
    'unload',
    'viewreset',
    'movestart',
    'move',
    'moveend',
    'dragstart',
    'drag',
    'dragend',
    'zoomstart',
    'zoomend',
    'zoomlevelschange',
    'resize',
    'autopanstart',
    'layeradd',
    'layerremove',
    'baselayerchange',
    'overlayadd',
    'overlayremove',
    'locationfound',
    'locationerror',
    'popupopen',
    'popupclose'
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

  // required to supress glimmer component error message for acessing bounds property
  bounds = undefined;

  get center() {
    if (this.args.center) {
      return this.args.center;
    } else {
      let [lat, lng] = [this.args.lat, this.args.lng];
      return this.L.latLng(lat, lng);
    }
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
      this._layer.fitBounds(this.args.bounds, assign({ reset: true }, this.args.fitBoundsOptions));
    } else {
      this._layer.setView(this.center, this.args.zoom, assign({ reset: true }, this.args.zoomPanOptions));
    }
  }
}
