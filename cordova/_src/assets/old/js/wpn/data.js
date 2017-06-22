'use strict';

(function(wtd, win, doc, $){
  wtd.ww = 40;
  wtd.wh = 40;
  wtd.WPOS = {};
  wtd.wpns = {};
  wtd.max = {
    r:wtd.sets.w,
    damage:250,
    timer:20
  };

  wtd.wpns.t1 = {
    id:wtd.id(),
    x:150,
    y:350,
    w:wtd.ww,
    h:wtd.wh,
    color:'rgba(255,0,0,1)',
    speed:10,
    life:100,
    type:1,
    r:wtd.round(wtd.sets.w/2),
    timer:500,
    timer0:500,
    damage:50,
    name:'main',
    angle:90,
    img:'wpn1.svg',
    cost:50,

    // Colors
    // Base
    c1:'#ff2a2a',

    // Cover
    c2:'#ffaaaa',
    c3:'#ff5555',
    c4:'#666',

    // Barrel
    c5:'#333',
    c6:'#999'
  };

  wtd.wpns.t2 = {
    id:wtd.id(),
    x:50,
    y:350,
    w:32,
    h:32,
    color:'rgba(255,255,0,1)',
    speed:10,
    life:100,
    type:2,
    r:wtd.round(wtd.sets.w/3),
    timer:100,
    timer0:100,
    damage:10,
    name:'left',
    angle:90,
    img:'wpn2.svg',
    cost:25,
    
    // Colors
    // Base
    c1:'#d4aa00',

    // Cover
    c2:'#ffeeaa',
    c3:'#ffcc00',
    c4:'#666',

    // Barrel
    c5:'#333',
    c6:'#999'
  };

  wtd.wpns.t3 = {
    id:wtd.id(),
    x:250,
    y:350,
    w:32,
    h:32,
    color:'rgba(255,0,255,1)',
    speed:10,
    life:100,
    type:3,
    r:wtd.round(wtd.sets.w/4),
    timer:50,
    timer0:50,
    damage:5,
    name:'right',
    angle:90,
    img:'wpn3.svg',
    cost:15,
    
    // Colors
    // Base
    c1:'#3771c8',

    // Cover
    c2:'#afc6e9',
    c3:'#5599ff',
    c4:'#666',

    // Barrel
    c5:'#333',
    c6:'#999'
  };

  wtd.wpnsCurrent = wtd.getWpns();
})(WTD, window, document, jQuery)






















