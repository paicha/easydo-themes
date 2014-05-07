// Generated by CoffeeScript 1.7.1
define(['app', 'marionette', 'apps/desks/page_nav/controller', 'apps/desks/disk/app', 'apps/desks/todo/app'], function(App, Marionette, Controller, DiskApp, TodoApp) {
  var DesksApp;
  DesksApp = App.module('DesksApp', {
    startWithParent: false
  });
  DesksApp.on('start', function() {
    var controller;
    controller = new Controller();
    controller.showPageNav(App.pageleft);
    DesksApp.on('app:desks:started', controller.setCurrentApp, controller);
  });
  DesksApp.on('stop', function() {
    App.pagetabs.reset();
    App.pageleft.reset();
    App.pageright.reset();
    DesksApp.currentApp = '';
  });
  DesksApp.startSubApps = function(appName) {
    var currentApp;
    currentApp = App.module(appName);
    if (DesksApp.currentApp === currentApp) {
      return;
    }
    if (DesksApp.currentApp) {
      DesksApp.currentApp.stop();
    }
    DesksApp.currentApp = currentApp;
    currentApp.start();
    DesksApp.trigger('app:desks:started', appName);
  };
  return DesksApp;
});
