/**
 * @author: @AngularClass
 */
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
require('protractor/built/logger').Logger.logLevel = 1;
require('ts-node/register');
var helpers = require('./helpers');

exports.config = {

  baseUrl: 'http://localhost:3000/',

  // use `npm run e2e`
  specs: [
    helpers.root('src/app/**.e2e.ts'),
    helpers.root('src/app/*.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000,    
    print: function () {
    }
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['no-sandbox']
    }
  },

  onPrepare: function () {
    browser.ignoreSynchronization = true;
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      },
      summary: {
        displayDuration: false
      }
    }));
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
  useAllAngular2AppRoots: true,

  plugins: [{
    package: 'protractor-console',
    logLevels: ['debug', 'info', 'warning', 'severe']
  }]
};