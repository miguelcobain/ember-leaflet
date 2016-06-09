import Ember from 'ember';
import BaseLayer from 'ember-leaflet/components/base-layer';
import DraggabilityMixin from 'ember-leaflet/mixins/draggability';
import PopupMixin from 'ember-leaflet/mixins/popup';
import toLatLng from 'ember-leaflet/macros/to-lat-lng';
const { observer } = Ember;

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
    'zIndexOffset', 'opacity', 'location:setLatLng'
  ],

  location: toLatLng(),

  createLayer() {
    return this.L.marker(...this.get('requiredOptions'), this.get('options'));
  },

  // icon observer separated from generator (leaflet properties) due to a
  // leaflet bug where draggability is lost on icon change
  iconDidChange: observer('icon', function() {
    this._layer.setIcon(this.get('icon'));

    if (this.get('draggable')) {
      this._layer.dragging.enable();
    } else {
      this._layer.dragging.disable();
    }
  })
});
