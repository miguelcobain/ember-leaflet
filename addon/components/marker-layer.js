import InteractiveLayer from 'ember-leaflet/components/interactive-layer';
import toLatLng from 'ember-leaflet/macros/to-lat-lng';

export default class MarkerLayer extends InteractiveLayer {
  leafletRequiredOptions = [...this.leafletRequiredOptions, 'location'];

  leafletOptions = [
    ...this.leafletOptions,
    'icon',
    'clickable',
    'draggable',
    'keyboard',
    'title',
    'alt',
    'zIndexOffset',
    'opacity',
    'riseOnHover',
    'riseOffset'
  ];

  leafletEvents = [
    ...this.leafletEvents,
    'dragstart',
    'drag',
    'dragend',
    'move',
    'moveend',
    'remove',
    'add',
    'popupopen',
    'popupclose'
  ];

  leafletDescriptors = [
    ...this.leafletDescriptors,
    'zIndexOffset',
    'opacity',
    'location:setLatLng',
    {
      arg: 'draggable',
      updateFn(layer, value) {
        if (value) {
          layer.dragging.enable();
        } else {
          layer.dragging.disable();
        }
      }
    },
    {
      arg: 'icon',
      // there was an old leaflet bug where draggability is lost on icon change
      updateFn(layer, value) {
        let enabled = layer.dragging.enabled();
        layer.setIcon(value);

        if (enabled) {
          layer.dragging.enable();
        } else {
          layer.dragging.disable();
        }
      }
    }
  ];

  @toLatLng()
  location;

  createLayer() {
    return this.L.marker(...this.requiredOptions, this.options);
  }
}
