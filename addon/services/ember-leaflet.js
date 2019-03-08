import Service from '@ember/service';
import { assert } from '@ember/debug';

export default Service.extend({

  init() {
    this._super(...arguments);
    this.set('components', []);
  },

  registerComponent(name, options = {}) {
    let components = this.get('components');
    let as = options.as || name;

    assert(
      `Tried to register component \`${name}\` as \`${as}\`, but it was already registered. Try to register a different component or register it under a different name.`,
      components.find((c) => c.name === name || c.as === as) === undefined
    );

    components.push({ name, as });
  }

});
