/* jshint ignore:start */
import Ember from 'ember';

export default Ember.Helper.helper(function([arg1 = '']) {
  return Ember.String.classify(arg1);
});
/* jshint ignore:end */
