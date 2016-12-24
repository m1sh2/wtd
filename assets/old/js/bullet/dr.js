'use strict';
// Draw

(function(wtd, win, doc, $){
  wtd.drBullets = function(){
    for(var i=0;i<wtd.BULL.length;i++){
      wtd.drBullet(wtd.BULL[i]);
    }
  }

  wtd.drBullet = function(o){
    

    //if(o.timer>0){
    //  objs[j].timer = o.timer-1000/fps;
    //}else{
    //  objs[j].timer = o.timer0;
    //}
    
    //if(o.len1>0){
    //  ctx.beginPath();
    //  ctx.fillStyle = o.color;
    //  ctx.arc(o.x, o.y, o.w, 0, 2*Math.PI);
    //}
    
    //ctx.fill();
    //ctx.closePath();
    
    switch(o.type){
      case 'bullet':
        if(o.len1>0){
          o.len1 = o.len1-o.speed;
          var xy = wtd.getXY({
            x:o.x0,
            y:o.y0
          },{
            x:o.target.x,
            y:o.target.y
          },((o.len0-o.len1)/o.len0));
          
          //var xy = {x:150,y:300};
          o.x = xy.x;
          o.y = xy.y;
        }else if(o.len1<=0){
          wtd.BULL = wtd.BULL.filter(function(obj){
            return obj.id!==o.id
          });
          return false
        }
        
        o.opacity = o.opacity-0.2;
        
        wtd.ctx.beginPath();
        wtd.ctx.moveTo(o.x0,o.y0);
        wtd.ctx.lineTo(o.target.x,o.target.y);
        wtd.ctx.fillStyle = 'rgba(0,0,0,0)';
        wtd.ctx.strokeStyle = 'rgba(255,255,255,'+o.opacity+')';
        wtd.ctx.lineWidth = 0.5;
        wtd.ctx.stroke();
        wtd.ctx.closePath();
        break;
      
      case 'explode':
        wtd.ctx.beginPath();
        wtd.ctx.fillStyle = o.color;
        wtd.ctx.arc(o.x, o.y, o.r, 0, 2*Math.PI);
        wtd.ctx.strokeStyle = 'rgba(255,0,0,0.6)';
        wtd.ctx.lineWidth = 2;
        wtd.ctx.stroke();
        wtd.ctx.fill();
        wtd.ctx.closePath();
        o.r = o.r+o.speed;
        break;
    }
  }
})(WTD, window, document, jQuery)


















