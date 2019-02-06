'use strict';
const resolve = require('resolve');
const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const VersionChecker = require('ember-cli-version-checker');
const fastbootTransform = require('fastboot-transform');

module.exports = {
  name: require('./package').name,

  treeForVendor() {
    let dist = path.join(this.pathBase('leaflet'), 'dist');

    let leafletJs = fastbootTransform(new Funnel(dist, {
      files: ['leaflet-src.js'],
      destDir: 'leaflet'
    }));

    let leafletFiles = new Funnel(dist, {
      exclude: ['leaflet.js', 'leaflet-src.js', '*.html'],
      destDir: 'leaflet'
    });

    return mergeTrees([leafletJs, leafletFiles]);
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

    if (!options.excludeJS) {
      app.import('vendor/leaflet/leaflet-src.js');
    }

    // Import leaflet css
    if (!options.excludeCSS) {
      app.import('vendor/leaflet/leaflet.css');
    }

    // Import leaflet images
    if (!options.excludeImages) {
      let imagesDestDir = '/assets/images';
      app.import('vendor/leaflet/images/layers-2x.png', { destDir: imagesDestDir });
      app.import('vendor/leaflet/images/layers.png', { destDir: imagesDestDir });
      app.import('vendor/leaflet/images/marker-icon-2x.png', { destDir: imagesDestDir });
      app.import('vendor/leaflet/images/marker-icon.png', { destDir: imagesDestDir });
      app.import('vendor/leaflet/images/marker-shadow.png', { destDir: imagesDestDir });
    }
  },

  treeForAddonTemplates() {
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
  },

  pathBase(packageName) {
    return path.dirname(resolve.sync(packageName + '/package.json', { basedir: __dirname }));
  }
};
