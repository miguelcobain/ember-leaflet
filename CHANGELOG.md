# ember-leaflet changelog

### 3.0.18
- [BUGFIX] `icon` and `div-icon` helpers now use proper objects (this makes the library compatible with old versions of leaflet) ([e53fd87](https://github.com/miguelcobain/ember-leaflet/commit/e53fd8745470435f8c86e1f3c5002ca6201360c0))
- [ENHANCEMENT] bump ember/ember-cli and dependencies ([c03e628](https://github.com/miguelcobain/ember-leaflet/commit/c03e628a2aece9e1b9da1eb6a30862d87508038f))

### 3.0.17
- [ENHANCEMENT] add interactive layer ([3b61eef](https://github.com/miguelcobain/ember-leaflet/commit/3b61eef7bb3785b97e8a1123beb0b3e639c96ea6))
- [ENHANCEMENT] add video layer ([367284a](https://github.com/miguelcobain/ember-leaflet/commit/367284aa4d67105f2499aca8ddc4e58d8bd350bf))

### 3.0.16
- [ENHANCEMENT] add `interactive` property to marker-layer ([cae4497](https://github.com/miguelcobain/ember-leaflet/commit/cae4497f582a42f917d9ffad480ab8b97b6a51e1))

### 3.0.15
- [DEPRECATION] fix set computed deprecation and remove getowner polyfill ([aca7659](https://github.com/miguelcobain/ember-leaflet/commit/aca7659f7b3eb42575fc7a3f7c2abac6e692c595))
- [ENHANCEMENT] add `noRedraw` property to tile-layer ([#198](https://github.com/miguelcobain/ember-leaflet/pull/198))

### 3.0.14
- [BUGFIX] change ember-invoke-action to caret dependency ([#185](https://github.com/miguelcobain/ember-leaflet/pull/185))
- [BUGFIX] fix initializer when using older versions of ember-cli-babel ([#190](https://github.com/miguelcobain/ember-leaflet/pull/190))

### 3.0.13
- [ENHANCEMENT] add `moveend` event to marker-layer ([#174](https://github.com/miguelcobain/ember-leaflet/pull/174))
- [BUGFIX] fix issue with fastboot and overlay layers ([5c7ec67](https://github.com/miguelcobain/ember-leaflet/commit/5c7ec673feee378a88a60592718b82e97e91b3eb))

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
