import Ember from 'ember';
/* global require, requirejs */

const { Controller, computed } = Ember;

let URL_PREFIX = 'http://leafletjs.com/reference-1.0.2.html#';

export default Controller.extend({

  leafletUrlPrefix: computed('componentName', function() {
    let id, componentName = this.get('componentName');
    if (componentName === 'leaflet-map') {
      id = 'map';
    } else if (componentName === 'tile-layer') {
      id = 'tilelayer';
    } else if (componentName === 'path-layer') {
      id = 'path';
    } else if (componentName.endsWith('-layer')) {
      [id] = componentName.split('-');
    }

    return URL_PREFIX + id;
  }),

  _findClassSource(klass) {
    for (var key in requirejs.entries) {
      if (key.indexOf('ember-leaflet/components/') !== -1) {
        var module = require(key);

        for (var exported in module) {
          if (module[exported] === klass) {
            return key;
          }
        }
      }
    }

    return false;
  },

  superclassName: computed('component', function() {
    let component = this.get('component');
    let superclass = component.superclass.superclass;
    if (superclass !== Ember.Component) {
      return this._findClassSource(superclass).split('/').pop();
    } else {
      return false;
    }
  }),

  leafletRequiredOptions: computed('component', function() {
    let component = this.get('component');
    return component.prototype.leafletRequiredOptions;
  }),

  leafletProperties: computed('component', function() {
    let component = this.get('component');
    return component.prototype.leafletProperties;
  }),

  leafletOptions: computed('component', function() {
    let component = this.get('component');
    return component.prototype.leafletOptions;
  }),

  leafletEvents: computed('component', function() {
    let component = this.get('component');
    return component.prototype.leafletEvents;
  }),

  leafletStyleProperties: computed('component', function() {
    let component = this.get('component');
    return component.prototype.leafletStyleProperties;
  })

});
