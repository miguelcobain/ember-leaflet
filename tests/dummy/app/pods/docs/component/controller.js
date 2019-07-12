import Controller from '@ember/controller';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
/* global requirejs, require */

let URL_PREFIX = 'http://leafletjs.com/reference-1.0.2.html#';

function getSuperclass(instance) {
  return instance.constructor.superclass;
}

export default class ComponentController extends Controller {

  @computed('componentName')
  get leafletUrlPrefix() {
    let id;
    let componentName = this.componentName;
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
  }

  _findClassSource(klass) {
    for (let key in requirejs.entries) {
      if (key.indexOf('ember-leaflet/components/') !== -1) {
        let module = require(key);

        for (let exported in module) {
          if (module[exported] === klass) {
            return key;
          }
        }
      }
    }

    return false;
  }

  _subtractSuperClassProps(propName) {
    let component = this.component;
    let props = component.get(propName) ? A(component.get(propName).slice(0)) : A();
    let clazz = getSuperclass(component);

    // subtract superclass properties
    while (clazz !== Component) {
      let classProps = clazz.prototype[propName] || [];
      props.removeObjects(classProps);
      clazz = clazz.superclass;
    }

    return props;
  }

  @computed('component')
  get superclassName() {
    let component = this.component;
    let superclass = getSuperclass(component);
    if (superclass !== Component) {
      return this._findClassSource(superclass).split('/').pop();
    } else {
      return false;
    }
  }

  @computed('component')
  get leafletRequiredOptions() {
    return this.component.leafletRequiredOptions;
  }

  @computed('component')
  get leafletProperties() {
    return this._subtractSuperClassProps('leafletProperties');
  }

  @computed('component')
  get leafletOptions() {
    return this._subtractSuperClassProps('leafletOptions');
  }

  @computed('component')
  get leafletEvents() {
    return this._subtractSuperClassProps('leafletEvents');
  }

  @computed('component')
  get leafletStyleProperties() {
    return this._subtractSuperClassProps('leafletStyleProperties');
  }

}
