# ember-leaflet changelog

### Un-released
#### Added
- support for Ember Fastboot by
  - adding `fastboot-filter-initializers` to allow the initializer to only run in the browser
  - added guard in `index.js` so Leaflet is not loaded in Fastboot (node) environment
  - made `L` a computed property in `BaseLayer`
  - updated `this.L.` to `this.get('L')...`

### 3.0.0 (September 28, 2016)
- [BUGFIX] compatible with leaflet 1 final
- [BREAKING] popups are no longer defined as a block of a `{{#marker-layer` of any path-layer.
  You now must use `{{#popup-layer` instead. e.g:
```hbs
{{#marker-layer location=emberConfLocation}}
  {{#popup-layer}}
    Popup content
  {{/popup-layer}}
{{/marker-layer}}
```
- [FEATURE] there is now a `{{#tooltip-layer` that works when using leaflet 1
