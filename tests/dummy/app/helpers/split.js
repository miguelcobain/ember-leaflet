import Ember from 'ember';
const { Helper } = Ember;

export default Helper.helper(function([arg1 = '', index = 0, separator = ':']) {
  return arg1.split(separator)[index];
});
