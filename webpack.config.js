var Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('web/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .autoProvidejQuery()
    .autoProvideVariables({
        "window.jQuery": "jquery",
        "window.Bloodhound": require.resolve('bloodhound-js'),
        "jQuery.tagsinput": "bootstrap-tagsinput"
    })
    .enableSassLoader()
    .enableVersioning(false)
    .createSharedEntry('js/common', [
      'jquery',
      'datatables.net',
      'datatables.net-bs',
      'datatables.net-autofill/js/dataTables.autoFill',
      'datatables.net-autofill-bs/js/autoFill.bootstrap',
      'axios'
    ])
    .addEntry('js/app', './assets/js/app.js')
    .addEntry('js/login', './assets/js/login.js')
    .addEntry('js/admin', './assets/js/admin.js')
    .addEntry('js/search', './assets/js/search.js')
    .addEntry('js/admin_post_list', './assets/js/admin_post_list.js')
    .addStyleEntry('css/app', [
      './assets/scss/app.scss',
      'datatables.net-autofill-bs/css/autoFill.bootstrap.css',
    ])
    .addStyleEntry('css/admin', ['./assets/scss/admin.scss'])
    .enableVueLoader()
;

module.exports = Encore.getWebpackConfig();
