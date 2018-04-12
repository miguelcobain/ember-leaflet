'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = function() {
  return Promise.all([
    getChannelURL('release'),
    getChannelURL('beta'),
    getChannelURL('canary')
  ]).then((urls) => {
    return {
      scenarios: [
        {
          name: 'ember-lts-2.12',
          npm: {
            devDependencies: {
              'ember-source': '~2.12.0'
            }
          }
        },
        {
          name: 'ember-lts-2.16',
          npm: {
            devDependencies: {
              'ember-source': '~2.16.0'
            }
          }
        },
        {
          name: 'ember-lts-2.18',
          npm: {
            devDependencies: {
              'ember-source': '~2.18.0'
            }
          }
        },
        {
          name: 'ember-release',
          npm: {
            devDependencies: {
              'ember-source': urls[0]
            }
          }
        },
        {
          name: 'ember-beta',
          npm: {
            devDependencies: {
              'ember-source': urls[1]
            }
          }
        },
        {
          name: 'ember-canary',
          npm: {
            devDependencies: {
              'ember-source': urls[2]
            }
          }
        },
        {
          name: 'ember-1.13',
          bower: {
            dependencies: {
              'ember': '~1.13.0'
            },
            resolutions: {
              'ember': '~1.13.0'
            }
          },
          npm: {
            devDependencies: {
              'ember-source': null
            }
          }
        },
        {
          name: 'ember-1.13-leaflet-0.7.7',
          bower: {
            dependencies: {
              'ember': '~1.13.0',
              'leaflet': '~0.7.7'
            },
            resolutions: {
              'ember': '~1.13.0'
            }
          },
          npm: {
            devDependencies: {
              'ember-source': null
            }
          }
        },
        {
          name: 'ember-default',
          npm: {
            devDependencies: {}
          }
        }
      ]
    };
  });
};
