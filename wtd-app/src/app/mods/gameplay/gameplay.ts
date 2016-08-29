'use strict';
// Gameplay

import { Component, OnInit } from '@angular/core';
// import { tone1 } from './audio/tone1'
declare let jQuery: any;

@Component({
  moduleId: module.id,
  templateUrl: './gameplay.html',
  styleUrls: ['./gameplay.css']
})
export class Gameplay {

  // Data
  speed: number;
  t: any;
  fps: number;
  timer: number;
  lifeColor: string;
  lifeColor0: string;
  canvas: any;
  ctx: any;
  playing: boolean;
  sets: any;
  CLICK: Array<any>;
  default: any;
  started: boolean;
  mnyEarned: number;

  // Base
  base: any;
  BASE: any;
  baseWpnPos: any;

  // Bullet
  BULL: Array<any>;
  bullets: Array<any>;

  // Enemy
  objs: Array<any>;
  waves: Array<any>;
  wave: any;
  ENY: any;
  ENYS: Array<any>;
  LVL: any;
  LVLS: Array<any>;
  enemy: any;

  // Sound
  sbg: any;
  snd: any;

  // Weapons
  ww: number;
  wh: number;
  WPOS: any;
  wpns: any;
  max: any;
  wpnsCurrent: any;

  constructor() {
    let self = this;

    // Data
    self.speed = 5;
    self.fps = 30;
    self.timer = 0;
    self.lifeColor = 'rgba(255, 0, 0, 1)';
    self.lifeColor0 = 'rgba(0, 0, 0, 0.2)';

    self.playing = false;
    self.started = false;
    self.mnyEarned = 0;

    self.sets = {};
    self.sets.points = 0;
    self.sets.money = 9999;

    self.sets.w = jQuery(document).width();
    self.sets.h = jQuery(document).height();

    self.CLICK = [];

    self.default = {};

    // Base
    self.base = {
      id: self.id(),
      x: 0,
      y: self.sets.h - 100,
      w: self.sets.w,
      h: 100,
      color: 'rgba(50, 50, 0, 1)',
      life: 200,
      life0: 200,
      type: 'base',
      lvl: 0,
      lvls: []
    };

    let xw = self.sets.w / 6;
    let yw = self.sets.h - 134;

    self.base.lvls.push({
      life: 200,
      wpns: [
        {x: xw * 1, y: yw, pos: 1},
        {x: xw * 2, y: yw, pos: 2},
        {x: xw * 3, y: yw, pos: 3},
        {x: xw * 4, y: yw, pos: 4},
        {x: xw * 5, y: yw, pos: 5}
      ],
      img: 'base1.jpg'
    });

    self.base.life0 = self.base.lvls[self.base.lvl].life;
    self.base.life = self.base.life0;
    self.baseWpnPos = {
      w: 40,
      h: 40
    };

    self.BASE = {};

    // Bullet
    self.BULL = [];
    self.bullets = [];

    // Enemy
    self.objs = [];
    self.waves = [
      [
        {type: 'e1', count: 40},
        {type: 'e2', count: 18},
        {type: 'e3', count: 3}
      ]
    ];
    self.wave = [0];
    self.ENY = {};
    self.ENYS = [];
    self.LVL = {};
    self.LVLS = [];
    self.LVL.l1 = {
      wv: self.waves
    };

    self.enemy = {};
    self.enemy.e1 = {
      id: self.id(),
      x: 0,
      y: 0,
      w: 10,
      h: 6,
      color: 'yellow',
      speed: 10,
      life: 20,
      life0: 20,
      type: 'enemy',
      wave: 0,
      damage: 1,
      timer: 1000,
      timer0: 1000,
      points: 2,
      mpr: 10 // max per row
    };

    self.enemy.e2 = {
      id: self.id(),
      x: 0,
      y: 0,
      w: 20,
      h: 45,
      color: 'blue',
      speed: 20,
      life: 50,
      life0: 50,
      type: 'enemy',
      wave: 0,
      damage: 10,
      timer: 1000,
      timer0: 1000,
      points: 10,
      mpr: 6 // max per row
    };

    self.enemy.e3 = {
      id: self.id(),
      x: 0,
      y: 0,
      w: 50,
      h: 50,
      color: 'red',
      speed: 5,
      life: 200,
      life0: 200,
      type: 'enemy',
      wave: 0,
      damage: 30,
      timer: 1000,
      timer0: 1000,
      points: 40,
      mpr: 3 // max per row
    };

    // Sound
    // self.sbg = new Audio(tone1);
    // self.sbg.loop = true;

    self.snd = {
      bg: {
        play: function() {
          // let sbg = document.getElementById('bg');
          // self.sbg.currentTime = 0;
          // self.sbg.play();
          jQuery('.audiopause').hide();
          jQuery('.audioplay').show();
          // setTimeout(function() {
          //  sbg.pause();
          // }, 1000);
          // sbg.play();
          // sbg.src = 'music_2.mp3';
          // audio.play();
          // let audio = document.createElement('audio');
          // audio.src = './audio/tone1.mp3';
          // let soundcv = document.body;
          // soundcv.appendChild(audio);
          // sbg.play();
        },
        pause: function() {
          // self.sbg.pause();
          jQuery('.audiopause').show();
          jQuery('.audioplay').hide();
        }
      }
    }

    // Weapons
    self.ww = 40;
    self.wh = 40;
    self.WPOS = {};
    self.wpns = {};
    self.max = {
      r: self.sets.w,
      damage: 250,
      timer: 20
    };

    self.wpns.t1 = {
      id: self.id(),
      x: 150,
      y: 350,
      w: self.ww,
      h: self.wh,
      color: 'rgba(255, 0, 0, 1)',
      speed: 10,
      life: 100,
      type: 1,
      r: self.round(self.sets.w / 2),
      timer: 500,
      timer0: 500,
      damage: 50,
      name: 'main',
      angle: 90,
      img: 'wpn1.svg',
      cost: 50,

      // Colors
      // Base
      c1: '#ff2a2a',

      // Cover
      c2: '#ffaaaa',
      c3: '#ff5555',
      c4: '#666',

      // Barrel
      c5: '#333',
      c6: '#999'
    };

    self.wpns.t2 = {
      id: self.id(),
      x: 50,
      y: 350,
      w: 32,
      h: 32,
      color: 'rgba(255, 255, 0, 1)',
      speed: 10,
      life: 100,
      type: 2,
      r: self.round(self.sets.w / 3),
      timer: 100,
      timer0: 100,
      damage: 10,
      name: 'left',
      angle: 90,
      img: 'wpn2.svg',
      cost: 25,

      // Colors
      // Base
      c1: '#d4aa00',

      // Cover
      c2: '#ffeeaa',
      c3: '#ffcc00',
      c4: '#666',

      // Barrel
      c5: '#333',
      c6: '#999'
    };

    self.wpns.t3 = {
      id: self.id(),
      x: 250,
      y: 350,
      w: 32,
      h: 32,
      color: 'rgba(255, 0, 255, 1)',
      speed: 10,
      life: 100,
      type: 3,
      r: self.round(self.sets.w / 4),
      timer: 50,
      timer0: 50,
      damage: 5,
      name: 'right',
      angle: 90,
      img: 'wpn3.svg',
      cost: 15,

      // Colors
      // Base
      c1: '#3771c8',

      // Cover
      c2: '#afc6e9',
      c3: '#5599ff',
      c4: '#666',

      // Barrel
      c5: '#333',
      c6: '#999'
    };

    self.wpnsCurrent = self.getWpns();
  }

  ngOnInit() {
    let self = this;

    self.canvas = document.getElementById('action');
    self.ctx = self.canvas.getContext('2d');
    self.ctx.imageSmoothingEnabled = true;
    self.ctx.webkitImageSmoothingEnabled = true;
    self.ctx.mozImageSmoothingEnabled = true;

    self.setDefault();
    // self.debug();

    self.ctx.canvas.width = self.sets.w;
    self.ctx.canvas.height = self.sets.h;
    // jQuery(doc).click(function(e) {
    //   let debug = [];
    //   let x = e.pageX;
    //   let y = e.pageY;
    //   jQuery('.wpn - sel - props').remove();
    //   self.drClear();
    //   self.drBase();
    //
    //   for (let i=0;i<self.CLICK.length;i ++ ) {
    //     let cl = self.CLICK[i];

    //     if (x<=cl.x + cl.w
    //       && x>=cl.x - cl.w
    //       && y<=cl.y + cl.h
    //       && y>=cl.y - cl.h
    //     ) {
    //
    //       switch(cl.type) {
    //         case 'wpnPos':
    //           self.CLICK = self.CLICK.filter(function(c) {
    //             return c.type!=='selWpn';
    //           });
    //           self.drAddWeapons(x, y);
    //           break;
    //         case 'selWpn':
    //
    //           self.saveWpn(cl.wpnType, cl.pos);
    //           break;
    //       }
    //     }


    //   }
    //   // ctx.isPointInPath(20, 50)
    //   self.debug(debug);


    // });

    self.newStart();
  }

  // Main Draw
  dr() {
    let self = this;
    let debug = ['dr'];

    self.drClear();

    self.drBullets();
    self.drBase();
    self.drEnemies();

    self.debug(debug);
  }

  drClear() {
    let self = this;
    self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
    self.ctx.beginPath();
    // ctx.save();
    // ctx.translate(o.x, o.y);
    // let img = new Image();
    // img.src = 'img/grass4.png';
    // let pat=ctx.createPattern(img, 'repeat');
    // ctx.rect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle=pat;
    // ctx.fill();
    self.ctx.fillStyle = 'rgba(0, 120, 0, 0)';
    self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
    // ctx.restore();
    self.ctx.closePath();
  }

  // Base
  baseLvl() {
    let self = this;
    if (self.base.lvl < self.base.lvls.length - 1) {
      self.base.lvl = self.base.lvl + 1;
      self.CLICK = self.CLICK.filter(function(c) {
        return c.type !== 'wpnPos';
      });
      self.BASE.wpns.forEach(function(wp) {
        if (!self.WPOS['p' + wp.pos]) {
          self.WPOS['p' + wp.pos] = '';
        }

        self.CLICK.push({
          x: wp.x,
          y: wp.y,
          type: 'wpnPos',
          w: self.baseWpnPos.w / 2,
          h: self.baseWpnPos.h / 2
        });
      });
      // base.life0 = BASE.life;
      // base.life = base.life0;
      self.wpnsCurrent = self.getWpns();
    }
  }

  getBase() {
    let self = this;
    let debug = ['getBase'];
    let baseTmp = jQuery.extend({}, self.base.lvls[self.base.lvl]);
    baseTmp.x = self.base.x;
    baseTmp.y = self.base.y;
    baseTmp.w = self.base.w;
    baseTmp.h = self.base.h;
    baseTmp.life0 = baseTmp.life;
    baseTmp.lvl = self.base.lvl;

    self.debug(debug);
    self.BASE = baseTmp;
    jQuery('#wpns .wpn - pos').remove();
    self.BASE.wpns.forEach(function(pos) {
      let wpnPos = jQuery('<div/>');
      wpnPos
        .addClass('wpn - pos')
        .css({
          left: pos.x - 20 + 'px'
        })
        .click(function(e) {
          self.selectWpn(jQuery(this).offset(), pos);
        });

      if (!!self.WPOS['p' + pos.pos]) {
        console.info(self.WPOS['p' + pos.pos]);
        wpnPos.addClass('occupied')
      }
      jQuery('#wpns').append(wpnPos);
    });


  }

  getBasePos() {
    let self = this;
    let wpnsBase = self.BASE.wpns;
    let posTmp = [];

    for (let i=0;i < wpnsBase.length;i ++ ) {
      let wpnBase = wpnsBase[i];
      posTmp.push(wpnBase.pos);
    }

    return posTmp;
  }

  drBase() {
    let self = this;
    let o = self.BASE;
    let debug = ['drBase', self.BASE.lvl];
    // jQuery('#debug').html('drBase' + o.lvl + ' ' + objs.length);
    // let baseCurrent = o.lvls[o.lvl];

    // ctx.beginPath();
    // ctx.save();
    // ctx.translate(o.x, o.y);
    // let img = new Image();
    // img.src = 'img/' + BASE.img;
    // let pat = ctx.createPattern(img, 'repeat');
    // ctx.rect(0, 0, o.w, o.h);
    // ctx.fillStyle=pat;
    // ctx.fill();
    // ctx.restore();
    // ctx.closePath();

    let life = o.life / o.life0 * 100;
    if (life < 0) {
      life = 0;
    }

    jQuery('#money').html(self.mny(self.sets.money));
    jQuery('#lifenumber').html(o.life);
    jQuery('#life').width(life + '%');
    jQuery('#base')[0].className = '';
    jQuery('#base').addClass('base - ' + (self.BASE.lvl + 1));

    if (self.wpnsCurrent.length) {
      for (let i=0;i < self.wpnsCurrent.length;i ++ ) {
        let wpnBase = self.wpnsCurrent[i];
        self.drWeapon(wpnBase);
      }
    }
    self.debug(debug);
  }

  // Bullet
  drBullets() {
    let self = this;
    for (let i=0;i < self.BULL.length;i ++ ) {
      self.drBullet(self.BULL[i]);
    }
  }

  drBullet(o) {
    let self = this;


    // if (o.timer>0) {
    //  objs[j].timer = o.timer - 1000 / fps;
    // } else {
    //  objs[j].timer = o.timer0;
    // }

    // if (o.len1>0) {
    //  ctx.beginPath();
    //  ctx.fillStyle = o.color;
    //  ctx.arc(o.x, o.y, o.w, 0, 2 * Math.PI);
    // }

    // ctx.fill();
    // ctx.closePath();

    switch(o.type) {
      case 'bullet':
        if (o.len1 > 0) {
          o.len1 = o.len1 - o.speed;
          let xy = self.getXY({
            x: o.x0,
            y: o.y0
          }, {
            x: o.target.x,
            y: o.target.y
          }, ((o.len0 - o.len1) / o.len0));

          // let xy = {x: 150, y: 300};
          o.x = xy.x;
          o.y = xy.y;
        } else if (o.len1 <= 0) {
          self.BULL = self.BULL.filter(function(obj) {
            return obj.id!==o.id
          });
          return false
        }

        o.opacity = o.opacity - 0.2;

        self.ctx.beginPath();
        self.ctx.moveTo(o.x0, o.y0);
        self.ctx.lineTo(o.target.x, o.target.y);
        self.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        self.ctx.strokeStyle = 'rgba(255, 255, 255, ' + o.opacity + ')';
        self.ctx.lineWidth = 0.5;
        self.ctx.stroke();
        self.ctx.closePath();
        break;

      case 'explode':
        self.ctx.beginPath();
        self.ctx.fillStyle = o.color;
        self.ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);
        self.ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
        self.ctx.lineWidth = 2;
        self.ctx.stroke();
        self.ctx.fill();
        self.ctx.closePath();
        o.r = o.r + o.speed;
        break;
    }
  }

  // Enemy
  drEnemies() {
    let self = this;
    let debug = ['drEnemies'];

    for (let i = 0; i < self.ENYS.length; i ++ ) {
      let id = self.ENYS[i];
      self.drEnemy(self.ENY[id]);
      //
    }
    self.debug(debug);
  }

  drEnemy(o) {
    let self = this;
    // let weapons = objs.filter(function(obj) {return obj.type==='weapon'});
    let x1 = o.x;
    let y1 = o.y;

    if (o.y + o.h < self.sets.h - 160 - 4) {
      o.y = o.y + o.speed / 10;
    } else {
      if (o.timer <=0 ) {
        o.timer = o.timer0;
      } else if (o.timer === o.timer0) {
        self.BASE.life = self.BASE.life - o.damage;
      } else {
        o.timer = o.timer - 1000 / self.fps;
      }
    }

    if (self.BASE.life < 0) {
      self.BASE.life = 0;
    }

    for (let k = 0;k < self.wpnsCurrent.length;k ++ ) {
      let wpn = self.wpnsCurrent[k];
      let x0 = wpn.x;
      let y0 = wpn.y;
      let r = wpn.r;
      if (Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) < r
        // && o.life>=0
        && wpn.timer >= wpn.timer0
      ) {
        // if (!wpn.snd.paused) {
          // wpn.snd.pause();
        // }
        // wpn.snd.currentTime = 0;
        // wpn.snd.play();

        setTimeout(() => {
          // wpn.snd.pause();
        }, 1000);

        let xw = x0;
        let yw = y0;
        let len = Math.sqrt(Math.pow((x1 - xw), 2) + Math.pow((y1 - yw), 2));
        let bullet = {
          id: self.id(),
          x: xw,
          y: yw,
          x0: xw,
          y0: yw,
          w: 5,
          h: 5,
          color: '#ff0000',
          speed: 50,
          life: 100,
          type: 'bullet',
          len0: len,
          len1: len,
          timer: 500,
          timer0: 500,
          target: {
            x: x1,
            y: y1
          },
          opacity: 1
        };
        self.BULL.push(bullet);
        o.life = o.life - wpn.damage;
        if (o.life <= 0) {
          self.ENYS.splice(self.ENYS.indexOf(o.id), 1);
          // delete ENY[o.id];
          // ENYS = ENYS.filter(function(obj) {
          //  return obj!==o.id
          // });
          self.sets.money += o.points;
          self.mnyEarned += o.points;
        }

        wpn.timer = wpn.timer - 1000 / self.fps;
        let dx = x1 - xw;
        let dy = y1 - yw;
        wpn.angle = Math.atan(dy / dx) * 180 / Math.PI;
      } else {
        // o.l  - = 1;
      }
    }

    self.ctx.beginPath();
    // let img = new Image();
    // img.src = 'img/enemy1.png';
    // ctx.drawImage(img, o.x, o.y);
    self.ctx.fillStyle = o.color;
    // ctx.arc(o.x, o.y, o.w, 0, 2 * Math.PI);
    self.ctx.fill();
    self.ctx.fillRect(o.x - o.w / 2, o.y - o.h / 2, o.w, o.h);
    self.ctx.closePath();

    let w = 10;
    let h = 2;
    let x = o.x - w / 2;
    let life = o.life * w / o.life0;
    if (life < 0) {
      life = 0;
    }

    self.ctx.beginPath();
    self.ctx.fillStyle = self.lifeColor0;
    self.ctx.fillRect(x, o.y - 15, w, h);

    self.ctx.fillStyle = self.lifeColor;
    self.ctx.fillRect(x, o.y - 15, life, h);
    self.ctx.closePath();
    // ctx.fillStyle = o.color;
    // ctx.fillRect (o.x, o.y, o.w, o.h);
  }

  // Debug
  debug(a) {
    let result = '';
    if (typeof a === 'string') {
      result = a;
    } else if (typeof a === 'object') {
      result = a.join(' ');
    }
    console.info(result);
  }

  // Defaults
  setDefault() {
    let self = this;
    self.default.base = jQuery.extend({}, self.base);
    self.default.BULL = jQuery.extend([], self.BULL);
    self.default.bullets = jQuery.extend({}, self.bullets);
    self.default.objs = jQuery.extend([], self.objs);
    self.default.wave = jQuery.extend({}, self.wave);
    self.default.ENY = jQuery.extend({}, self.ENY);
    self.default.ENYS = jQuery.extend([], self.ENYS);
    self.default.ww = jQuery.extend({}, self.ww);
    self.default.wh = jQuery.extend({}, self.wh);
    self.default.WPOS = jQuery.extend({}, self.WPOS);
    self.default.wpns = jQuery.extend({}, self.wpns);
    self.default.wpnsCurrent = jQuery.extend([], self.wpnsCurrent);
  }

  getDefault() {
    let self = this;
    self.base = jQuery.extend({}, self.default.base);
    self.BULL = jQuery.extend([], self.default.BULL);
    self.bullets = jQuery.extend({}, self.default.bullets);
    self.objs = jQuery.extend([], self.default.objs);
    self.wave = jQuery.extend({}, self.default.wave);
    self.ENY = jQuery.extend({}, self.default.ENY);
    self.ENYS = jQuery.extend([], self.default.ENYS);
    self.ww = jQuery.extend({}, self.default.ww);
    self.wh = jQuery.extend({}, self.default.wh);
    self.WPOS = jQuery.extend({}, self.default.WPOS);
    self.wpns = jQuery.extend({}, self.default.wpns);
    self.wpnsCurrent = jQuery.extend([], self.default.wpnsCurrent);
  }

  // Func
  getXY(start, end, percent) {
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let X = start.x + dx * percent;
    let Y = start.y + dy * percent;
    return {x: X, y: Y};
  }

  wv() {
    let self = this;
    self.wave.push(self.wave[self.wave.length - 1] + 1);
    if (self.wave <= self.waves) {
      setTimeout(self.wv, 1000);
    }
  }

  fr() {
    let self = this;
    self.debug('fr');
    let bullet = {
      id: self.id(),
      x: self.sets.w / 2,
      y: (self.sets.h - 160) / 2,
      r: 5,
      color: 'rgba(255, 0, 0, 0.3)',
      speed: 5,
      life: 100,
      type: 'explode',
      timer: 500,
      timer0: 500,
      opacity: 1
    };
    self.BULL.push(bullet);
  }

  rc() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i ++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  id() {
    let letters = '0123456789ABCDEF'.split('');
    let id = '';
    for (let i = 0; i < 12; i ++ ) {
      id += letters[Math.floor(Math.random() * 16)];
    }
    return id;
  }

  randRange(min, max) {
    let r = min + Math.random() * (max - min);
    r = Math.round(r);
    return r;
  }

  upgrade() {
    let self = this;
    let msg: any = {};

    msg.title = 'Upgrade';

    msg.msg = jQuery('<div/>');
    let base = jQuery('<div/>');
    let wpns = jQuery('<div/>');
    let wall = jQuery('<div/>');

    let baseTtl = jQuery('<span/>');
    let wpnsTtl = jQuery('<span/>');
    let wallTtl = jQuery('<span/>');

    baseTtl.html('Base');
    wpnsTtl.html('Weapons');
    wallTtl.html('Wall');

    base.append(baseTtl);
    wpns.append(wpnsTtl);
    wall.append(wallTtl);

    msg.msg.append(base);
    msg.msg.append(wpns);
    msg.msg.append(wall);

    self.popup(msg);
  }

  mny(num) {
    num = num.toString();
    let newNum = '';
    for (let i = num.length - 1, j = 0; i >= 0; i -- , j ++ ) {
      if (j >= 3) {
        newNum += '.';
        j = 0;
      }
      newNum += num[i];
    }
    num = '';
    for (let i = newNum.length - 1; i >= 0; i -- ) {
      num += newNum[i];
    }
    return num;
  }

  round(n) {
    return Math.round(n / 10) * 10;
  }

  // Playback
  newStart() {
    let self = this;
    self.started = true;
    self.mnyEarned = 0;
    self.getDefault();
    self.getBase();
    self.BASE.wpns.forEach(function(wp) {
      self.WPOS['p' + wp.pos] = '';
    });

    self.ENY = {};
    self.ENYS = [];
    for (let i = 0; i < self.waves.length; i ++ ) {
      let y =  - 10;
      for (let k = 0; k < self.waves[i].length; k ++ ) {
        let nWv = self.waves[i][k];
        let count = nWv.count;
        let x = 0;

        // let perRow = count / 4;
        for (let j = 0;j < count;j ++ ) {
          let nEny = jQuery.extend({}, self.enemy[nWv.type]);
          if (x + self.sets.w / nEny.mpr + 10 >= self.sets.w) {
            y = y - 20;
            x = self.sets.w / nEny.mpr - nEny.w / 2;
          } else {
            x = x + self.sets.w / nEny.mpr - nEny.w / 2;
          }

          let idEnemy = self.id();
          nEny.id = idEnemy;
          nEny.x = self.randRange(x - nEny.w * 0.5, x + nEny.w * 0.5);
          nEny.y = self.randRange(y - nEny.w * 0.5, y + nEny.w * 0.5);
          nEny.speed = self.randRange(nEny.speed - nEny.speed * 0.1, nEny.speed + nEny.speed * 0.1);

          self.ENY[idEnemy] = nEny;
          self.ENYS.push(idEnemy);
        }
      }
    }
    self.dr();
    self.stp();
  }

  st(start) {
    let self = this;
    let debug = ['st'];
    clearTimeout(self.t);
    jQuery('#start').hide();
    jQuery('#stop').show();
    start = typeof start === 'undefined' ? false : start;
    if (start) {
      self.timer = 0;
      self.playing = true;
    } else {
      self.timer = self.timer + 1000 / self.fps;
    }

    // if (timer>2000) {
    //  wave.push(wave[wave.length - 1] + 1);
    //  timer = 0;
    // }

    console.info(self, self.BASE);
    if (self.BASE.life > 0 && self.ENYS.length > 0) {
      self.dr();
      self.t = setTimeout(() => {
        self.st(false);
      }, 1000 / self.fps);
    } else if (self.BASE.life <= 0) {
      self.drBase();
      self.stp();
      self.popup({
        title: 'Game Over',
        msg: 'Your base was destroyed',
        type: 'game - over'
      });

    } else if (self.ENYS.length === 0) {
      self.drBase();
      self.stp();
      self.popup({
        title: 'Victory',
        msg: 'You earned ⛃' + self.mnyEarned,
        type: 'game - victory'
      });

    }
    self.debug(debug);
  }

  stp() {
    let self = this;
    self.debug('stp');
    jQuery('#start').show();
    jQuery('#stop').hide();
    clearTimeout(self.t);
    self.playing = false;
    self.drBase();
  }

  // Popup
  popup(msg) {
    let self = this;
    let a = jQuery('<div/>');
    let bg = jQuery('<div/>');
    let cnt = jQuery('<div/>');
    let close = jQuery('<button/>');

    a.addClass('popup');
    bg.addClass('popup - bg');
    cnt.addClass('popup - cnt');
    close.addClass('close');

    close.html('Close');

    close.click(function() {
      a.remove();
    });

    if (msg.hasOwnProperty('type')) {
      cnt.addClass(msg.type);
      if (msg.type==='game - over'
        || msg.type==='game - victory'
      ) {
        close.click(function() {
          self.getDefault();
          self.newStart();
          a.remove();
        });
      }
    }
    cnt.html(msg.msg);

    if (!!msg.title) {
      cnt.prepend('<h1>' + msg.title + '</h1>');
    }
    cnt.append(close);

    a.append(bg);
    a.append(cnt);
    jQuery('body').append(a);
  }

  // Weapons
  drWeapon(o) {
    let self = this;
    let debug = ['drWeapon'];

    if (o.timer <= 0) {
      o.timer = o.timer0;
    } else if (o.timer<o.timer0) {
      o.timer = o.timer - 1000 / self.fps;
    }

    if (!self.playing) {
      self.ctx.beginPath();
      self.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      self.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      self.ctx.lineWidth = 4;
      self.ctx.arc(o.x, o.y, o.r, 1 * Math.PI, 2 * Math.PI);
      self.ctx.fill();
      self.ctx.stroke();
      self.ctx.closePath();
    }

    self.drWpn(o);
    self.debug(debug);
  }

  drWpn(o) {
    let self = this;
    let x = o.x;
    let y = o.y;
    let angle = 0;
    let debug = ['drWpn'];
    // let color1 = '';
    // let color2 = '';
    // let color3 = '';
    // let color4 = '';
    // let color5 = '';

    if (o.angle>0) {
      angle = (o.angle + 270) * Math.PI / 180;
    } else {
      angle = (o.angle + 90) * Math.PI / 180;
    }

    self.ctx.save();

    self.ctx.translate(x, y);
    self.ctx.rotate(angle);

    let grda = self.ctx.createRadialGradient(0, 0, 1, 1, 1, 16);
    grda.addColorStop(0, o.c2);
    grda.addColorStop(1, o.c3);

    let grdl = self.ctx.createLinearGradient( - 2, 0, 2, 0);
    grdl.addColorStop(0, o.c5);
    grdl.addColorStop(0.5, o.c6);
    grdl.addColorStop(1, o.c5);

    self.ctx.beginPath();
    self.ctx.fillStyle = o.c1;
    self.ctx.arc(0, 0, 14, 1 * Math.PI, 3 * Math.PI);
    self.ctx.fill();
    self.ctx.closePath();

    self.ctx.beginPath();
    self.ctx.fillStyle = grdl;
    self.ctx.fillRect( - 2, - 30, 4, 20);
    self.ctx.closePath();

    self.ctx.beginPath();
    self.ctx.fillStyle = grda;
    self.ctx.arc(0, 0, 10, 1 * Math.PI, 3 * Math.PI);
    self.ctx.fill();
    self.ctx.closePath();

    self.ctx.beginPath();
    self.ctx.fillStyle = o.c4;
    self.ctx.fillRect(0, 0, 6, 6);
    self.ctx.closePath();

    self.ctx.beginPath();
    self.ctx.fillStyle = o.c4;
    self.ctx.arc( - 5, - 2, 4, 1 * Math.PI, 3 * Math.PI);
    self.ctx.fill();
    self.ctx.closePath();




    // let xx = 0;
    // if (o.angle<30) {
    //  xx = 32;
    // } else if (o.angle<60) {
    //  xx = 64;
    // } else if (o.angle<90) {
    //  xx = 96;
    // }
    // let img = new Image();
    // img.src = 'img/' + o.img;
    // ctx.drawImage(img, - Math.round(o.w / 2), - Math.round(o.h / 2));
    // ctx.drawImage(img, xx, 0, 32, 32, - (o.w / 2), - (o.h / 2), 32, 32);
    // draw(ctx);
    self.ctx.restore();

    self.debug(debug);
  }

  drAddWeapons(x, y) {
    let self = this;
    // stp();

    let debug = [];
    let pos;
    let wpnsSize = Object.keys(self.wpns).length;


    self.BASE.wpns.forEach(function(wpn) {

      if (x<=wpn.x + 10
        && x>=wpn.x - 10
        && y<=wpn.y + 10
        && y>=wpn.y - 10
      ) {
        pos = wpn;
      }
    });

    if (!!pos) {
      self.stp();
      self.ctx.beginPath();
      self.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      self.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      self.ctx.arc(pos.x, pos.y, 10, 1 * Math.PI, 3 * Math.PI);
      self.ctx.fill();
      self.ctx.stroke();
      self.ctx.closePath();

      let wpnsW = wpnsSize * self.ww * 2;
      let wpnsH = self.wh * 2;
      let wpnsX = pos.x - wpnsW / 2;
      let wpnsY = pos.y - wpnsH * 2;

      self.ctx.beginPath();
      self.ctx.moveTo(wpnsX + wpnsW / 2, wpnsY + self.wh * 2);
      self.ctx.lineTo(pos.x, pos.y - 10);
      self.ctx.stroke();

      if (wpnsX + wpnsW>self.sets.w) {
        wpnsX = self.sets.w - wpnsW - 10;
      } else if (wpnsX<0) {
        wpnsX = 10;
      }

      let wpnx = wpnsX;
      let wpny = wpnsY;

      for (let i in self.wpns) {
        if (self.wpns.hasOwnProperty(i)) {
          let wpn = self.wpns[i];
          let wp = jQuery.extend({}, wpn);


          self.ctx.beginPath();
          self.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
          self.ctx.fillRect(wpnx, wpny, self.ww * 2, self.wh * 2);
          self.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          self.ctx.lineWidth = 2;
          self.ctx.strokeRect(wpnx, wpny, self.ww * 2, self.wh * 2);
          self.ctx.closePath();

          jQuery('body').append('<span style="'
             + 'left: ' + wpnx + 'px;'
             + 'top: ' + wpny + 'px;'
             + '" class="wpn - sel - props">'
             + '☄ ' + wp.damage + '<br>'
             + '☉ ' + wp.r + '<br>'
             + '⚟ ' + 1000 / wp.timer0 + '/s<br>'
             + '⛃ ' + wp.cost
             + '</span>');

          wp.x = wpnx + self.ww / 2 * 3;
          wp.y = wpny + self.wh;
          self.drWpn(wp);

          self.CLICK.push({
            type: 'selWpn',
            x: wpnx + self.ww,
            y: wpny + self.wh,
            w: self.ww,
            h: self.wh,
            wpnType: i,
            pos: pos.pos
          });
          wpnx = wpnx + self.ww * 2;
        }
      }
    }

    self.debug(debug);
  }

  saveWpn(type, pos) {
    let self = this;

    if (self.sets.money - self.wpns[type].cost>=0) {
      self.sets.money = self.sets.money - self.wpns[type].cost;
      self.BASE.wpns.forEach(function(wp) {
        if (wp.pos===pos) {
          self.WPOS['p' + wp.pos] = type;
        }
      });
      self.wpnsCurrent = self.getWpns();
      self.drClear();
      self.drBase();
    } else {

    }
  }

  getWpns() {
    let self = this;
    // let baseCurrent = base.lvls[base.lvl];
    // let wpnsBase = wpos;
    let wpnsCurrentTmp = [];

    for (let i in self.WPOS) {
      if (!!self.WPOS[i]) {
        let wpn = jQuery.extend({}, self.wpns[self.WPOS[i]]);
        let pos = self.BASE.wpns.filter(function(p) {
          return p.pos == i.replace('p', '');
        })[0];

        wpn.x = pos.x;
        wpn.y = pos.y;

        // let shot = new Audio(tone1);
        // shot.play();
        // shot.pause();

        // shot.volume = 0;

        // if (!shot.paused) {
          setTimeout(function() {
            // shot.pause();
            // shot.volume = 0.3;
          }, 100);
        // } else {
          // shot.volume = 0.3;
        // }
        // wpn.snd = shot;
        wpnsCurrentTmp.push(wpn);
      }

      // drWeapon(wpn);
    }

    return wpnsCurrentTmp;
  }

  selectWpn(cntPos, pos) {
    let self = this;
    let cnt = jQuery('<div/>');
    let cntBg = jQuery('<div/>');
    cnt.attr('id', 'cnt');

    cntBg
      .addClass('cnt - bg')
      .click(function() {
        cntBg.remove();
        cnt.remove();
      });

    // for (let i=0;i<self.BASE.wpns.length;i ++ ) {
    //   let posBase = self.BASE.wpns[i];
    //   let selWpn = jQuery('<select/>');
    //   selWpn.attr('id', 'pos' + posBase.pos);

    //   let optWpn = jQuery('<option/>');
    //   optWpn
    //     .val( - 1)
    //     .html('no weapon');

    //   selWpn.append(optWpn);

      for (let j in self.wpns) {
        if (self.wpns.hasOwnProperty(j)) {
          let wpn = self.wpns[j];

          let optWpn = jQuery('<div/>');

          let damage = wpn.damage / self.max.damage * 100;
          if (damage > 100) {damage = 100;}
          else if (damage<0) {damage = 0;}

          let range = wpn.r / self.max.r * 100;
          if (range > 100) {range = 100;}
          else if (range < 0) {range = 0;}

          let timer = (1000 / wpn.timer) / (1000 / self.max.timer) * 100;
          if (timer > 100) {timer = 100;}
          else if (timer<0) {timer = 0;}

          optWpn
            .addClass('sel - wpn')
            .data('type', j)
            .html(
              '<img class="preview" src="img/' + wpn.img + '">'
               + '<div class="stats">'
                 + '<div class="stat">'
                   + '<img src="img/icon - damage.svg" class="icon">'
                   + '<div class="stat - max">'
                     + '<div class="stat - current" style="width: ' + damage + '%;"></div>'
                   + '</div>'
                 + '</div>'
                 + '<div class="stat">'
                   + '<img src="img/icon - range.svg" class="icon">'
                   + '<div class="stat - max">'
                     + '<div class="stat - current" style="width: ' + range + '%;"></div>'
                   + '</div>'
                 + '</div>'
                 + '<div class="stat">'
                   + '<img src="img/icon - fire - rate.svg" class="icon">'
                   + '<div class="stat - max">'
                     + '<div class="stat - current" style="width: ' + timer + '%;"></div>'
                   + '</div>'
                 + '</div>'
                 + '<div class="stat">'
                   + '⛃ ' + wpn.cost
                 + '</div>'
               + '</div>'
            )
            .click(function() {
              self.sets.money = self.sets.money - wpn.cost;
              self.WPOS['p' + pos.pos] = jQuery(this).data('type');
              self.wpnsCurrent = self.getWpns();
              self.getBase();
              self.drClear();
              self.drBase();
              cnt.remove();
              cntBg.remove();
            });
          // selWpn.append(optWpn);
          cnt.append(optWpn);
        }
      }

    //   if (!!self.WPOS['p' + posBase.pos]) {
    //     selWpn.val(self.WPOS['p' + posBase.pos]);
    //   }

    //   let cntLine = jQuery('<div/>');
    //   cntLine.append('position ' + posBase.pos + ': ');
    //   cntLine.append(selWpn);
    //   cnt.append(cntLine);
    // }

    let save = jQuery('<button/>');
    save
      .attr('type', 'button')
      .html('Save')
      .click(function() {
        self.BASE.wpns.forEach(function(wp) {
          let wpn = jQuery('#pos' + wp.pos).val();
          if (wpn!= - 1) {
            self.WPOS['p' + wp.pos] = wpn;
          }
        });
        self.wpnsCurrent = self.getWpns();
        cnt.remove();
      });
    // cnt.append(save);

    let close = jQuery('<button/>');
    close
      .attr('type', 'button')
      .html('Close')
      .click(function() {
        cnt.remove();
        cntBg.remove();
      });
    cnt.append(close);

    let arrow = jQuery('<div/>');
    arrow.addClass('arrow');

    cnt.append(arrow);

    jQuery('body').append(cnt);
    let top = cntPos.top - cnt.height();
    if (top<20) {top = 20;}
    cnt.css({
      top: top + 'px'
    });
    jQuery('body').append(cntBg);
  }
}


















