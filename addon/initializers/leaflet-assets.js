/* global L */

export function initialize(/* container, application */) {
  L.Icon.Default.imagePath = '/assets/images/';
}

export default {
  name: 'leaflet-assets',
  initialize: initialize
};
