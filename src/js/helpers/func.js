'use strict';

(function(wtd, win, doc, $){
  wtd.getXY = function(start,end,percent) {
    var dx = end.x-start.x;
    var dy = end.y-start.y;
    var X = start.x + dx*percent;
    var Y = start.y + dy*percent;
    return {x:X,y:Y};
  }

  wtd.wv = function(){
    wtd.wave.push(wtd.wave[wtd.wave.length-1]+1);
    if(wtd.wave<=wtd.waves){
      setTimeout(wtd.wv, 1000);
    }
  }

  wtd.fr = function(){
    wtd.debug('fr');
    var bullet = {
      id:wtd.id(),
      x:wtd.sets.w/2,
      y:(wtd.sets.h-160)/2,
      r:5,
      color:'rgba(255,0,0,0.3)',
      speed:5,
      life:100,
      type:'explode',
      timer:500,
      timer0:500,
      opacity:1
    };
    wtd.BULL.push(bullet);
  }

  wtd.rc = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  wtd.id = function() {
    var letters = '0123456789ABCDEF'.split('');
    var id = '';
    for (var i = 0; i < 12; i++ ) {
      id += letters[Math.floor(Math.random() * 16)];
    }
    return id;
  }

  wtd.randRange = function(min, max) {
    var r = min+Math.random()*(max-min);
    r = Math.round(r); 
    return r;
  } 

  wtd.upgrade = function(){
    var msg = {};

    msg.title = 'Upgrade';

    msg.msg = $('<div/>');
    var base = $('<div/>');
    var wpns = $('<div/>');
    var wall = $('<div/>');

    var baseTtl = $('<span/>');
    var wpnsTtl = $('<span/>');
    var wallTtl = $('<span/>');

    baseTtl.html('Base');
    wpnsTtl.html('Weapons');
    wallTtl.html('Wall');

    base.append(baseTtl);
    wpns.append(wpnsTtl);
    wall.append(wallTtl);

    msg.msg.append(base);
    msg.msg.append(wpns);
    msg.msg.append(wall);

    wtd.popup(msg);
  }

  wtd.mny = function(num){
    num = num.toString();
    var newNum = '';
    for(var i = num.length - 1, j = 0; i >= 0; i--, j++){
      if(j>=3){
        newNum += '.';
        j = 0;
      }
      newNum += num[i];
    }
    num = '';
    for(var i = newNum.length - 1; i >= 0; i--){
      num += newNum[i];
    }
    return num;
  }

  wtd.round = function(n){
    return Math.round(n/10)*10;
  }
})(WTD, window, document, jQuery)













