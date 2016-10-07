/* jshint node: true */
'use strict';
var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var VersionChecker = require('ember-cli-version-checker');
var filterInitializers = require('fastboot-filter-initializers');

module.exports = {
  name: 'ember-leaflet',
  included: function(app) {
    console.log('EMBER-LEAFLET INCLUDED HOOK FIRING');
   // import leaflet, but only if it's not a fastboot build
   // more info --> https://www.ember-fastboot.com/docs/addon-author-guide
   if (!process.env.EMBER_CLI_FASTBOOT) {
     console.log('NOT FASTBOOT - including leaflet-src.js from ' + app.bowerDirectory);
     app.import(app.bowerDirectory + '/leaflet/dist/leaflet-src.js');
   }else{
     console.log('IS FASTBOOT - leaflet-src.js not included ');
   }
   app.import(app.bowerDirectory + '/leaflet/dist/leaflet.css');

   var imagesDestDir = '/assets/images';
   app.import(app.bowerDirectory + '/leaflet/dist/images/layers-2x.png', { destDir: imagesDestDir });
   app.import(app.bowerDirectory + '/leaflet/dist/images/layers.png', { destDir: imagesDestDir });
   app.import(app.bowerDirectory + '/leaflet/dist/images/marker-icon-2x.png', { destDir: imagesDestDir });
   app.import(app.bowerDirectory + '/leaflet/dist/images/marker-icon.png', { destDir: imagesDestDir });
   app.import(app.bowerDirectory + '/leaflet/dist/images/marker-shadow.png', { destDir: imagesDestDir });
 },

 //FASTBOOT - only run the initializer in the browser -> https://github.com/ronco/fastboot-filter-initializers
 preconcatTree: function(tree) {
    return filterInitializers(tree, this.app.name);
 },

 treeForAddonTemplates: function treeForAddonTemplates (tree) {
    var checker = new VersionChecker(this);
    var dep = checker.for('ember', 'bower');

    var baseTemplatesPath = path.join(this.root, 'addon/templates');

    if (dep.lt('2.3.0-beta.1')) {
      var current = this.treeGenerator(path.join(baseTemplatesPath, 'current'))
      var specificVersionTemplate = this.treeGenerator(path.join(baseTemplatesPath, 'lt-2-3'));
      return mergeTrees([current, specificVersionTemplate], { overwrite: true })
    } else {
      return this.treeGenerator(path.join(baseTemplatesPath, 'current'));
    }
  }
};
