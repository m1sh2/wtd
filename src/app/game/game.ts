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

    this.makeDraggable();
    
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

  makeDraggable() {
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
  }

  start() {
    let user = {
      money: 1000
    };

    let self = this;

    const body = document.body;
    const html = document.documentElement;
    const debugEl = $('#gamedebug');
    const buttonsEl = $('#buttons');
    const popupEl = $('#popup');
    const gameplay = $('#gameplay');

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

      button = $('<button/>')
        .addClass('button')
        .attr({type: 'button'})
        .html(' + ')
        .click(function(e) {
          if (gameplay.attr('zoom')) {
            let zoom = _.parseInt(gameplay.attr('zoom'));

            if (zoom < 4) {
              zoom++;
              gameplay.attr('zoom', zoom);
            } else {
              gameplay.removeAttr('zoom');
            }
          }

          if (
            (
              (gameplay.width() > $(window).width() && gameplay.height() <= $(window).height())
              ||
              (gameplay.width() <= $(window).width() && gameplay.height() > $(window).height())
              ||
              (gameplay.width() <= $(window).width() && gameplay.height() <= $(window).height())
            )
            && !gameplay.hasClass('ui-draggable')
            ) {
            self.makeDraggable();
          }
        });
      
      buttonsEl.append(button);

      button = $('<button/>')
        .addClass('button')
        .attr({type: 'button'})
        .html(' - ')
        .click(function(e) {
          if (!gameplay.attr('zoom')) {
            gameplay.attr('zoom', 4);
          } else {
            let zoom = _.parseInt(gameplay.attr('zoom'));

            if (zoom > 1) {
              zoom--;
              gameplay.attr('zoom', zoom);
            }
          }

          if (
            (gameplay.width() < $(window).width() || gameplay.height() < $(window).height())
            && gameplay.hasClass('ui-draggable')
          ) {
            gameplay.draggable('destroy');
          }
        });
      
      buttonsEl.append(button);

      debug('started');

      console.log(enemies, game, weapons);

      game.paused = true;
    }

    function update() {
      // graphics.clear();
      // let hitPlatform = game.physics.arcade.collide(player, platforms);

      game.physics.arcade.collide(enemies, weaponsArr, function(weapon, enemy) {
        // console.log(enemy, weapon);
        enemy.body.velocity = 0;
        fireWeapon(enemy);
      });

      // game.physics.arcade.overlap(enemies, sprite, function() {
      //   console.log('circle');
      // });
      // game.physics.arcade.overlap(enemies, wall, fireWeapon, null, this);

      game.physics.arcade.overlap(bulletsArr, enemies, function(bullet, enemy) {
        // console.log(bullet.name);
        bullet.kill();
        enemy.kill();
        enemy.life = 0;
        bulletsArr.splice(bullet, 1);
      }, null, this);
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
      debugEl.text(text + ' ratio:' + ratio);
    }
  }

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
