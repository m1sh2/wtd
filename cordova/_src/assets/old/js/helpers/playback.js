'use strict';

(function(wtd, win, doc, $){
  wtd.newStart = function(){
    wtd.started = true;
    wtd.mnyEarned = 0;
    wtd.getDefault();
    wtd.getBase();
    wtd.BASE.wpns.forEach(function(wp){
      wtd.WPOS['p'+wp.pos] = '';
    });

    wtd.ENY = {};
    wtd.ENYS = [];
    for(var i=0;i<wtd.waves.length;i++){
      var y = -10;
      for(var k=0;k<wtd.waves[i].length;k++){
        var nWv = wtd.waves[i][k];
        var count = nWv.count;
        var x = 0;
        
        //var perRow = count/4;
        for(var j=0;j<count;j++){
          var nEny = Object.assign({},wtd.enemy[nWv.type]);
          if(x+wtd.sets.w/nEny.mpr+10>=wtd.sets.w){
            y = y-20;
            x = wtd.sets.w/nEny.mpr-nEny.w/2;
          }else{
            x = x + wtd.sets.w/nEny.mpr-nEny.w/2;
          }
          
          var idEnemy = wtd.id();
          nEny.id = idEnemy;
          nEny.x = wtd.randRange(x-nEny.w*0.5,x+nEny.w*0.5);
          nEny.y = wtd.randRange(y-nEny.w*0.5,y+nEny.w*0.5);
          nEny.speed = wtd.randRange(nEny.speed-nEny.speed*0.1,nEny.speed+nEny.speed*0.1);
          
          wtd.ENY[idEnemy] = nEny;
          wtd.ENYS.push(idEnemy);
        }
      }
    }
    wtd.dr();
    wtd.stp();
  }

  wtd.st = function(start){
    var debug = ['st'];
    clearTimeout(wtd.t);
    $('#start').hide();
    $('#stop').show();
    start = typeof start === 'undefined' ? false : start;
    if(start){
      wtd.timer = 0;
      wtd.playing = true;
    }else{
      wtd.timer = wtd.timer + 1000/wtd.fps;
    }
    debug.push(wtd.playing);
    //if(timer>2000){
    //  wave.push(wave[wave.length-1]+1);
    //  timer = 0;
    //}
    debug.push('BASE life:'+wtd.BASE.life);
    debug.push('ENYS length:'+wtd.ENYS.length);
    if(wtd.BASE.life>0 && wtd.ENYS.length>0){
      wtd.dr();
      wtd.t = setTimeout(wtd.st, 1000/wtd.fps);
    }else if(wtd.BASE.life<=0){
      wtd.drBase();
      wtd.stp();
      wtd.popup({
        title:'Game Over',
        msg:'Your base was destroyed',
        type:'game-over'
      });
      debug.push('Game Over');
    }else if(wtd.ENYS.length===0){
      wtd.drBase();
      wtd.stp();
      wtd.popup({
        title:'Victory',
        msg:'You earned ⛃'+wtd.mnyEarned,
        type:'game-victory'
      });
      debug.push('Game Victory');
    }
    wtd.debug(debug);
  }

  wtd.stp = function(){
    wtd.debug('stp');
    $('#start').show();
    $('#stop').hide();
    clearTimeout(wtd.t);
    wtd.playing = false;
    wtd.drBase();
  }
})(WTD, window, document, jQuery)













