import Phaser from 'phaser';
import { U } from '../../utils/';

let clickArr = [];
let dronsObj = {};
let sets = {};

export default class extends Phaser.State {
  init () {
    U.btns.clear();
    U.map.remove();
    U.title.remove();
  }

  preload () {}

  create () {
    // let banner = this.add.text(
    //   20 * U.ratio,
    //   this.game.height - 100 * U.ratio,
    //   'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.'
    // );
    // banner.font = 'Text Me One';
    // banner.fontSize = 16 * U.ratio;
    // banner.fill = '#fff';
    // banner.anchor.setTo(0);
    // banner.wordWrap = true;
    // banner.wordWrapWidth = this.game.width - 40 * U.ratio;
    // banner.scale.setTo(U.ratioS, U.ratioS);

    sets = U.mem.get('sets');
    let user = sets.user;
    let car = sets.cars[user.car];

    const levelId = +U.mem.get('level');
    const subLevelId = +U.mem.get('subLevel');

    const level = sets.levels.filter(level_ => level_.id === levelId)[0];
    const subLevel = level.subLevels.filter(subLevel_ => subLevel_.id === subLevelId)[0];

    this.levelLayer = this.game.add.group();
    this.enemiesLayer = this.game.add.group();
    this.defenseLayer = this.game.add.group();
    this.rangeLayer = this.game.add.group();
    this.userStatsLayer = this.game.add.group();

    let levelBg = this.levelLayer.create(this.game.width / 2, this.game.height / 2, 'level-1');
    levelBg.enableBody = true;
    levelBg.name = 'levelBg';
    levelBg.anchor.setTo(0.5, 0.5);
    levelBg.scale.setTo(U.ratioS, U.ratioS);
    levelBg.animations.add('ride', [0, 1, 2, 3, 5, 6, 7], 30, true);
    levelBg.frame = 0;

    let coins = this.userStatsLayer.create(20 * U.ratio, 20 * U.ratio, 'coin');
    coins.enableBody = true;
    coins.name = 'coins';
    coins.anchor.setTo(0.5, 0.5);
    coins.scale.setTo(U.ratioS, U.ratioS);
    coins.animations.add('rolling', [0, 1, 2, 3, 5, 6, 7], 15, true);
    coins.frame = 7;
    // coins.animations.play('rolling');

    let userMoney = this.add.text(40 * U.ratio, 20 * U.ratio, user.money);
    userMoney.font = 'Arial, Helvetica, sans-serif';
    userMoney.fontSize = 20 * U.ratio;
    userMoney.fill = '#fff';
    userMoney.anchor.setTo(0, 0.5);
    userMoney.inputEnabled = true;
    this.userStatsLayer.add(userMoney);

    x = car.width * U.ratio;
    y = this.game.height / 2;

    let drons = [];

    let carModel = this.defenseLayer.create(x, y, 'car-1');
    carModel.enableBody = true;
    carModel.frame = 0;
    carModel.name = 'car';
    carModel.anchor.setTo(0.5, 0.5);
    carModel.scale.setTo(U.ratioS, U.ratioS);
    this.game.physics.arcade.enable(carModel);
    carModel.body.immovable = true;
    carModel.animations.add('open', [0, 1, 2, 3, 4, 5, 6], 30, false);
    carModel.animations.add('close', [6, 5, 4, 3, 2, 1, 0], 30, false);

    let carRange = this.rangeLayer.create(x, y, 'car-1-range');
    carRange.enableBody = true;
    carRange.frame = 0;
    carRange.name = 'range';
    carRange.dron = 'car-w1';
    carRange.anchor.setTo(0.5, 0.5);
    carRange.scale.setTo(U.ratioS, U.ratioS);
    this.game.physics.arcade.enable(carRange);
    carRange.body.immovable = true;
    
    let carWeapon = this.defenseLayer.create(x, y, 'w1');
    carWeapon.enableBody = true;
    carWeapon.name = 'carWeapon';
    carWeapon.anchor.setTo(0.5, 0.5);
    carWeapon.scale.setTo(U.ratioS, U.ratioS);
    carWeapon.frame = 3;
    carWeapon.physicsBodyType = Phaser.Physics.ARCADE;
    this.game.physics.arcade.enable(carWeapon);
    carWeapon.body.immovable = true;
    carWeapon.data.fireRate = 1000;
    carWeapon.data.fireRateTimeout = 0;
    carWeapon.animations.add('fire', [0, 1, 2, 3, 4, 5, 6], 30, false);

    drons.push(carWeapon);
    dronsObj['car-w1'] = carWeapon;


    const dronsLength = car.dronsAmount;
    
    for (let i = 0; i < dronsLength; i ++) {
      const x = this.game.width / dronsLength * (i + 1) - this.game.width / dronsLength / 2;
      const y = this.game.height - 40 * U.ratio;
      const dronId = 'dron' + i;

      let base = this.defenseLayer.create(x, y, 'base');
      base.enableBody = true;
      base.frame = 0;
      base.name = 'base';
      base.anchor.setTo(0.5, 0.5);
      base.scale.setTo(U.ratioS, U.ratioS);
      this.game.physics.arcade.enable(base);
      base.body.immovable = true;
      base.animations.add('open', [0, 1, 2, 3, 4, 5, 6], 30, false);
      base.animations.add('close', [6, 5, 4, 3, 2, 1, 0], 30, false);

      let range = this.rangeLayer.create(x, y, 'range-w1');
      range.enableBody = true;
      range.frame = 0;
      range.name = 'range';
      range.dron = dronId;
      range.anchor.setTo(0.5, 0.5);
      range.scale.setTo(U.ratioS, U.ratioS);
      this.game.physics.arcade.enable(range);
      range.body.immovable = true;
      
      let dron = this.defenseLayer.create(x, y, 'w1');
      dron.enableBody = true;
      dron.name = 'dron';
      dron.anchor.setTo(0.5, 0.5);
      dron.scale.setTo(U.ratioS, U.ratioS);
      dron.frame = 3;
      dron.physicsBodyType = Phaser.Physics.ARCADE;
      this.game.physics.arcade.enable(dron);
      dron.body.immovable = true;
      dron.data.fireRate = 1000;
      dron.data.fireRateTimeout = 0;
      dron.animations.add('fire', [0, 1, 2, 3, 4, 5, 6], 30, false);

      drons.push(dron);

      dronsObj[dronId] = dron;
    }

    this.defenseLayer.children.forEach(dron => {
      if (dron.name === 'dron') {
        dron.visible = false;
      }
    });

    for (let i = 0; i < subLevel.enemies.length; i ++) {
      console.log(subLevel.enemies[i]);
      for (let j = 0; j < subLevel.enemies[i].count; j ++) {
        const x = (this.game.width + Math.round(Math.random() * 10));
        const y = this.game.height / subLevel.enemies[i].count * (j + 1);

        let enemy = this.enemiesLayer.create(
          x,
          y,
          'enemy-' + subLevel.enemies[i].type
        );

        enemy.enableBody = true;
        enemy.name = 'enemy-' + subLevel.enemies[i].type;
        enemy.speed = 120 + Math.round(Math.random() * 5);
        enemy.anchor.setTo(0.5, 0.5);
        enemy.scale.setTo(U.ratioS, U.ratioS);
        enemy.physicsBodyType = Phaser.Physics.ARCADE;
        this.game.physics.arcade.enable(enemy);
        // enemy.animations.add('rolling', [0, 1, 2, 3, 5, 6, 7], 15, true);
        enemy.frame = 0;
        enemy.collideWorldBounds = true;
        // console.log(enemy, dron);

        // let dron;
        // let distance = 100000000;
        // drons.forEach(dron_ => {
        //   const distance_ = this.game.physics.arcade.distanceBetween(enemy, dron_);
        //   if (distance_ < distance) {
        //     dron = dron_;
        //     distance = distance_;
        //   }
        // });

        this.game.physics.arcade.moveToObject(enemy, carModel, enemy.speed);
        enemy.rotation = this.game.physics.arcade.angleBetween(enemy, carModel) + U.getRadians(270);
        // dron.rotation = this.game.physics.arcade.angleBetween(dron, enemy) + U.getRadians(90);
      }
    }

    this.enemiesLayer.children.forEach(enemy => {
      enemy.body.enable = false;
    });

    let x = 10 * U.ratio;
    let y = 10 * U.ratio;

    const btnPlay = U.btns.add({
      x: U.view.w - 108,
      y: 10,
      w: 40,
      h: 40,
      click: () => {
        this.play();
        btnPlay.hide();
        btnPause.show();
        levelBg.play('ride');
      },
      cls: 'icon-play3'
    });

    const btnPause = U.btns.add({
      x: U.view.w - 108,
      y: 10,
      w: 40,
      h: 40,
      click: () => {
        this.pause();
        btnPlay.show();
        btnPause.hide();
        levelBg.animations.stop();
      },
      cls: 'icon-pause2',
      hidden: true
    });

    const btnMenu = U.btns.add({
      x: U.view.w - 54,
      y: 10,
      w: 40,
      h: 40,
      click: () => {
        this.pause();
        btnPlay.show();
        btnPause.hide();
        U.menu.add({
          items: [
            {
              label: '<span class="icon-loop2"></span> Restart',
              click: () => {
                this.state.start('Battle');
              }
            },
            {
              label: '<span class="icon-cog"></span> Settings',
              click: () => {
                this.state.start('Settings');
              }
            },
            {
              label: '<span class="icon-menu"></span> Main menu',
              click: () => {
                this.state.start('Play');
              }
            },
            {
              label: '<span class="icon-arrow-left"></span> Return',
              click: () => {
                U.menu.remove();
              }
            }
          ]
        });
      },
      cls: 'icon-menu'
    });

    const btnAddDrons = U.btns.add({
      x: U.view.w - 54,
      y: U.view.h - 50,
      w: 40,
      h: 40,
      click: () => {
        this.defenseLayer.children.forEach(dron => {
          if (dron.name === 'dron') {
            dron.visible = true;
          }
        });
      },
      cls: 'icon-power'
    });

    btnPlay.click();

    console.log(this.game.physics.arcade);
  }

  update() {
    this.game.physics.arcade.collide(this.enemiesLayer, this.defenseLayer, (enemy, dron) => {
      // console.log('collide', enemy);
      // enemy.speed = 0;
      enemy.body.velocity.x = 0;
      enemy.body.velocity.y = 0;
    });

    this.game.physics.arcade.overlap(this.enemiesLayer, this.rangeLayer, (enemy, range) => {
      let dron = dronsObj[range.dron];
      const fireRateTimeout = new Date().getTime() - dron.data.fireRateTimeout;
      // console.log(dron);
      dron.rotation = this.game.physics.arcade.angleBetween(dron, enemy) + U.getRadians(90);

      if (fireRateTimeout >= dron.data.fireRate) {
        enemy.kill();
        dron.animations.play('fire');
        dron.data.fireRateTimeout = new Date().getTime();
        const aliveEnemies = this.enemiesLayer.children.filter(enemy => enemy.alive);
        if (aliveEnemies.length === 0) {
          U.mem.set('win', 1);
          this.state.start('Win');
        }
      } else {
        
      }
    });
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }

  play() {
    this.enemiesLayer.children.forEach(enemy => {
      enemy.body.enable = true;
    });
  }

  pause() {
    this.enemiesLayer.children.forEach(enemy => {
      enemy.body.enable = false;
    });
  }
}
