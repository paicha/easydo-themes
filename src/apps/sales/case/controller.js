// Generated by CoffeeScript 1.7.1
define(['underscore', 'marionette', 'backbone', 'app', 'apps/sales/case/content_view'], function(_, Marionette, Backbone, App, ContentView) {
  var controller;
  controller = {
    caseApp: function() {
      var contentview;
      contentview = new ContentView();
      App.pagecontent.show(contentview);
    }
  };
  return controller;
});
