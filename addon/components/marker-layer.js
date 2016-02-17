import BaseLayer from 'ember-leaflet/components/base-layer';
import DraggabilityMixin from 'ember-leaflet/mixins/draggability';
import PopupMixin from 'ember-leaflet/mixins/popup';
import toLatLng from 'ember-leaflet/macros/to-lat-lng';

export default BaseLayer.extend(DraggabilityMixin, PopupMixin, {

  leafletRequiredOptions: [
    'location'
  ],

  leafletOptions: [
    'icon', 'clickable', 'draggable', 'keyboard', 'title',
    'alt', 'zIndexOffset', 'opacity', 'riseOnHover', 'riseOffset'
  ],

  leafletEvents: [
    'click', 'dblclick', 'mousedown', 'mouseover', 'mouseout',
    'contextmenu', 'dragstart', 'drag', 'dragend', 'move', 'remove', 'add',
    'popupopen', 'popupclose'
  ],

  leafletProperties: [
    'icon', 'zIndexOffset', 'opacity', 'location:setLatLng'
  ],

  location: toLatLng(),

  createLayer() {
    return this.L.marker(...this.get('requiredOptions'), this.get('options'));
  }
});
