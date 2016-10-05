import Ember from 'ember';
import ContainerMixin from 'ember-leaflet/mixins/container';
const { Mixin, computed, assert } = Ember;

export default Mixin.create({

  containerLayer: computed(function() {
    return this.nearestOfType(ContainerMixin);
  }),

  didInsertElement() {
    this._super(...arguments);
    this.registerWithParent();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.unregisterWithParent();
  },

  registerWithParent() {
    let container = this.get('containerLayer');
    assert(`Tried to use ${this} outside the context of a container layer.`, container);
    container.registerChild(this);
  },

  unregisterWithParent() {
    let container = this.get('containerLayer');
    if (container) {
      container.unregisterChild(this);
    }
  }

});
