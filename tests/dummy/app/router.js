import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import RouterScroll from 'ember-router-scroll';
import config from './config/environment';

const Router = AddonDocsRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  docsRoute(this, function() {
    // GETTING STARTED
    // index.hbs is "Overview"
    this.route('installation');
    this.route('container');
    this.route('adding-layers');
    this.route('actions');
    this.route('templates');
    this.route('addons');

    // COMPONENTS
    this.route('component', { path: ':component_name' });

    // HELPERS
    this.route('helper', { path: 'helpers/:helper_name' });
  });

  this.route('addons');

  this.route('not-found', { path: '/*path' });
});

export default Router;
