# Installation

Ember-leaflet is packaged as an <a class="docs-md__a" href="http://www.ember-cli.com/">Ember-cli</a> addon. As usual,
the only thing you need to do is to run an install command in your ember app directory:

```bash
ember install ember-leaflet
```

This command installed all ember-leaflet components and leaflet itself, along with its styles and assets.
You're ready to map!

**Note:** For production builds, update ember-cli's fingerprinting exclusions for the assets included in ember-leaflet.
See <a class="docs-md__a" href="http://ember-cli.com/user-guide/#fingerprinting-and-cdn-urls">here</a> for more details.

```js
//ember-cli-build.js
let app = new EmberApp(defaults, {
  // Add options here
  fingerprint: {
    exclude: [
      'images/layers-2x.png',
      'images/layers.png',
      'images/marker-icon-2x.png',
      'images/marker-icon.png',
      'images/marker-shadow.png'
    ]
  }
});
```
