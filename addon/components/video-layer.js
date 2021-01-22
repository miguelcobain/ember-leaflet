import ImageLayer from 'ember-leaflet/components/image-layer';

export default class VideoLayer extends ImageLayer {
  leafletRequiredOptions = [...this.leafletRequiredOptions, 'video', 'bounds'];

  leafletOptions = [...this.leafletOptions, 'autoplay', 'loop'];

  leafletDescriptors = [...this.leafletDescriptors, 'url', 'opacity', 'bounds'];

  createLayer() {
    return this.L.videoOverlay(...this.requiredOptions, this.options);
  }
}
