import Ember from 'ember';
const { Helper, String: { classify } } = Ember;

export default Helper.helper(function([arg1 = '']) {
  return classify(arg1);
});
