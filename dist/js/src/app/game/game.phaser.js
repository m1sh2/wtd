// import * as _ from 'lodash';
// import * as $ from 'jquery';
// import * as _ from 'lodash';
export var GamePhaser = (function () {
    function GamePhaser() {
    }
    GamePhaser.prototype.start = function () {
        var user = {
            money: 1000
        };
        var body = document.body;
        var html = document.documentElement;
        var debugEl = $('#gamedebug');
        var buttonsEl = $('#buttons');
        var popupEl = $('#popup');
        var ratio = window.devicePixelRatio;
        var width = 1280 * ratio;
        var height = 1280 * ratio;
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
            var _this = this;
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
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
                var y_1 = game.world.height - 95 * ratio + position.y;
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
                enemy_1.speed = 5;
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
                    if (ePosition <= tRange) {
                        debug('fire');
                        fireWeapon(enemy_1);
                    }
                    // const wx = tx - weapon.width / 2;
                    // const wy = ty - weapon.height / 2;
                    // const ww = tx - weapon.width / 2 + weapon.width;
                    // const wh = ty - weapon.height / 2 + weapon.height;
                    // if (wx <= enemy.body.x + eNewX || ww <= enemy.body.x + eNewX) {
                    //   eNewX = 0;
                    // }
                    // if (wy === enemy.body.y + eNewY || wh <= enemy.body.y + eNewY) {
                    //   eNewY = 0;
                    // }
                    if (((tx - ex) * (tx - ex) + (ty - ey) * (ty - ey)) < len) {
                        len = ((tx - ex) * (tx - ex) + (ty - ey) * (ty - ey));
                        toWeapon = weapon_2;
                    }
                }
            }
            // var bmd = game.make.bitmapData(400, 400);
            //  Draw an image to it
            // bmd.copy('pic');
            //  Draw a few random shapes to it
            // bmd.circle(200, 200, 200, 'rgba(255,0,0,0.5)');
            // bmd.rect(110, 40, 64, 120, 'rgba(255,0,255,0.8)');
            //  Here the sprite uses the BitmapData as a texture
            // sprite = game.add.sprite(150, 400, bmd);
            // game.physics.arcade.enable(sprite);
            // sprite.anchor.set(0.5);
            // graphics = game.add.graphics(0, 0);
            // graphics.lineStyle(2, 0xffd900, 1);
            // graphics.beginFill(0xFF0000, 1);
            // graphics.drawCircle(300, 300, 100);
            // graphics.sensor = true;
            button = $('<button/>')
                .addClass('button')
                .attr({
                type: 'button',
                id: 'open_weapons'
            })
                .html('Open')
                .click(function (e) {
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
            // addButton('Open', 20, 20, () => {
            //   weapons.forEach(weaponGroup => {
            //     let base = weaponGroup.children[0];
            //     let weapon = weaponGroup.children[1];
            //     if (base.frame === 0) {
            //       base.animations.play('open');
            //       base.animations.currentAnim.onComplete.add(() => {
            //         weapon.visible = true;
            //         weapon.animations.play('open');
            //       }, this);
            //     }
            //   });
            // });
            // addButton('Close', 120, 20, () => {
            //   weapons.forEach(weaponGroup => {
            //     let base = weaponGroup.children[0];
            //     let weapon = weaponGroup.children[1];
            //     if (base.frame === 6) {
            //       weapon.animations.play('close');
            //       weapon.animations.currentAnim.onComplete.add(() => {
            //         weapon.visible = false;
            //         base.animations.play('close');
            //       }, this);
            //     }
            //   });
            // });
            // let buttonPause = addButton('Pause', 220, 20, () => {
            //   game.paused = true;
            //   buttonPause.button.visible = false;
            //   buttonPause.label.visible = false;
            //   buttonPlay.button.visible = true;
            //   buttonPlay.label.visible = true;
            // });
            // let buttonPlay = addButton('Play', 220, 20, () => {
            //   game.paused = false;
            //   buttonPause.button.visible = true;
            //   buttonPause.label.visible = true;
            //   buttonPlay.button.visible = false;
            //   buttonPlay.label.visible = false;
            // });
            // buttonPlay.button.visible = false;
            // buttonPlay.label.visible = false;
            // game.input.onDown.add(() => {
            //   game.paused = false;
            //   buttonPause.button.visible = true;
            //   buttonPause.label.visible = true;
            //   buttonPlay.button.visible = false;
            //   buttonPlay.label.visible = false;
            // }, self);
            debug('started');
            console.log(enemies, game, weapons);
            game.paused = true;
        }
        function update() {
            // graphics.clear();
            // let hitPlatform = game.physics.arcade.collide(player, platforms);
            // game.physics.arcade.collide(enemies, weapons, fireWeapon);
            // game.physics.arcade.overlap(enemies, sprite, function() {
            //   console.log('circle');
            // });
            game.physics.arcade.overlap(enemies, wall, fireWeapon, null, this);
            game.physics.arcade.overlap(bulletsArr, enemies, function (bullet, enemy) {
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
            var distance8 = 630 / 9;
            var positions = [];
            // positions.push({
            //   x: distance8 * ratio,
            //   y: 0
            // });
            for (var i_3 = 0; i_3 < 8; i_3++) {
                var x_2 = distance8 + i_3 * distance8 + (width / 2 - 630 / 2);
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
            debugEl.text(text);
        }
    };
    return GamePhaser;
}());
//# sourceMappingURL=game.phaser.js.map