import Phaser from 'phaser';
import { U } from '../../utils/';

let clickArr = [];

export default class extends Phaser.State {
  init () {
    U.btns.clear();
    U.cnt.clear();
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
  }
}
