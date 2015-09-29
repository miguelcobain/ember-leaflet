/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-leaflet',
  included: function(app) {
   //import javascript
   app.import(app.bowerDirectory + '/leaflet/dist/leaflet-src.js');

   app.import(app.bowerDirectory + '/leaflet/dist/leaflet.css');

   var imagesDestDir = '/assets/images';
   app.import(app.bowerDirectory + '/leaflet/dist/images/layers-2x.png', { destDir: imagesDestDir });
   app.import(app.bowerDirectory + '/leaflet/dist/images/layers.png', { destDir: imagesDestDir });
   app.import(app.bowerDirectory + '/leaflet/dist/images/marker-icon-2x.png', { destDir: imagesDestDir });
   app.import(app.bowerDirectory + '/leaflet/dist/images/marker-icon.png', { destDir: imagesDestDir });
   app.import(app.bowerDirectory + '/leaflet/dist/images/marker-shadow.png', { destDir: imagesDestDir });
 }
};
