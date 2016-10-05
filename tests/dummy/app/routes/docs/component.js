import Ember from 'ember';

const { Route, getOwner } = Ember;

export default Route.extend({
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
