import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this.componentName = params.component_name;
    return this.container.lookup(`component:${params.component_name}`);
  },

  setupController(controller, model) {
    controller.setProperties({
      component: model,
      componentName: this.componentName
    });
  }
});
