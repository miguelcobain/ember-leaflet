# ember-leaflet changelog

### master
- [ENHANCEMENT] add `moveend` event to marker-layer ([#174](https://github.com/miguelcobain/ember-leaflet/pull/174))

### 3.0.12
- [ENHANCEMENT] Expose option 'className' for TileLayer ([#151](https://github.com/miguelcobain/ember-leaflet/pull/151))
- [BUGFIX] Fix geoJson layer updates ([#153](https://github.com/miguelcobain/ember-leaflet/pull/153))
- Prepare for FastBoot 1.0. Update ember-cli and other dependencies. ([#163](https://github.com/miguelcobain/ember-leaflet/pull/163))

### 3.0.11
- [ENHANCEMENT] leaflet-map: pass more options and observe `minZoom`, `maxZoom` ([#142](https://github.com/miguelcobain/ember-leaflet/pull/142), [#144](https://github.com/miguelcobain/ember-leaflet/pull/144))
- [DEPRECATION] [ENHANCEMENT] image-layer: `imageUrl` attribute is deprecated in favor of the observed `url` attribute ([#143](https://github.com/miguelcobain/ember-leaflet/pull/143))
- [ENHANCEMENT] Public components, the `toLatLng` macro and the `Leaflet` library itself are now exported by this addon ([#141](https://github.com/miguelcobain/ember-leaflet/pull/141))
- [ENHANCEMENT] leaflet is now pulled from npm instead of bower ([#145](https://github.com/miguelcobain/ember-leaflet/pull/145))

### 3.0.10
- [BUGFIX] Allow `rootURL` to be an empty string. Try to mimic the same defaults as ember-cli.
- [ENHANCEMENT] Add exclude options for leaflet dependencies ([#134](https://github.com/miguelcobain/ember-leaflet/pull/134))
- [ENHANCEMENT] bump ember-get-config to be compatible with ember 2.12
- [ENHANCEMENT] upgrade ember-cli version and other version bumps

### 3.0.9
- [BUGFIX] moved ember-get-config dependency to `dependencies`

### 3.0.8
- [ENHANCEMENT] ember-leaflet is now fastboot compatible! ([#125](https://github.com/miguelcobain/ember-leaflet/pull/125))

### 3.0.7
- updated ember-composability-tools to version `0.0.6`
- updated ember-wormhole to version `0.5.1`

### 3.0.6
- updated ember-composability-tools to version `0.0.5`

### 3.0.5
- [BUGFIX] tooltips with permanent=true now work properly ([#111](https://github.com/miguelcobain/ember-leaflet/issues/111))

### 3.0.4
- [BUGFIX] contextual components now correctly use `parentComponent` instead of `containerLayer`([#115](https://github.com/miguelcobain/ember-leaflet/pull/115))
- [BUGFIX] `circle-marker` contextual component was `circle-layer` and not `circle-marker-layer`
- [ENHANCEMENT] added `wms-tile` and `geojson` contextual components. `wmsTile` and `geoJSON` are still provided for backwards compatibility reasons. Contextual component names should have the same name as non-contextuals without the `-layer` suffix.

### 3.0.3 (November 2, 2016)
- [ENHANCEMENT] update ember-composability-tools (related https://github.com/miguelcobain/ember-composability-tools/issues/2)

### 3.0.2 (October 20, 2016)
- [BUGFIX] geojson-layer now supports popups and tooltips
- [ENHANCEMENT] nested addon/engines support for asset import ([#107](https://github.com/miguelcobain/ember-leaflet/pull/107))
- [INTERNAL] Use ember-composability-tools!

### 3.0.1 (October 13, 2016)
- [BUGFIX] Set icon default imagePath according to ENV.rootURL, ENV.baseURL ([#105](https://github.com/miguelcobain/ember-leaflet/pull/105))

### 3.0.0 (September 28, 2016)
- [BUGFIX] compatible with leaflet 1 final
- [BREAKING] popups are no longer defined as a block of a `{{#marker-layer` or any path-layer.
  You now must use `{{#popup-layer` instead. e.g:
```hbs
{{#marker-layer location=emberConfLocation}}
  {{#popup-layer}}
    Popup content
  {{/popup-layer}}
{{/marker-layer}}
```
- [FEATURE] there is now a `{{#tooltip-layer` that works when using leaflet 1
