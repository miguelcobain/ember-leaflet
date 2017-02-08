import Ember from 'ember';
import config from 'ember-get-config';
/* global L */

const { isNone } = Ember;

export function initialize(/* container, application */) {
  let prefix = '';

  if (!isNone(config.rootURL)) {
    prefix = config.rootURL;
  } else if (!isNone(config.baseURL)) {
    prefix = config.baseURL;
  }

  L.Icon.Default.imagePath = `${prefix}assets/images/`;
}

export default {
  name: 'leaflet-assets',
  initialize: initialize
};
