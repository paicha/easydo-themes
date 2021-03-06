define [
    'app'
    'marionette'
    'apps/sales/tabs/controller'
    'apps/sales/case/app'
], (App, Marionette, Controller, CaseApp) ->

    SalesApp = App.module 'SalesApp', startWithParent: false

    SalesApp.on 'start', ->
        controller = new Controller()
        controller.showTabs App.pagetabs
        SalesApp.on 'app:desks:started', controller.setCurrentApp, controller

    SalesApp.on 'stop', ->
        App.pagetabs.reset()
        # 清空记录的当前应用
        SalesApp.currentApp = ''

    SalesApp.startSubApps = (appName) ->
        currentApp = App.module(appName)
        if SalesApp.currentApp is currentApp then return
        if SalesApp.currentApp then SalesApp.currentApp.stop()
        SalesApp.currentApp = currentApp
        currentApp.start()
        SalesApp.trigger 'app:desks:started', appName

    SalesApp