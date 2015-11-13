import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('docs', function() {
    // GETTING STARTED
    // index.hbs is "Overview"
    this.route('installation');
    this.route('usage');
    this.route('adding-layers');
    this.route('actions');
    this.route('templates');

    // COMPONENTS
    this.route('component', {path: ':component_name'});
  });
});

export default Router;
