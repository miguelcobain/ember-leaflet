import InteractiveLayer from 'ember-leaflet/components/interactive-layer';

export default class PathLayer extends InteractiveLayer {
  leafletOptions = [
    ...this.leafletOptions,
    'stroke',
    'color',
    'weight',
    'opacity',
    'fill',
    'fillColor',
    'fillOpacity',
    'fillRule',
    'dashArray',
    'lineCap',
    'lineJoin',
    'clickable',
    'pointerEvents',
    'className'
  ];

  leafletEvents = [...this.leafletEvents, 'add', 'remove', 'popupopen', 'popupclose'];
}
