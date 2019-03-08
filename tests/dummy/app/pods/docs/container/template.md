# The container

Think of your map as a set of layers inside a container. Your main container will
be the component `<LeafletMap>`. This component creates the map container
where your tiles, vectors and markers will be added to. Let's see how it looks:

**This example looks "broken", but that is intended. Please keep reading.**

{{#docs-demo as |demo|}}
  {{#demo.example name="container.hbs"}}
    <LeafletMap @lat={{lat}} @lng={{lng}} @zoom={{zoom}}>
      {{!-- Specify child layer components here --}}
    </LeafletMap>
  {{/demo.example}}

  {{demo.snippet "container.hbs"}}
  {{demo.snippet "container.js"}}
{{/docs-demo}}

Notice that we specified the center of the map and its zoom level passing regular
properties to the component, bound to the controller. You can check what options each component supports
in the "Components" section of the docs. Here `lat`, `lng` and `zoom`
are arguments that the component `<LeafletMap>` supports.

**Reminder: The leaflet map container needs to be styled to have some size.**
If you don't see any container at all, that's probably because you forgot to style it.
You can target leaflet containers in css using the `.leaflet-container`
class or providing an `id` or `class` attribute in your `<LeafletMap>`
component.

Ok, we have a leaflet default container, but it's empty. That won't get us anywhere,
but this is expected since we never specified any child layers, right? Let's see how to do it.
