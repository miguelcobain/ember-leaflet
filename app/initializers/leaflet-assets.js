import { isNone } from '@ember/utils';
import config from 'ember-get-config';

export function initialize(/* container, application */) {
  if (typeof FastBoot === 'undefined') {
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
