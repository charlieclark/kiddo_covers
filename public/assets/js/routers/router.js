/*global define*/
define( function (require) {

	//dependencies
	var $ 				= require('jquery');
	var _ 				= require('underscore');
	var Backbone 		= require('backbone');

	'use strict';

	console.log("ROUTER IS LOADED")

	var AppRouter = Backbone.Router.extend({

		curVideo: null,

		routes: {
			"v/:id": "getVideo",
			"*actions" : "defaultRoute"
		}
	});

	var app_router = new AppRouter;

	app_router.on('route:getVideo' , function(actions) {
		app_router.curVideo = actions;
	});

	app_router.on('route:defaultRoute' , function(actions) {
		console.log(actions);
	});

	Backbone.history.start();

	return app_router;
});
