define([
  'underscore',
  'marionette',
  'text!apps/navbar/tmpl/item.html'
], function(_, Marionette, ItemTemplate) {

  return Marionette.ItemView.extend({

    tagName: 'li',

    template: _.template(ItemTemplate),

  });

});