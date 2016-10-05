import Ember from 'ember';
import ContainerMixin from 'ember-leaflet/mixins/container';
import layout from '../templates/div-overlayable';

const { Mixin } = Ember;

export default Mixin.create(ContainerMixin, {
  layout,

  didCreateLayer() {
    this.get('_childLayers').invoke('layerSetup');
  }
});
