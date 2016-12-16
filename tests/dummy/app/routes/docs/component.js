import Ember from 'ember';

const { Route, getOwner } = Ember;

export default Route.extend({
  model(params) {
    this.componentName = params.component_name;
    let component = getOwner(this)._lookupFactory(`component:${params.component_name}`);

    // create an instance of the component
    // using a dummy parent component
    return component.create({
      parentComponent: {
        registerChild() {},
        unregisterChild() {}
      }
    });
  },

  setupController(controller, model) {
    controller.setProperties({
      component: model,
      componentName: this.componentName
    });
  }
});
