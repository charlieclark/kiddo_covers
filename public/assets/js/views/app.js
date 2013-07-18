/*global define*/

define( function (require) {

	//dependencies
	var $ 				= require('jquery');
	var _ 				= require('underscore');
	var Backbone 		= require('backbone');

	//utils
	var Preload 		= require('utils/preload');

	//router for deeplinking
	var Router 			= require('routers/router');
	

	//data
						  require('data/copyData');

	//import views etc.
	var youtubeView		= require('views/youtube');



	'use strict';

	//the view
	var AppView = Backbone.View.extend({

		el: "#myApp",

		viewObj:{},

		events:{
			"click .big-change-button" : "changeVideo"
		},

		changeVideo : function(e) {

			var el = $(e.target);
			var dir = null;

			if(el.hasClass("left"))
				dir = -1
			else
				dir = 1;

			this.viewObj["youtube"].changeVideo(dir)
		},

		initialize : function(){

			var videoID = Router.curVideo ? Router.curVideo : null;

			this.viewObj["youtube"] = new youtubeView({
				startVideo : videoID
			});

			// console.log(Router.curVideo);
		}

	});

	return AppView;
});
