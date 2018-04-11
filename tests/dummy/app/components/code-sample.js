import Component from '@ember/component';

export default Component.extend({
  tagName: 'article',
  classNames: ['code-sample'],
  tabs: Object.freeze(['template', 'javascript', 'result']),
  activeTab: 'result'
});
