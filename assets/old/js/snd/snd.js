'use strict';
// Sound

(function(wtd, win, doc, $){
  var sbg = new Audio('./audio/tone1.mp3');
  sbg.loop = true;
  //var sbg = new Audio('./audio/shot.wav');

  wtd.snd = {
    bg: {
      play: function(){
        //var sbg = document.getElementById('bg');
        sbg.currentTime = 0;
        sbg.play();
        $('.audiopause').hide();
        $('.audioplay').show();
        //setTimeout(function(){
        //  sbg.pause();
        //},1000);
        //sbg.play();
        //sbg.src = 'music_2.mp3';
        //audio.play();
        //var audio = document.createElement('audio');
        //audio.src = './audio/tone1.mp3';
        //var soundcv = document.body;
        //soundcv.appendChild(audio);
        //sbg.play();
      },
      pause: function(){
        sbg.pause();
        $('.audiopause').show();
        $('.audioplay').hide();
      }
    },
    shot: {
      play: function(){
        //var sshot = new Audio('./audio/shot.wav');
        //sshot.play();
        sbg.currentTime = 0;
        sbg.play();
        setTimeout(function(){
          sbg.pause();
        }, 1000);
      },
      pause: function(){
        sshot.pause();
      }
    },
    dead: {
      play: function(){
        var sdead = $('#dead')[0];
        sdead.play();
      },
      pause: function(){
        sdead.pause();
      }
    }
  }
})(WTD, window, document, jQuery)
















