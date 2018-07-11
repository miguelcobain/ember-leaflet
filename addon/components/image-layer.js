import { deprecate } from '@ember/application/deprecations';
import { isPresent } from '@ember/utils';
import InteractiveLayer from 'ember-leaflet/components/interactive-layer';

export default InteractiveLayer.extend({

  leafletRequiredOptions: Object.freeze([
    'url', 'bounds'
  ]),

  leafletOptions: Object.freeze([
    'opacity', 'alt', 'crossOrigin',
    'errorOverlayUrl', 'zIndex', 'className'
  ]),

  leafletProperties: Object.freeze([
    'url', 'opacity', 'bounds'
  ]),

  leafletEvents: Object.freeze([
    'load', 'error'
  ]),

  init() {
    let imageUrl = this.get('imageUrl');
    if (isPresent(imageUrl)) {
      deprecate(
        'ember-leaflet/image-layer: The `imageUrl` attribute has been deprecated in favor of the observed attribute `url`.',
        false,
        {
          id: 'ember-leaflet.image-layer.imageUrl',
          until: '4.0.0',
          url: 'https://github.com/miguelcobain/ember-leaflet/pull/143'
        }
      );
      this.set('url', imageUrl);
    }

    this._super(...arguments);
  },

  createLayer() {
    return this.L.imageOverlay(...this.get('requiredOptions'), this.get('options'));
  }
});
