import Route from '@ember/routing/route';
/* global require */

export default Route.extend({
  model(params) {
    this.helperName = params.helper_name;
    return require(`ember-leaflet/helpers/${params.helper_name}`).default;
  },

  setupController(controller, model) {
    controller.setProperties({
      helper: model,
      helperName: this.helperName
    });
  }
});
