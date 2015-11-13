/* jshint ignore:start */
import Ember from 'ember';

export default Ember.Helper.helper(function([arg1 = '', index = 0, separator = ':']) {
  return arg1.split(separator)
});
/* jshint ignore:end */
