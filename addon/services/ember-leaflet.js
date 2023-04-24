import Service from '@ember/service';
import { assert } from '@ember/debug';

export default class EmberLeafletService extends Service {
  components = [];

  registerComponent(name, options = {}) {
    let as = options.as || name;

    assert(
      `Tried to register component \`${name}\` as \`${as}\`, but it was already registered. Try to register a different component or register it under a different name.`,
      this.components.find((c) => c.name === name || c.as === as) === undefined
    );

    this.components.push({ ...options, name, as });
  }
}
