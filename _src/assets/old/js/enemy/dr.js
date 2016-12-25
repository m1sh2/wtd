'use strict';
// Draw

(function(wtd, win, doc, $){
  wtd.drEnemies = function(){
    var debug = ['drEnemies'];
    debug.push(wtd.ENYS.length);
    for(var i=0;i<wtd.ENYS.length;i++){
      var id = wtd.ENYS[i];
      wtd.drEnemy(wtd.ENY[id]);
      // debug.push(ENY[id]);
    }
    wtd.debug(debug);
  }

  wtd.drEnemy = function(o){
    //var weapons = objs.filter(function(obj){return obj.type==='weapon'});
    var x1 = o.x;
    var y1 = o.y;
    
    if(o.y+o.h<wtd.sets.h-160-4){
      o.y = o.y+o.speed/10;
    }else{
      if(o.timer<=0){
        o.timer = o.timer0;
      }else if(o.timer===o.timer0){
        wtd.BASE.life = wtd.BASE.life - o.damage;
      }else{
        o.timer = o.timer-1000/wtd.fps;
      }
    }
    
    if(wtd.BASE.life<0){
      wtd.BASE.life = 0;
    }
    
    for(var k=0;k<wtd.wpnsCurrent.length;k++){
      var wpn = wtd.wpnsCurrent[k];
      var x0 = wpn.x;
      var y0 = wpn.y;
      var r = wpn.r;
      if(Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0))<r
        //&& o.life>=0
        && wpn.timer>=wpn.timer0
      ){
        // if(!wpn.snd.paused){
          // wpn.snd.pause();
        // }
        wpn.snd.currentTime = 0;
        wpn.snd.play();
        setTimeout(function(){
          wpn.snd.pause();
        },1000);
        var xw = x0;
        var yw = y0;
        var len = Math.sqrt(Math.pow((x1-xw),2)+Math.pow((y1-yw),2));
        var bullet = {
          id:wtd.id(),
          x:xw,
          y:yw,
          x0:xw,
          y0:yw,
          w:5,
          h:5,
          color:'#ff0000',
          speed:50,
          life:100,
          type:'bullet',
          len0:len,
          len1:len,
          timer:500,
          timer0:500,
          target:{
            x:x1,
            y:y1
          },
          opacity:1
        };
        wtd.BULL.push(bullet);
        o.life = o.life - wpn.damage;
        if(o.life<=0){
          wtd.ENYS.splice(wtd.ENYS.indexOf(o.id),1);
          //delete ENY[o.id];
          //ENYS = ENYS.filter(function(obj){
          //  return obj!==o.id
          //});
          wtd.sets.money += o.points;
          wtd.mnyEarned += o.points;
        }
        
        wpn.timer = wpn.timer-1000/wtd.fps;
        var dx = x1 - xw;
        var dy = y1 - yw;
        wpn.angle = Math.atan(dy/dx)*180/Math.PI;
      }else{
        //o.l -= 1;
      }
    }
    
    wtd.ctx.beginPath();
    //var img = new Image();
    //img.src = 'img/enemy1.png';
    //ctx.drawImage(img,o.x,o.y);
    wtd.ctx.fillStyle = o.color;
    //ctx.arc(o.x, o.y, o.w, 0, 2*Math.PI);
    wtd.ctx.fill();
    wtd.ctx.fillRect(o.x-o.w/2, o.y-o.h/2, o.w, o.h);
    wtd.ctx.closePath();
    
    var w = 10;
    var h = 2;
    var x = o.x - w/2;
    var life = o.life*w/o.life0;
    if(life<0){
      life = 0;
    }
     
    wtd.ctx.beginPath();
    wtd.ctx.fillStyle = wtd.lifeColor0;
    wtd.ctx.fillRect(x, o.y-15, w, h);
    
    wtd.ctx.fillStyle = wtd.lifeColor;
    wtd.ctx.fillRect(x, o.y-15, life, h);
    wtd.ctx.closePath();
    //ctx.fillStyle = o.color;
    //ctx.fillRect (o.x, o.y, o.w, o.h);
  }
})(WTD, window, document, jQuery)


















