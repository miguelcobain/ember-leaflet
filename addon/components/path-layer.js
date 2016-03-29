import BaseLayer from 'ember-leaflet/components/base-layer';
import PopupMixin from 'ember-leaflet/mixins/popup';
import StyleMixin from 'ember-leaflet/mixins/style';

export default BaseLayer.extend(PopupMixin, StyleMixin, {

  leafletOptions: [
    'stroke', 'color', 'weight', 'opacity', 'fill', 'fillColor',
    'fillOpacity', 'fillRule', 'dashArray', 'lineCap', 'lineJoin',
    'clickable', 'pointerEvents', 'className'
  ],

  leafletEvents: [
    'click', 'dblclick', 'mousedown', 'mouseover', 'mouseout',
    'contextmenu', 'add', 'remove', 'popupopen', 'popupclose'
  ]
});
