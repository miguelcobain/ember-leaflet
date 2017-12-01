import Controller from '@ember/controller';
import { computed } from '@ember/object';
/* global requirejs */

export default Controller.extend({

  componentList: computed(function() {
    let componentList = [];

    for (let key in requirejs.entries) {
      if (key.indexOf('ember-leaflet/components/') !== -1 && key.indexOf('jshint') === -1) {
        componentList.push(key.split('/').pop());
      }
    }

    return componentList;
  }),

  helperList: computed(function() {
    let helperList = [];

    for (let key in requirejs.entries) {
      if (key.indexOf('ember-leaflet/helpers/') !== -1 && key.indexOf('jshint') === -1) {
        helperList.push(key.split('/').pop());
      }
    }

    return helperList;
  })

});
