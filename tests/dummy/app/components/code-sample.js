import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  tagName: 'article',
  classNames: ['code-sample'],
  tabs: ['template', 'javascript', 'result'],
  activeTab: 'result'
});
