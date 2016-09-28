import BaseLayer from 'ember-leaflet/components/base-layer';
import DivOverlayableMixin from 'ember-leaflet/mixins/div-overlayable';
import StyleMixin from 'ember-leaflet/mixins/style';

export default BaseLayer.extend(DivOverlayableMixin, StyleMixin, {

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
