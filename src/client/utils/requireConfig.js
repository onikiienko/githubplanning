'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	},
	paths: {
		jquery: 'utils/jquery',
		underscore: 'utils/underscore',
		backbone: 'utils/backbone',
		oauth: 'utils/oauth.min',
		text: 'utils/text',
		isMobile: 'utils/isMobile',
		fontawesome: 'utils/font/css/font-awesome.min',
		models: 'js/models',
		views: 'js/views',
		login: 'js/login',
		router: 'js/router',
		js: 'js',
		templates: 'js/templates'
	}
})