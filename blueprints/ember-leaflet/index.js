module.exports = {
  description: 'add leaflet npm package',

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function () {
    return this.addPackageToProject('leaflet', '^1.9.3');
  }
};
