import Component from '@glimmer/component';

export default class Node extends Component {
  children = new Set();

  constructor() {
    super(...arguments);

    if (this.args.parent) {
      this.args.parent.registerChild(this);
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);

    if (this.args.parent) {
      this.args.parent.unregisterChild(this);
    }
  }

  registerChild(child) {
    this.children.add(child);
  }

  unregisterChild(child) {
    this.children.delete(child);
  }

  didInsertNode(element) {
    // library setup code goes here
    this.didInsertParent(element);

    this.children.forEach(c => c.didInsertNode(element));
  }

  willDestroyNode(element) {
    // library teardown code goes here
    this.willDestroyParent(element);

    this.children.forEach(c => c.willDestroyNode(element));
  }
}
