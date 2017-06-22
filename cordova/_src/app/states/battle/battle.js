import Phaser from 'phaser';
import { U } from '../../utils/';
import { AddDrons } from './create';

let sets = U.mem.get('sets');
let user = sets.user;
let car = sets.cars[user.car];
car.data = {};
car.data.life = car.life;
let carDron = sets.drons[user.dron];
let isPaused = false;
let drons = [];
let dronsObj = {};
let aliveEnemies = 0;
let bg;
let coins;
let userMoney;
let carLife;
let enemiesLayer;
let defenseLayer;
let userStatsLayer;

export default class extends Phaser.State {
  init () {
    U.btns.clear();
    U.cnt.clear();
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
    user = sets.user;
    car = sets.cars[user.car];
    car.data = {};
    car.data.life = car.life;
    carDron = sets.drons[user.dron];
    isPaused = false;
    drons = [];
    dronsObj = {};

    console.log(car, user);

    let levelId = +U.mem.get('level');
    let subLevelId = +U.mem.get('subLevel');

    let level = sets.levels.filter(level_ => level_.id === levelId)[0];
    let subLevel = level.subLevels.filter(subLevel_ => subLevel_.id === subLevelId)[0];

    bg = this.game.add.tileSprite(
      0,
      this.game.height / 2,
      this.game.width * U.ratio,
      1024,
      'level-2'
    );
    bg.enableBody = true;
    bg.name = 'bg';
    bg.anchor.setTo(0, 0.5);
    bg.scale.setTo(U.ratioS, U.ratioS);

    let levelLayer = this.game.add.group();
    enemiesLayer = this.game.add.group();
    defenseLayer = this.game.add.group();
    let dronsLayer = this.game.add.group();
    let rangeLayer = this.game.add.group();
    userStatsLayer = this.game.add.group();

    let levelBg = levelLayer.create(this.game.width / 2, this.game.height / 2, 'level-1');
    levelBg.enableBody = true;
    levelBg.name = 'levelBg';
    levelBg.anchor.setTo(0.5, 0.5);
    levelBg.scale.setTo(U.ratioS, U.ratioS);
    levelBg.animations.add('ride', [0, 1, 2, 3, 5, 6, 7], 30, true);
    levelBg.frame = 0;

    coins = userStatsLayer.create(20 * U.ratio, 20 * U.ratio, 'coin');
    coins.enableBody = true;
    coins.name = 'coins';
    coins.anchor.setTo(0.5, 0.5);
    coins.scale.setTo(U.ratioS, U.ratioS);
    coins.animations.add('rolling', [7, 0, 1, 2, 3, 5, 6, 7], 20, false);
    coins.frame = 7;
    // coins.animations.play('rolling');

    userMoney = this.add.text(
      40 * U.ratio,
      20 * U.ratio,
      user.money + ' ' + user.score
    );
    userMoney.font = 'Arial, Helvetica, sans-serif';
    userMoney.fontSize = 20 * U.ratio;
    userMoney.fill = '#fff';
    userMoney.anchor.setTo(0, 0.5);
    userMoney.inputEnabled = true;
    userStatsLayer.add(userMoney);

    carLife = this.add.text(
      this.game.world.width - 10 * U.ratio,
      20 * U.ratio,
      car.data.life
    );
    carLife.font = 'Arial, Helvetica, sans-serif';
    carLife.fontSize = 20 * U.ratio;
    carLife.fill = '#fff';
    carLife.anchor.setTo(1, 0.5);
    carLife.inputEnabled = true;
    userStatsLayer.add(carLife);

    let x = car.width * U.ratio + 500;
    let y = this.game.height / 2;

    let carModel = defenseLayer.create(x, y, 'car-1');
    carModel.enableBody = true;
    carModel.frame = 0;
    carModel.name = 'car';
    carModel.anchor.setTo(0.5, 0.5);
    carModel.scale.setTo(U.ratioS, U.ratioS);
    this.game.physics.arcade.enable(carModel);
    carModel.body.immovable = true;
    carModel.animations.add('open', [0, 1, 2, 3, 4, 5, 6], 30, false);
    carModel.animations.add('close', [6, 5, 4, 3, 2, 1, 0], 30, false);

    // let carRange = this.rangeLayer.create(x, y, 'car-1-range');
    // carRange.enableBody = true;
    // carRange.frame = 0;
    // carRange.name = 'range';
    // carRange.dron = 'car-w1';
    // carRange.anchor.setTo(0.5, 0.5);
    // carRange.scale.setTo(U.ratioS, U.ratioS);
    // this.game.physics.arcade.enable(carRange);
    // carRange.body.immovable = true;

    // let carWeapon = this.defenseLayer.create(x, y, 'w1');
    // carWeapon.enableBody = true;
    // carWeapon.name = 'carWeapon';
    // carWeapon.anchor.setTo(0.5, 0.5);
    // carWeapon.scale.setTo(U.ratioS, U.ratioS);
    // carWeapon.frame = 3;
    // carWeapon.physicsBodyType = Phaser.Physics.ARCADE;
    // this.game.physics.arcade.enable(carWeapon);
    // carWeapon.body.immovable = true;
    // carWeapon.data.attackRate = 1000;
    // carWeapon.data.attackRateTimeout = 0;
    // carWeapon.data.damage = this.car.damage;
    // carWeapon.animations.add('fire', [0, 1, 2, 3, 4, 5, 6], 30, false);

    // this.drons.push(carWeapon);
    // this.dronsObj['car-w1'] = carWeapon;

    // AddDrons.init(this);

    for (let i = 0; i < subLevel.enemies.length; i ++) {
      console.log(subLevel.enemies[i]);
      for (let j = 0; j < subLevel.enemies[i].count; j ++) {
        const x = subLevel.enemies[i].x;
        const y = this.game.height / subLevel.enemies[i].count * (j + 1);
        const name = 'enemy-' + subLevel.enemies[i].type;
        const enemy = sets.enemies[subLevel.enemies[i].type];

        let enemyModel = enemiesLayer.create(x, y, name);

        enemyModel.enableBody = true;
        enemyModel.name = name;
        enemyModel.enemy = enemy;
        enemyModel.data.damage = enemy.damage;
        enemyModel.data.attackRate = enemy.attackRate;
        enemyModel.data.attackRateTimeout = 0;
        enemyModel.data.life = enemy.life;
        enemyModel.enemy.speed = enemyModel.enemy.speed + Math.round(Math.random() * 5);
        enemyModel.anchor.setTo(0.5, 0.5);
        enemyModel.scale.setTo(U.ratioS, U.ratioS);
        enemyModel.physicsBodyType = Phaser.Physics.ARCADE;
        this.game.physics.arcade.enable(enemyModel);
        // enemyModel.body.bounce.setTo(Math.round(Math.random() * 10), Math.round(Math.random() * 10));
        // enemyModel.animations.add('rolling', [0, 1, 2, 3, 5, 6, 7], 15, true);
        enemyModel.frame = 0;
        enemyModel.collideWorldBounds = true;
        // console.log(enemyModel, dron);

        // let dron;
        // let distance = 100000000;
        // drons.forEach(dron_ => {
        //   const distance_ = this.game.physics.arcade.distanceBetween(enemy, dron_);
        //   if (distance_ < distance) {
        //     dron = dron_;
        //     distance = distance_;
        //   }
        // });

        enemyModel.body.velocity.x = 150;

        // this.game.physics.arcade.moveToObject(enemyModel, carModel, enemyModel.enemy.speed);
        // enemyModel.rotation = this.game.physics.arcade.angleBetween(enemyModel, carModel) + U.getRadians(270);
        // dron.rotation = this.game.physics.arcade.angleBetween(dron, enemyModel) + U.getRadians(90);
      }
    }

    enemiesLayer.children.forEach(enemy => {
      enemy.body.enable = false;
    });

    const btnPlay = U.btns.add({
      x: 10,
      y: U.view.h - 50,
      w: 40,
      h: 40,
      click: () => {
        this.play();
        btnPlay.hide();
        btnPause.show();
        levelBg.play('ride');
        isPaused = false;
      },
      cls: 'icon-play3'
    });

    const btnPause = U.btns.add({
      x: 10,
      y: U.view.h - 50,
      w: 40,
      h: 40,
      click: () => {
        this.pause();
        btnPlay.show();
        btnPause.hide();
        levelBg.animations.stop();
        isPaused = true;
      },
      cls: 'icon-pause2',
      hidden: true
    });

    const btnMenu = U.btns.add({
      x: 64,
      y: U.view.h - 50,
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

    // const btnAddDrons = U.btns.add({
    //   x: U.view.w - 54,
    //   y: U.view.h - 50,
    //   w: 40,
    //   h: 40,
    //   click: () => {
    //     this.dronsLayer.children.forEach(dron => {
    //       if (dron.name === 'dron') {
    //         dron.visible = true;
    //       }
    //     });
    //   },
    //   cls: 'icon-airplane'
    // });

    const btnBoost = U.btns.add({
      x: U.view.w - 108,
      y: U.view.h - 50,
      w: 40,
      h: 40,
      click: () => {
        car.speed *= 2;

        enemiesLayer.children.forEach(enemy => {
          // this.game.physics.arcade.moveToObject(enemy, carModel, enemy.enemy.speed / 2);
          enemy.body.velocity.x *= 2;
        });

        setTimeout(() => {
          car.speed /= 2;

          enemiesLayer.children.forEach(enemy => {
            // this.game.physics.arcade.moveToObject(enemy, carModel, enemy.enemy.speed * 2);
            enemy.body.velocity.x /= 2;
          });
        }, 3000);
      },
      cls: 'icon-power'
    });

    btnPlay.click();

    console.log(this.game.physics.arcade);
  }

  update() {
    this.game.physics.arcade.collide(enemiesLayer, defenseLayer, (enemy, dron) => {
      let x = Math.round(Math.random() * (2 * enemy.body.x));
      let y = Math.round(Math.random() * (2 * enemy.body.y));

      x = x > 0 ? x * (-1) : x;

      if (enemy.body.y <= this.game.world.height / 2) {
        y = y * (-1);
      }

      enemy.body.velocity.x = x;
      enemy.body.velocity.y = y;

      this.game.add.tween(enemy).to( { angle: 720 }, 2000, Phaser.Easing.Linear.None, true);

      car.data.life -= enemy.data.damage;
      car.data.life = car.data.life < 0 ? 0 : car.data.life;
      carLife.setText(car.data.life);
    });

    // this.game.physics.arcade.overlap(this.enemiesLayer, this.rangeLayer, (enemy, range) => {
    //   let dron = this.dronsObj[range.dron];
    //   const dronAttackRateTimeout = new Date().getTime() - dron.data.attackRateTimeout;
    //   dron.rotation = this.game.physics.arcade.angleBetween(dron, enemy) + U.getRadians(90);

    //   const enemyAttackRateTimeout = new Date().getTime() - enemy.data.attackRateTimeout;

    //   if (
    //     enemy.body.velocity.x === 0
    //     &&
    //     enemy.body.velocity.y === 0
    //     &&
    //     enemyAttackRateTimeout >= enemy.data.attackRate
    //   ) {
    //     this.car.data.life -= enemy.data.damage;
    //     this.car.data.life = this.car.data.life < 0 ? 0 : this.car.data.life;
    //     this.carLife.setText(this.car.data.life);
    //     enemy.data.attackRateTimeout = new Date().getTime();
    //   }

    //   if (dronAttackRateTimeout >= dron.data.attackRate && dron.visible) {
    //     console.log(enemy.data.life, dron);
    //     enemy.data.life -= dron.data.damage;
    //     enemy.data.life = enemy.data.life < 0 ? 0 : enemy.data.life;

    //     // console.log(enemy.data.life);

    //     dron.animations.play('fire');
    //     dron.data.attackRateTimeout = new Date().getTime();

    //     if (enemy.data.life <= 0) {
    //       enemy.kill();
    //       this.coins.animations.play('rolling');
    //       user.money += enemy.enemy.cost;
    //       user.score += enemy.enemy.score;
    //       this.userMoney.setText(user.money + ' ' + user.score);
    //     }

    //     const aliveEnemies = this.enemiesLayer.children.filter(enemy => enemy.alive);

    //     if (aliveEnemies.length === 0) {
    //       U.mem.set('sets', this.sets);
    //       U.mem.set('win', 1);
    //       this.state.start('Win');
    //     } else if (this.car.data.life <= 0) {
    //       U.mem.set('sets', this.sets);
    //       U.mem.set('win', 0);
    //       this.state.start('Win');
    //     }
    //   } else {

    //   }
    // });

    aliveEnemies = enemiesLayer.children.filter(enemy => enemy.alive);

    if (aliveEnemies.length === 0) {
      U.mem.set('sets', sets);
      U.mem.set('win', 1);
      this.state.start('Win');
    } else if (car.data.life <= 0) {
      U.mem.set('sets', sets);
      U.mem.set('win', 0);
      this.state.start('Win');
    }

    if (!isPaused) {
      bg.tilePosition.x += car.speed;
    }
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }

  play() {
    enemiesLayer.children.forEach(enemy => {
      enemy.body.enable = true;
    });
  }

  pause() {
    enemiesLayer.children.forEach(enemy => {
      enemy.body.enable = false;
    });
  }
}
