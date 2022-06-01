# They're just templates!

That's right. You still get to use all of your template powers. We can render
layers, just like we can render anything else. Let's check out some ways to use
`{{#if}}` and `{{#each}}`.

<DocsDemo as |demo|>
  <demo.example @name="just-templates.hbs">
    <p><label><Input @type="checkbox" @checked={{this.nightMode}}/> Night mode</label></p>

    <LeafletMap @lat={{this.lat}} @lng={{this.lng}} @zoom={{this.zoom}} as |layers|>

      {{#if this.nightMode}}
        <layers.tile @url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"/>
      {{else}}
        <layers.tile @url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
      {{/if}}

      {{#each this.restaurants as |r|}}
        <layers.marker @lat={{r.lat}} @lng={{r.lng}} @draggable={{true}} @onDragend={{fn this.updateLocation r}} as |marker|>
          <marker.popup @popupOpen={{readonly r.isOpen}}>
            <h3><Input @value={{r.name}}/></h3>
            Rating: {{r.rating}}/5
          </marker.popup>
        </layers.marker>
      {{/each}}

      <layers.polygon @locations={{this.dangerZone}} @color="red" as |polygon|>
        <polygon.tooltip @sticky={{true}}>
          DANGER ZONE
        </polygon.tooltip>
      </layers.polygon>

    </LeafletMap>

    <h3>Portland Restaurants</h3>
    <ul>
      {{#each this.restaurants as |r|}}
        <li>
          <strong>{{r.name}}</strong><br>
          Lat: <Input @value={{r.lat}}/>
          Lng: <Input @value={{r.lng}}/>
          <label><Input @type="checkbox" @checked={{r.isOpen}}/> Popup open?</label>
        </li>
      {{/each}}
    </ul>
  </demo.example>

  <demo.snippet @name="just-templates.hbs"/>
  <demo.snippet @name="just-templates.js"/>
</DocsDemo>


Try to drag the markers, edit restaurant names and switch "Night mode". Confirm
that the data flows normally. All of this is done through normal Ember usage.

Ok, I was going to explain, but I think you can figure this yourself. After all,
this is just regular handlebars and Ember. Loops, conditionals, actions,
bindings, computed properties, components. "You'll feel at home", that's what
was promised. Delivered.
