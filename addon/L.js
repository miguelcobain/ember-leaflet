/* global L */

let L_ = null;

if (typeof L !== 'undefined') {
  L_ = L;
} else {
  let N = () => {};
  let handler = {
    get() {
      return N;
    }
  };

  L_ = Proxy.create ? Proxy.create(handler) : new Proxy({}, handler);
  L_.Icon.Default = {};
  L_.tileLayer.wms = N;
}

export default L_;

