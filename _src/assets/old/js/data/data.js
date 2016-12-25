'use strict';

(function(wtd, win, doc, $){
  wtd.speed = 5;
  wtd.t;
  wtd.fps = 20;
  wtd.timer = 0;
  wtd.lifeColor = 'rgba(255,0,0,1)';
  wtd.lifeColor0 = 'rgba(0,0,0,0.2)';
  wtd.canvas = doc.getElementById('action');
  wtd.ctx = wtd.canvas.getContext("2d");
  wtd.ctx.imageSmoothingEnabled = true;
  wtd.ctx.webkitImageSmoothingEnabled = true;
  wtd.ctx.mozImageSmoothingEnabled = true;

  wtd.playing = false;
  
  wtd.sets = {};
  wtd.sets.points = 0;
  wtd.sets.money = 9999;

  wtd.sets.w = $(doc).width();
  wtd.sets.h = $(doc).height();

  wtd.CLICK = [];

  wtd.default = {};
})(WTD, window, document, jQuery)






















