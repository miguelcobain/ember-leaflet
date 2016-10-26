import ENV from '../config/environment';
import L from 'ember-leaflet/L';

export function initialize(/* container, application */) {
  L.Icon.Default.imagePath = `${ENV.rootURL || ENV.baseURL || '/'}assets/images/`;
}

export default {
  name: 'leaflet-assets',
  initialize: initialize
};
