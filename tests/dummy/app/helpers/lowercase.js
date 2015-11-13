import Ember from 'ember';

export default Ember.Helper.helper(function([arg1 = '']) {
  return arg1.toLowerCase();
});
