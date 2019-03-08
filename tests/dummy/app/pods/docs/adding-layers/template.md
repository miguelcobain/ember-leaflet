# Adding layers

A map is only interesting with layers to represent some information. The most obvious
layer you will probably want is the tile layer. In fact it is so obvious that we tend
to forget it is a layer like any other.

Ember-leaflet provides the `<layers.tile>` component that enables you
to create tile layers. This is raster data, so you'll need a tile layer server
that provides them for you.
<a class="docs-md__a" href="http://wiki.openstreetmap.org/wiki/Tiles#Servers" target="_blank" rel="noopener">
Here are some free tile layer servers you can use.</a> Let's use some cool tiles
from CartoDB and see how it looks.

{{#docs-demo as |demo|}}
  {{#demo.example name="adding-layers-tile.hbs"}}
    <LeafletMap @lat={{lat}} @lng={{lng}} @zoom={{zoom}} as |layers|>
      <layers.tile @url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
    </LeafletMap>
  {{/demo.example}}

  {{demo.snippet "adding-layers-tile.hbs"}}
  {{demo.snippet "container.js"}}
{{/docs-demo}}

Neat. We have tiles, can move the map around and have the default leaflet controls.
Not bad for three lines of code. Let's now try to add some markers in it.

{{#docs-demo as |demo|}}
  {{#demo.example name="adding-layers-markers.hbs"}}
    <LeafletMap @lat={{lat}} @lng={{lng}} @zoom={{zoom}} as |layers|>

      <layers.tile @url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>

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
  {{/demo.example}}

  {{demo.snippet "adding-layers-markers.hbs"}}
  {{demo.snippet "adding-layers.js"}}
{{/docs-demo}}

So, there are two important things to notice here:

1. We now used a different notation to represent the coordinates. Instead of using
`lat` and `lng` we used a `[lat, lng]`. You
can use these two notations interchangeably.

2. Did you notice how we used `<marker.popup>` inside `<layers.marker>`'s
block to specify our popup text?
Go ahead and click the markers. It feels Ember and it feels natural.
Why not a form in a popup? A component? Why not `{{outlet}}`? Possibilities
are endless.
