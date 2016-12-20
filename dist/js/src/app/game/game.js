// Game
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as $ from 'jquery';
var uuid = require('uuid/v4');
import { Page } from '../page';
// import { GamePhaser } from './game.phaser';
import { Log } from 'ng2-logger/ng2-logger';
var log = Log.create('Game');
log.color = 'orange';
var Game = (function () {
    function Game(router, page, activeRoute) {
        // super();
        this.router = router;
        this.page = page;
        this.activeRoute = activeRoute;
        this.canvasSize = {
            w: 2000,
            h: 2000
        };
        this.switchToVillage = false;
        this.optionsPopup = {};
    }
    Game.prototype.ngOnInit = function () {
        var self = this;
        this.makeDraggable();
        // this.activeRoute.params.forEach((params: Params) => {
        //   let levelId = params['levelId'];
        //   log.i('activeRoute', levelId, params);
        //   this.start();
        // });
        // this.start();
        // let game = new GamePhaser(_, $);
        this.start();
        setTimeout(function () {
            log.i('ngOnInit', $('#gameplay canvas').length, window.devicePixelRatio);
            // let canvas: any = $('#gameplay canvas')[0];
            // canvas.width *= window.devicePixelRatio;
            // canvas.height *= window.devicePixelRatio;
            // canvas.getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio);
        }, 1000);
    };
    Game.prototype.makeDraggable = function () {
        var self = this;
        $('#gameplay').draggable({
            drag: function (e, ui) {
                console.log(ui.position);
                if (ui.position.top > 0) {
                    ui.position.top = 0;
                }
                if (ui.position.left > 0) {
                    ui.position.left = 0;
                }
                var bottom = 0 - self.canvasSize.h + $(window).height();
                if (ui.position.top < bottom) {
                    ui.position.top = bottom;
                }
                var right = 0 - self.canvasSize.w + $(window).width();
                if (ui.position.left < right) {
                    ui.position.left = right;
                }
            }
        });
    };
    Game.prototype.start = function () {
        var user = {
            money: 1000
        };
        var self = this;
        var body = document.body;
        var html = document.documentElement;
        var debugEl = $('#gamedebug');
        var buttonsEl = $('#buttons');
        var popupEl = $('#popup');
        var gameplay = $('#gameplay');
        var ratio = window.devicePixelRatio;
        var width = this.canvasSize.h * ratio;
        var height = this.canvasSize.h * ratio;
        var game = new Phaser.Game(width, height, Phaser.CANVAS, 'gameplay', {
            preload: preload,
            create: create,
            update: update,
            init: function () { },
            render: render
        });
        var graphics;
        var platforms;
        var player;
        var cursors;
        var enemies;
        var cannon;
        var weapons;
        var weaponsNames = {};
        var weaponsPositions = getWeaponsPositions();
        var weaponsRanges = [];
        var weaponsArr = [];
        var bullets;
        var bullet;
        var bulletsArr = [];
        var wall;
        var pi = Math.PI;
        var button;
        var label;
        var sound;
        var sprite, enemy, i, x, y, base, b, weapon, w;
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
            game.load.onLoadStart.add(function () {
                console.log('start load');
            }, this);
            game.load.onFileComplete.add(function () {
                console.log('source loaded');
            }, this);
            game.load.onLoadComplete.add(function () {
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
            for (var i_1 = 0; i_1 < weaponsPositions.length; i_1++) {
                var position = weaponsPositions[i_1];
                var weapon_1 = game.add.group();
                weapon_1.enableBody = true;
                weapon_1.physicsBodyType = Phaser.Physics.ARCADE;
                var bullets_1 = game.add.group();
                bullets_1.enableBody = true;
                bullets_1.physicsBodyType = Phaser.Physics.ARCADE;
                for (var j = 0; j < 40; j++) {
                    var b_1 = bullets_1.create(0, 0, 'bullet');
                    b_1.name = 'bullet' + j;
                    b_1.exists = false;
                    b_1.visible = false;
                    b_1.checkWorldBounds = true;
                    b_1.outOfBoundsKill = true;
                    b_1.events.onOutOfBounds.add(function (bullet) {
                        bullet.kill();
                    }, this);
                    b_1.anchor.setTo(0.5, 0.5);
                }
                var x_1 = position.x;
                var y_1 = 400 * ratio + position.y;
                var base_1 = weapon_1.create(x_1, y_1, 'w-base');
                base_1.enableBody = true;
                base_1.name = 'base' + i_1;
                base_1.body.immovable = true;
                base_1.visible = true;
                base_1.frame = 0;
                base_1.timer = 0;
                base_1.anchor.setTo(0.5, 0.5);
                base_1.animations.add('open', [0, 1, 2, 3, 5, 6], 15, false);
                base_1.animations.add('close', [6, 5, 4, 3, 2, 1, 0], 15, false);
                var w_1 = weapon_1.create(x_1, y_1, 'w-gun');
                w_1.enableBody = true;
                // enemy.body.allowRotation = true;
                w_1.physicsBodyType = Phaser.Physics.ARCADE;
                w_1.name = 'weapon' + i_1;
                w_1.body.immovable = true;
                w_1.visible = false;
                w_1.frame = 0;
                w_1.timer = 0;
                w_1.range = 250 * ratio;
                w_1.anchor.setTo(0.5, 0.5);
                w_1.animations.add('open', [0, 1, 2, 3], 15, false);
                w_1.animations.add('close', [3, 2, 1, 0], 15, false);
                w_1.animations.add('fire', [4, 5, 3], 15, false);
                // graphics = game.add.graphics(x, y);
                // graphics.lineStyle(2, 0xffd900, 1);
                graphics.beginFill('#f00', 0.2);
                graphics.drawCircle(x_1, y_1, 500 * ratio);
                graphics.endFill();
                weaponsArr.push(w_1);
                weaponsRanges.push({
                    x: x_1,
                    y: y_1,
                    range: 250 * ratio,
                    width: 64 * ratio,
                    height: 64 * ratio
                });
                // let circle = new Phaser.Circle(x, y, 64);
                // circle.enableBody = true;
                weapon_1.add(bullets_1);
                // weapons.add(circle);
                weapons.add(weapon_1);
            }
            // console.log(weapons);
            enemies = game.add.group();
            enemies.enableBody = true;
            // enemies.inputEnabled = true;
            // enemies.input.enableDrag(true);
            var enemiesLength = game.world.width / (30 * ratio);
            for (var i_2 = 0; i_2 < enemiesLength; i_2++) {
                var ex = i_2 * 30 * ratio;
                var ey = Math.random() * 100 * ratio;
                var enemy_1 = enemies.create(ex, ey, 'coin');
                var len = 100000000;
                var toWeapon = void 0;
                enemy_1.enableBody = true;
                enemy_1.life = 100;
                enemy_1.name = 'enemy' + i_2;
                enemy_1.anchor.setTo(0.5, 0.5);
                enemy_1.speed = 100;
                enemy_1.body.allowRotation = true;
                enemy_1.physicsBodyType = Phaser.Physics.ARCADE;
                enemy_1.animations.add('left', [0, 1, 2, 3, 5, 6, 7], 15, true);
                enemy_1.animations.play('left');
                for (var j = 0; j < weapons.children.length; j++) {
                    var weapon_2 = weapons.children[j].children[1];
                    var tx = weapon_2.body.x;
                    var ty = weapon_2.body.y;
                    var r = weapon_2.range;
                    var ePosition = (ex - tx) * (ex - tx) + (ey - ty) * (ey - ty);
                    var tRange = r * r;
                    graphics.drawRect(tx - weapon_2.width / 2, ty - weapon_2.height / 2, weapon_2.width, weapon_2.height);
                    // if (ePosition <= tRange) {
                    //   debug('fire');
                    //   fireWeapon(enemy);
                    // }
                    if (((tx - ex) * (tx - ex) + (ty - ey) * (ty - ey)) < len) {
                        len = ((tx - ex) * (tx - ex) + (ty - ey) * (ty - ey));
                        toWeapon = weapon_2;
                    }
                }
                game.physics.arcade.moveToObject(enemy_1, toWeapon, enemy_1.speed);
            }
            button = $('<button/>')
                .addClass('button')
                .attr({
                type: 'button',
                id: 'open_weapons'
            })
                .html('Open')
                .click(function (e) {
                var _this = this;
                $('#open_weapons').hide();
                $('#close_weapons').show();
                weapons.forEach(function (weaponGroup) {
                    var base = weaponGroup.children[0];
                    var weapon = weaponGroup.children[1];
                    if (base.frame === 0) {
                        base.animations.play('open');
                        base.animations.currentAnim.onComplete.add(function () {
                            weapon.visible = true;
                            weapon.animations.play('open');
                        }, _this);
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
                .click(function (e) {
                var _this = this;
                $('#open_weapons').show();
                $('#close_weapons').hide();
                weapons.forEach(function (weaponGroup) {
                    var base = weaponGroup.children[0];
                    var weapon = weaponGroup.children[1];
                    if (base.frame === 6) {
                        weapon.animations.play('close');
                        weapon.animations.currentAnim.onComplete.add(function () {
                            weapon.visible = false;
                            base.animations.play('close');
                        }, _this);
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
                .click(function (e) {
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
                .click(function (e) {
                $('#play_game').show();
                $('#pause_game').hide();
                game.paused = true;
            });
            buttonsEl.append(button);
            button = $('<button/>')
                .addClass('button')
                .attr({ type: 'button' })
                .html(' + ')
                .click(function (e) {
                if (gameplay.attr('zoom')) {
                    var zoom = _.parseInt(gameplay.attr('zoom'));
                    if (zoom < 4) {
                        zoom++;
                        gameplay.attr('zoom', zoom);
                    }
                    else {
                        gameplay.removeAttr('zoom');
                    }
                }
                if (((gameplay.width() > $(window).width() && gameplay.height() <= $(window).height())
                    ||
                        (gameplay.width() <= $(window).width() && gameplay.height() > $(window).height())
                    ||
                        (gameplay.width() <= $(window).width() && gameplay.height() <= $(window).height()))
                    && !gameplay.hasClass('ui-draggable')) {
                    self.makeDraggable();
                }
            });
            buttonsEl.append(button);
            button = $('<button/>')
                .addClass('button')
                .attr({ type: 'button' })
                .html(' - ')
                .click(function (e) {
                if (!gameplay.attr('zoom')) {
                    gameplay.attr('zoom', 4);
                }
                else {
                    var zoom = _.parseInt(gameplay.attr('zoom'));
                    if (zoom > 1) {
                        zoom--;
                        gameplay.attr('zoom', zoom);
                    }
                }
                if ((gameplay.width() < $(window).width() || gameplay.height() < $(window).height())
                    && gameplay.hasClass('ui-draggable')) {
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
            game.physics.arcade.collide(enemies, weaponsArr, function (weapon, enemy) {
                // console.log(enemy, weapon);
                enemy.body.velocity = 0;
                fireWeapon(enemy);
            });
            // game.physics.arcade.overlap(enemies, sprite, function() {
            //   console.log('circle');
            // });
            // game.physics.arcade.overlap(enemies, wall, fireWeapon, null, this);
            game.physics.arcade.overlap(bulletsArr, enemies, function (bullet, enemy) {
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
            weapons.forEach(function (weaponGroup) {
                // console.log(weaponGroup.children);
                var base = weaponGroup.children[0];
                var weapon = weaponGroup.children[1];
                var bullets = weaponGroup.children[2];
                // console.log(weapon.name);
                var bullet = bullets.getFirstExists(false);
                // console.log('collide', enemy);
                if (base.frame === 6 && bullet && game.time.now > weapon.timer && enemy.life) {
                    bulletsArr.push(bullet);
                    bullet.reset(weapon.x, weapon.y);
                    var angle = game.physics.arcade.angleBetween(bullet, enemy);
                    // console.log('bullet', angle);
                    // bullet.body.velocity.y = -300;
                    // bullet.body.velocity.x = -300;
                    game.physics.arcade.moveToXY(bullet, enemy.x + 12 * ratio, enemy.y + 12 * ratio, 500 * ratio);
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
            }
            else {
                game.scale.startFullScreen(false);
            }
        }
        function getWeaponsPositions() {
            var widthAttack = 630 * ratio;
            var distance8 = widthAttack / 9;
            var positions = [];
            // positions.push({
            //   x: distance8 * ratio,
            //   y: 0
            // });
            for (var i_3 = 0; i_3 < 8; i_3++) {
                var x_2 = distance8 + i_3 * distance8 + (width / 2 - widthAttack / 2);
                var y_2 = 0;
                var position = {
                    x: x_2,
                    y: y_2
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
            var button = game.add.button(x * ratio + 48 * ratio, y * ratio + 16 * ratio, 'button', callback, this, 2, 1, 0);
            button.enableBody = true;
            button.anchor.set(0.5);
            var label = game.add.text(x * ratio + 48 * ratio, y * ratio + 16 * ratio, labelText, {
                font: 16 * ratio + 'px Arial',
                fill: '#ffffff',
                align: 'center'
            });
            label.anchor.set(0.5);
            return {
                button: button,
                label: label
            };
        }
        function debug(text) {
            text = typeof text === 'undefined' ? '' : text;
            var prepared;
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
                        for (var i_4 = 0; i_4 < text.length; i_4++) {
                            prepared += text[i_4] + "\n";
                        }
                    }
                    else if (text instanceof Object) {
                        for (var i_5 in text) {
                            prepared += i_5 + ': ' + text[i_5] + "\n";
                        }
                    }
                    break;
            }
            debugEl.text(text + ' ratio:' + ratio);
        }
    };
    Game.prototype.getSwitchName = function () {
        var name = this.switchToVillage ? 'Wall' : 'Village';
        return name;
    };
    Game.prototype.switchWallVillage = function () {
        var wallField = $('.wall-field');
        var villageField = $('.village-field');
        var animateTimer = 500;
        if (this.switchToVillage) {
            wallField.animate({ top: '0%' }, animateTimer);
            villageField.animate({ top: '100%' }, animateTimer);
        }
        else {
            wallField.animate({ top: '-100%' }, animateTimer);
            villageField.animate({ top: '0%' }, animateTimer);
        }
        this.switchToVillage = !this.switchToVillage;
    };
    Game.prototype.openMenu = function () {
        var self = this;
        var menuButtons = [
            {
                title: 'Credits',
                action: function () {
                    self.openCredits();
                },
                button: true
            }
        ];
        var options = {
            isOpen: true,
            title: 'Game menu',
            content: menuButtons,
        };
        this.optionsPopup = options;
    };
    Game.prototype.openCredits = function () {
        var content = '<h1>Credits</h1>';
        this.page.open(content);
    };
    Game.prototype.openSettings = function () {
        var content = '<h1>Settings</h1>';
        this.page.open(content);
    };
    Game.prototype.openExit = function () {
        var content = '<h1>Exit</h1>';
        this.page.open(content);
    };
    return Game;
}());
Game = __decorate([
    Component({
        templateUrl: './game.html',
        styleUrls: ['./game.css'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [Router,
        Page,
        ActivatedRoute])
], Game);
export { Game };
//# sourceMappingURL=game.js.map