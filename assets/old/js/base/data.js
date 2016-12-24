'use strict';

(function(wtd, win, doc, $){
  
  wtd.base = {
    id:wtd.id(),
    x:0,
    y:wtd.sets.h - 100,
    w:wtd.sets.w,
    h:100,
    color:'rgba(50,50,0,1)',
    life:200,
    life0:200,
    type:'base',
    lvl:0,
    lvls:[
      // {
      //   life:200,
      //   wpns:[
      //     {x:xw*4+30,y:yw,pos:1},
      //     {x:xw*8+30,y:yw,pos:3}
      //   ],
      //   img:'base1.jpg'
      // },
      // {
      //   life:200,
      //   wpns:[
      //     {x:xw*4+30,y:yw,pos:1},
      //     {x:30,y:yw,pos:2},
      //     {x:xw*8+30,y:yw,pos:3}
      //   ],
      //   img:'base1.jpg'
      // },
      // {
      //   life:300,
      //   wpns:[
      //     {x:xw*4+30,y:yw,pos:1},
      //     {x:30,y:yw,pos:2},
      //     {x:xw*8+30,y:yw,pos:3},
      //     {x:xw*2+30,y:yw,pos:4},
      //     {x:xw*6+30,y:yw,pos:5}
      //   ],
      //   img:'base2.jpg'
      // },
      // {
      //   life:500,
      //   wpns:[
      //     {x:xw*4+30,y:yw,pos:1},
      //     {x:30,y:yw,pos:2},
      //     {x:xw*8+30,y:yw,pos:3},
      //     {x:xw*2+30,y:yw,pos:4},
      //     {x:xw*6+30,y:yw,pos:5},
      //     {x:xw*1+30,y:yw,pos:6},
      //     {x:xw*7+30,y:yw,pos:7}
      //   ],
      //   img:'base3.jpg'
      // },
      // {
      //   life:800,
      //   wpns:[
      //     {x:xw*4+30,y:yw,pos:1},
      //     {x:30,y:yw,pos:2},
      //     {x:xw*8+30,y:yw,pos:3},
      //     {x:xw*2+30,y:yw,pos:4},
      //     {x:xw*6+30,y:yw,pos:5},
      //     {x:xw*1+30,y:yw,pos:6},
      //     {x:xw*7+30,y:yw,pos:7},
      //     {x:xw*3+30,y:yw,pos:8},
      //     {x:xw*5+30,y:yw,pos:9}
      //   ],
      //   img:'base4.jpg'
      // },
      // {
      //   life:1300,
      //   wpns:[
      //     {x:xw*4+30,y:yw,pos:1},
      //     {x:30,y:yw,pos:2},
      //     {x:xw*8+30,y:yw,pos:3},
      //     {x:xw*2+30,y:yw,pos:4},
      //     {x:xw*6+30,y:yw,pos:5},
      //     {x:xw*1+30,y:yw,pos:6},
      //     {x:xw*7+30,y:yw,pos:7},
      //     {x:xw*3+30,y:yw,pos:8},
      //     {x:xw*5+30,y:yw,pos:9},
      //     {x:xw*4+30,y:yw+30,pos:10},
      //   ],
      //   img:'base5.jpg'
      // }
    ]
  };

  var xw = wtd.sets.w/6;
  var yw = wtd.sets.h-134;
  
  wtd.base.lvls.push({
    life:200,
    wpns:[
      {x:xw*1,y:yw,pos:1},
      {x:xw*2,y:yw,pos:2},
      {x:xw*3,y:yw,pos:3},
      {x:xw*4,y:yw,pos:4},
      {x:xw*5,y:yw,pos:5}
    ],
    img:'base1.jpg'
  });

  wtd.base.life0 = wtd.base.lvls[wtd.base.lvl].life;
  wtd.base.life = wtd.base.life0;
  wtd.baseWpnPos = {
    w:40,
    h:40
  };
})(WTD, window, document, jQuery)






















