import config from 'ember-get-config';
/* global L */

export function initialize(/* container, application */) {
  L.Icon.Default.imagePath = `${config.rootURL || config.baseURL || ''}assets/images/`;
}

export default {
  name: 'leaflet-assets',
  initialize: initialize
};
