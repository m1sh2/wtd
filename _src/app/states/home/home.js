import Phaser from 'phaser';
import { U } from '../../utils/';

let clickArr = [];

export default class extends Phaser.State {
  init () {
    U.btns.clear();
    U.title.remove();
    U.map.remove();
  }

  preload () {}

  create () {
    this.splashBg = this.add.sprite(0, 0, 'splash-bg');
    this.splashBg.x = 0;
    this.splashBg.y = 0;
    this.splashBg.width = this.game.width;
    this.splashBg.height = this.game.height;

    let x = this.game.world.centerX;
    let y = 20 * U.ratio;
    let w = this.game.world.width;
    let h = this.game.world.height;

    this.pageLayer = this.game.add.group();

    // let pageTitle = this.pageLayer.create(x, y, 'title-page');
    // pageTitle.enableBody = true;
    // pageTitle.name = 'pageTitle';
    // pageTitle.anchor.setTo(0.5, 0);
    // pageTitle.scale.setTo(U.ratioS, U.ratioS);
    // pageTitle.frame = 0;

    // y = this.game.world.centerY;
    // let map = this.pageLayer.create(x, y, 'map');
    // map.enableBody = true;
    // map.name = 'map';
    // map.anchor.setTo(0.5, 0.5);
    // map.scale.setTo(U.ratioS, U.ratioS);
    // map.frame = 0;

    U.title.add({
      click: () => {
        this.state.start('Home');
      },
      cls: 'title-home'
    });

    const menuLeft = U.view.w / 4 * 3 - 107;

    U.btns.add({
      x: menuLeft,
      y: U.view.h / 2 - 125,
      label: '<span class="icon-earth"></span> Play',
      click: () => {
        console.log('click');
        this.state.start('Play');
      },
      cls: 'btn-home-menu'
    });

    U.btns.add({
      x: menuLeft,
      y: U.view.h / 2 - 73,
      label: '<span class="icon-lab"></span> Laboratory',
      click: () => {
        console.log('click');
        this.state.start('Lab');
      },
      cls: 'btn-home-menu'
    });

    U.btns.add({
      x: menuLeft,
      y: U.view.h / 2 - 21,
      label: '<span class="icon-coin-dollar"></span> Market',
      click: () => {
        console.log('click');
        this.state.start('Market');
      },
      cls: 'btn-home-menu'
    });

    U.btns.add({
      x: menuLeft,
      y: U.view.h / 2 + 31,
      label: '<span class="icon-cog"></span> Settings',
      click: () => {
        console.log('click');
        this.state.start('Settings');
      },
      cls: 'btn-home-menu'
    });

    U.btns.add({
      x: menuLeft,
      y: U.view.h / 2 + 83,
      label: '<span class="icon-exit"></span> Exit',
      click: () => {
        console.log('click');
        navigator.app.exitApp();
      },
      cls: 'btn-home-menu'
    });

    // console.log(this.game);

    // x = this.game.world.centerX - 298;
    // y = this.game.world.height - 138;
    // let btnMarket = this.buttonsLayer.create(x, y, 'button-home');
    // btnMarket.enableBody = true;
    // btnMarket.name = 'btn-market';
    // btnMarket.frame = 0;
    // this.input.onDown.add((pointer) => {
    //   if (pointer.id === 1) {
    //     console.log('market', btnMarket);
    //     this.state.start('Market');
    //   }
    // }, btnMarket);

    // x = x + 202;
    // let btnLab = this.game.add.sprite(x, y, 'button-home');
    // // let btnLab = this.buttonsLayer.create(x, y, 'button-home');
    // btnLab.enableBody = true;
    // btnLab.name = 'btn-lab';
    // btnLab.frame = 1;
    // btnLab.inputEnabled = true;
    // btnLab.events.onInputDown.add((sprite, pointer) => {
    //   console.log('lab1');
    //   // if (pointer.id === 1) {
    //   //   console.log('lab');
    //   //   this.state.start('Lab');
    //   // }
    // }, this);
    // // this.input.onDown.add((pointer) => {
    // //   if (pointer.id === 1) {
    // //     console.log('lab', pointer);
    // //     this.state.start('Lab');
    // //   }
    // // }, btnLab);

    // // x = x + 202;
    // x = 100;
    // y = 100;
    // let btnSettings = this.buttonsLayer.create(x, y, 'button-home');
    // btnSettings.enableBody = true;
    // btnSettings.name = 'btn-settings';
    // btnSettings.frame = 2;
    // btnSettings.hitArea = new Pixi.Rectangle(x * getRatio.sprite, y * getRatio.sprite, btnSettings.width * getRatio.sprite, btnSettings.height * getRatio.sprite);

    // btnSettings.hitArea.events.onInputDown.add(() => {
    //   console.log('settings click');
    // }, this);

    // let button = this.game.add.button(100, 100, 'button-home', null, this, 2, 1, 0);

    // button.events.onInputDown.add = () => {
    //   console.log('clicked');
    // };
    
    // console.log(btnSettings);

    // this.input.onDown.add((pointer) => {
    //   if (pointer.id === 1) {
    //     console.log('settings', pointer.x, pointer.y);
    //     // this.state.start('Settings');

    //     if (btnSettings.hitArea.contains(pointer.x * getRatio.ratio, pointer.y * getRatio.ratio)) {
    //       console.log('settings');
    //     }
    //   }
    // }, btnSettings);
    // var sections = [
    //   new Phaser.Rectangle(0, 0, 100, 100),
    //   new Phaser.Rectangle(100, 0, 100, 100)
    // ];

    // let rect = new Phaser.Rectangle(100, 0, 100, 100);

    // let isClicked = false;
    // let clicked = function(pointer) {
    //   if (isClicked) {
    //     isClicked = false;
    //     return;
    //   }

    //   let p = this.game.input.activePointer.positionDown;
    //   // console.log('click', p, btnSettings.hitArea.contains(p.x, p.y), rect.contains(p.x, p.y));

    //   if (btnSettings.hitArea.contains(p.x, p.y)) {
    //     console.log('yes');
    //   }

    //   // for (var ii = 0; ii < sections.length; ii++ ) {
    //   //   if (sections[ii].contains(p.x, p.y)) {
    //   //     console.log(ii);
    //   //     break;
    //   //   }
    //   // }

    //   isClicked = true;
    // }
    // this.game.input.onDown.add(clicked, this);

    // btnLab.inputEnabled = true;
    // btnLab.input.useHandCursor = true;
    // btnLab.events.onInputDown.add(function() {
    //   console.log('click');
    //   // this.clickHandler();
    // }, this);
    // btnLab.input.pointerDown.add(() => {
    //   console.log('click2');
    //   this.clickHandler();
    // }, this);

    // console.log(btnLab);

    // let btnLab = this.addButton('Lab', x, y, this.clickHandler);

    // let button = this.game.add.button(
    //   x,
    //   y,
    //   'button-home',
    //   () => {
    //     console.log('click');
    //   },
    //   this,
    //   1,
    //   1,
    //   1,
    //   1
    // );
    // button.enableBody = true;
    // button.anchor.set(0.5);
    // button.inputEnabled = true;
    // button.input.useHandCursor = true;

    // button.onInputOver.add(() => {
    //   console.log('over');
    // }, this);

    

    // x = x + 110 * getRatio.ratio;
    // let btnSettings = this.addButton('Settings', x, y, () => {
    //   this.state.start('Settings');
    // });

    // x = x - 220 * getRatio.ratio;
    // let btnMarket = this.addButton('Market', x, y, () => {
    //   this.state.start('Market');
    // });


    // x = x + 330 * getRatio.ratio;
    // let btnPlay = this.addButton('Play', x, y, () => {
    //   console.log('play');
    //   this.state.start('Gameplay');
    // });

    // this.clickDetect();
  }
}
