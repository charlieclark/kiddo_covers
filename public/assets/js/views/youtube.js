/*global define*/
define( function (require) {

	//dependencies
	var $ 				= require('jquery');
	var _ 				= require('underscore');
	var Backbone 		= require('backbone');

	//utils
	var Youtube			= require('utils/youtube');

	//templates
	var customTemplate = require('text!templates/youtube.html');


	'use strict';

	//the view
	var AppView = Backbone.View.extend({

		el: "#youtubePlayer",

		template : _.template(customTemplate),

		events:{
			
		},

		//private vars
		playerId : "myPlayer",
		apiKey : "AIzaSyDvOYZWSKt0fcDnVn7uj3-KAIFprqChLmY",
		self:null,
		youtubeIdArray: [],
		curVideoIndex: 0,
		startVideo : null,

		initialize : function(){
			self = this;
			this.startVideo = this.options.startVideo;

			this.render();
			this.loadPlaylist();
			console.log(this.options.startVideo)
			
		},

		//setters

		changeVideo : function(dir){
			if( dir == -1 && this.curVideoIndex <= 0 )
				return;
			else if( dir == 1 && this.curVideoIndex >= this.youtubeIdArray.length)
				return;

			this.curVideoIndex = this.curVideoIndex + dir;

			this.playVideo(this.curVideoIndex);
		},

		loadPlaylist : function() {

			var pID = "PLEC422D53B7588DC7";
			var apiKey = this.apiKey;
			var url = "https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId="+pID+"&key=" + apiKey;

			$.getJSON( url , function( json ) {

			   var videos = json.items;

				for( var i = 0 ; i < videos.length ; i++) {
					var vID = videos[i].contentDetails.videoId;
					self.youtubeIdArray.push(vID);

					//if start video matches an id, start with this video
					if(self.startVideo && self.startVideo == vID){
						self.curVideoIndex = i;
					}
				}

			   self.startPlayingVideos();
			   
			 });
		},

		startPlayingVideos : function() {

			Youtube.createPlayer({
				el:this.$el.find(".view"),
				uniqueID : this.playerId
			});

			this.playVideo(this.curVideoIndex);
		},

		playVideo : function(index) {

			//playing video
			var id = this.youtubeIdArray[index];
			Youtube.changeVideo(this.playerId, id);
			this.getVideoDetails(id);
		},

		getVideoDetails: function(id) {
			var apiKey = this.apiKey;
			var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+id+"&key=" + apiKey;
			$.getJSON( url , function( json ) {
				var data = json.items[0].snippet;
				var date = new Date(data.publishedAt);
				var title = data.title
				console.log(date , title);		   
			 });
		},

		render: function(){
			this.$el.html(this.template({}));
		}
	});

	return AppView;
});
