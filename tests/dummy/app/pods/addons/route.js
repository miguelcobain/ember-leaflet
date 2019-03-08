import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class AddonRoute extends Route {

  async model() {
    let response = await fetch('https://registry.npmjs.org/-/v1/search?text=keywords:ember-leaflet');
    let data = await response.json();

    return data.objects.filter((item) => {
      return item.package.name.startsWith('ember-leaflet-');
    }).map((item) => {
      return {
        name: item.package.name,
        description: item.package.description,
        repo: item.package.links.repository
      };
    });
  }

}
