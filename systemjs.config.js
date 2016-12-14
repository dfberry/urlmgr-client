/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/',
      'bin:': 'bin/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.min.js',

      // other libraries
      'rxjs':          'npm:rxjs',
      '@ngrx/core':    'npm:@ngrx/core',
      '@ngrx/store':   'npm:@ngrx/store',
      '@ngrx/store-devtools': 'npm:@ngrx/store-devtools',
      '@ngrx/store-log-monitor': 'npm:@ngrx/store-log-monitor',
      
      'valid-url':     'npm:valid-url',
      'jquery':        'npm:jquery',
      'bootstrap':    "npm:bootstrap",
      'angular2-datatable': 'npm:angular2-datatable',
      'lodash':       'npm:lodash',

      // my libraries - commonjs
      'json':         'bin:utils'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
                app: {
                  main: './main.js',
                  defaultExtension: 'js'
                },
                rxjs: {
                  main: './bundles/Rxjs.min.js',
                  defaultExtension: 'js'
                },
                '@ngrx/core': {
                  main: 'bundles/core.min.umd.js',
                  format: 'cjs'
                },
                '@ngrx/store': {
                  main: 'bundles/store.min.umd.js',
                  format: 'cjs'
              },
                '@ngrx/store-devtools': {
                  main: 'bundles/store-devtools.min.umd.js',
                  format: 'cjs'
              },               
              '@ngrx/store-log-monitor': {
                  main: 'bundles/store-log-monitor.min.umd.js',
                  format: 'cjs'
              },              
                'valid-url':{
                  main: './index.js',
                  defaultExtension:'js'
                },
              'jquery':{
                  main:'./dist/jquery.min.js',
                  defaultExtensions: 'js'
              },
              'json':{
                main: './index.js',
                defaultExtension: 'js',
                format: 'cjs'
              },
              'bootstrap':{
                main: './dist/js/bootstrap.min.js'
              },
              'lodash':{
                main:'./lodash.min.js',
                defaultExtension:'js'
              },
              'angular2-datatable':{
                main:'./index.js',
                defaultExtension:'js'
              }
    }

  });
})(this);
