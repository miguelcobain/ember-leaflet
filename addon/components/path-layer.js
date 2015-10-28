import BaseLayer from 'ember-leaflet/components/base-layer';
import PopupMixin from 'ember-leaflet/mixins/popup';

export default BaseLayer.extend(PopupMixin, {

  leafletOptions: [
    'stroke', 'color', 'weight', 'opacity', 'fill', 'fillColor',
    'fillOpacity', 'fillRule', 'dashArray', 'lineCap', 'lineJoin',
    'clickable', 'pointerEvents', 'className'
  ],

  leafletEvents: [
    'click', 'dblclick', 'mousedown', 'mouseover', 'mouseout',
    'contextmenu', 'add', 'remove', 'popupopen', 'popupclose'
  ],

  leafletStyleProperties: [
    'stroke', 'color', 'weight', 'opacity', 'fill', 'fillColor',
    'fillOpacity', 'fillRule', 'dashArray', 'lineCap', 'lineJoin',
    'clickable', 'pointerEvents', 'className'
  ],

  layerSetup() {
    this._super(...arguments);
    this._addStyleObservers();
  },

  layerTeardown() {
    this._removeStyleObservers();
    this._super(...arguments);
  },

  _addStyleObservers() {
    this._styleObservers = {};
    this.get('leafletStyleProperties').forEach(function(property) {

      this._styleObservers[property] = function() {
        let value = this.get(property);
        this._layer.setStyle({[property]: value});
      };

      this.addObserver(property, this, this._styleObservers[property]);
    }, this);
  },

  _removeStyleObservers() {
    this.get('leafletStyleProperties').forEach(function(property) {
      this.removeObserver(property, this, this._styleObservers[property]);
      delete this._styleObservers[property];
    }, this);
  }
});
