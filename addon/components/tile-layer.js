import BaseLayer from './base-layer';

export default BaseLayer.extend({
  tagName: '',

  createLayer() {
    return this.L.tileLayer(this.get('url'));
  }
});
