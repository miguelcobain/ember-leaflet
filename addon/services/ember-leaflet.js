import { assert } from '@ember/debug';
import Service from '@ember/service';

export default class EmberLeafletService extends Service {
  constructor() {
    super(...arguments);
    this.set('components', []);
  }

  registerComponent(name, options = {}) {
    let components = this.components;
    let as = options.as || name;

    assert(
      `Tried to register component \`${name}\` as \`${as}\`, but it was already registered. Try to register a different component or register it under a different name.`,
      components.find(c => c.name === name || c.as === as) === undefined
    );

    components.push({ name, as });
  }
}
