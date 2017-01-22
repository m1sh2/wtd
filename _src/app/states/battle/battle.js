/* globals __DEV__ */
import Phaser from 'phaser';
// import Mushroom from '../sprites/Mushroom';
import { U } from '../../utils/';

let clickArr = [];

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

    this.userStatsLayer = this.game.add.group();
    this.enemiesLayer = this.game.add.group();
    this.defenseLayer = this.game.add.group();
    this.buttonsLayer = this.game.add.group();
    this.popupLayer = this.game.add.group();

    let coins = this.userStatsLayer.create(20 * U.ratio, 20 * U.ratio, 'coin');
    coins.enableBody = true;
    coins.name = 'coins';
    coins.anchor.setTo(0.5, 0.5);
    coins.scale.setTo(U.ratioS, U.ratioS);
    coins.animations.add('rolling', [0, 1, 2, 3, 5, 6, 7], 15, true);
    coins.frame = 7;
    // coins.animations.play('rolling');

    let userMoney = this.add.text(40 * U.ratio, 20 * U.ratio, '43 245 879 Scale: ' + U.ratio + ' Game: ' + this.game.width + ' Window: ' + document.documentElement.clientWidth);
    userMoney.font = 'Changa';
    userMoney.fontSize = 20 * U.ratio;
    userMoney.fill = '#fff';
    userMoney.anchor.setTo(0, 0.5);
    userMoney.inputEnabled = true;
    this.userStatsLayer.add(userMoney);

    let weapons = [];
    const weaponsLength = 9;
    for (let i = 0; i < weaponsLength; i ++) {
      const x = this.game.width / weaponsLength * (i + 1) - this.game.width / weaponsLength / 2;
      const y = this.game.height - 40 * U.ratio;
      let weapon = this.defenseLayer.create(x, y, 'w1');
      weapon.enableBody = true;
      weapon.name = 'w1';
      weapon.anchor.setTo(0.5, 0.5);
      weapon.scale.setTo(U.ratioS, U.ratioS);
      // weapon.animations.add('rolling', [0, 1, 2, 3, 5, 6, 7], 15, true);
      weapon.frame = 3;
      weapon.physicsBodyType = Phaser.Physics.ARCADE;
      this.game.physics.arcade.enable(weapon);
      weapon.body.immovable = true;

      weapon.animations.add('fire', [3, 4, 5], 10, false);

      weapons.push(weapon);


    }

    for (let i = 0; i < 100; i ++) {
      let enemy = this.enemiesLayer.create(this.game.width / 100 * (i + 1), (20 + Math.round(Math.random() * 10)) * U.ratio, 'enemy-bug');
      enemy.enableBody = true;
      enemy.name = 'enemy-bug';
      enemy.speed = 100 + Math.round(Math.random() * 10);
      enemy.anchor.setTo(0.5, 0.5);
      enemy.scale.setTo(U.ratioS, U.ratioS);
      enemy.physicsBodyType = Phaser.Physics.ARCADE;
      this.game.physics.arcade.enable(enemy);
      // enemy.animations.add('rolling', [0, 1, 2, 3, 5, 6, 7], 15, true);
      enemy.frame = 0;
      enemy.collideWorldBounds = true;
      // console.log(enemy, weapon);

      let weapon;
      let distance = 100000000;
      weapons.forEach(weapon_ => {
        const distance_ = this.game.physics.arcade.distanceBetween(enemy, weapon_);
        if (distance_ < distance) {
          weapon = weapon_;
          distance = distance_;
        }
      });

      this.game.physics.arcade.moveToObject(enemy, weapon, enemy.speed);
      enemy.rotation = this.game.physics.arcade.angleBetween(enemy, weapon) + U.getRadians(270);
      weapon.rotation = this.game.physics.arcade.angleBetween(weapon, enemy) + U.getRadians(90);
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
                this.state.start('Home');
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

    // U.btns.add({
    //   type: 'back',
    //   click: () => {
    //     this.state.start('Home');
    //   }
    // });

    // let btnHome = this.addButton('Home', x, y, () => {
    //   this.state.start('Home', true, false);
    // });
    
    // x = this.game.world.width - (128 + 10 * U.ratio);
    // let btnPlay = this.addButton('Play', x, y, () => {
    //   this.btnClickPlay(btnPlay);
    // });
    
    // x = this.game.world.centerX;
    // y = this.game.world.centerY;
    // let btnMenuReturn = this.addButton('MenuReturn', x, y, () => {
    //   console.log('return');
    // });
    
    // y = y - 74 * U.ratio;
    // let btnMenuMarket = this.addButton('MenuMarket', x, y, () => {
    //   console.log('market', btnMenuMarket);
    // });
    
    // y = y - 74 * U.ratio;
    // let btnMenuLab = this.addButton('MenuLab', x, y, () => {
    //   console.log('lab', btnMenuLab);
    // });
    
    // y = y + 222 * U.ratio;
    // let btnMenuSettings = this.addButton('MenuSettings', x, y, () => {
    //   console.log('settings');
    // });
    
    // y = y + 74 * U.ratio;
    // let btnMenuEnd = this.addButton('MenuEnd', x, y, () => {
    //   console.log('end');
    // });

    // this.clickDetect();
    // console.log(this.game, btnPlay);
  }

  update() {
    this.game.physics.arcade.collide(this.enemiesLayer, this.defenseLayer, (enemy, weapon) => {
      // console.log('collide', enemy);
      // enemy.speed = 0;
      enemy.body.velocity.x = 0;
      enemy.body.velocity.y = 0;
      enemy.kill();

      weapon.animations.play('fire');
    });
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }

  // addButton(labelText, x, y, callback) {
  //   const buttonFrames = getButtonFrame(labelText);
  //   let btn = this.game.add.group();
  //   let button;

  //   switch(labelText) {
  //     case 'Home':
  //     case 'Play':
  //       button = this.game.add.button(
  //         x,
  //         y,
  //         'button-mini',
  //         null,
  //         this,
  //         buttonFrames.over,
  //         buttonFrames.out,
  //         buttonFrames.down,
  //         buttonFrames.up
  //       );

  //       clickArr.push({
  //         xMin: x / U.ratio,
  //         xMax: x / U.ratio + 32,
  //         yMin: y / U.ratio,
  //         yMax: y / U.ratio + 32,
  //         callback: callback
  //       });
  //       break;
      
  //     case 'MenuReturn':
  //     case 'MenuLab':
  //     case 'MenuMarket':
  //     case 'MenuSettings':
  //     case 'MenuEnd':
  //       button = this.game.add.button(
  //         x,
  //         y,
  //         'button-menu',
  //         null,
  //         this,
  //         buttonFrames.over,
  //         buttonFrames.out,
  //         buttonFrames.down,
  //         buttonFrames.up
  //       );

  //       clickArr.push({
  //         xMin: x / U.ratio - 64 * U.ratio,
  //         xMax: x / U.ratio + 64 * U.ratio,
  //         yMin: y / U.ratio - 16 * U.ratio,
  //         yMax: y / U.ratio + 16 * U.ratio,
  //         callback: callback
  //       });
  //       break;
  //   }

  //   button.enableBody = true;
  //   // button.anchor.set(0.5);
    
  //   return button;
  // }

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

  // btnClickPlay(btn) {
  //   console.log('play', btn.frame);

  //   if (typeof btn.frame === 'undefined' || btn.frame === 0) {
  //     this.play();
  //     btn.frame = 1;
  //   } else if (btn.frame === 1) {
  //     this.pause();
  //     btn.frame = 0;
  //   }
  // }

  // clickDetect() {
  //   this.game.input.onDown.add(pointer => {
  //     if (pointer.id === 1) {
  //       console.log(this.game.input.x, this.game.input.y);
  //       let x = this.game.input.x;
  //       let y = this.game.input.y;
  //       let clickArrFiltered = clickArr.filter(click => click.xMin <= x
  //         && click.xMax >= x
  //         && click.yMin <= y
  //         && click.yMax >= y
  //       );

  //       if (clickArrFiltered.length && clickArrFiltered[0].callback) {
  //         clickArrFiltered[0].callback();
  //       }
  //     }
  //   }, this);
  // }
}
