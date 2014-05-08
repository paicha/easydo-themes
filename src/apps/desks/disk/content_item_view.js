// Generated by CoffeeScript 1.7.1
define(['underscore', 'marionette', 'text!apps/desks/disk/tmpl/item.html'], function(_, Marionette, ItemTemplate) {
  return Marionette.ItemView.extend({
    tagName: 'tr',
    template: _.template(ItemTemplate),
    triggers: {
      'click .delete': 'file:delete'
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render, this);
      return this.listenTo(this.model, 'destroy', this.render, this);
    }
  });
});