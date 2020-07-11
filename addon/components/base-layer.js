import { isArray } from '@ember/array';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { classify } from '@ember/string';

import Node from 'ember-leaflet/utils/node';
/* global L */

const leaf = typeof L === 'undefined' ? {} : L;

export default class BaseLayer extends Node {
  L = leaf;

  // concatenatedProperties: ['leafletOptions', 'leafletRequiredOptions', 'leafletEvents', 'leafletDescriptors'],

  leafletOptions = ['pane', 'attribution'];

  leafletEvents = ['add', 'remove'];

  createLayer() {
    assert("BaseLayer's `createLayer` should be overriden.");
  }

  didCreateLayer() {}
  willDestroyLayer() {}

  /*
   * Method called by parent when the layer needs to setup
   */
  didInsertParent(element) {
    // Check for fastBoot
    if (this.isFastBoot) {
      return;
    }

    this._layer = this.createLayer(element);
    // this._addObservers();
    this._addEventListeners();
    if (this.args.parent) {
      this.addToContainer();
    }
    this.didCreateLayer();
  }

  /*
   * Default logic for adding the layer to the container
   */
  addToContainer() {
    this.args.parent._layer.addLayer(this._layer);
  }

  /*
   * Method called by parent when the layer needs to teardown
   */
  willDestroyParent() {
    // Check for fastBoot
    if (this.isFastBoot) {
      return;
    }

    this.willDestroyLayer();
    this._removeEventListeners();
    // this._removeObservers();
    if (this.parent && this._layer) {
      this.removeFromContainer();
    }
    delete this._layer;
  }

  /*
   * Default logic for removing the layer from the container
   */
  removeFromContainer() {
    this.parent._layer.removeLayer(this._layer);
  }

  get options() {
    let options = {};

    for (let optionName of this.leafletOptions) {
      if (this.args[optionName] !== undefined) {
        options[optionName] = this.args[optionName];
      }
    }

    return options;
  }

  leafletRequiredOptions = [];

  get requiredOptions() {
    let options = [];

    for (let optionName of this.leafletRequiredOptions) {
      let value = this.args[optionName] || this[optionName];
      assert(`\`${optionName}\` is a required option but its value was \`${value}\``, value);
      options.push(value);
    }

    return options;
  }

  get usedLeafletEvents() {
    return this.leafletEvents.filter(eventName => {
      let methodName = `_${eventName}`;
      let actionName = `on${classify(eventName)}`;
      return this[methodName] !== undefined || this.args[actionName] !== undefined;
    });
  }

  _addEventListeners() {
    this._eventHandlers = {};

    for (let eventName of this.usedLeafletEvents) {
      let actionName = `on${classify(eventName)}`;
      let methodName = `_${eventName}`;

      // create an event handler that runs the function inside an event loop.
      this._eventHandlers[eventName] = function(e) {
        this._onActions = () => {
          // try to invoke/send an action for this event
          if (typeof this.args[actionName] === 'function') {
            this.args[actionName](e);
          }

          // allow classes to add custom logic on events as well
          if (typeof this[methodName] === 'function') {
            this[methodName](e);
          }
        };

        scheduleOnce('actions', this, this._onActions);
      };

      this._layer.addEventListener(eventName, this._eventHandlers[eventName], this);
    }
  }

  _removeEventListeners() {
    if (this._eventHandlers) {
      for (let eventName of this.usedLeafletEvents) {
        this._layer.removeEventListener(eventName, this._eventHandlers[eventName], this);
        delete this._eventHandlers[eventName];
      }
    }
  }

  /**
   * This is an array that describes how a component's arguments
   * relate to leaflet methods and their parameters.
   * E.g: Changing the tile layer's `@url` should invoke the layer's `setUrl` method
   * with the new `@url` value
   */
  leafletDescriptors = [];

  get leafletDescriptorsValues() {
    console.log('leafletDescriptorsValues');
    return this.leafletDescriptors.reduce((result, d) => {
      let descArg = typeof d === 'string' ? d.split(':')[0] : d.arg;
      let value = this.args[descArg] || this[descArg];

      result[descArg] = value;
      return result;
    }, {});
  }

  @action
  updateOption(arg, [value]) {
    console.log('updateOption', arg, value);

    // find the corresponding leaflet descriptor
    let descriptor = this.leafletDescriptors.find(d => {
      let descArg = typeof d === 'string' ? d.split(':')[0] : d.arg;
      return descArg === arg;
    });

    if (!descriptor) {
      return;
    }

    if (typeof descriptor === 'string') {
      let [property, method, ...params] = descriptor.split(':');

      if (!method) {
        method = `set${classify(property)}`;
      }

      assert(`Leaflet layer must have a ${method} function.`, !!this._layer[method]);
      let methodParams = params.map(p => this.args[p]);
      this._layer[method].call(this._layer, value, ...methodParams);
    } else {
      let { updateFn, params = [] } = descriptor;
      let methodParams = params.map(p => this.args[p]);
      updateFn(this._layer, value, ...methodParams);
    }

    let methodName = `${classify(arg)}_did_change`;
    if (typeof this[methodName] === 'function') {
      this[methodName](value);
    }
  }
}
