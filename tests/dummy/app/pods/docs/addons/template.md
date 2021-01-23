# Addons

Leaflet has many plugins and they provide very useful features for your maps.
To use them in ember-leaflet, the community created ember addons that extend ember-leaflet
functionality, usually using some of those Leaflet plugins under the hood. A list of those addons can be found
in the {{#docs-link "addons"}}addons page{{/docs-link}}.

## Using an addon

As an example, let's take `ember-leaflet-marker-cluster` addon. You can install it by running:

```bash
ember install ember-leaflet-marker-cluster
```

This addon will register a new `<layers.marker-cluster>` component and you can use it like in the following example:

{{#docs-demo as |demo|}}
{{#demo.example name="marker-cluster.hbs"}}

    <LeafletMap @lat={{this.lat}} @lng={{this.lng}} @zoom={{this.zoom}} as |layers|>

      <layers.tile @url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>

      <layers.marker-cluster as |cluster|>
        {{#each this.markers as |m|}}
          <cluster.marker @location={{m.location}} as |marker|>
            <marker.popup>
              <h3>{{m.title}}</h3>
              {{m.description}}
            </marker.popup>
          </cluster.marker>
        {{/each}}
      </layers.marker-cluster>

    </LeafletMap>

{{/demo.example}}

{{demo.snippet "marker-cluster.hbs"}}
{{demo.snippet "marker-cluster.js"}}
{{/docs-demo}}

## Creating an addon

### Showing up on ember-leaflet addons page

The ember-leaflet {{#docs-link "addons"}}addons page{{/docs-link}} automatically fetches npm packages that meet
these criteria:

1. the package name must start with `ember-leaflet-`
2. it must contain the `ember-leaflet` keyword on the `package.json` file
3. the link to the repository should be correctly filled in on the `package.json` file

### Integration with `<LeafletMap>` component

It is very common for addons to add new kinds of layers, like we've just seen with
`ember-leaflet-marker-cluster`. In order for `<LeafletMap>` component to yield your custom component
you need to register it on the included ember-leaflet service in an instance initializer.

Here is an example of the instance initializer that `ember-leaflet-marker-cluster` uses
to register its `marker-cluster` component:

```js
// addon/instance-initializers/register-component.js
export function initialize(appInstance) {
  // first we lookup the ember leaflet service
  let emberLeafletService = appInstance.lookup('service:ember-leaflet');

  // to support older versions of ember-leaflet that do not include the service, we add a guard here
  if (emberLeafletService) {
    // we then invoke the `registerComponent` method
    emberLeafletService.registerComponent('marker-cluster-layer', { as: 'marker-cluster' });
  }
}

export default {
  initialize
};
```

The `registerComponent` method accepts two arguments:

- the component name
- an options object. Only the `as` option is supported at the moment. The `as` option is the name
  under which the component will yielded as from the `<LeafletMap>` component.

### Setting up the a new layer's template

If you're extending from `BaseLayer` (or another layer that extends from it), you might have to set up some boilerplate
on your template. This is required because in glimmer components and octane we don't have observers. So that means
that observing values requires the usage of [`ember-render-helpers`](https://github.com/buschtoens/ember-render-helpers), which
requires the template (better solutions are welcome).

Check the `BaseLayer`'s template on github for more information on what the `BaseLayer` does by default.

### Including the leaflet plugin

Your addon should be responsible for including the necessary leaflet plugin, either using
[ember-auto-import](https://github.com/ef4/ember-auto-import) or importing it by customizing your `index.js` file.
Please user other ember-leaflet addons as a reference.
