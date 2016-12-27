/* globals __DEV__ */
import Phaser from 'phaser';
// import Mushroom from '../sprites/Mushroom';
import { getRatio, getView } from '../utils/';

let clickArr = [];

export default class GameplayState extends Phaser.State {
  init () {}
  preload () {}

  create () {
    let self = this;

    let banner = this.add.text(
      20 * getRatio.ratio,
      this.game.height - 100 * getRatio.ratio,
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.'
    );
    banner.font = 'Text Me One';
    banner.fontSize = 16 * getRatio.ratio;
    banner.fill = '#fff';
    banner.anchor.setTo(0);
    banner.wordWrap = true;
    banner.wordWrapWidth = this.game.width - 40 * getRatio.ratio;
    // banner.scale.setTo(getRatio.sprite, getRatio.sprite);

    this.userStatsLayer = this.game.add.group();
    this.enemiesLayer = this.game.add.group();
    this.defenseLayer = this.game.add.group();
    this.buttonsLayer = this.game.add.group();
    this.popupLayer = this.game.add.group();

    
    let coins = this.userStatsLayer.create(20 * getRatio.ratio, 20 * getRatio.ratio, 'coin');
    coins.enableBody = true;
    coins.name = 'coins';
    coins.anchor.setTo(0.5, 0.5);
    coins.scale.setTo(getRatio.sprite, getRatio.sprite);
    coins.animations.add('rolling', [0, 1, 2, 3, 5, 6, 7], 15, true);
    coins.frame = 7;
    // coins.animations.play('rolling');

    let userMoney = this.add.text(40 * getRatio.ratio, 20 * getRatio.ratio, '43 245 879 Scale: ' + getRatio.ratio + ' Game: ' + this.game.width + ' Window: ' + document.documentElement.clientWidth);
    userMoney.font = 'Changa';
    userMoney.fontSize = 20 * getRatio.ratio;
    userMoney.fill = '#fff';
    userMoney.anchor.setTo(0, 0.5);
    userMoney.inputEnabled = true;
    // userMoney.input.enableDrag();
    // userMoney.events.onDragStart.add(function() {

    // }, this);
    // userMoney.events.onDragStop.add(function() {
      
    // }, this);
    // userMoney.events.onDragUpdate.add(function() {
      
    // }, this);
    this.userStatsLayer.add(userMoney);

    let wall = this.defenseLayer.create(this.game.width / 2, this.game.height - 40 * getRatio.ratio, 'wall');
    wall.enableBody = true;
    wall.name = 'wall';
    wall.anchor.setTo(0.5, 0.5);
    wall.scale.setTo(getRatio.sprite, getRatio.sprite);
    // wall.animations.add('rolling', [0, 1, 2, 3, 5, 6, 7], 15, true);
    wall.frame = 0;
    wall.physicsBodyType = Phaser.Physics.ARCADE;
    this.game.physics.arcade.enable(wall);

    for (let i = 0; i < 100; i ++) {
      let enemy = this.enemiesLayer.create(this.game.width / 100 * (i + 1), 20 * getRatio.ratio, 'enemy-bug');
      enemy.enableBody = true;
      enemy.name = 'enemy-bug';
      enemy.speed = 100;
      enemy.anchor.setTo(0.5, 0.5);
      enemy.scale.setTo(getRatio.sprite, getRatio.sprite);
      enemy.physicsBodyType = Phaser.Physics.ARCADE;
      this.game.physics.arcade.enable(enemy);
      // enemy.animations.add('rolling', [0, 1, 2, 3, 5, 6, 7], 15, true);
      enemy.frame = 0;
      // console.log(enemy, wall);
      this.game.physics.arcade.moveToObject(enemy, wall, enemy.speed);
    }

    let x = this.game.width - 100 * getRatio.ratio;
    let y = 10 * getRatio.ratio;
    let btnPause = this.addButton('Pause', x, y, () => {
      console.log('pause');

      this.enemiesLayer.children.forEach(enemy => {
        enemy.body.enable = false;
      });

      // if (!this.game.paused) {
      //   this.game.paused = true;
        
      //   // btnPause.button.visible = false;
      //   // btnPause.label.visible = false;
        
      //   // btnPlay.button.visible = true;
      //   // btnPlay.label.visible = true;
      // }
      // this.state.restart('Game');
    });
    // this.game.paused = true;
    
    x = x - 100 * getRatio.ratio;
    let btnPlay = this.addButton('Play', x, y, () => {
      console.log('play');

      this.enemiesLayer.children.forEach(enemy => {
        enemy.body.enable = true;
      });

      if (this.game.paused) {
        this.game.paused = false;
        
        // btnPause.button.visible = true;
        // btnPause.label.visible = true;
        
        // btnPlay.button.visible = false;
        // btnPlay.label.visible = false;
      }
    });
    
    x = x - 100 * getRatio.ratio;
    let btnHome = this.addButton('Home', x, y, () => {
      console.log('home');
      this.state.start('Home', true, false);
    });

    this.game.input.onDown.add(pointer => {
      if (pointer.id === 1) {
        // console.log(this.game.input.x, this.game.input.y);
        let x = this.game.input.x;
        let y = this.game.input.y;
        let clickArrFiltered = clickArr.filter(click => click.xMin <= x
          && click.xMax >= x
          && click.yMin <= y
          && click.yMax >= y
        );

        if (clickArrFiltered.length && clickArrFiltered[0].callback) {
          clickArrFiltered[0].callback();
        }
      }
    }, this);
    

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

    // this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    // // game.scale.minWidth = 320;
    // // game.scale.minHeight = 240;
    // // game.scale.maxWidth = 1366 * ratio;
    // // game.scale.maxHeight = 768 * ratio;
    // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // this.graphics = this.game.add.graphics(0, 0);
    // this.graphics.lineStyle(1, '#333', 1);

    // this.platforms = this.game.add.group();
    // this.platforms.enableBody = true;


    // this.sound = this.game.add.audio('sfx');
    // this.sound.addMarker('gun-shot', 0, 1.0);


    // // let menuTop = game.add.tileSprite(0, 0, game.world.width, 32 * ratio, 'menu-top');


    // this.wall = this.game.add.tileSprite(
    //   0,
    //   this.game.world.height - 392 * getRatio.ratio,
    //   this.game.world.width,
    //   192 * getRatio.ratio,
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
    //   let y = 400 * getRatio.ratio + position.y;

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
    //   w.range = 250 * getRatio.ratio;
    //   w.anchor.setTo(0.5, 0.5);
    //   w.animations.add('open', [0, 1, 2, 3], 15, false);
    //   w.animations.add('close', [3, 2, 1, 0], 15, false);
    //   w.animations.add('fire', [4, 5, 3], 15, false);

    //   // graphics = game.add.graphics(x, y);

    //   // graphics.lineStyle(2, 0xffd900, 1);

    //   this.graphics.beginFill('#f00', 0.2);
    //   this.graphics.drawCircle(x, y, 500 * getRatio.ratio);
    //   this.graphics.endFill();

    //   this.weaponsArr.push(w);
      
    //   this.weaponsRanges.push({
    //     x: x,
    //     y: y,
    //     range: 250 * getRatio.ratio,
    //     width: 64 * getRatio.ratio,
    //     height: 64 * getRatio.ratio
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
    // let enemiesLength = this.game.world.width / (30 * getRatio.ratio);
    // for (let i = 0; i < enemiesLength; i++) {
    //   let ex = i * 30 * getRatio.ratio;
    //   let ey = Math.random() * 100 * getRatio.ratio;
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

  addButton(labelText, x, y, callback) {
    let btn = this.game.add.group();
    let button = this.game.add.button(
      x + 48 * getRatio.ratio,
      y + 16 * getRatio.ratio,
      'button',
      null,
      this,
      2,
      1,
      0
    );
    button.enableBody = true;
    button.anchor.set(0.5);
    // buttonsLayer.add(button);

    let label = this.game.add.text(
      x + 48 * getRatio.ratio,
      y + 16 * getRatio.ratio,
      labelText,
      {
        font: 18 * getRatio.ratio + 'px "Text Me One"',
        fill: '#ffffff',
        align: 'center'
      }
    );
    label.anchor.set(0.5);
    // buttonsLayer.add(label);

    // buttonsLayer.add(btn);

    clickArr.push({
      xMin: x / getRatio.ratio,
      xMax: x / getRatio.ratio + 48 * getRatio.ratio,
      yMin: y / getRatio.ratio,
      yMax: y / getRatio.ratio + 16 * getRatio.ratio,
      callback: callback
    });

    return {
      button,
      label
    }
  }
}
