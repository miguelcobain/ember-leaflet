# Overview

Web apps frequently need to display geographic data, especially if it has a direct
relationship with the real world. That isn't new, and has been done previously in
all kinds of formats, particularly with raster and vector data.

Ember apps naturally may have the same requirements and until now, devs have been
either using mapping libraries outside of ember scope, or using previous versions of ember-leaflet.

The problem was that both approaches were hard. Frequently existing libraries have
regular javascript imperative APIs and html in mind. We all know and love how ember
makes us flow the data in our app. Previous approaches simply didn't fit where
ember really shines: templates, actions, routing, and above all, expressiveness.

**Ember-leaflet allows you to express your maps right in your templates.**
Also, it is streamlined for ember in general. You have things like actions, components and the
ability to use regular handlebars helpers like `{{#if` or `{{#each`.

We can't go wrong with delegating the mapping part to the battle tested, performant
and lightweight <a class="docs-md__a" href="http://leafletjs.com/">Leaflet</a> library.

So, let the mapping begin.
