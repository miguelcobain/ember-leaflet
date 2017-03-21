/* eslint-env node */
'use strict';
const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const VersionChecker = require('ember-cli-version-checker');
const filterInitializers = require('fastboot-filter-initializers');

module.exports = {
  name: 'ember-leaflet',

  preconcatTree(tree) {
    return filterInitializers(tree, this.app.name);
  },

  included(app) {
    this._super.included.apply(this, arguments);

    // Addon options from the apps ember-cli-build.js
    let options = app.options[this.name] || {};

    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    }

    // Otherwise, we'll use this implementation borrowed from the _findHost()
    // method in ember-cli.
    // Keep iterating upward until we don't have a grandparent.
    // Has to do this grandparent check because at some point we hit the project.
    let current = this;
    do {
     app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    // import javascript only if not in fastboot
    if (!options.excludeJS && !process.env.EMBER_CLI_FASTBOOT) {
      app.import(app.bowerDirectory + '/leaflet/dist/leaflet-src.js');
    }

    // Import leaflet css
    if (!options.excludeCSS) {
      app.import(app.bowerDirectory + '/leaflet/dist/leaflet.css');
    }

    // Import leaflet images
    if (!options.excludeImages) {
      let imagesDestDir = '/assets/images';
      app.import(app.bowerDirectory + '/leaflet/dist/images/layers-2x.png', { destDir: imagesDestDir });
      app.import(app.bowerDirectory + '/leaflet/dist/images/layers.png', { destDir: imagesDestDir });
      app.import(app.bowerDirectory + '/leaflet/dist/images/marker-icon-2x.png', { destDir: imagesDestDir });
      app.import(app.bowerDirectory + '/leaflet/dist/images/marker-icon.png', { destDir: imagesDestDir });
      app.import(app.bowerDirectory + '/leaflet/dist/images/marker-shadow.png', { destDir: imagesDestDir });
    }
 },

 treeForAddonTemplates(tree) {
    let checker = new VersionChecker(this);
    let dep = checker.for('ember', 'bower');

    let baseTemplatesPath = path.join(this.root, 'addon/templates');

    if (dep.lt('2.3.0-beta.1')) {
      let current = this.treeGenerator(path.join(baseTemplatesPath, 'current'));
      let specificVersionTemplate = this.treeGenerator(path.join(baseTemplatesPath, 'lt-2-3'));
      return mergeTrees([current, specificVersionTemplate], { overwrite: true });
    } else {
      return this.treeGenerator(path.join(baseTemplatesPath, 'current'));
    }
  }
};
