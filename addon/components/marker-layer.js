import InteractiveLayer from 'ember-leaflet/components/interactive-layer';

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

  get location() {
    if (this.args.location) {
      return this.args.location;
    } else {
      let [lat, lng] = [this.args.lat, this.args.lng];
      return this.L.latLng(lat, lng);
    }
  }

  createLayer() {
    return this.L.marker(...this.requiredOptions, this.options);
  }
}
