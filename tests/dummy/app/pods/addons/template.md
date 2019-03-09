<section class="docs-container docs-pt-8">

# Addons

Why addons for an addon?

There is a lot of room for customization and new functionality in ember-leaflet.
However, that functionality may not be desirable to be included in every ember-leaflet
project, or it may just be too specific for a certain scenario.
Leaflet plugins are good candidates for ember-leaflet addons.

This concept follows the lead of the great [ember-power-select](http://www.ember-power-select.com) and [ember-cli-deploy](http://ember-cli.github.io/ember-cli-deploy/).

This addon list is auto generated from npm registry. If you made an addon and want it to show up here checkout
the instructions {{#docs-link "docs.addons"}}here{{/docs-link}}.

### Addons:

<ul>
{{#each model as |addon|}}
  <li><a href={{addon.repo}} class="docs-md__a">{{addon.name}}</a> - {{addon.description}}</li>
{{/each}}
</ul>

</section>
