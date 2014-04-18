define([
  'underscore',
  'marionette',
  'app',
  'text!apps/account/orgtree/tmpl/left_item.html',
], function(_, Marionette, App, ItemTemplates) {

  return Marionette.CompositeView.extend({

    template: _.template(ItemTemplates),

    tagName: "ul",

    initialize: function() {
      // grab the child collection from the parent model
      // so that we can render the collection as children
      // of this parent node
      this.collection = this.model.nodes;
      this.on('click:icon', function(args){
        App.vent.trigger('click:icon', args);
      });
    },

    triggers: {
      'click .icon-plus': 'click:icon',
      'click .icon-minus': 'click:icon'
    },


    appendHtml: function(collectionView, itemView, index) {
      // ensure we nest the child list inside of 
      // the current list item
      collectionView.$("li:first").append(itemView.el);
    }

  });

});