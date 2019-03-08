import Controller from '@ember/controller';
/* global requirejs */

export default class DocsController extends Controller {

  get componentList() {
    let componentList = [];

    for (let key in requirejs.entries) {
      if (key.indexOf('ember-leaflet/components/') !== -1 && key.indexOf('jshint') === -1) {
        componentList.push(key.split('/').pop());
      }
    }

    return componentList;
  }

  get helperList() {
    let helperList = [];

    for (let key in requirejs.entries) {
      if (key.indexOf('ember-leaflet/helpers/') !== -1 && key.indexOf('jshint') === -1) {
        helperList.push(key.split('/').pop());
      }
    }

    return helperList;
  }

}
