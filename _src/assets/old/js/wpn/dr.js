'use strict';
// Draw

(function(wtd, win, doc, $){
  wtd.drWeapon = function(o){
    var debug = ['drWeapon'];
    
    if(o.timer<=0){
      o.timer = o.timer0;
    }else if(o.timer<o.timer0){
      o.timer = o.timer-1000/wtd.fps;
    }
    
    if(!wtd.playing){
      wtd.ctx.beginPath();
      wtd.ctx.fillStyle = 'rgba(255,255,255,0.1)';
      wtd.ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      wtd.ctx.lineWidth = 4;
      wtd.ctx.arc(o.x, o.y, o.r, 1*Math.PI, 2*Math.PI);
      wtd.ctx.fill();
      wtd.ctx.stroke();
      wtd.ctx.closePath();
    }
    
    wtd.drWpn(o);
    wtd.debug(debug);
  }

  wtd.drWpn = function(o){
    var x = o.x;
    var y = o.y;
    var angle = 0;
    var debug = ['drWpn'];
    var color1 = '';
    var color2 = '';
    var color3 = '';
    var color4 = '';
    var color5 = '';

    if(o.angle>0){
      angle = (o.angle+270)*Math.PI/180;
    }else{
      angle = (o.angle+90)*Math.PI/180;
    }
    
    wtd.ctx.save();
    
    wtd.ctx.translate(x,y);
    wtd.ctx.rotate(angle);
    
    var grda = wtd.ctx.createRadialGradient(0,0,1,1,1,16);
    grda.addColorStop(0,o.c2);
    grda.addColorStop(1,o.c3);
    
    var grdl = wtd.ctx.createLinearGradient(-2,0,2,0);
    grdl.addColorStop(0,o.c5);
    grdl.addColorStop(0.5,o.c6);
    grdl.addColorStop(1,o.c5);

    wtd.ctx.beginPath();
    wtd.ctx.fillStyle = o.c1;
    wtd.ctx.arc(0,0,14,1*Math.PI,3*Math.PI);
    wtd.ctx.fill();
    wtd.ctx.closePath();
    
    wtd.ctx.beginPath();
    wtd.ctx.fillStyle = grdl;
    wtd.ctx.fillRect(-2, -30, 4, 20);
    wtd.ctx.closePath();
    
    wtd.ctx.beginPath();
    wtd.ctx.fillStyle = grda;
    wtd.ctx.arc(0,0,10,1*Math.PI,3*Math.PI);
    wtd.ctx.fill();
    wtd.ctx.closePath();

    wtd.ctx.beginPath();
    wtd.ctx.fillStyle = o.c4;
    wtd.ctx.fillRect(0, 0, 6, 6);
    wtd.ctx.closePath();

    wtd.ctx.beginPath();
    wtd.ctx.fillStyle = o.c4;
    wtd.ctx.arc(-5,-2,4,1*Math.PI,3*Math.PI);
    wtd.ctx.fill();
    wtd.ctx.closePath();
    
    debug.push(angle);
    debug.push(o.angle);

    //var xx = 0;
    //if(o.angle<30){
    //  xx = 32;
    //}else if(o.angle<60){
    //  xx = 64;
    //}else if(o.angle<90){
    //  xx = 96;
    //}
    //var img = new Image();
    //img.src = 'img/'+o.img;
    //ctx.drawImage(img,-Math.round(o.w/2), -Math.round(o.h/2));
    //ctx.drawImage(img,xx,0,32,32,-(o.w/2),-(o.h/2),32,32);
    //draw(ctx);
    wtd.ctx.restore();
    
    wtd.debug(debug);
  }

  wtd.drAddWeapons = function(x,y){
    //stp();
    
    var debug = [];
    var pos;
    var wpnsSize = Object.keys(wtd.wpns).length;
    debug.push(x);
    debug.push(y);
    wtd.BASE.wpns.forEach(function(wpn){
      debug.push(wpn.x+'-'+wpn.y);
      if(x<=wpn.x+10
        && x>=wpn.x-10
        && y<=wpn.y+10
        && y>=wpn.y-10
      ){
        pos = wpn;
      }
    });
    
    if(!!pos){
      wtd.stp();
      wtd.ctx.beginPath();
      wtd.ctx.fillStyle = 'rgba(255,255,255,0.1)';
      wtd.ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      wtd.ctx.arc(pos.x, pos.y, 10, 1*Math.PI, 3*Math.PI);
      wtd.ctx.fill();
      wtd.ctx.stroke();
      wtd.ctx.closePath();
      
      var wpnsW = wpnsSize*wtd.ww*2;
      var wpnsH = wtd.wh*2;
      var wpnsX = pos.x-wpnsW/2;
      var wpnsY = pos.y-wpnsH*2;
      
      wtd.ctx.beginPath();
      wtd.ctx.moveTo(wpnsX+wpnsW/2,wpnsY+wtd.wh*2);
      wtd.ctx.lineTo(pos.x,pos.y-10);
      wtd.ctx.stroke();
      
      if(wpnsX+wpnsW>wtd.sets.w){
        wpnsX = wtd.sets.w-wpnsW-10;
      }else if(wpnsX<0){
        wpnsX = 10;
      }
      
      var wpnx = wpnsX;
      var wpny = wpnsY;
      
      for(var i in wtd.wpns){
        var wpn = wtd.wpns[i];
        var wp = Object.assign({},wpn);
        
        debug.push(wp.img);
        wtd.ctx.beginPath();
        wtd.ctx.fillStyle = 'rgba(0,0,0,0.2)';
        wtd.ctx.fillRect(wpnx,wpny,wtd.ww*2,wtd.wh*2);
        wtd.ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        wtd.ctx.lineWidth = 2;
        wtd.ctx.strokeRect(wpnx,wpny,wtd.ww*2,wtd.wh*2);
        wtd.ctx.closePath();
        
        $('body').append('<span style="'
          +'left:'+wpnx+'px;'
          +'top:'+wpny+'px;'
          +'" class="wpn-sel-props">'
          +'☄ '+wp.damage+'<br>'
          +'☉ '+wp.r+'<br>'
          +'⚟ '+1000/wp.timer0+'/s<br>'
          +'⛃ '+wp.cost
          +'</span>');
        
        wp.x = wpnx+wtd.ww/2*3;
        wp.y = wpny+wtd.wh;
        wtd.drWpn(wp);
        
        wtd.CLICK.push({
          type:'selWpn',
          x:wpnx+wtd.ww,
          y:wpny+wtd.wh,
          w:wtd.ww,
          h:wtd.wh,
          wpnType:i,
          pos:pos.pos
        });
        wpnx = wpnx+wtd.ww*2;
      }
    }
    
    wtd.debug(debug);
  }
})(WTD, window, document, jQuery)


















