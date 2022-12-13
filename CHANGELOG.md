# ember-leaflet changelog

### 5.0.2

- fix incorrect `_close()` call on leaflet 1.8.0. Update project for leaflet 1.8.0 compatibility. ([6ab9646](https://github.com/miguelcobain/ember-leaflet/commit/6ab9646a07765db7ef98313929a07538a215cc3f))

### 5.0.1

- fix rendering on fastboot (fixes [#676](https://github.com/miguelcobain/ember-leaflet/issues/676))

### 5.0.0

- Upgrade to glimmer components
- drop ember-truth-helpers or dependency (fixes [#636](https://github.com/miguelcobain/ember-leaflet/issues/636))
- bump many dependencies

### 4.1.1

- [BUGFIX] Leaflet icon/draggability restore bug, dragging object can be undefined for hidden markers ([7d5c9fe](https://github.com/miguelcobain/ember-leaflet/commit/79b320738ae5867ba9f4c6452db1ed985b73880d) fixes [#513](https://github.com/miguelcobain/ember-leaflet/issues/513))
- [INTERNAL] update dependencies and tests. fix linting errors. ([ec49f63](https://github.com/miguelcobain/ember-leaflet/commit/e2590a3e69dd10637f3287f0bbc2f36e4d5d5f0d))

### 4.1.0

- [ENHANCEMENT] add new rectangle layer ([#413](https://github.com/miguelcobain/ember-leaflet/pull/413))
- [BUGFIX] only one addon component was being yielded. Now all addon provided components are yielded as expected ([#422](https://github.com/miguelcobain/ember-leaflet/pull/422))

### 4.0.2

- [ENHANCEMENT] add `crossOrigin` option to tile layer ([84dc3fe](https://github.com/miguelcobain/ember-leaflet/commit/84dc3fed8c0480169d74ccedd84f3afabd3ce85c))

### 4.0.1

- [INTERNAL] update blueprint to install latest leaflet ([2d398db](https://github.com/miguelcobain/ember-leaflet/commit/2d398dbe575bef3563c0ff6e7cd578321ac7b803))

### 4.0.0

- [BREAKING] drop support for ember versions < 2.3.0-beta.1 ([7d5c9fe](https://github.com/miguelcobain/ember-leaflet/commit/7d5c9fe39b6e2c20d74632f886ca15ed873a6875))
- [INTERNAL] update dependencies ([ec49f63](https://github.com/miguelcobain/ember-leaflet/commit/ec49f63837f724643303d71ef63f5c6f5b3edf8b))
- [BUGFIX] run initializer code only if leaflet's-L variable is present ([#367](https://github.com/miguelcobain/ember-leaflet/pull/367))

### 3.1.4

- [BUGFIX] Fix integration in lazy engines >= 0.8 ([#364](https://github.com/miguelcobain/ember-leaflet/pull/364))

### 3.1.3

- [INTERNAL] update dependencies ([102b793](https://github.com/miguelcobain/ember-leaflet/commit/102b7939a9b780193cad326ce45813338f1630a7))
- [INTERNAL] remove `.volatile()` usage ([1bcbd59](https://github.com/miguelcobain/ember-leaflet/commit/1bcbd596881f724255de87e76ad5df7eb91772fe))

### 3.1.2

- [BUGFIX] yield built-in layer components when no addon components are registered ([06a862a](https://github.com/miguelcobain/ember-leaflet/commit/06a862a956910fa76c91faa402a66f6bc6b5d495))

### 3.1.1

- [ENHANCEMENT] default blueprint now installs leaflet `^1.4.0` ([eff95e1](https://github.com/miguelcobain/ember-leaflet/commit/eff95e1fe78629ec7c3106ac33333ffb3a896397))
- [INTERNAL] use `{{#let` instead of `{{#with` (`{{#with` will be deprecated) [628dccf](https://github.com/miguelcobain/ember-leaflet/commit/628dccff543b4ceb4a98fe43d0b446df05e70be0)

### 3.1.0

- [INTERNAL] update ember-cli project and all dependencies
- [INTERNAL] new website
- [BUGFIX] fix integration with marker cluster plugin (fixes [#160](https://github.com/miguelcobain/ember-leaflet/pull/160))
- [BUGFIX] Prevent error happening when \_removeStyleObservers is called multiple times (fixes [#152](https://github.com/miguelcobain/ember-leaflet/issues/152))
- [BUGFIX] prevent error when using a large amount of tooltips (fixes [#138](https://github.com/miguelcobain/ember-leaflet/pull/138))
- [BUGFIX] `style` property on geojson-layer is now correctly bound (fixes [#181](https://github.com/miguelcobain/ember-leaflet/issues/181))
- [BUGFIX] updating the style properties on the geojson-layer now works (fixes [#154](https://github.com/miguelcobain/ember-leaflet/pull/154))
- [ENHANCEMENT] add ember-leaflet service that allows addons to register additional components for leaflet-map component to yield ([3591a4a](https://github.com/miguelcobain/ember-leaflet/commit/3591a4a0c09b0f95a87b45f753d76c27a3f9d679))

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

- [INTERNAL] updated ember-composability-tools to version `0.0.6`
- [INTERNAL] updated ember-wormhole to version `0.5.1`

### 3.0.6

- [INTERNAL] updated ember-composability-tools to version `0.0.5`

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
