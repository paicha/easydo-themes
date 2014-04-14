require.config({

  deps: ['app'],

  paths: {
    // folders
    libs: 'libs',

    // libs
    text: 'libs/text',
    jquery: 'libs/jquery',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    marionette: 'libs/backbone.marionette',
    bootstrap: 'libs/bootstrap',
    localStorage: 'libs/backbone.localStorage',
    babysitter: 'libs/backbone.babysitter',
    compute: 'libs/backbone.compute',
    routefilter: 'libs/backbone.routefilter'
  },

  shim: {
    underscore: {
      exports: '_',
      init: function() {
        this._.templateSettings = {
          evaluate: /\{\{#([\s\S]+?)\}\}/g, // {{# console.log("meh") }}
          interpolate: /\{\{[^#\{]([\s\S]+?)[^\}]\}\}/g, // {{ title }}
          escape: /\{\{\{([\s\S]+?)\}\}\}/g, // {{{ title }}}
        };
        return _;
      }
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['backbone', 'localStorage','routefilter'],
      exports: 'Marionette'
    },
    bootstrap: {
      deps: ['jquery']
    }
  }

});

// start App
require([
  'backbone',
  'underscore',
  'bootstrap',
  'app',
  'apps/navbar/app',
  'apps/desks/app',
  'apps/sales/app',
], function(Backbone, _, bootstrap, App, NavbarApp, DesksApp, SalesApp) {

  require(['compute']);
  App.addInitializer(function() {
    NavbarApp.start();
  });

  App.start();
});