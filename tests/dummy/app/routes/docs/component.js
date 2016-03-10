import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Route.extend({
  model(params) {
    this.componentName = params.component_name;
    return getOwner(this).lookup(`component:${params.component_name}`);
  },

  setupController(controller, model) {
    controller.setProperties({
      component: model,
      componentName: this.componentName
    });
  }
});
