# Actions and interaction

Often you will need to capture interaction on your map. Ember-leaflet sends
actions based on the corresponding leaflet events (and there are a lot of them!). Ember-leaflet
embraces DDAU _(Data Down Actions Up)_ philosophy of Ember 2.0+, so data flow
is always unidirectional and explicit.

In other words, if you want to change the map state, just change the data you provide
to ember-leaflet components. However, when a certain state is changed by a component
(say, the map's center coordinates), ember-leaflet won't update your data. Instead
you can use an action to update the data yourself. Maximum flexibility.

<DocsDemo as |demo|>
  <demo.example @name="actions.hbs">

    <p>Latitude: <Input @value={{this.lat}}/> / Longitude: <Input @value={{this.lng}}/></p>

    <LeafletMap @lat={{this.lat}} @lng={{this.lng}} @zoom={{this.zoom}} @onMoveend={{this.updateCenter}} as |layers|>
      <layers.tile @url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
    </LeafletMap>

  </demo.example>

  <demo.snippet @name="actions.hbs"/>
  <demo.snippet @name="actions.js"/>
</DocsDemo>

Here we used the action `@onMoveend` that triggers when the map stops to move.
In this action we update our controller variables which are bound the the inputs. Notice how
when you change the inputs, the map changes its state! This gives us the flexibility to
do whatever we need when the user interacts with the map.

Currently, **all actions get the leaflet raw event passed in**.
