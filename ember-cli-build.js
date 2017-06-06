'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const crawl = require('prember-crawler');

module.exports = function(defaults) {

  let app = new EmberAddon(defaults, {
    fingerprint: {
      exclude: ['assets/images']
    },
    'ember-prism': {
      'theme': 'none',
      'components': ['scss', 'javascript', 'handlebars', 'markup-templating', 'bash']
    },
    prember: {
      urls: crawl
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  app.import(
    'node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js',
    { using: [ { transformation: 'cjs', as: 'marker-cluster'} ] }
  );

  return app.toTree();
};
