// Generated by CoffeeScript 1.7.1
define(['underscore', 'marionette', 'text!apps/account/tabs/tmpl/tabs.html'], function(_, Marionette, TabsTemplates) {
  return Marionette.ItemView.extend({
    template: _.template(TabsTemplates),
    setCurrent: function(appName) {
      appName = appName.replace('.', '-');
      $('#tabs-' + appName).tab('show');
    }
  });
});
