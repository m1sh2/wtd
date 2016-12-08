// Game

import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { GameConstructor } from './game.constructor';
import * as _ from 'lodash';
import * as $ from 'jquery';
const uuid = require('uuid/v4');
import { Page } from '../page';

import { Log, Level } from 'ng2-logger/ng2-logger';
const log = Log.create('Game');
log.color = 'orange';

@Component({
  templateUrl: './game.html',
  styleUrls: ['./game.css']
})
export class Game extends GameConstructor {

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

  defenseItems: Array<any> = [];
  attackItems: Array<any> = [];

  constructor(
    private router: Router,
    private page: Page,
    private activeRoute: ActivatedRoute
  ) {
    super();

    this.wallTop = this.sets.h - 118;

    this.base.id = uuid()

    let xw = this.sets.w / 6;
    let yw = this.sets.h - 88;

    this.base.lvls.push({
      life: 10000,
      wpns: [
        {x: xw * 1, y: yw, pos: 1},
        {x: xw * 2, y: yw, pos: 2},
        {x: xw * 3, y: yw, pos: 3},
        {x: xw * 4, y: yw, pos: 4},
        {x: xw * 5, y: yw, pos: 5}
      ],
      img: this.imagesUrl + 'base1.jpg'
    });

    this.base.life0 = this.base.lvls[this.base.lvl].life;
    this.base.life = this.base.life0;
    this.baseWpnPos = {
      w: 40,
      h: 40
    };

    this.BASE = {};

    // Bullet
    this.BULL = [];
    this.bullets = [];

    // Enemy
    this.objs = [];
    this.waves = [
      [
        {type: 'e1', count: 40},
        {type: 'e2', count: 18},
        {type: 'e3', count: 3}
      ]
    ];
    this.wave = [0];
    this.ENY = {};
    this.ENYS = [];
    this.LVL = {};
    this.LVLS = [];
    this.LVL.l1 = {
      wv: this.waves
    };

    this.enemy = {};
    this.enemy.e1 = {
      id: uuid(),
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

    this.enemy.e2 = {
      id: uuid(),
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

    this.enemy.e3 = {
      id: uuid(),
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
    // this.sbg = new Audio(tone1);
    // this.sbg.loop = true;

    this.snd = {
      bg: {
        play: () => {
          // let sbg = document.getElementById('bg');
          // this.sbg.currentTime = 0;
          // this.sbg.play();
          $('.audiopause').hide();
          $('.audioplay').show();
          // setTimeout(() => {
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
        pause: () => {
          // this.sbg.pause();
          $('.audiopause').show();
          $('.audioplay').hide();
        }
      }
    }

    // Weapons
    this.ww = 40;
    this.wh = 40;
    this.WPOS = {};
    this.wpns = {};
    this.max = {
      r: this.sets.w,
      damage: 250,
      timer: 20
    };

    this.wpns.t1 = {
      id: uuid(),
      x: 150,
      y: 350,
      w: this.ww,
      h: this.wh,
      color: '255, 0, 0',
      speed: 10,
      life: 100,
      type: 1,
      r: _.round(this.sets.w / 2),
      timer: 500,
      timer0: 500,
      damage: 50,
      name: 'main',
      angle: 90,
      img: this.imagesUrl + 'wpn1.svg',
      cost: 50,
      bullet: {
        width: 4,
        height: 20
      },

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

    this.wpns.t2 = {
      id: uuid(),
      x: 50,
      y: 350,
      w: 32,
      h: 32,
      color: '255, 255, 0',
      speed: 10,
      life: 100,
      type: 2,
      r: _.round(this.sets.w / 3),
      timer: 100,
      timer0: 100,
      damage: 10,
      name: 'left',
      angle: 90,
      img: this.imagesUrl + 'wpn2.svg',
      cost: 25,
      bullet: {
        width: 2,
        height: 10
      },

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

    this.wpns.t3 = {
      id: uuid(),
      x: 250,
      y: 350,
      w: 32,
      h: 32,
      color: '0, 0, 255',
      speed: 10,
      life: 100,
      type: 3,
      r: _.round(this.sets.w / 4),
      timer: 50,
      timer0: 50,
      damage: 5,
      name: 'right',
      angle: 90,
      img: this.imagesUrl + 'wpn3.svg',
      cost: 15,
      bullet: {
        width: 4,
        height: 4
      },

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

    this.wpnsCurrent = this.getWpns();

    this.defenseItems.push({
      name: 'Repair',
      action: () => {
        this.router.navigate(['/levels']);
      },
      url: '',
      icon: this.imagesUrl + 'btn-repair.svg',
      visible: true,
      active: false,
      cost: 90
    });

    this.defenseItems.push({
      name: 'Shield',
      action: () => {
        this.fr();
      },
      url: '',
      icon: this.imagesUrl + 'btn-shield.svg',
      visible: true,
      active: false,
      cost: 120
    });

    this.defenseItems.push({
      name: 'Mines',
      action: () => {
        this.fr();
      },
      url: '',
      icon: this.imagesUrl + 'btn-mines.svg',
      visible: true,
      active: false,
      cost: 200
    });

    this.attackItems.push({
      name: 'Comets',
      action: () => {
        this.fr();
      },
      url: '',
      icon: this.imagesUrl + 'btn-comets.svg',
      visible: true,
      active: false,
      cost: 150
    });

    this.attackItems.push({
      name: 'Missile',
      action: () => {
        this.fr();
      },
      url: '',
      icon: this.imagesUrl + 'btn-missile.svg',
      visible: true,
      active: false,
      cost: 200
    });

    this.attackItems.push({
      name: 'Upgrade',
      action: () => {
        this.upgrade();
        this.baseLvl();
      },
      url: '',
      icon: this.imagesUrl + 'btn-upgrade.svg',
      visible: true,
      active: false,
      cost: 280
    });
  }

  ngOnInit() {
    this.activeRoute.params.forEach((params: Params) => {
      let levelId = params['levelId'];
      log.i('activeRoute', levelId, params);
      this.start();
    });
  }

  start() {

    this.canvas = document.getElementById('action');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.webkitImageSmoothingEnabled = true;
    this.ctx.mozImageSmoothingEnabled = true;

    this.setDefault();
    // this.debug();

    this.ctx.canvas.width = this.sets.w;
    this.ctx.canvas.height = this.sets.h;

    this.newStart();
  }

  // Main Draw
  dr() {
    let debug = ['dr'];

    this.drClear();

    this.drBullets();
    this.drBase();
    this.drEnemies();

    this.debug(debug);
  }

  drClear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    // ctx.save();
    // ctx.translate(o.x, o.y);
    // let img = new Image();
    // img.src = 'img/grass4.png';
    // let pat=ctx.createPattern(img, 'repeat');
    // ctx.rect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle=pat;
    // ctx.fill();
    this.ctx.fillStyle = 'rgba(0, 120, 0, 0)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // ctx.restore();
    this.ctx.closePath();
  }

  // Base
  baseLvl() {
    if (this.base.lvl < this.base.lvls.length - 1) {
      this.base.lvl = this.base.lvl + 1;
      this.CLICK = this.CLICK.filter((c) => {
        return c.type !== 'wpnPos';
      });
      this.BASE.wpns.forEach((wp) => {
        if (!this.WPOS['p' + wp.pos]) {
          this.WPOS['p' + wp.pos] = '';
        }

        this.CLICK.push({
          x: wp.x,
          y: wp.y,
          type: 'wpnPos',
          w: this.baseWpnPos.w / 2,
          h: this.baseWpnPos.h / 2
        });
      });
      // base.life0 = BASE.life;
      // base.life = base.life0;
      this.wpnsCurrent = this.getWpns();
    }
  }

  getBase() {
    let self = this;
    let debug = ['getBase'];
    let baseTmp = $.extend({}, this.base.lvls[this.base.lvl]);
    baseTmp.x = this.base.x;
    baseTmp.y = this.base.y;
    baseTmp.w = this.base.w;
    baseTmp.h = this.base.h;
    baseTmp.life0 = baseTmp.life;
    baseTmp.lvl = this.base.lvl;

    this.debug(debug);
    this.BASE = baseTmp;
    
    const attrs = [];
    $.each($('#wpns')[0].attributes, function() {
      if(this.specified && this.name !== 'id') {
        attrs.push({
          name: this.name,
          value: this.value
        });
      }
    });

    $('#wpns .wpn-pos').remove();
    this.BASE.wpns.forEach((pos) => {
      let wpnPos = $(document.createElement('div'));
      wpnPos
        .addClass('wpn-pos')
        .css({
          left: pos.x - 20 + 'px'
        })
        .click(function(e) {
          self.selectWpn($(this).offset(), pos);
        });
      
      attrs.forEach((attr) => {
        wpnPos.attr(attr.name, attr.value);
      });

      if (!!this.WPOS['p' + pos.pos]) {
        log.i('WPOS', this.WPOS['p' + pos.pos]);
        wpnPos.addClass('occupied')
      }

      $('#wpns').append(wpnPos);
    });


  }

  getBasePos() {
    let wpnsBase = this.BASE.wpns;
    let posTmp = [];

    for (let i=0;i < wpnsBase.length;i ++ ) {
      let wpnBase = wpnsBase[i];
      posTmp.push(wpnBase.pos);
    }

    return posTmp;
  }

  drBase() {
    let o = this.BASE;
    let debug = ['drBase', this.BASE.lvl];
    // $('#debug').html('drBase' + o.lvl + ' ' + objs.length);
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

    $('#money').html(this.mny(this.sets.money));
    $('#lifenumber').html(o.life);
    $('#life').width(life + '%');
    $('#base')[0].className = '';
    $('#base').addClass('base-' + (this.BASE.lvl + 1));

    if (this.wpnsCurrent.length) {
      for (let i=0;i < this.wpnsCurrent.length;i ++ ) {
        let wpnBase = this.wpnsCurrent[i];
        // log.i('wpnBase', wpnBase);
        this.drWeapon(wpnBase);
      }
    }
    this.debug(debug);
  }

  // Bullet
  drBullets() {
    for (let i = 0;i < this.BULL.length;i++ ) {
      this.drBullet(this.BULL[i]);
    }
  }

  drBullet(o) {


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
        
        
        let tX = o.target.x;
        let tY = o.target.y;

        if (o.len1 > 0) {
          let xy = this.getXY({
            x: o.x0,
            y: o.y0
          }, {
            x: o.target.x,
            y: o.target.y
          }, ((o.len0 - o.len1) / o.len0));

          // let xy = {x: 150, y: 300};
          o.x = xy.x;
          o.y = xy.y;
          o.len1 = o.len1 - o.speed;
        } else if (o.len1 <= 0) {
          this.BULL = this.BULL.filter((obj) => {
            return obj.id!==o.id
          });
          return false
        }

        let len = Math.sqrt(Math.pow(tX - o.x, 2) + Math.pow(tY - o.y, 2));

        if (len > o.bullet.height) {
          tX = o.x + (tX - o.x) * (o.bullet.height / len);
          tY = o.y + (tY - o.y) * (o.bullet.height / len);
        }

        // o.opacity = o.opacity - 0.2;

        this.ctx.beginPath();
        this.ctx.moveTo(o.x, o.y);
        this.ctx.lineTo(tX, tY);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        this.ctx.strokeStyle = 'rgba(' + o.color + ', ' + o.opacity + ')';
        this.ctx.lineWidth = o.bullet.width;
        this.ctx.stroke();
        this.ctx.closePath();
        break;

      case 'explode':
        this.ctx.beginPath();
        this.ctx.fillStyle = o.color;
        this.ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);
        this.ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        o.r = o.r + o.speed;
        break;
    }
  }

  // Enemy
  drEnemies() {
    let debug = ['drEnemies'];

    for (let i = 0; i < this.ENYS.length; i ++ ) {
      let id = this.ENYS[i];
      this.drEnemy(this.ENY[id]);
      //
    }
    this.debug(debug);
  }

  drEnemy(o) {
    // let weapons = objs.filter((obj) => {return obj.type==='weapon'});
    let x1 = o.x;
    let y1 = o.y;

    if (o.y + o.h < this.sets.h - 68 - 4) {
      o.y = o.y + o.speed / 10;
    } else {
      if (o.timer <= 0 ) {
        o.timer = o.timer0;
      } else if (o.timer === o.timer0) {
        this.BASE.life = this.BASE.life - o.damage;
      } else {
        o.timer = o.timer - 1000 / this.fps;
      }
    }

    if (this.BASE.life < 0) {
      this.BASE.life = 0;
    }

    for (let k = 0;k < this.wpnsCurrent.length;k ++ ) {
      let wpn = this.wpnsCurrent[k];
      let x0 = wpn.x;
      let y0 = wpn.y;
      let r = wpn.r;
      let len = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
      if (len < r
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
          id: uuid(),
          x: xw,
          y: yw,
          x0: xw,
          y0: yw,
          w: 5,
          h: 5,
          color: wpn.color,
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
          opacity: 1,
          bullet: wpn.bullet
        };

        this.BULL.push(bullet);

        o.life = o.life - wpn.damage;
        if (o.life <= 0) {
          // this.ENYS.splice(this.ENYS.indexOf(o.id), 1);
          // delete ENY[o.id];
          this.ENYS = this.ENYS.filter((obj) => {
           return obj !== o.id
          });
          this.sets.money += o.points;
          this.mnyEarned += o.points;
        }

        wpn.timer = wpn.timer - 1000 / this.fps;
        let dx = x1 - xw;
        let dy = y1 - yw;
        wpn.angle = Math.atan(dy / dx) * 180 / Math.PI;
      } else {
        // o.l  - = 1;
      }
    }

    this.ctx.beginPath();
    
    // let img = new Image();
    // img.src = 'img/cnv-img-test-1.png';
    // // this.ctx.drawImage(img, o.x, o.y);
    // this.ctx.drawImage(img, 0, 0, 32, 32, o.x, o.y, 16, 16);
    
    this.ctx.fillStyle = o.color;
    this.ctx.arc(o.x, o.y, o.w, 0, 2 * Math.PI);
    this.ctx.fill();
    // this.ctx.fillRect(o.x - o.w / 2, o.y - o.h / 2, o.w, o.h);
    
    this.ctx.closePath();

    let w = 10;
    let h = 2;
    let x = o.x - w / 2;
    let life = o.life * w / o.life0;
    if (life < 0) {
      life = 0;
    }

    this.ctx.beginPath();
    this.ctx.fillStyle = this.lifeColor0;
    this.ctx.fillRect(x, o.y - 15, w, h);

    this.ctx.fillStyle = this.lifeColor;
    this.ctx.fillRect(x, o.y - 15, life, h);
    this.ctx.closePath();
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
    // log.i('debug', result);
  }

  // Defaults
  setDefault() {
    this.default.base = $.extend({}, this.base);
    this.default.BULL = $.extend([], this.BULL);
    this.default.bullets = $.extend({}, this.bullets);
    this.default.objs = $.extend([], this.objs);
    this.default.wave = $.extend({}, this.wave);
    this.default.ENY = $.extend({}, this.ENY);
    this.default.ENYS = $.extend([], this.ENYS);
    this.default.ww = $.extend({}, this.ww);
    this.default.wh = $.extend({}, this.wh);
    this.default.WPOS = $.extend({}, this.WPOS);
    this.default.wpns = $.extend({}, this.wpns);
    this.default.wpnsCurrent = $.extend([], this.wpnsCurrent);
  }

  getDefault() {
    this.base = $.extend({}, this.default.base);
    this.BULL = $.extend([], this.default.BULL);
    this.bullets = $.extend({}, this.default.bullets);
    this.objs = $.extend([], this.default.objs);
    this.wave = $.extend({}, this.default.wave);
    this.ENY = $.extend({}, this.default.ENY);
    this.ENYS = $.extend([], this.default.ENYS);
    this.ww = $.extend({}, this.default.ww);
    this.wh = $.extend({}, this.default.wh);
    this.WPOS = $.extend({}, this.default.WPOS);
    this.wpns = $.extend({}, this.default.wpns);
    this.wpnsCurrent = $.extend([], this.default.wpnsCurrent);
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
    this.wave.push(this.wave[this.wave.length - 1] + 1);
    if (this.wave <= this.waves) {
      setTimeout(this.wv, 1000);
    }
  }

  fr() {
    this.debug('fr');
    let bullet = {
      id: uuid(),
      x: this.sets.w / 2,
      y: (this.sets.h - 160) / 2,
      r: 5,
      color: 'rgba(255, 0, 0, 0.3)',
      speed: 5,
      life: 100,
      type: 'explode',
      timer: 500,
      timer0: 500,
      opacity: 1
    };
    this.BULL.push(bullet);
  }

  upgrade() {
    let msg: any = {};

    msg.title = 'Upgrade';

    msg.content = '';
    msg.content += '<div>Base</div>';
    msg.content += '<div>Weapons</div>';
    msg.content += '<div>Wall</div>';

    // this.app.openPopup(msg);
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

  // Playback
  newStart() {
    this.started = true;
    this.mnyEarned = 0;
    this.getDefault();
    this.getBase();
    this.BASE.wpns.forEach((wp) => {
      this.WPOS['p' + wp.pos] = '';
    });

    this.ENY = {};
    this.ENYS = [];
    for (let i = 0; i < this.waves.length; i ++ ) {
      let y = -10;
      for (let k = 0; k < this.waves[i].length; k ++ ) {
        let nWv = this.waves[i][k];
        let count = nWv.count;
        let x = 0;

        // let perRow = count / 4;
        for (let j = 0;j < count;j ++ ) {
          let nEny = $.extend({}, this.enemy[nWv.type]);
          if (x + this.sets.w / nEny.mpr + 10 >= this.sets.w) {
            y = y - 20;
            x = this.sets.w / nEny.mpr - nEny.w / 2;
          } else {
            x = x + this.sets.w / nEny.mpr - nEny.w / 2;
          }

          let idEnemy = uuid();
          nEny.id = idEnemy;
          nEny.x = _.random(x - nEny.w * 0.5, x + nEny.w * 0.5);
          nEny.y = _.random(y - nEny.w * 0.5, y + nEny.w * 0.5);
          nEny.speed = _.random(nEny.speed - nEny.speed * 0.1, nEny.speed + nEny.speed * 0.1);

          this.ENY[idEnemy] = nEny;
          this.ENYS.push(idEnemy);
        }
      }
    }
    this.dr();
    this.stp();
  }

  st(start) {
    let debug = ['st'];
    clearTimeout(this.t);
    $('#start').hide();
    $('#stop').show();
    start = typeof start === 'undefined' ? false : start;
    if (start) {
      this.timer = 0;
      this.playing = true;
    } else {
      this.timer = this.timer + 1000 / this.fps;
    }

    // if (timer>2000) {
    //  wave.push(wave[wave.length - 1] + 1);
    //  timer = 0;
    // }

    // log.i('st', this, this.BASE);
    if (this.BASE.life > 0 && this.ENYS.length > 0) {
      this.dr();
      this.t = setTimeout(() => {
        this.st(false);
      }, 1000 / this.fps);
    } else if (this.BASE.life <= 0) {
      this.drClear();
      this.drBase();
      this.drEnemies();
      this.stp();
      // this.app.openPopup({
      //   title: 'Game Over',
      //   msg: 'Your base was destroyed',
      //   type: 'game-over',
      //   closeCallback: () => {
      //     this.router.navigate(['/levels']);
      //   }
      // });

    } else if (this.ENYS.length === 0) {
      this.drClear();
      this.drBase();
      this.stp();
      // this.app.openPopup({
      //   title: 'Victory',
      //   msg: 'You earned $' + this.mnyEarned,
      //   type: 'game-victory',
      //   closeCallback: () => {
      //     this.router.navigate(['/levels']);
      //   }
      // });

    }
    this.debug(debug);
  }

  stp() {
    this.debug('stp');
    $('#start').show();
    $('#stop').hide();
    clearTimeout(this.t);
    this.playing = false;
    this.drBase();
  }

  // Weapons
  drWeapon(o) {
    let debug = ['drWeapon'];

    if (o.timer <= 0) {
      o.timer = o.timer0;
    } else if (o.timer < o.timer0) {
      o.timer = o.timer - 1000 / this.fps;
    }

    if (!this.playing) {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      this.ctx.lineWidth = 4;
      this.ctx.arc(o.x, o.y, o.r, 1 * Math.PI, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }

    this.drWpn(o);
    this.debug(debug);
  }

  drWpn(o) {
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

    this.ctx.save();

    this.ctx.translate(x, y);
    this.ctx.rotate(angle);

    // this.ctx.beginPath();
    
    // let img = new Image();
    // img.src = 'img/wpn4.png';
    // // this.ctx.drawImage(img, o.x, o.y);
    // this.ctx.drawImage(img, 0, 0, 32, 32, 0, 0, 32, 32);
    
    // // this.ctx.fillStyle = o.color;
    // // // ctx.arc(o.x, o.y, o.w, 0, 2 * Math.PI);
    // // this.ctx.fill();
    // // this.ctx.fillRect(o.x - o.w / 2, o.y - o.h / 2, o.w, o.h);
    
    // this.ctx.closePath();

    let grda = this.ctx.createRadialGradient(0, 0, 1, 1, 1, 16);
    grda.addColorStop(0, o.c2);
    grda.addColorStop(1, o.c3);

    let grdl = this.ctx.createLinearGradient( -2, 0, 2, 0);
    grdl.addColorStop(0, o.c5);
    grdl.addColorStop(0.5, o.c6);
    grdl.addColorStop(1, o.c5);

    // base
    this.ctx.beginPath();
    this.ctx.fillStyle = o.c1;
    this.ctx.arc(0, 0, 14, 1 * Math.PI, 3 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    // barrel
    this.ctx.beginPath();
    this.ctx.fillStyle = grdl;
    this.ctx.fillRect( -3, -30, 6, 20);
    this.ctx.closePath();

    // hood
    this.ctx.beginPath();
    this.ctx.fillStyle = grda;
    this.ctx.arc(0, 0, 10, 1 * Math.PI, 3 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    // hood decor
    this.ctx.beginPath();
    this.ctx.fillStyle = o.c4;
    this.ctx.fillRect(0, 0, 6, 6);
    this.ctx.closePath();

    // hood decor
    this.ctx.beginPath();
    this.ctx.fillStyle = o.c4;
    this.ctx.arc( -5, -2, 4, 1 * Math.PI, 3 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();




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
    this.ctx.restore();

    this.debug(debug);
  }

  drAddWeapons(x, y) {
    // stp();

    let debug = [];
    let pos: any;
    let wpnsSize = Object.keys(this.wpns).length;

    this.BASE.wpns.forEach((wpn) => {

      if (x <= wpn.x + 10
        && x >= wpn.x - 10
        && y <= wpn.y + 10
        && y >= wpn.y - 10
      ) {
        pos = wpn;
      }
    });

    if (!!pos) {
      this.stp();
      this.ctx.beginPath();
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      this.ctx.arc(pos.x, pos.y, 10, 1 * Math.PI, 3 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();

      let wpnsW = wpnsSize * this.ww * 2;
      let wpnsH = this.wh * 2;
      let wpnsX = pos.x - wpnsW / 2;
      let wpnsY = pos.y - wpnsH * 2;

      this.ctx.beginPath();
      this.ctx.moveTo(wpnsX + wpnsW / 2, wpnsY + this.wh * 2);
      this.ctx.lineTo(pos.x, pos.y - 10);
      this.ctx.stroke();

      if (wpnsX + wpnsW > this.sets.w) {
        wpnsX = this.sets.w - wpnsW - 10;
      } else if (wpnsX < 0) {
        wpnsX = 10;
      }

      let wpnx = wpnsX;
      let wpny = wpnsY;

      for (let i in this.wpns) {
        if (this.wpns.hasOwnProperty(i)) {
          let wpn = this.wpns[i];
          let wp = $.extend({}, wpn);


          this.ctx.beginPath();
          this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
          this.ctx.fillRect(wpnx, wpny, this.ww * 2, this.wh * 2);
          this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          this.ctx.lineWidth = 2;
          this.ctx.strokeRect(wpnx, wpny, this.ww * 2, this.wh * 2);
          this.ctx.closePath();

          $('body').append('<span style="'
             + 'left: ' + wpnx + 'px;'
             + 'top: ' + wpny + 'px;'
             + '" class="wpn-sel-props">'
             + '☄ ' + wp.damage + '<br>'
             + '☉ ' + wp.r + '<br>'
             + 'speed ' + 1000 / wp.timer0 + '/s<br>'
             + '$ ' + wp.cost
             + '</span>');

          wp.x = wpnx + this.ww / 2 * 3;
          wp.y = wpny + this.wh;
          this.drWpn(wp);

          this.CLICK.push({
            type: 'selWpn',
            x: wpnx + this.ww,
            y: wpny,
            w: this.ww,
            h: this.wh,
            wpnType: i,
            pos: pos.pos
          });
          wpnx = wpnx + this.ww * 2;
        }
      }
    }

    this.debug(debug);
  }

  saveWpn(type, pos) {

    if (this.sets.money - this.wpns[type].cost>=0) {
      this.sets.money = this.sets.money - this.wpns[type].cost;
      this.BASE.wpns.forEach((wp) => {
        if (wp.pos === pos) {
          this.WPOS['p' + wp.pos] = type;
        }
      });
      this.wpnsCurrent = this.getWpns();
      this.drClear();
      this.drBase();
    } else {

    }
  }

  getWpns() {
    // let baseCurrent = base.lvls[base.lvl];
    // let wpnsBase = wpos;
    let wpnsCurrentTmp = [];

    for (let i in this.WPOS) {
      if (!!this.WPOS[i]) {
        let wpn = $.extend({}, this.wpns[this.WPOS[i]]);
        let pos = this.BASE.wpns.filter((p) => {
          return p.pos == i.replace('p', '');
        })[0];

        wpn.x = pos.x;
        wpn.y = pos.y;

        // let shot = new Audio(tone1);
        // shot.play();
        // shot.pause();

        // shot.volume = 0;

        // if (!shot.paused) {
          setTimeout(() => {
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
    let cnt = $('<div/>');
    let cntBg = $('<div/>');
    let cntContent = $('<div/>');
    cnt.attr('id', 'cnt');

    cntBg
      .addClass('cnt-bg')
      .click(() => {
        cntBg.remove();
        cnt.remove();
      });
    
    cntContent.addClass('cnt-content');

    // for (let i=0;i<this.BASE.wpns.length;i ++ ) {
    //   let posBase = this.BASE.wpns[i];
    //   let selWpn = $('<select/>');
    //   selWpn.attr('id', 'pos' + posBase.pos);

    //   let optWpn = $('<option/>');
    //   optWpn
    //     .val( - 1)
    //     .html('no weapon');

    //   selWpn.append(optWpn);

    for (let j in this.wpns) {
      if (this.wpns.hasOwnProperty(j)) {
        let wpn = this.wpns[j];

        let optWpn = $('<div/>');

        let damage = wpn.damage / this.max.damage * 100;
        if (damage > 100) {damage = 100;}
        else if (damage < 0) {damage = 0;}

        let range = wpn.r / this.max.r * 100;
        if (range > 100) {range = 100;}
        else if (range < 0) {range = 0;}

        const wpnTimer = 1000 / wpn.timer;
        const maxTimer = 1000 / this.max.timer;

        let timer = wpnTimer / maxTimer * 100;
        if (timer > 100) {timer = 100;}
        else if (timer < 0) {timer = 0;}

        optWpn
          .addClass('sel-wpn')
          .data('type', j)
          .html(
            '<img class="preview" src="' + wpn.img + '">'
              + '<div class="stats">'
                + '<div class="stat">'
                  + '<img src="' + this.imagesUrl + 'icon-damage.svg" class="icon">'
                  + wpn.damage
                  + '<div class="stat-max">'
                    + '<div class="stat-current" style="width: ' + damage + '%;"></div>'
                  + '</div>'
                + '</div>'
                + '<div class="stat">'
                  + '<img src="' + this.imagesUrl + 'icon-range.svg" class="icon">'
                  + wpn.r
                  + '<div class="stat-max">'
                    + '<div class="stat-current" style="width: ' + range + '%;"></div>'
                  + '</div>'
                + '</div>'
                + '<div class="stat">'
                  + '<img src="' + this.imagesUrl + 'icon-fire-rate.svg" class="icon">'
                  + wpn.timer
                  + '<div class="stat-max">'
                    + '<div class="stat-current" style="width: ' + timer + '%;"></div>'
                  + '</div>'
                + '</div>'
                + '<div class="stat">'
                  + '⛃ ' + wpn.cost
                + '</div>'
              + '</div>'
          )
          .click(function() {
            self.sets.money = self.sets.money - wpn.cost;
            self.WPOS['p' + pos.pos] = $(this).data('type');
            self.wpnsCurrent = self.getWpns();
            self.getBase();
            self.drClear();
            self.drBase();
            cnt.remove();
            cntBg.remove();
          });
        // selWpn.append(optWpn);
        cntContent.append(optWpn);
      }
    }

    //   if (!!this.WPOS['p' + posBase.pos]) {
    //     selWpn.val(this.WPOS['p' + posBase.pos]);
    //   }

    //   let cntLine = $('<div/>');
    //   cntLine.append('position ' + posBase.pos + ': ');
    //   cntLine.append(selWpn);
    //   cnt.append(cntLine);
    // }

    cnt.append(cntContent);

    let save = $('<button/>');
    save
      .attr('type', 'button')
      .html('Save')
      .click(function() {
        self.BASE.wpns.forEach((wp) => {
          let wpn = $('#pos' + wp.pos).val();
          if (wpn !== - 1) {
            self.WPOS['p' + wp.pos] = wpn;
          }
        });
        self.wpnsCurrent = self.getWpns();
        cnt.remove();
      });
    // cnt.append(save);

    let close = $('<button/>');
    close
      .attr('type', 'button')
      .html('Close')
      .click(() => {
        cnt.remove();
        cntBg.remove();
      });
    cnt.append(close);

    let arrow = $('<div/>');
    arrow.addClass('arrow');

    cnt.append(arrow);

    $('body').append(cnt);
    let top = cntPos.top - cnt.height();
    if (top < 20) {top = 20;}
    // cnt.css({
    //   top: top + 'px'
    // });
    $('body').append(cntBg);
  }

  getSwitchName() {
    const name = this.switchToVillage ? 'Wall' : 'Village';
    return name;
  }

  getSwitchIcon() {
    const name = this.switchToVillage
      ? this.imagesUrl + 'btn-shield.svg'
      : this.imagesUrl + 'btn-repair.svg';
    return name;
  }

  switchWallVillage() {
    let wallField = $('.wall-field');
    let villageField = $('.village-field');
    const animateTimer = 500;
    
    if (this.switchToVillage) {
      wallField.animate({top: '0%'}, animateTimer);
      villageField.animate({top: '100%'}, animateTimer);
    } else {
      wallField.animate({top: '-100%'}, animateTimer);
      villageField.animate({top: '0%'}, animateTimer);
    }
    this.switchToVillage = !this.switchToVillage;
  }

  openMenu() {
    let self = this;
    const menuButtons = [
      {
        title: 'Credits',
        action: () => {
          self.openCredits()
        },
        button: true
      }
    ];
    let options = {
      isOpen: true,
      title: 'Game menu',
      content: menuButtons,
    };

    this.optionsPopup = options;
  }

  openCredits() {
    let content = '<h1>Credits</h1>';
    this.page.open(content);
  }

  openSettings() {
    let content = '<h1>Settings</h1>';
    this.page.open(content);
  }

  openExit() {
    let content = '<h1>Exit</h1>';
    this.page.open(content);
  }
}
