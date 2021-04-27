# ember-leaflet [![CI](https://github.com/miguelcobain/ember-leaflet/workflows/CI/badge.svg)](https://github.com/miguelcobain/ember-leaflet/actions?query=workflow%3ACI) [![Ember Observer Score](http://emberobserver.com/badges/ember-leaflet.svg)](http://emberobserver.com/addons/ember-leaflet) [![npm version](https://badge.fury.io/js/ember-leaflet.svg)](https://badge.fury.io/js/ember-leaflet)

Ember-Leaflet aims to make working with Leaflet layers in your Ember app as easy, declarative and composable as templates make working with DOM.

## Installation

Ember Leaflet works in Ember 3.16+ with no deprecations.

To install it run:

```
ember install ember-leaflet
```

This will also add the `leaflet` package to your project.

ember-leaflet is compatible with leaflet 0.7+. If you need to use a legacy version, you can just install it via npm / yarn:

```
npm install --save-dev leaflet@0.7
yarn add -D leaflet@0.7
```

## Support, Questions, Collaboration

![Discord](https://img.shields.io/discord/480462759797063690.svg?logo=discord) Join Ember on [Discord](https://discord.gg/zT3asNS)

## Usage

Documentation and examples are hosted at [https://miguelcobain.github.io/ember-leaflet/](https://miguelcobain.github.io/ember-leaflet/).
Please file any issues if you see that something can be improved.

#### Production Builds

In your `ember-cli-build.js` add the following snippet:

```js
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

ember-cli does fingerprinting (appending an md5 checksum to the end of every file) for production builds by default (http://ember-cli.com/user-guide/#fingerprinting-and-cdn-urls). Exclude the leaflet assets so that your production build produces them correctly.

## Overview

Web apps frequently need to display geographic data, especially if it has a direct relationship with the real world. That isn't new, and has been done previously in all kinds of formats, particularly with raster and vector data.

Ember apps naturally may have the same requirements and until now, devs have been either using mapping libraries outside of ember scope, or using previous versions of ember-leaflet.

The problem was that both approaches were hard. Frequently existing libraries have regular javascript imperative APIs and html in mind. We all know and love how ember makes us flow the data in our app. Previous approaches simply didn't fit where ember really shines: templates, actions, routing, and above all, expressiveness.

**Ember-leaflet allows you to express your maps right in your templates.** Also, it is streamlined for ember in general. You have things like actions, components and the ability to use regular handlebars helpers like `{{#if` or `{{#each`.

We can't go wrong with delegating the mapping part to the battle tested, performant and lightweight [Leaflet](http://leafletjs.com/) library.

So, let the mapping begin.

## Examples

Think of your map as a set of layers inside a container. Your main container will be the `<LeafletMap>` component. This component creates the map container where your tiles, vectors and markers will be added to. Let's see an example of how it looks:

```hbs
<LeafletMap @lat={{this.lat}} @lng={{this.lng}} @zoom={{this.zoom}} as |layers|>

  <layers.tile @url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />

  <layers.marker @location={{this.emberConfLocation}} as |marker|>
    <marker.popup>
      <h3>The Oregon Convention Center</h3>
      777 NE Martin Luther King Jr Blvd<br>
      Portland, OR 97232
    </marker.popup>
  </layers.marker>

  <layers.marker @location={{this.hotel}} as |marker|>
    <marker.popup>
      <h3>Hotel</h3>
    </marker.popup>
  </layers.marker>

</LeafletMap>
```

### Linting

- `npm run lint:js`
- `npm run lint:js -- --fix`

### Running tests

- `ember test` – Runs the test suite on the current Ember version
- `ember test --server` – Runs the test suite in "watch mode"
- `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

- `ember serve`
- Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
