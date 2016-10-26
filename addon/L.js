/* global L */

let L_ = null;

if (typeof L !== 'undefined') {
  L_ = L;
} else {
  let N = () => {};

  L_ = new Proxy({}, {
    get() {
      return N;
    }
  });

  L_.Icon.Default = {};
  L_.tileLayer.wms = N;
}

export default L_;

