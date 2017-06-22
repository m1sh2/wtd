'use strict';
// Draw

(function(wtd, win, doc, $){
  wtd.drBase = function(){
    var o = wtd.BASE;
    var debug = ['drBase',wtd.BASE.lvl];
    //$('#debug').html('drBase'+o.lvl+' '+objs.length);
    //var baseCurrent = o.lvls[o.lvl];
    
    //ctx.beginPath();
    //ctx.save();
    //ctx.translate(o.x,o.y);
    //var img = new Image();
    //img.src = 'img/'+BASE.img;
    //var pat = ctx.createPattern(img,'repeat');
    //ctx.rect(0,0,o.w,o.h);
    //ctx.fillStyle=pat;
    //ctx.fill();
    //ctx.restore();
    //ctx.closePath();
    
    var life = o.life/o.life0*100;
    if(life<0){
      life = 0;
    }
    
    $('#money').html(wtd.mny(wtd.sets.money));
    $('#lifenumber').html(o.life);
    $('#life').width(life + '%');
    $('#base')[0].className = '';
    $('#base').addClass('base-'+(wtd.BASE.lvl+1));
    
    if(wtd.wpnsCurrent.length){
      for(var i=0;i<wtd.wpnsCurrent.length;i++){
        var wpnBase = wtd.wpnsCurrent[i];
        wtd.drWeapon(wpnBase);
      }
    }
    wtd.debug(debug);
  }
})(WTD, window, document, jQuery)


















