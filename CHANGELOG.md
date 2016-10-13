# ember-leaflet changelog

### 3.0.1 (October 13, 2016)
- [BUGFIX] Set icon default imagePath according to ENV.rootURL, ENV.baseURL ([#105](https://github.com/miguelcobain/ember-leaflet/pull/105))

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
