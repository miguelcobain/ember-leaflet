import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({

  leafletStyleProperties: [
    'stroke', 'color', 'weight', 'opacity', 'fill', 'fillColor',
    'fillOpacity', 'fillRule', 'dashArray', 'lineCap', 'lineJoin',
    'clickable', 'pointerEvents', 'className'
  ],

  didInsertParent() {
    this._super(...arguments);
    this._addStyleObservers();
  },

  willDestroyParent() {
    this._removeStyleObservers();
    this._super(...arguments);
  },

  _addStyleObservers() {
    this._styleObservers = {};
    this.get('leafletStyleProperties').forEach(function(property) {

      this._styleObservers[property] = function() {
        let value = this.get(property);
        this._layer.setStyle({[property]: value});
      };

      this.addObserver(property, this, this._styleObservers[property]);
    }, this);
  },

  _removeStyleObservers() {
    this.get('leafletStyleProperties').forEach(function(property) {
      this.removeObserver(property, this, this._styleObservers[property]);
      delete this._styleObservers[property];
    }, this);
  }

});
