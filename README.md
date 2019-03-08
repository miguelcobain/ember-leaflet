# ember-leaflet [![Build Status](https://travis-ci.org/miguelcobain/ember-leaflet.svg)](https://travis-ci.org/miguelcobain/ember-leaflet) [![Ember Observer Score](http://emberobserver.com/badges/ember-leaflet.svg)](http://emberobserver.com/addons/ember-leaflet) [![npm version](https://badge.fury.io/js/ember-leaflet.svg)](https://badge.fury.io/js/ember-leaflet)

Ember-Leaflet aims to make working with Leaflet layers in your Ember app as easy, declarative and composable as templates make working with DOM.

## Installation

Ember Leaflet works in Ember 1.13.9+ with no deprecations.

To install it run:
```
ember install ember-leaflet
```

This will also add the `leaflet` package to your project.
If you're upgrading from a previous version of `ember-leaflet`, you can safely remove the `leaflet` dependency from your `bower.json` and add it to `package.json`.

If you require a legacy support version of leaflet or need a specific version for other reasons, you can just install that version via npm / yarn:

```
npm install --save-dev leaflet@0.7
yarn add -D leaflet@0.7
```

## Support, Questions, Collaboration

![Discord](https://img.shields.io/discord/480462759797063690.svg?logo=discord) Join Ember on [Discord](https://discord.gg/zT3asNS)

## Usage

Documentation and examples are hosted at [www.ember-leaflet.com](http://www.ember-leaflet.com).
Please file any issues if you see that something can be improved.

If you're looking for the previous ember-leaflet version, you can use [this repo](https://github.com/gabesmed/ember-leaflet).

#### Production Builds
In your <code>ember-cli-build.js</code> add the following snippet:
```js
  var app = new EmberApp(defaults, {
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
Ember-Cli does fingerprinting (appending an md5 checksum to the end of every file) for production builds by default (http://ember-cli.com/user-guide/#fingerprinting-and-cdn-urls). Exclude the assets you need so that your production build produces them correctly.

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
<LeafletMap @lat={{lat}} @lng={{lng}} @zoom={{zoom}} as |layers|>

  <layers.tile @url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png">

  <layers.marker @location={{emberConfLocation}} as |marker|>
    <marker.popup>
      <h3>The Oregon Convention Center</h3>
      777 NE Martin Luther King Jr Blvd<br>
      Portland, OR 97232
    </marker.popup>
  </layers.marker>

  <layers.marker @location={{hotel}} as |marker|>
    <marker.popup>
      <h3>Hotel</h3>
    </marker.popup>
  </layers.marker>

</LeafletMap>
```

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
