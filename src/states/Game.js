/* globals __DEV__ */
import Phaser from 'phaser';
import Mushroom from '../sprites/Mushroom';
import {
  setResponsiveWidth,
  getWeaponsPositions,
  scaleRatioSprite,
  scaleRatio
} from '../utils';

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    let banner = this.add.text(
      20 * scaleRatio,
      this.game.height - 100 * scaleRatio,
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.'
    );
    banner.font = 'Text Me One';
    banner.fontSize = 16 * scaleRatio;
    banner.fill = '#fff';
    banner.anchor.setTo(0);
    banner.wordWrap = true;
    banner.wordWrapWidth = this.game.width - 40 * scaleRatio;
    // banner.scale.setTo(scaleRatioSprite, scaleRatioSprite);
    
    let userStatsLayer = this.game.add.group();
    let enemiesLayer = this.game.add.group();
    let defenseLayer = this.game.add.group();
    let popupLayer = this.game.add.group();

    
    let coins = userStatsLayer.create(20 * scaleRatio, 20 * scaleRatio, 'coin');
    coins.enableBody = true;
    coins.name = 'coins';
    coins.anchor.setTo(0.5, 0.5);
    coins.scale.setTo(scaleRatioSprite, scaleRatioSprite);
    coins.animations.add('rolling', [0, 1, 2, 3, 5, 6, 7], 15, true);
    coins.frame = 7;
    // coins.animations.play('rolling');

    let userMoney = this.add.text(40 * scaleRatio, 20 * scaleRatio, '43 245 879 Scale: ' + scaleRatio + ' Game: ' + this.game.width + ' Window: ' + document.documentElement.clientWidth);
    userMoney.font = 'Changa';
    userMoney.fontSize = 20 * scaleRatio;
    userMoney.fill = '#fff';
    userMoney.anchor.setTo(0, 0.5);
    userMoney.inputEnabled = true;
    userMoney.input.enableDrag();
    userMoney.events.onDragStart.add(function() {

    }, this);
    userMoney.events.onDragStop.add(function() {
      
    }, this);
    userMoney.events.onDragUpdate.add(function() {
      
    }, this);
    userStatsLayer.add(userMoney);

    let wall = defenseLayer.create(this.game.width / 2, this.game.height - 40 * scaleRatio, 'wall');
    wall.enableBody = true;
    wall.name = 'wall';
    wall.anchor.setTo(0.5, 0.5);
    wall.scale.setTo(scaleRatioSprite, scaleRatioSprite);
    // wall.animations.add('rolling', [0, 1, 2, 3, 5, 6, 7], 15, true);
    wall.frame = 0;
    wall.physicsBodyType = Phaser.Physics.ARCADE;
    this.game.physics.arcade.enable(wall);

    for (let i = 0; i < 100; i ++) {
      let enemy = enemiesLayer.create(this.game.width / 100 * (i + 1), 20 * scaleRatio, 'enemy-bug');
      enemy.enableBody = true;
      enemy.name = 'enemy-bug';
      enemy.speed = 100;
      enemy.anchor.setTo(0.5, 0.5);
      enemy.scale.setTo(scaleRatioSprite, scaleRatioSprite);
      enemy.physicsBodyType = Phaser.Physics.ARCADE;
      this.game.physics.arcade.enable(enemy);
      // enemy.animations.add('rolling', [0, 1, 2, 3, 5, 6, 7], 15, true);
      enemy.frame = 0;
      // console.log(enemy, wall);
      this.game.physics.arcade.moveToObject(enemy, wall, enemy.speed);
    }
    


    // userStats.x = 100;



    // this.mushroom = new Mushroom({
    //   game: this.game,
    //   x: this.game.world.centerX,
    //   y: this.game.world.centerY,
    //   asset: 'mushroom'
    // })

    // // set the sprite width to 30% of the game width
    // setResponsiveWidth(this.mushroom, 30, this.game.world)
    // this.game.add.existing(this.mushroom)

    this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    // game.scale.minWidth = 320;
    // game.scale.minHeight = 240;
    // game.scale.maxWidth = 1366 * ratio;
    // game.scale.maxHeight = 768 * ratio;
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // this.graphics = this.game.add.graphics(0, 0);
    // this.graphics.lineStyle(1, '#333', 1);

    // this.platforms = this.game.add.group();
    // this.platforms.enableBody = true;


    // this.sound = this.game.add.audio('sfx');
    // this.sound.addMarker('gun-shot', 0, 1.0);


    // // let menuTop = game.add.tileSprite(0, 0, game.world.width, 32 * ratio, 'menu-top');


    // this.wall = this.game.add.tileSprite(
    //   0,
    //   this.game.world.height - 392 * scaleRatio,
    //   this.game.world.width,
    //   192 * scaleRatio,
    //   'wall'
    // );
    // this.game.physics.arcade.enable(this.wall);
    // this.wall.body.immovable = true;
    // this.wall.body.moves = false;
    // this.wall.life = 1000;
    // // platforms.add(wall);
    
    // // wall.inputEnabled = true;
    // // wall.input.enableDrag(true);
    

    
    // // game.physics.arcade.collide(enemies);

    // this.weapons = this.game.add.group();
    // this.weapons.enableBody = true;
    // this.weapons.physicsBodyType = Phaser.Physics.ARCADE;

    // const weaponsPositions = getWeaponsPositions;

    // for (let i = 0; i < weaponsPositions.length; i++) {
    //   let position = weaponsPositions[i];
    //   let weapon = this.game.add.group();
    //   weapon.enableBody = true;
    //   weapon.physicsBodyType = Phaser.Physics.ARCADE;

    //   let bullets = this.game.add.group();
    //   bullets.enableBody = true;
    //   bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //   for (let j = 0; j < 40; j++) {
    //     let b = bullets.create(0, 0, 'bullet');
    //     b.name = 'bullet' + j;
    //     b.exists = false;
    //     b.visible = false;
    //     b.checkWorldBounds = true;
    //     b.outOfBoundsKill = true;
    //     b.events.onOutOfBounds.add(function(bullet) {
    //       bullet.kill();
    //     }, this);
    //     b.anchor.setTo(0.5, 0.5);
    //   }

    //   let x = position.x;
    //   let y = 400 * scaleRatio + position.y;

    //   let base = weapon.create(x, y, 'w-base');
    //   base.enableBody = true;
    //   base.name = 'base' + i;
    //   base.body.immovable = true;
    //   base.visible = true;
    //   base.frame = 0;
    //   base.timer = 0;
    //   base.anchor.setTo(0.5, 0.5);
    //   base.animations.add('open', [0, 1, 2, 3, 5, 6], 15, false);
    //   base.animations.add('close', [6, 5, 4, 3, 2, 1, 0], 15, false);

    //   let w = weapon.create(x, y, 'w-gun');
    //   w.enableBody = true;
    //   // enemy.body.allowRotation = true;
    //   w.physicsBodyType = Phaser.Physics.ARCADE;
    //   w.name = 'weapon' + i;
    //   w.body.immovable = true;
    //   w.visible = false;
    //   w.frame = 0;
    //   w.timer = 0;
    //   w.range = 250 * scaleRatio;
    //   w.anchor.setTo(0.5, 0.5);
    //   w.animations.add('open', [0, 1, 2, 3], 15, false);
    //   w.animations.add('close', [3, 2, 1, 0], 15, false);
    //   w.animations.add('fire', [4, 5, 3], 15, false);

    //   // graphics = game.add.graphics(x, y);

    //   // graphics.lineStyle(2, 0xffd900, 1);

    //   this.graphics.beginFill('#f00', 0.2);
    //   this.graphics.drawCircle(x, y, 500 * scaleRatio);
    //   this.graphics.endFill();

    //   this.weaponsArr.push(w);
      
    //   this.weaponsRanges.push({
    //     x: x,
    //     y: y,
    //     range: 250 * scaleRatio,
    //     width: 64 * scaleRatio,
    //     height: 64 * scaleRatio
    //   });

    //   // let circle = new Phaser.Circle(x, y, 64);
    //   // circle.enableBody = true;

    //   weapon.add(bullets);
    //   // weapons.add(circle);
    //   this.weapons.add(weapon);
    // }

    // console.log(weapons);

    // this.enemies = this.game.add.group();
    // this.enemies.enableBody = true;
    // // enemies.inputEnabled = true;
    // // enemies.input.enableDrag(true);
    // let enemiesLength = this.game.world.width / (30 * scaleRatio);
    // for (let i = 0; i < enemiesLength; i++) {
    //   let ex = i * 30 * scaleRatio;
    //   let ey = Math.random() * 100 * scaleRatio;
    //   let enemy = this.enemies.create(ex, ey, 'coin');
    //   let len = 100000000;
    //   let toWeapon;
      
    //   enemy.enableBody = true;
    //   enemy.life = 100;
    //   enemy.name = 'enemy' + i;
    //   enemy.anchor.setTo(0.5, 0.5);
    //   enemy.speed = 100;
    //   enemy.body.allowRotation = true;
    //   enemy.physicsBodyType = Phaser.Physics.ARCADE;

    //   enemy.animations.add('left', [0, 1, 2, 3, 5, 6, 7], 15, true);
    //   enemy.animations.play('left');

    //   // for (let j = 0; j < this.weapons.children.length; j++) {
    //   //   let weapon = this.weapons.children[j].children[1];
    //   //   let tx = weapon.body.x;
    //   //   let ty = weapon.body.y;
    //   //   let r = weapon.range;
    //   //   const ePosition = (ex - tx) * (ex - tx) + (ey - ty) * (ey - ty);
    //   //   const tRange = r * r;

    //   //   this.graphics.drawRect(tx - weapon.width / 2, ty - weapon.height / 2, weapon.width, weapon.height);

    //   //   // if (ePosition <= tRange) {
    //   //   //   debug('fire');
    //   //   //   fireWeapon(enemy);
    //   //   // }

    //   //   if (((tx - ex) * (tx - ex) + (ty - ey) * (ty - ey)) < len) {
    //   //     len = ((tx - ex) * (tx - ex) + (ty - ey) * (ty - ey));
    //   //     toWeapon = weapon;
    //   //   }
    //   // }

    //   // this.game.physics.arcade.moveToObject(enemy, toWeapon, enemy.speed);
    // }
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
