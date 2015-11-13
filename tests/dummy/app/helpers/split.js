import Ember from 'ember';

export default Ember.Helper.helper(function([arg1 = '', index = 0, separator = ':']) {
  let subStr = arg1.split(separator);
  return subStr[index];
});
