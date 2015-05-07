/*jshint globalstrict: true*/
var allTestFiles = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Test\.js$/.test(file)) {
      allTestFiles.push(file);
    }
  }
}

require.config({
  // Karma serves files under /base, which is the basePath from your karma.conf.js
  baseUrl: '/base/build/client',

  paths: {
    jquery        : 'utils/jquery',
    underscore    : 'utils/underscore',
    backbone      : 'utils/backbone',
    socketIO      : 'utils/socket.io',
    text          : 'utils/text',
    js            : 'js/',
    router        : 'js/router',
    login         : 'js/login',
    models        : 'js/models',
    views         : 'js/views',
    templates     : 'js/templates'
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff Karma, as it is asynchronous
  callback: window.__karma__.start
});
