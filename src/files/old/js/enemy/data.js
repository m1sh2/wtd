'use strict';

(function(wtd, win, doc, $){
  wtd.objs = [];
  wtd.waves = [
    [
      {type:'e1',count:40},
      {type:'e2',count:18},
      {type:'e3',count:3}
    ]
  ];
  wtd.wave = [0];
  wtd.ENY = {};
  wtd.ENYS = [];
  wtd.LVL = {};
  wtd.LVLS = [];
  wtd.LVL.l1 = {
    wv:wtd.waves
  };

  wtd.enemy = {};
  wtd.enemy.e1 = {
    id:wtd.id(),
    x:0,
    y:0,
    w:10,
    h:6,
    color:'yellow',
    speed:10,
    life:20,
    life0:20,
    type:'enemy',
    wave:0,
    damage:1,
    timer:1000,
    timer0:1000,
    points:2,
    mpr:10 // max per row
  };

  wtd.enemy.e2 = {
    id:wtd.id(),
    x:0,
    y:0,
    w:20,
    h:45,
    color:'blue',
    speed:20,
    life:50,
    life0:50,
    type:'enemy',
    wave:0,
    damage:10,
    timer:1000,
    timer0:1000,
    points:10,
    mpr:6 // max per row
  };

  wtd.enemy.e3 = {
    id:wtd.id(),
    x:0,
    y:0,
    w:50,
    h:50,
    color:'red',
    speed:5,
    life:200,
    life0:200,
    type:'enemy',
    wave:0,
    damage:30,
    timer:1000,
    timer0:1000,
    points:40,
    mpr:3 // max per row
  };
})(WTD, window, document, jQuery)






















