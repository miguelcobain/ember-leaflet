module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'ember-leaflet',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
