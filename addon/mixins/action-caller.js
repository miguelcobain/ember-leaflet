import Ember from 'ember';

export default Ember.Mixin.create({
  tryToInvokeAction(actionName, ...args) {
    let action = this.get(actionName);

    if (typeof action === 'string') {
      this.sendAction(actionName, ...args);
    } else if (action && typeof action === 'function') {
      action(...args);
    }
  }
});
