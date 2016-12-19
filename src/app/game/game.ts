// Game

import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { GameConstructor } from './game.constructor';
import * as _ from 'lodash';
import * as $ from 'jquery';
const uuid = require('uuid/v4');
import { Page } from '../page';
// import { GamePhaser } from './game.phaser';

import { Log, Level } from 'ng2-logger/ng2-logger';
const log = Log.create('Game');
log.color = 'orange';

declare var Phaser: any;

@Component({
  templateUrl: './game.html',
  styleUrls: ['./game.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class Game {
  
  canvasSize: any = {
    w: 2000,
    h: 2000
  }
  switchToVillage: boolean = false;

  optionsPopup: any = {};

  constructor(
    private router: Router,
    private page: Page,
    private activeRoute: ActivatedRoute
  ) {
    // super();
    
  }

  ngOnInit() {
    let self = this;
    $('#gameplay').draggable({
      drag: function(e, ui) {
        console.log(ui.position);
        if (ui.position.top > 0) {
          ui.position.top = 0;
        }

        if (ui.position.left > 0) {
          ui.position.left = 0;
        }

        let bottom = 0 - self.canvasSize.h + $(window).height();
        if (ui.position.top < bottom) {
          ui.position.top = bottom;
        }

        let right = 0 - self.canvasSize.w + $(window).width();
        if (ui.position.left < right) {
          ui.position.left = right;
        }
      }
    });
    // this.activeRoute.params.forEach((params: Params) => {
    //   let levelId = params['levelId'];
    //   log.i('activeRoute', levelId, params);
    //   this.start();
    // });
    
    // this.start();
    // let game = new GamePhaser(_, $);
    this.start();

    setTimeout(() => {
      log.i('ngOnInit', $('#gameplay canvas').length, window.devicePixelRatio);
      // let canvas: any = $('#gameplay canvas')[0];
      // canvas.width *= window.devicePixelRatio;
      // canvas.height *= window.devicePixelRatio;
      // canvas.getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio);
    }, 1000);
    
  }

  start() {
    let user = {
      money: 1000
    };

    const body = document.body;
    const html = document.documentElement;
    const debugEl = $('#gamedebug');
    const buttonsEl = $('#buttons');
    const popupEl = $('#popup');

    const ratio = window.devicePixelRatio;

    const width = this.canvasSize.h * ratio;
    const height = this.canvasSize.h * ratio;

    let game = new Phaser.Game(width, height, Phaser.CANVAS, 'gameplay', {
      preload: preload,
      create: create,
      update: update,
      init: () => {},
      render: render
    });


    let graphics;
    let platforms;
    let player;
    let cursors;
    let enemies;
    let cannon;
    let weapons;
    let weaponsNames = {};
    let weaponsPositions = getWeaponsPositions();
    let weaponsRanges = [];
    let weaponsArr = [];

    let bullets;
    let bullet;
    let bulletsArr = [];
    let wall;
    let pi = Math.PI;

    let button;
    let label;

    let sound;

    let sprite, enemy, i, x, y, base, b, weapon, w;

    function preload() {
      game.load.image('bullet', 'images/bullet-' + ratio + '.png');

      game.load.spritesheet('w-base', 'images/weapon-base-' + ratio + '.png', 64 * ratio, 64 * ratio, 8);
      game.load.spritesheet('w-gun', 'images/weapon-gun-' + ratio + '.png', 64 * ratio, 64 * ratio, 8);
      game.load.spritesheet('coin', 'images/coin-' + ratio + '.png', 24 * ratio, 24 * ratio, 8);
      game.load.spritesheet('wall', 'images/wall-' + ratio + '.png', 64 * ratio, 192 * ratio, 4);
      game.load.spritesheet('button', 'images/button-' + ratio + '.png', 32 * ratio, 96 * ratio, 1);
      game.load.spritesheet('menu-top', 'images/menu-top-' + ratio + '.png', 16 * ratio, 32 * ratio, 1);
      game.load.audio('sfx', 'audio/shot.wav');

      game.stage.backgroundColor = '#333333';

      game.load.onLoadStart.add(() => {
        console.log('start load');
      }, this);
      game.load.onFileComplete.add(() => {
        console.log('source loaded');
      }, this);
      game.load.onLoadComplete.add(() => {
        console.log('loaded');
        game.stage.backgroundColor = '#8BC34A';
      }, this);
    }

    function create() {

      game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
      // game.scale.minWidth = 320;
      // game.scale.minHeight = 240;
      // game.scale.maxWidth = 1366 * ratio;
      // game.scale.maxHeight = 768 * ratio;
      game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
      game.physics.startSystem(Phaser.Physics.ARCADE);

      graphics = game.add.graphics(0, 0);
      graphics.lineStyle(1, '#333', 1);

      platforms = game.add.group();
      platforms.enableBody = true;


      sound = game.add.audio('sfx');
      sound.addMarker('gun-shot', 0, 1.0);


      // let menuTop = game.add.tileSprite(0, 0, game.world.width, 32 * ratio, 'menu-top');


      wall = game.add.tileSprite(0, game.world.height - 392 * ratio, game.world.width, 192 * ratio, 'wall');
      game.physics.arcade.enable(wall);
      wall.body.immovable = true;
      wall.body.moves = false;
      wall.life = 1000;
      // platforms.add(wall);
      
      // wall.inputEnabled = true;
      // wall.input.enableDrag(true);
      

      
      // game.physics.arcade.collide(enemies);

      weapons = game.add.group();
      weapons.enableBody = true;
      weapons.physicsBodyType = Phaser.Physics.ARCADE;

      for (let i = 0; i < weaponsPositions.length; i++) {
        let position = weaponsPositions[i];
        let weapon = game.add.group();
        weapon.enableBody = true;
        weapon.physicsBodyType = Phaser.Physics.ARCADE;

        let bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        for (let j = 0; j < 40; j++) {
          let b = bullets.create(0, 0, 'bullet');
          b.name = 'bullet' + j;
          b.exists = false;
          b.visible = false;
          b.checkWorldBounds = true;
          b.outOfBoundsKill = true;
          b.events.onOutOfBounds.add(function(bullet) {
            bullet.kill();
          }, this);
          b.anchor.setTo(0.5, 0.5);
        }

        let x = position.x;
        let y = 400 * ratio + position.y;

        let base = weapon.create(x, y, 'w-base');
        base.enableBody = true;
        base.name = 'base' + i;
        base.body.immovable = true;
        base.visible = true;
        base.frame = 0;
        base.timer = 0;
        base.anchor.setTo(0.5, 0.5);
        base.animations.add('open', [0, 1, 2, 3, 5, 6], 15, false);
        base.animations.add('close', [6, 5, 4, 3, 2, 1, 0], 15, false);

        let w = weapon.create(x, y, 'w-gun');
        w.enableBody = true;
        // enemy.body.allowRotation = true;
        w.physicsBodyType = Phaser.Physics.ARCADE;
        w.name = 'weapon' + i;
        w.body.immovable = true;
        w.visible = false;
        w.frame = 0;
        w.timer = 0;
        w.range = 250 * ratio;
        w.anchor.setTo(0.5, 0.5);
        w.animations.add('open', [0, 1, 2, 3], 15, false);
        w.animations.add('close', [3, 2, 1, 0], 15, false);
        w.animations.add('fire', [4, 5, 3], 15, false);

        // graphics = game.add.graphics(x, y);

        // graphics.lineStyle(2, 0xffd900, 1);

        graphics.beginFill('#f00', 0.2);
        graphics.drawCircle(x, y, 500 * ratio);
        graphics.endFill();

        weaponsArr.push(w);
        
        weaponsRanges.push({
          x: x,
          y: y,
          range: 250 * ratio,
          width: 64 * ratio,
          height: 64 * ratio
        });

        // let circle = new Phaser.Circle(x, y, 64);
        // circle.enableBody = true;

        weapon.add(bullets);
        // weapons.add(circle);
        weapons.add(weapon);
      }

      // console.log(weapons);

      enemies = game.add.group();
      enemies.enableBody = true;
      // enemies.inputEnabled = true;
      // enemies.input.enableDrag(true);
      let enemiesLength = game.world.width / (30 * ratio);
      for (let i = 0; i < enemiesLength; i++) {
        let ex = i * 30 * ratio;
        let ey = Math.random() * 100 * ratio;
        let enemy = enemies.create(ex, ey, 'coin');
        let len = 100000000;
        let toWeapon;
        
        enemy.enableBody = true;
        enemy.life = 100;
        enemy.name = 'enemy' + i;
        enemy.anchor.setTo(0.5, 0.5);
        enemy.speed = 100;
        enemy.body.allowRotation = true;
        enemy.physicsBodyType = Phaser.Physics.ARCADE;

        enemy.animations.add('left', [0, 1, 2, 3, 5, 6, 7], 15, true);
        enemy.animations.play('left');

        for (let j = 0; j < weapons.children.length; j++) {
          let weapon = weapons.children[j].children[1];
          let tx = weapon.body.x;
          let ty = weapon.body.y;
          let r = weapon.range;
          const ePosition = (ex - tx) * (ex - tx) + (ey - ty) * (ey - ty);
          const tRange = r * r;

          graphics.drawRect(tx - weapon.width / 2, ty - weapon.height / 2, weapon.width, weapon.height);

          // if (ePosition <= tRange) {
          //   debug('fire');
          //   fireWeapon(enemy);
          // }

          if (((tx - ex) * (tx - ex) + (ty - ey) * (ty - ey)) < len) {
            len = ((tx - ex) * (tx - ex) + (ty - ey) * (ty - ey));
            toWeapon = weapon;
          }
        }

        game.physics.arcade.moveToObject(enemy, toWeapon, enemy.speed);
      }

      button = $('<button/>')
        .addClass('button')
        .attr({
          type: 'button',
          id: 'open_weapons'
        })
        .html('Open')
        .click(function(e) {
          $('#open_weapons').hide();
          $('#close_weapons').show();
          weapons.forEach(weaponGroup => {
            let base = weaponGroup.children[0];
            let weapon = weaponGroup.children[1];
            if (base.frame === 0) {
              base.animations.play('open');
              base.animations.currentAnim.onComplete.add(() => {
                weapon.visible = true;
                weapon.animations.play('open');
              }, this);
            }
          });
        });

      buttonsEl.append(button);

      button = $('<button/>')
        .addClass('button')
        .attr({
          type: 'button',
          id: 'close_weapons'
        })
        .hide()
        .html('Close')
        .click(function(e) {
          $('#open_weapons').show();
          $('#close_weapons').hide();
          weapons.forEach(weaponGroup => {
            let base = weaponGroup.children[0];
            let weapon = weaponGroup.children[1];
            if (base.frame === 6) {
              weapon.animations.play('close');
              weapon.animations.currentAnim.onComplete.add(() => {
                weapon.visible = false;
                base.animations.play('close');
              }, this);
            }
          });
        });
      
      buttonsEl.append(button);

      button = $('<button/>')
        .addClass('button')
        .attr({
          type: 'button',
          id: 'play_game'
        })
        .html('Play')
        .click(function(e) {
          $('#play_game').hide();
          $('#pause_game').show();
          game.paused = false;
        });

      buttonsEl.append(button);

      button = $('<button/>')
        .addClass('button')
        .attr({
          type: 'button',
          id: 'pause_game'
        })
        .hide()
        .html('Pause')
        .click(function(e) {
          $('#play_game').show();
          $('#pause_game').hide();
          game.paused = true;
        });
      
      buttonsEl.append(button);

      debug('started');

      console.log(enemies, game, weapons);

      game.paused = true;
    }

    function update() {
      // graphics.clear();
      // let hitPlatform = game.physics.arcade.collide(player, platforms);

      game.physics.arcade.collide(enemies, weaponsArr, function() {
        
      });

      // game.physics.arcade.overlap(enemies, sprite, function() {
      //   console.log('circle');
      // });
      game.physics.arcade.overlap(enemies, wall, fireWeapon, null, this);

      game.physics.arcade.overlap(bulletsArr, enemies, function(bullet, enemy) {
        // console.log(bullet.name);
        bullet.kill();
        enemy.kill();
        enemy.life = 0;
        bulletsArr.splice(bullet, 1);
      }, null, this);

      // game.physics.arcade.overlap(bullets, enemies, function(bullet, enemy) {
        
      // }, null, this);
      
      //  Checks to see if the player overlaps with any of the enemies, if he does call the collectenemy function
      // game.physics.arcade.overlap(player, enemies, collectenemy, null, this);

      // player.body.velocity.x = 0;


      // for (let i = 0; i < enemies.children.length; i++) {
      //   // enemies.children[i].body.velocity.y += Math.round(Math.random() * 1);
      //   let enemy = enemies.children[i];
      //   let ex = enemy.body.x + enemy.body.width / 2;
      //   let ey = enemy.body.y + enemy.body.height / 2;
      //   let eNewX = 0;
      //   let eNewY = 0;
      //   let len = 100000000;

      //   for (let j = 0; j < weaponsRanges.length; j++) {
      //     let weapon = weaponsRanges[j];
      //     let tx = weapon.x;
      //     let ty = weapon.y;
      //     let r = weapon.range;
      //     const ePosition = (ex - tx) * (ex - tx) + (ey - ty) * (ey - ty);
      //     const tRange = r * r;

      //     graphics.drawRect(tx - weapon.width / 2, ty - weapon.height / 2, weapon.width, weapon.height);

      //     if (ePosition <= tRange) {
      //       debug('fire');
      //       fireWeapon(enemy);
      //       // console.log('fire');
      //       // game.debug.text('fire', game.world.width - 100, 20);
      //     }

          

      //     // const wx = tx - weapon.width / 2;
      //     // const wy = ty - weapon.height / 2;
      //     // const ww = tx - weapon.width / 2 + weapon.width;
      //     // const wh = ty - weapon.height / 2 + weapon.height;

      //     // if (wx <= enemy.body.x + eNewX || ww <= enemy.body.x + eNewX) {
      //     //   eNewX = 0;
      //     // }

      //     // if (wy === enemy.body.y + eNewY || wh <= enemy.body.y + eNewY) {
      //     //   eNewY = 0;
      //     // }

      //     if (((tx - ex) * (tx - ex) + (ty - ey) * (ty - ey)) < len) {
      //       len = ((tx - ex) * (tx - ex) + (ty - ey) * (ty - ey));
            
      //       if (ex > tx && ey < ty) {
      //         let x11 = ex;
      //         let y11 = ey;
      //         let x12 = ex;
      //         let y12 = ty;
              
      //         let x21 = tx;
      //         let y21 = ty;
      //         let x22 = tx + 5;
      //         let y22 = ty - 5;
              
      //         if ((tx - ex) * (tx - ex) > (ty - ey) * (ty - ey)) {
      //           x12 = tx;
      //           y12 = ey;
      //           eNewX -= enemy.speed;
      //         } else if ((tx - ex) * (tx - ex) < (ty - ey) * (ty - ey)) {
      //           eNewY += enemy.speed;
      //         } else {
      //           eNewX -= enemy.speed;
      //           eNewY += enemy.speed;
      //         }
              
      //         // let a1 = y11 - y12;
      //         // let b1 = x12 - x11;
      //         // let c1 = x11 * y12 - x12 * y11;
      //         // let a2 = y21 - y22;
      //         // let b2 = x22 - x21;
      //         // let c2 = x21 * y22 - x22 * y21;
      //         // let x = - ((c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1));
      //         // let y = - ((a1 * c2 - a2 * c1) / (a1 * b2 - a2 * b1));
      //       } else if (ex > tx && ex > ty) {
      //         let x11 = ex;
      //         let y11 = ey;
      //         let x12 = ex;
      //         let y12 = ty;
              
      //         let x21 = tx;
      //         let y21 = ty;
      //         let x22 = tx + 5;
      //         let y22 = ty + 5;
              
      //         if (ex > ey) {
      //           x12 = tx;
      //           y12 = ey;
      //           eNewX -= enemy.speed;
      //         } else if (ex < ey) {
      //           eNewY -= enemy.speed;
      //         } else {
      //           eNewX -= enemy.speed;
      //           eNewY -= enemy.speed;
      //         }
              
      //         // let a1 = y11 - y12;
      //         // let b1 = x12 - x11;
      //         // let c1 = x11 * y12 - x12 * y11;
      //         // let a2 = y21 - y22;
      //         // let b2 = x22 - x21;
      //         // let c2 = x21 * y22 - x22 * y21;
      //         // let x = - ((c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1));
      //         // let y = - ((a1 * c2 - a2 * c1) / (a1 * b2 - a2 * b1));
      //       } else if (ex < tx && ey > ty) {
      //         let x11 = ex;
      //         let y11 = ey;
      //         let x12 = ex;
      //         let y12 = ty;
              
      //         let x21 = tx;
      //         let y21 = ty;
      //         let x22 = tx - 5;
      //         let y22 = ty + 5;
              
      //         if ((tx - ex) * (tx - ex) > (ty - ey) * (ty - ey)) {
      //           x12 = tx;
      //           y12 = ey;
      //           eNewX += enemy.speed;
      //         } else if ((tx - ex) * (tx - ex) < (ty - ey) * (ty - ey)) {
      //           eNewY -= enemy.speed;
      //         } else {
      //           eNewX += enemy.speed;
      //           eNewY -= enemy.speed;
      //         }
              
      //         // let a1 = y11 - y12;
      //         // let b1 = x12 - x11;
      //         // let c1 = x11 * y12 - x12 * y11;
      //         // let a2 = y21 - y22;
      //         // let b2 = x22 - x21;
      //         // let c2 = x21 * y22 - x22 * y21;
      //         // let x = - ((c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1));
      //         // let y = - ((a1 * c2 - a2 * c1) / (a1 * b2 - a2 * b1));
      //       } else if (ex < tx && ey < ty) {
      //         let x11 = ex;
      //         let y11 = ey;
      //         let x12 = ex;
      //         let y12 = ty;
              
      //         let x21 = tx;
      //         let y21 = ty;
      //         let x22 = tx - 5;
      //         let y22 = ty - 5;
              
      //         if (ex - tx < ey - ty) {
      //           x12 = tx;
      //           y12 = ey;
      //           eNewX += enemy.speed;
      //         } else if (ex - tx > ey - ty) {
      //           eNewY += enemy.speed;
      //         } else {
      //           eNewX += enemy.speed;
      //           eNewY += enemy.speed;
      //         }
              
      //         // let a1 = y11 - y12;
      //         // let b1 = x12 - x11;
      //         // let c1 = x11 * y12 - x12 * y11;
      //         // let a2 = y21 - y22;
      //         // let b2 = x22 - x21;
      //         // let c2 = x21 * y22 - x22 * y21;
      //         // let x = - ((c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1));
      //         // let y = - ((a1 * c2 - a2 * c1) / (a1 * b2 - a2 * b1));
      //       } else if (ex === tx) {
      //         if (ey > ty) {
      //           eNewY -= enemy.speed;
      //         } else {
      //           eNewY += enemy.speed;
      //         }
      //       } else if (ey === ty) {
      //         if (ex > tx) {
      //           eNewX -= enemy.speed;
      //         } else {
      //           eNewX += enemy.speed;
      //         }
      //       }
      //     }
      //   }

      //   if (eNewX > 0 || eNewX < 0) {
      //     enemy.body.x += eNewX;
      //   }

      //   if (eNewY > 0 || eNewY < 0) {
      //     enemy.body.y += eNewY;
      //   }
      // }


      // if (cursors.left.isDown) {
      //   //  Move to the left
      //   player.body.velocity.x = -150;

      //   player.animations.play('left');
      // } else if (cursors.right.isDown) {
      //   //  Move to the right
      //   player.body.velocity.x = 150;

      //   player.animations.play('right');
      // } else {
      //   //  Stand still
      //   player.animations.stop();

      //   player.frame = 4;
      // }

      //  Allow the player to jump if they are touching the ground.
      // if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
      //   player.body.velocity.y = -350;
      // }
    }

    function render() {
      // game.debug.text('CodeCaptain Shooting Demo', 10 * ratio, 30 * ratio);
      // game.debug.text('Click or press space / enter to shoot', 10 * ratio, 55 * ratio);
    }


    // Additional

    function fireWeapon(enemy) {
      console.log(enemy);
      weapons.forEach(function(weaponGroup) {
        // console.log(weaponGroup.children);
        let base = weaponGroup.children[0];
        let weapon = weaponGroup.children[1];
        let bullets = weaponGroup.children[2];
        // console.log(weapon.name);

        let bullet = bullets.getFirstExists(false);
        
        // console.log('collide', enemy);
        if (base.frame === 6 && bullet && game.time.now > weapon.timer && enemy.life) {
          bulletsArr.push(bullet);
          bullet.reset(weapon.x, weapon.y);
          let angle = game.physics.arcade.angleBetween(bullet, enemy);
          // console.log('bullet', angle);
          // bullet.body.velocity.y = -300;
          // bullet.body.velocity.x = -300;
          game.physics.arcade.moveToXY(
            bullet,
            enemy.x + 12 * ratio,
            enemy.y + 12 * ratio,
            500 * ratio
          );

          bullet.rotation = angle + pi / 2;
          weapon.rotation = angle + pi / 2;

          // game.add.tween(bullet).to( { x: enemy.x, y: enemy.y }, 2000, 'Linear');
          weapon.timer = game.time.now + 250 * ratio;
          weapon.animations.play('fire');
          sound.play('gun-shot');
        }
      });
      
    }

    function getFullscreen() {
      if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
      } else {
        game.scale.startFullScreen(false);
      }
    }

    function getWeaponsPositions() {
      const widthAttack = 630 * ratio;
      let distance8 = widthAttack / 9;
      let positions = [];
      // positions.push({
      //   x: distance8 * ratio,
      //   y: 0
      // });

      for (let i = 0; i < 8; i++) {
        let x = distance8 + i * distance8 + (width / 2 - widthAttack / 2);
        let y = 0;
        let position = {
          x: x,
          y: y
        };
        positions.push(position);
      }

      // for (let i = 0; i < 7; i++) {
      //   let x = distance8 * 1.5 + i * distance8;
      //   let y = 50 * ratio;
      //   let position = {
      //     x: x,
      //     y: y
      //   };
      //   positions.push(position);
      // }

      return positions;
    }

    function addButton(labelText, x, y, callback) {
      let button = game.add.button(
        x * ratio + 48 * ratio,
        y * ratio + 16 * ratio,
        'button',
        callback,
        this,
        2,
        1,
        0
      );
      button.enableBody = true;
      button.anchor.set(0.5);

      let label = game.add.text(
        x * ratio + 48 * ratio,
        y * ratio + 16 * ratio,
        labelText,
        {
          font: 16 * ratio + 'px Arial',
          fill: '#ffffff',
          align: 'center'
        }
      );
      label.anchor.set(0.5);

      return {
        button: button,
        label: label
      }
    }

    function debug(text) {
      text = typeof text === 'undefined' ? '' : text
      let prepared: any;
      
      switch (text) {
        case 'string':
        default:
          prepared = text;
          break;

        case 'number':
          prepared = text.toString();
          break;

        case 'object':
          if (text instanceof Array) {
            for (let i = 0; i < text.length; i++) {
              prepared += text[i] + "\n";
            }
          } else if (text instanceof Object) {
            for (let i in text) {
              prepared += i + ': ' + text[i] + "\n";
            }
          }
          break;
      }
      debugEl.text(text);
    }
  }

  openWeapons() {
    // this.weapons.forEach(weapon_ => {
    //   // console.log(weapon_.children[0]);
    //   let weapon = weapon_.children[0];
    //   if (weapon.frame === 0) {
    //     weapon.animations.play('open');
    //   }
    // });
  }

  closeWeapons() {
    // this.weapons.forEach(weapon_ => {
    //   // console.log(weapon_.children[0]);
    //   let weapon = weapon_.children[0];
    //   if (weapon.frame === 7) {
    //     weapon.animations.play('close');
    //   }
    // });
  }


  // start() {

  //   this.canvas = document.getElementById('action');
  //   this.ctx = this.canvas.getContext('2d');
  //   this.ctx.imageSmoothingEnabled = true;
  //   this.ctx.webkitImageSmoothingEnabled = true;
  //   this.ctx.mozImageSmoothingEnabled = true;

  //   this.setDefault();
  //   // this.debug();

  //   this.ctx.canvas.width = this.sets.w;
  //   this.ctx.canvas.height = this.sets.h;

  //   this.newStart();
  // }

  // // Main Draw
  // dr() {
  //   let debug = ['dr'];

  //   this.drawClear();

  //   this.drawBullets();
  //   this.drawBase();
  //   this.drawEnemies();

  //   this.debug(debug);
  // }

  // drawClear() {
  //   this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //   this.ctx.beginPath();
  //   // ctx.save();
  //   // ctx.translate(o.x, o.y);
  //   // let img = new Image();
  //   // img.src = 'img/grass4.png';
  //   // let pat=ctx.createPattern(img, 'repeat');
  //   // ctx.rect(0, 0, canvas.width, canvas.height);
  //   // ctx.fillStyle=pat;
  //   // ctx.fill();
  //   this.ctx.fillStyle = 'rgba(0, 120, 0, 0)';
  //   this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  //   // ctx.restore();
  //   this.ctx.closePath();
  // }

  // // Base
  // baseUpdateLevel() {
  //   if (this.base.level < this.base.levels.length - 1) {
  //     this.base.level = this.base.level + 1;
  //     this.CLICK = this.CLICK.filter((c) => {
  //       return c.type !== 'wpnPos';
  //     });
  //     this.BASE.wpns.forEach((wp) => {
  //       if (!this.WPOS['p' + wp.pos]) {
  //         this.WPOS['p' + wp.pos] = '';
  //       }

  //       this.CLICK.push({
  //         x: wp.x,
  //         y: wp.y,
  //         type: 'wpnPos',
  //         w: this.baseWpnPos.w / 2,
  //         h: this.baseWpnPos.h / 2
  //       });
  //     });
  //     // base.life0 = BASE.life;
  //     // base.life = base.life0;
  //     this.wpnsCurrent = this.getWpns();
  //   }
  // }

  // getBase() {
  //   let self = this;
  //   let debug = ['getBase'];
  //   let baseTmp = $.extend({}, this.base.levels[this.base.level]);
  //   baseTmp.x = this.base.x;
  //   baseTmp.y = this.base.y;
  //   baseTmp.w = this.base.w;
  //   baseTmp.h = this.base.h;
  //   baseTmp.life0 = baseTmp.life;
  //   baseTmp.level = this.base.level;
  //   baseTmp.weapons = this.baseLevelsWeapons[this.base.level];

  //   this.debug(debug);
  //   this.BASE = baseTmp;
    
  //   const attrs = [];
  //   // $.each($('#wpns')[0].attributes, () => {
  //   //   if(this.specified && this.name !== 'id') {
  //   //     attrs.push({
  //   //       name: this.name,
  //   //       value: this.value
  //   //     });
  //   //   }
  //   // });

  //   // $('#wpns .wpn-pos').remove();
  //   // this.BASE.wpns.forEach((pos) => {
  //   //   let wpnPos = $(document.createElement('div'));
  //   //   wpnPos
  //   //     .addClass('wpn-pos')
  //   //     .css({
  //   //       left: pos.x - 20 + 'px'
  //   //     })
  //   //     .click(function(e) {
  //   //       self.selectWpn($(this).offset(), pos);
  //   //     });
      
  //   //   attrs.forEach((attr) => {
  //   //     wpnPos.attr(attr.name, attr.value);
  //   //   });

  //   //   if (!!this.WPOS['p' + pos.pos]) {
  //   //     log.i('WPOS', this.WPOS['p' + pos.pos]);
  //   //     wpnPos.addClass('occupied')
  //   //   }

  //   //   $('#wpns').append(wpnPos);
  //   // });


  // }

  // getBasePos() {
  //   let wpnsBase = this.BASE.wpns;
  //   let posTmp = [];

  //   for (let i=0;i < wpnsBase.length;i ++ ) {
  //     let wpnBase = wpnsBase[i];
  //     posTmp.push(wpnBase.pos);
  //   }

  //   return posTmp;
  // }

  // drawBase() {
  //   let o = this.BASE;
  //   let debug = ['drawBase', this.BASE.level];
  //   // $('#debug').html('drawBase' + o.level + ' ' + objs.length);
  //   // let baseCurrent = o.levels[o.level];

  //   // ctx.beginPath();
  //   // ctx.save();
  //   // ctx.translate(o.x, o.y);
  //   // let img = new Image();
  //   // img.src = 'img/' + BASE.img;
  //   // let pat = ctx.createPattern(img, 'repeat');
  //   // ctx.rect(0, 0, o.w, o.h);
  //   // ctx.fillStyle=pat;
  //   // ctx.fill();
  //   // ctx.restore();
  //   // ctx.closePath();

  //   let life = o.life / o.life0 * 100;
  //   if (life < 0) {
  //     life = 0;
  //   }

  //   $('#money').html(this.money(this.sets.money));
  //   $('#lifenumber').html(o.life);
  //   $('#life').width(life + '%');
  //   $('#base')[0].className = '';
  //   $('#base').addClass('base-' + (this.BASE.level + 1));

  //   if (this.wpnsCurrent.length) {
  //     for (let i=0;i < this.wpnsCurrent.length;i ++ ) {
  //       let wpnBase = this.wpnsCurrent[i];
  //       // log.i('wpnBase', wpnBase);
  //       this.drWeapon(wpnBase);
  //     }
  //   }
  //   this.debug(debug);
  // }

  // // Bullet
  // drawBullets() {
  //   for (let i = 0;i < this.BULL.length;i++ ) {
  //     this.drBullet(this.BULL[i]);
  //   }
  // }

  // drBullet(o) {


  //   // if (o.timer>0) {
  //   //  objs[j].timer = o.timer - 1000 / fps;
  //   // } else {
  //   //  objs[j].timer = o.timer0;
  //   // }

  //   // if (o.len1>0) {
  //   //  ctx.beginPath();
  //   //  ctx.fillStyle = o.color;
  //   //  ctx.arc(o.x, o.y, o.w, 0, 2 * Math.PI);
  //   // }

  //   // ctx.fill();
  //   // ctx.closePath();

  //   switch(o.type) {
  //     case 'bullet':
        
        
  //       let tX = o.target.x;
  //       let tY = o.target.y;

  //       if (o.len1 > 0) {
  //         let xy = this.getXY({
  //           x: o.x0,
  //           y: o.y0
  //         }, {
  //           x: o.target.x,
  //           y: o.target.y
  //         }, ((o.len0 - o.len1) / o.len0));

  //         // let xy = {x: 150, y: 300};
  //         o.x = xy.x;
  //         o.y = xy.y;
  //         o.len1 = o.len1 - o.speed;
  //       } else if (o.len1 <= 0) {
  //         this.BULL = this.BULL.filter((obj) => {
  //           return obj.id!==o.id
  //         });
  //         return false
  //       }

  //       let len = Math.sqrt(Math.pow(tX - o.x, 2) + Math.pow(tY - o.y, 2));

  //       if (len > o.bullet.height) {
  //         tX = o.x + (tX - o.x) * (o.bullet.height / len);
  //         tY = o.y + (tY - o.y) * (o.bullet.height / len);
  //       }

  //       // o.opacity = o.opacity - 0.2;

  //       this.ctx.beginPath();
  //       this.ctx.moveTo(o.x, o.y);
  //       this.ctx.lineTo(tX, tY);
  //       this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  //       this.ctx.strokeStyle = 'rgba(' + o.color + ', ' + o.opacity + ')';
  //       this.ctx.lineWidth = o.bullet.width;
  //       this.ctx.stroke();
  //       this.ctx.closePath();
  //       break;

  //     case 'explode':
  //       this.ctx.beginPath();
  //       this.ctx.fillStyle = o.color;
  //       this.ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);
  //       this.ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
  //       this.ctx.lineWidth = 2;
  //       this.ctx.stroke();
  //       this.ctx.fill();
  //       this.ctx.closePath();
  //       o.r = o.r + o.speed;
  //       break;
  //   }
  // }

  // // Enemy
  // drawEnemies() {
  //   let debug = ['drawEnemies'];

  //   for (let i = 0; i < this.ENYS.length; i ++ ) {
  //     let id = this.ENYS[i];
  //     this.drEnemy(this.ENY[id]);
  //     //
  //   }
  //   this.debug(debug);
  // }

  // drEnemy(o) {
  //   // let weapons = objs.filter((obj) => {return obj.type==='weapon'});
  //   let x1 = o.x;
  //   let y1 = o.y;

  //   if (o.y + o.h < this.sets.h - 68 - 4) {
  //     o.y = o.y + o.speed / 10;
  //   } else {
  //     if (o.timer <= 0 ) {
  //       o.timer = o.timer0;
  //     } else if (o.timer === o.timer0) {
  //       this.BASE.life = this.BASE.life - o.damage;
  //     } else {
  //       o.timer = o.timer - 1000 / this.fps;
  //     }
  //   }

  //   if (this.BASE.life < 0) {
  //     this.BASE.life = 0;
  //   }

  //   for (let k = 0;k < this.wpnsCurrent.length;k ++ ) {
  //     let wpn = this.wpnsCurrent[k];
  //     let x0 = wpn.x;
  //     let y0 = wpn.y;
  //     let r = wpn.r;
  //     let len = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
  //     if (len < r
  //       // && o.life>=0
  //       && wpn.timer >= wpn.timer0
  //     ) {
  //       // if (!wpn.snd.paused) {
  //         // wpn.snd.pause();
  //       // }
  //       // wpn.snd.currentTime = 0;
  //       // wpn.snd.play();

  //       setTimeout(() => {
  //         // wpn.snd.pause();
  //       }, 1000);

  //       let xw = x0;
  //       let yw = y0;
  //       let len = Math.sqrt(Math.pow((x1 - xw), 2) + Math.pow((y1 - yw), 2));
  //       let bullet = {
  //         id: uuid(),
  //         x: xw,
  //         y: yw,
  //         x0: xw,
  //         y0: yw,
  //         w: 5,
  //         h: 5,
  //         color: wpn.color,
  //         speed: 50,
  //         life: 100,
  //         type: 'bullet',
  //         len0: len,
  //         len1: len,
  //         timer: 500,
  //         timer0: 500,
  //         target: {
  //           x: x1,
  //           y: y1
  //         },
  //         opacity: 1,
  //         bullet: wpn.bullet
  //       };

  //       this.BULL.push(bullet);

  //       o.life = o.life - wpn.damage;
  //       if (o.life <= 0) {
  //         // this.ENYS.splice(this.ENYS.indexOf(o.id), 1);
  //         // delete ENY[o.id];
  //         this.ENYS = this.ENYS.filter((obj) => {
  //          return obj !== o.id
  //         });
  //         this.sets.money += o.points;
  //         this.mnyEarned += o.points;
  //       }

  //       wpn.timer = wpn.timer - 1000 / this.fps;
  //       let dx = x1 - xw;
  //       let dy = y1 - yw;
  //       wpn.angle = Math.atan(dy / dx) * 180 / Math.PI;
  //     } else {
  //       // o.l  - = 1;
  //     }
  //   }

  //   this.ctx.beginPath();
    
  //   // let img = new Image();
  //   // img.src = 'img/cnv-img-test-1.png';
  //   // // this.ctx.drawImage(img, o.x, o.y);
  //   // this.ctx.drawImage(img, 0, 0, 32, 32, o.x, o.y, 16, 16);
    
  //   this.ctx.fillStyle = o.color;
  //   this.ctx.arc(o.x, o.y, o.w, 0, 2 * Math.PI);
  //   this.ctx.fill();
  //   // this.ctx.fillRect(o.x - o.w / 2, o.y - o.h / 2, o.w, o.h);
    
  //   this.ctx.closePath();

  //   let w = 10;
  //   let h = 2;
  //   let x = o.x - w / 2;
  //   let life = o.life * w / o.life0;
  //   if (life < 0) {
  //     life = 0;
  //   }

  //   this.ctx.beginPath();
  //   this.ctx.fillStyle = this.lifeColor0;
  //   this.ctx.fillRect(x, o.y - 15, w, h);

  //   this.ctx.fillStyle = this.lifeColor;
  //   this.ctx.fillRect(x, o.y - 15, life, h);
  //   this.ctx.closePath();
  //   // ctx.fillStyle = o.color;
  //   // ctx.fillRect (o.x, o.y, o.w, o.h);
  // }

  // // Debug
  // debug(a) {
  //   let result = '';
  //   if (typeof a === 'string') {
  //     result = a;
  //   } else if (typeof a === 'object') {
  //     result = a.join(' ');
  //   }
  //   // log.i('debug', result);
  // }

  // // Defaults
  // setDefault() {
  //   this.default.base = $.extend({}, this.base);
  //   this.default.BULL = $.extend([], this.BULL);
  //   this.default.bullets = $.extend({}, this.bullets);
  //   this.default.objs = $.extend([], this.objs);
  //   this.default.wave = $.extend({}, this.wave);
  //   this.default.ENY = $.extend({}, this.ENY);
  //   this.default.ENYS = $.extend([], this.ENYS);
  //   this.default.ww = $.extend({}, this.ww);
  //   this.default.wh = $.extend({}, this.wh);
  //   this.default.WPOS = $.extend({}, this.WPOS);
  //   this.default.wpns = $.extend({}, this.wpns);
  //   this.default.wpnsCurrent = $.extend([], this.wpnsCurrent);
  // }

  // getDefault() {
  //   this.base = $.extend({}, this.default.base);
  //   this.BULL = $.extend([], this.default.BULL);
  //   this.bullets = $.extend({}, this.default.bullets);
  //   this.objs = $.extend([], this.default.objs);
  //   this.wave = $.extend({}, this.default.wave);
  //   this.ENY = $.extend({}, this.default.ENY);
  //   this.ENYS = $.extend([], this.default.ENYS);
  //   this.ww = $.extend({}, this.default.ww);
  //   this.wh = $.extend({}, this.default.wh);
  //   this.WPOS = $.extend({}, this.default.WPOS);
  //   this.wpns = $.extend({}, this.default.wpns);
  //   this.wpnsCurrent = $.extend([], this.default.wpnsCurrent);
  // }

  // // Func
  // getXY(start, end, percent) {
  //   let dx = end.x - start.x;
  //   let dy = end.y - start.y;
  //   let X = start.x + dx * percent;
  //   let Y = start.y + dy * percent;
  //   return {x: X, y: Y};
  // }

  // wv() {
  //   this.wave.push(this.wave[this.wave.length - 1] + 1);
  //   if (this.wave <= this.waves) {
  //     setTimeout(this.wv, 1000);
  //   }
  // }

  // fr() {
  //   this.debug('fr');
  //   let bullet = {
  //     id: uuid(),
  //     x: this.sets.w / 2,
  //     y: (this.sets.h - 160) / 2,
  //     r: 5,
  //     color: 'rgba(255, 0, 0, 0.3)',
  //     speed: 5,
  //     life: 100,
  //     type: 'explode',
  //     timer: 500,
  //     timer0: 500,
  //     opacity: 1
  //   };
  //   this.BULL.push(bullet);
  // }

  // upgrade() {
  //   let msg: any = {};

  //   msg.title = 'Upgrade';

  //   msg.content = '';
  //   msg.content += '<div>Base</div>';
  //   msg.content += '<div>Weapons</div>';
  //   msg.content += '<div>Wall</div>';

  //   // this.app.openPopup(msg);
  // }

  // money(num) {
  //   num = num.toString();
  //   let newNum = '';
  //   for (let i = num.length - 1, j = 0; i >= 0; i -- , j ++ ) {
  //     if (j >= 3) {
  //       newNum += '.';
  //       j = 0;
  //     }
  //     newNum += num[i];
  //   }
  //   num = '';
  //   for (let i = newNum.length - 1; i >= 0; i -- ) {
  //     num += newNum[i];
  //   }
  //   return num;
  // }

  // // Playback
  // newStart() {
  //   this.started = true;
  //   this.mnyEarned = 0;
  //   this.getDefault();
  //   this.getBase();
  //   this.BASE.wpns.forEach((wp) => {
  //     this.WPOS['p' + wp.pos] = '';
  //   });

  //   this.ENY = {};
  //   this.ENYS = [];
  //   for (let i = 0; i < this.waves.length; i ++ ) {
  //     let y = -10;
  //     for (let k = 0; k < this.waves[i].length; k ++ ) {
  //       let nWv = this.waves[i][k];
  //       let count = nWv.count;
  //       let x = 0;

  //       // let perRow = count / 4;
  //       for (let j = 0;j < count;j ++ ) {
  //         let nEny = $.extend({}, this.enemy[nWv.type]);
  //         if (x + this.sets.w / nEny.mpr + 10 >= this.sets.w) {
  //           y = y - 20;
  //           x = this.sets.w / nEny.mpr - nEny.w / 2;
  //         } else {
  //           x = x + this.sets.w / nEny.mpr - nEny.w / 2;
  //         }

  //         let idEnemy = uuid();
  //         nEny.id = idEnemy;
  //         nEny.x = _.random(x - nEny.w * 0.5, x + nEny.w * 0.5);
  //         nEny.y = _.random(y - nEny.w * 0.5, y + nEny.w * 0.5);
  //         nEny.speed = _.random(nEny.speed - nEny.speed * 0.1, nEny.speed + nEny.speed * 0.1);

  //         this.ENY[idEnemy] = nEny;
  //         this.ENYS.push(idEnemy);
  //       }
  //     }
  //   }
  //   this.dr();
  //   this.stp();
  // }

  // st(start) {
  //   let debug = ['st'];
  //   clearTimeout(this.t);
  //   $('#start').hide();
  //   $('#stop').show();
  //   start = typeof start === 'undefined' ? false : start;
  //   if (start) {
  //     this.timer = 0;
  //     this.playing = true;
  //   } else {
  //     this.timer = this.timer + 1000 / this.fps;
  //   }

  //   // if (timer>2000) {
  //   //  wave.push(wave[wave.length - 1] + 1);
  //   //  timer = 0;
  //   // }

  //   // log.i('st', this, this.BASE);
  //   if (this.BASE.life > 0 && this.ENYS.length > 0) {
  //     this.dr();
  //     this.t = setTimeout(() => {
  //       this.st(false);
  //     }, 1000 / this.fps);
  //   } else if (this.BASE.life <= 0) {
  //     this.drawClear();
  //     this.drawBase();
  //     this.drawEnemies();
  //     this.stp();
  //     // this.app.openPopup({
  //     //   title: 'Game Over',
  //     //   msg: 'Your base was destroyed',
  //     //   type: 'game-over',
  //     //   closeCallback: () => {
  //     //     this.router.navigate(['/levels']);
  //     //   }
  //     // });

  //   } else if (this.ENYS.length === 0) {
  //     this.drawClear();
  //     this.drawBase();
  //     this.stp();
  //     // this.app.openPopup({
  //     //   title: 'Victory',
  //     //   msg: 'You earned $' + this.mnyEarned,
  //     //   type: 'game-victory',
  //     //   closeCallback: () => {
  //     //     this.router.navigate(['/levels']);
  //     //   }
  //     // });

  //   }
  //   this.debug(debug);
  // }

  // stp() {
  //   this.debug('stp');
  //   $('#start').show();
  //   $('#stop').hide();
  //   clearTimeout(this.t);
  //   this.playing = false;
  //   this.drawBase();
  // }

  // // Weapons
  // drWeapon(o) {
  //   let debug = ['drWeapon'];

  //   if (o.timer <= 0) {
  //     o.timer = o.timer0;
  //   } else if (o.timer < o.timer0) {
  //     o.timer = o.timer - 1000 / this.fps;
  //   }

  //   if (!this.playing) {
  //     this.ctx.beginPath();
  //     this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  //     this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  //     this.ctx.lineWidth = 4;
  //     this.ctx.arc(o.x, o.y, o.r, 1 * Math.PI, 2 * Math.PI);
  //     this.ctx.fill();
  //     this.ctx.stroke();
  //     this.ctx.closePath();
  //   }

  //   this.drWpn(o);
  //   this.debug(debug);
  // }

  // drWpn(o) {
  //   let x = o.x;
  //   let y = o.y;
  //   let angle = 0;
  //   let debug = ['drWpn'];
  //   // let color1 = '';
  //   // let color2 = '';
  //   // let color3 = '';
  //   // let color4 = '';
  //   // let color5 = '';

  //   if (o.angle>0) {
  //     angle = (o.angle + 270) * Math.PI / 180;
  //   } else {
  //     angle = (o.angle + 90) * Math.PI / 180;
  //   }

  //   this.ctx.save();

  //   this.ctx.translate(x, y);
  //   this.ctx.rotate(angle);

  //   // this.ctx.beginPath();
    
  //   // let img = new Image();
  //   // img.src = 'img/wpn4.png';
  //   // // this.ctx.drawImage(img, o.x, o.y);
  //   // this.ctx.drawImage(img, 0, 0, 32, 32, 0, 0, 32, 32);
    
  //   // // this.ctx.fillStyle = o.color;
  //   // // // ctx.arc(o.x, o.y, o.w, 0, 2 * Math.PI);
  //   // // this.ctx.fill();
  //   // // this.ctx.fillRect(o.x - o.w / 2, o.y - o.h / 2, o.w, o.h);
    
  //   // this.ctx.closePath();

  //   let grda = this.ctx.createRadialGradient(0, 0, 1, 1, 1, 16);
  //   grda.addColorStop(0, o.c2);
  //   grda.addColorStop(1, o.c3);

  //   let grdl = this.ctx.createLinearGradient( -2, 0, 2, 0);
  //   grdl.addColorStop(0, o.c5);
  //   grdl.addColorStop(0.5, o.c6);
  //   grdl.addColorStop(1, o.c5);

  //   // base
  //   this.ctx.beginPath();
  //   this.ctx.fillStyle = o.c1;
  //   this.ctx.arc(0, 0, 14, 1 * Math.PI, 3 * Math.PI);
  //   this.ctx.fill();
  //   this.ctx.closePath();

  //   // barrel
  //   this.ctx.beginPath();
  //   this.ctx.fillStyle = grdl;
  //   this.ctx.fillRect( -3, -30, 6, 20);
  //   this.ctx.closePath();

  //   // hood
  //   this.ctx.beginPath();
  //   this.ctx.fillStyle = grda;
  //   this.ctx.arc(0, 0, 10, 1 * Math.PI, 3 * Math.PI);
  //   this.ctx.fill();
  //   this.ctx.closePath();

  //   // hood decor
  //   this.ctx.beginPath();
  //   this.ctx.fillStyle = o.c4;
  //   this.ctx.fillRect(0, 0, 6, 6);
  //   this.ctx.closePath();

  //   // hood decor
  //   this.ctx.beginPath();
  //   this.ctx.fillStyle = o.c4;
  //   this.ctx.arc( -5, -2, 4, 1 * Math.PI, 3 * Math.PI);
  //   this.ctx.fill();
  //   this.ctx.closePath();




  //   // let xx = 0;
  //   // if (o.angle<30) {
  //   //  xx = 32;
  //   // } else if (o.angle<60) {
  //   //  xx = 64;
  //   // } else if (o.angle<90) {
  //   //  xx = 96;
  //   // }
  //   // let img = new Image();
  //   // img.src = 'img/' + o.img;
  //   // ctx.drawImage(img, - Math.round(o.w / 2), - Math.round(o.h / 2));
  //   // ctx.drawImage(img, xx, 0, 32, 32, - (o.w / 2), - (o.h / 2), 32, 32);
  //   // draw(ctx);
  //   this.ctx.restore();

  //   this.debug(debug);
  // }

  // drAddWeapons(x, y) {
  //   // stp();

  //   let debug = [];
  //   let pos: any;
  //   let wpnsSize = Object.keys(this.wpns).length;

  //   this.BASE.wpns.forEach((wpn) => {

  //     if (x <= wpn.x + 10
  //       && x >= wpn.x - 10
  //       && y <= wpn.y + 10
  //       && y >= wpn.y - 10
  //     ) {
  //       pos = wpn;
  //     }
  //   });

  //   if (!!pos) {
  //     this.stp();
  //     this.ctx.beginPath();
  //     this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  //     this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  //     this.ctx.arc(pos.x, pos.y, 10, 1 * Math.PI, 3 * Math.PI);
  //     this.ctx.fill();
  //     this.ctx.stroke();
  //     this.ctx.closePath();

  //     let wpnsW = wpnsSize * this.ww * 2;
  //     let wpnsH = this.wh * 2;
  //     let wpnsX = pos.x - wpnsW / 2;
  //     let wpnsY = pos.y - wpnsH * 2;

  //     this.ctx.beginPath();
  //     this.ctx.moveTo(wpnsX + wpnsW / 2, wpnsY + this.wh * 2);
  //     this.ctx.lineTo(pos.x, pos.y - 10);
  //     this.ctx.stroke();

  //     if (wpnsX + wpnsW > this.sets.w) {
  //       wpnsX = this.sets.w - wpnsW - 10;
  //     } else if (wpnsX < 0) {
  //       wpnsX = 10;
  //     }

  //     let wpnx = wpnsX;
  //     let wpny = wpnsY;

  //     for (let i in this.wpns) {
  //       if (this.wpns.hasOwnProperty(i)) {
  //         let wpn = this.wpns[i];
  //         let wp = $.extend({}, wpn);


  //         this.ctx.beginPath();
  //         this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  //         this.ctx.fillRect(wpnx, wpny, this.ww * 2, this.wh * 2);
  //         this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  //         this.ctx.lineWidth = 2;
  //         this.ctx.strokeRect(wpnx, wpny, this.ww * 2, this.wh * 2);
  //         this.ctx.closePath();

  //         $('body').append('<span style="'
  //            + 'left: ' + wpnx + 'px;'
  //            + 'top: ' + wpny + 'px;'
  //            + '" class="wpn-sel-props">'
  //            + '☄ ' + wp.damage + '<br>'
  //            + '☉ ' + wp.r + '<br>'
  //            + 'speed ' + 1000 / wp.timer0 + '/s<br>'
  //            + '$ ' + wp.cost
  //            + '</span>');

  //         wp.x = wpnx + this.ww / 2 * 3;
  //         wp.y = wpny + this.wh;
  //         this.drWpn(wp);

  //         this.CLICK.push({
  //           type: 'selWpn',
  //           x: wpnx + this.ww,
  //           y: wpny,
  //           w: this.ww,
  //           h: this.wh,
  //           wpnType: i,
  //           pos: pos.pos
  //         });
  //         wpnx = wpnx + this.ww * 2;
  //       }
  //     }
  //   }

  //   this.debug(debug);
  // }

  // saveWpn(type, pos) {

  //   if (this.sets.money - this.wpns[type].cost>=0) {
  //     this.sets.money = this.sets.money - this.wpns[type].cost;
  //     this.BASE.wpns.forEach((wp) => {
  //       if (wp.pos === pos) {
  //         this.WPOS['p' + wp.pos] = type;
  //       }
  //     });
  //     this.wpnsCurrent = this.getWpns();
  //     this.drawClear();
  //     this.drawBase();
  //   } else {

  //   }
  // }

  // getWpns() {
  //   // let baseCurrent = base.levels[base.level];
  //   // let wpnsBase = wpos;
  //   let wpnsCurrentTmp = [];

  //   for (let i in this.WPOS) {
  //     if (!!this.WPOS[i]) {
  //       let wpn = $.extend({}, this.wpns[this.WPOS[i]]);
  //       let pos = this.BASE.wpns.filter((p) => {
  //         return p.pos == i.replace('p', '');
  //       })[0];

  //       wpn.x = pos.x;
  //       wpn.y = pos.y;

  //       // let shot = new Audio(tone1);
  //       // shot.play();
  //       // shot.pause();

  //       // shot.volume = 0;

  //       // if (!shot.paused) {
  //         setTimeout(() => {
  //           // shot.pause();
  //           // shot.volume = 0.3;
  //         }, 100);
  //       // } else {
  //         // shot.volume = 0.3;
  //       // }
  //       // wpn.snd = shot;
  //       wpnsCurrentTmp.push(wpn);
  //     }

  //     // drWeapon(wpn);
  //   }

  //   return wpnsCurrentTmp;
  // }

  // selectWpn(cntPos, pos) {
  //   let self = this;
  //   let cnt = $('<div/>');
  //   let cntBg = $('<div/>');
  //   let cntContent = $('<div/>');
  //   cnt.attr('id', 'cnt');

  //   cntBg
  //     .addClass('cnt-bg')
  //     .click(() => {
  //       cntBg.remove();
  //       cnt.remove();
  //     });
    
  //   cntContent.addClass('cnt-content');

  //   // for (let i=0;i<this.BASE.wpns.length;i ++ ) {
  //   //   let posBase = this.BASE.wpns[i];
  //   //   let selWpn = $('<select/>');
  //   //   selWpn.attr('id', 'pos' + posBase.pos);

  //   //   let optWpn = $('<option/>');
  //   //   optWpn
  //   //     .val( - 1)
  //   //     .html('no weapon');

  //   //   selWpn.append(optWpn);

  //   for (let j in this.wpns) {
  //     if (this.wpns.hasOwnProperty(j)) {
  //       let wpn = this.wpns[j];

  //       let optWpn = $('<div/>');

  //       let damage = wpn.damage / this.max.damage * 100;
  //       if (damage > 100) {damage = 100;}
  //       else if (damage < 0) {damage = 0;}

  //       let range = wpn.r / this.max.r * 100;
  //       if (range > 100) {range = 100;}
  //       else if (range < 0) {range = 0;}

  //       const wpnTimer = 1000 / wpn.timer;
  //       const maxTimer = 1000 / this.max.timer;

  //       let timer = wpnTimer / maxTimer * 100;
  //       if (timer > 100) {timer = 100;}
  //       else if (timer < 0) {timer = 0;}

  //       optWpn
  //         .addClass('sel-wpn')
  //         .data('type', j)
  //         .html(
  //           '<img class="preview" src="' + wpn.img + '">'
  //             + '<div class="stats">'
  //               + '<div class="stat">'
  //                 + '<img src="' + this.imagesUrl + 'icon-damage.svg" class="icon">'
  //                 + wpn.damage
  //                 + '<div class="stat-max">'
  //                   + '<div class="stat-current" style="width: ' + damage + '%;"></div>'
  //                 + '</div>'
  //               + '</div>'
  //               + '<div class="stat">'
  //                 + '<img src="' + this.imagesUrl + 'icon-range.svg" class="icon">'
  //                 + wpn.r
  //                 + '<div class="stat-max">'
  //                   + '<div class="stat-current" style="width: ' + range + '%;"></div>'
  //                 + '</div>'
  //               + '</div>'
  //               + '<div class="stat">'
  //                 + '<img src="' + this.imagesUrl + 'icon-fire-rate.svg" class="icon">'
  //                 + wpn.timer
  //                 + '<div class="stat-max">'
  //                   + '<div class="stat-current" style="width: ' + timer + '%;"></div>'
  //                 + '</div>'
  //               + '</div>'
  //               + '<div class="stat">'
  //                 + '⛃ ' + wpn.cost
  //               + '</div>'
  //             + '</div>'
  //         )
  //         .click(() => {
  //           self.sets.money = self.sets.money - wpn.cost;
  //           self.WPOS['p' + pos.pos] = $(this).data('type');
  //           self.wpnsCurrent = self.getWpns();
  //           self.getBase();
  //           self.drawClear();
  //           self.drawBase();
  //           cnt.remove();
  //           cntBg.remove();
  //         });
  //       // selWpn.append(optWpn);
  //       cntContent.append(optWpn);
  //     }
  //   }

  //   //   if (!!this.WPOS['p' + posBase.pos]) {
  //   //     selWpn.val(this.WPOS['p' + posBase.pos]);
  //   //   }

  //   //   let cntLine = $('<div/>');
  //   //   cntLine.append('position ' + posBase.pos + ': ');
  //   //   cntLine.append(selWpn);
  //   //   cnt.append(cntLine);
  //   // }

  //   cnt.append(cntContent);

  //   let save = $('<button/>');
  //   save
  //     .attr('type', 'button')
  //     .html('Save')
  //     .click(() => {
  //       self.BASE.wpns.forEach((wp) => {
  //         let wpn = $('#pos' + wp.pos).val();
  //         if (wpn !== - 1) {
  //           self.WPOS['p' + wp.pos] = wpn;
  //         }
  //       });
  //       self.wpnsCurrent = self.getWpns();
  //       cnt.remove();
  //     });
  //   // cnt.append(save);

  //   let close = $('<button/>');
  //   close
  //     .attr('type', 'button')
  //     .html('Close')
  //     .click(() => {
  //       cnt.remove();
  //       cntBg.remove();
  //     });
  //   cnt.append(close);

  //   let arrow = $('<div/>');
  //   arrow.addClass('arrow');

  //   cnt.append(arrow);

  //   $('body').append(cnt);
  //   let top = cntPos.top - cnt.height();
  //   if (top < 20) {top = 20;}
  //   // cnt.css({
  //   //   top: top + 'px'
  //   // });
  //   $('body').append(cntBg);
  // }

  getSwitchName() {
    const name = this.switchToVillage ? 'Wall' : 'Village';
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
