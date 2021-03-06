/*global module*/
console.log('HI!');
module.exports = function(config) {
  config.set({
    basePath: '',

    // "requirejs" must come before "chai" or Chai will not load properly.
    // Sidenote: Karma loads the listed frameworks backwards.
    frameworks: ['mocha', 'requirejs', 'chai', 'sinon'],

    // Contrary to what a few stackoverflow and github issue responses
    // suggested, the order of files do not appear to matter at all.
    files: [
      'build/**/tests/testRunner.js',

      // app files
      {pattern: 'build/**/*.html', included: false},
      {pattern: 'build/**/*.map', included: false},
      {pattern: 'build/**/*.js', included: false},
    ],

    preprocessors: {},

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: true
  });
};
