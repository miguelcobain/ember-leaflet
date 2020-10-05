import BaseLayer from 'ember-leaflet/components/base-layer';

export default class InteractiveLayer extends BaseLayer {
  leafletOptions = [...this.leafletOptions, 'interactive', 'bubblingMouseEvents'];

  leafletEvents = [
    ...this.leafletEvents,
    'click',
    'dblclick',
    'mousedown',
    'mouseup',
    'mouseover',
    'mouseout',
    'contextmenu'
  ];
}
