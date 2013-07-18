
//global function called by youtube api

function onYouTubeIframeAPIReady() {
  $(window).trigger(YOUTUBE_READY);
}

var YOUTUBE_READY = "youTubeReady"; 

//begin module here
define(function(require) {


  var $         = require('jquery');

  var self = {};

  //player obj
  // var player = true;

  //progress
  // var progressTimer = null;
  // var curProgLevel = 0;

  //other vars
  var youTubeReady = false;
  var videoArray = null;
  var youtubeQueue = [];
  var youtubePlayers = [];

  self.init = function(_videoArray) {

    videoArray = _videoArray;

    initYTPLayer();


    $(window).on(YOUTUBE_READY , function(){
      youTubeReady = true;
      checkQueue();
    })

    return self;
  };

  self.createPlayer=function(ytObj){
      createPlayer(ytObj)
  }

  self.changeVideo = function(uniqueID , videoID){
    youtubePlayers[uniqueID].playVideo(videoID);
  }

  //youtube stuff
  function initYTPLayer() {

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  function checkQueue(){
    if(youtubeQueue.length > 0){
      for( var i = 0 ; i < youtubeQueue.length ; i++) {
        youtubeQueue[i].ready();
      }
    }
  }

  function createPlayer(ytObj){
    var tPlayer = new YTPlayerClass(ytObj.el , ytObj.uniqueID);
    youtubePlayers[ytObj.uniqueID] = tPlayer;

    if(youTubeReady)
      tPlayer.ready();
    else
      youtubeQueue.push(tPlayer);
  }

  



  

  //youtube player class
  function YTPlayerClass( el , uniqueID , _config){
    var self = this;

    var myPlayer = null;

    var isReady = false;
    var playerReady = false;
    var queuedVideo = null;

    var config = {
        'modestbranding': 1,
        'rel': 0,
        'showinfo': 0,
        'color': "white",
        'theme': "light",
        'frameborder': 0
      }

    self.init = function(){

      for(key in _config){
        config[key] = _config[key];
      }

      buildPlayer();

      return self;
    }

    self.playVideo = function(url){
      if(playerReady)
        playVideo(url)
      else
        queuedVideo = url;
    }

    self.ready = function(){

      isReady = true;

      buildPlayer();

    }

    function buildPlayer(){
      $(el).append($('<div>', {
      'id' : 'yt-video-container-' + uniqueID,
      'class' : 'yt-video-container'
      }));

      var tempPlayer = new YT.Player('yt-video-container-' + uniqueID, {
      // height: '100%',
      // width: '100%',
      playerVars: config ,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onEnded' : onEnded
      }
    });
    }

    function onPlayerReady(event) {
      myPlayer = event.target;
      playerReady = true;
      if(queuedVideo)
        playVideo(queuedVideo);
    }

    function onEnded(event) {
    }

    function onPlayerStateChange(event) {
    }

    function playVideo(url) {
      
      videoStopped = false;
      myPlayer.loadVideoById(url);

    }

    function stopVideo() {
      videoStopped = true;
      curProgLevel = 0;
      clearInterval(progressTimer);
      player.pauseVideo();
    }

    return self.init();

  }


  return self.init();

  // function initProgress() {
  //  if(progressTimer)
  //    clearInterval(progressTimer);

  //  var progressIncArray = [.25 , .50 , .75 , .99]

  //  progressTimer = setInterval(function() {


  //    if(length != 0)
  //    {
  //      var ratio = player.getCurrentTime() / length;
  //      var highestRatio = null;

  //      for(var i = 0 ; i < progressIncArray.length ; i++)
  //      {
  //        var curInc = progressIncArray[i];
  //        if (ratio > curInc)
  //        {
  //          highestRatio = curInc
  //        }
  //      }

  //      if(highestRatio > curProgLevel)
  //      {
  //        curProgLevel = highestRatio;

  //        var correctedRatio = !!(curProgLevel == .99)? 1 : curProgLevel;

  //        console.log(correctedRatio);
  //      }
  //    }

  //  } , 100)
  // }

  //        console.log(correctedRatio);
  //      }
  //    }

  //  }, 100)
  // }

});
