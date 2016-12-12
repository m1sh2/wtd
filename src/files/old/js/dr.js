'use strict';
// Draw

(function(wtd, win, doc, $){
  wtd.dr = function(){
    var debug = ['dr'];

    wtd.drClear();
    
    wtd.drBullets();
    wtd.drBase();
    wtd.drEnemies();
    
    wtd.debug(debug);
  }

  wtd.drClear = function(){
    wtd.ctx.clearRect(0, 0, wtd.canvas.width, wtd.canvas.height);
    wtd.ctx.beginPath();
    //ctx.save();
    //ctx.translate(o.x,o.y);
    //var img = new Image();
    //img.src = 'img/grass4.png';
    //var pat=ctx.createPattern(img,'repeat');
    //ctx.rect(0,0,canvas.width,canvas.height);
    //ctx.fillStyle=pat;
    //ctx.fill();
    wtd.ctx.fillStyle = 'rgba(0,120,0,0)';
    wtd.ctx.fillRect(0,0,wtd.canvas.width,wtd.canvas.height);
    //ctx.restore();
    wtd.ctx.closePath();
  }
})(WTD, window, document, jQuery)


















