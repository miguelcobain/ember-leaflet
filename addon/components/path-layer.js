import InteractiveLayer from 'ember-leaflet/components/interactive-layer';
import DivOverlayableMixin from 'ember-leaflet/mixins/div-overlayable';
import StyleMixin from 'ember-leaflet/mixins/style';

export default InteractiveLayer.extend(DivOverlayableMixin, StyleMixin, {

  leafletOptions: Object.freeze([
    'stroke', 'color', 'weight', 'opacity', 'fill', 'fillColor',
    'fillOpacity', 'fillRule', 'dashArray', 'lineCap', 'lineJoin',
    'clickable', 'pointerEvents', 'className'
  ]),

  leafletEvents: Object.freeze([
    'add', 'remove', 'popupopen', 'popupclose'
  ])
});
