import Ember from 'ember';
const { Helper } = Ember;

export default Helper.helper(function([arg1 = '']) {
  return arg1.toLowerCase();
});