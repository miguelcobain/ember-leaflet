import { isNone } from '@ember/utils';
/* global L */

export function initialize(container /*, application */) {
  if (typeof FastBoot === 'undefined' && typeof L !== 'undefined') {
    let config = container.resolveRegistration('config:environment');
    let prefix = '';

    if (!isNone(config.rootURL)) {
      prefix = config.rootURL;
    } else if (!isNone(config.baseURL)) {
      prefix = config.baseURL;
    }

    L.Icon.Default.imagePath = `${prefix}assets/images/`;
  }
}

export default {
  name: 'leaflet-assets',
  initialize
};
