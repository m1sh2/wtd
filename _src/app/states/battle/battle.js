/* globals __DEV__ */
import Phaser from 'phaser';
// import Mushroom from '../sprites/Mushroom';
import { U } from '../../utils/';

let clickArr = [];

export default class extends Phaser.State {
  init () {
    U.btns.clear();
    U.title.clear();
  }

  preload () {}

  create () {
    let banner = this.add.text(
      20 * U.ratio,
      this.game.height - 100 * U.ratio,
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.'
    );
    banner.font = 'Text Me One';
    banner.fontSize = 16 * U.ratio;
    banner.fill = '#fff';
    banner.anchor.setTo(0);
    banner.wordWrap = true;
    banner.wordWrapWidth = this.game.width - 40 * U.ratio;
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

    let wall = this.defenseLayer.create(this.game.width / 2, this.game.height - 40 * U.ratio, 'wall');
    wall.enableBody = true;
    wall.name = 'wall';
    wall.anchor.setTo(0.5, 0.5);
    wall.scale.setTo(U.ratioS, U.ratioS);
    // wall.animations.add('rolling', [0, 1, 2, 3, 5, 6, 7], 15, true);
    wall.frame = 0;
    wall.physicsBodyType = Phaser.Physics.ARCADE;
    this.game.physics.arcade.enable(wall);

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
      // console.log(enemy, wall);
      this.game.physics.arcade.moveToObject(enemy, wall, enemy.speed);
    }

    this.enemiesLayer.children.forEach(enemy => {
      enemy.body.enable = false;
    });

    let x = 10 * U.ratio;
    let y = 10 * U.ratio;

    U.btns.add({
      x: U.view.w / 2 - 62,
      y: U.view.h - 50,
      w: 120,
      h: 40,
      label: 'Play',
      click: () => {
        this.play();
      }
    });

    U.btns.add({
      x: U.view.w / 2 + 62,
      y: U.view.h - 50,
      w: 120,
      h: 40,
      label: 'Pause',
      click: () => {
        this.pause();
      }
    });

    U.btns.add({
      type: 'back',
      click: () => {
        this.state.start('Home');
      }
    });

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
