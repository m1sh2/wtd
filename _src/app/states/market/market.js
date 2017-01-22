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
    
    let x = this.game.width - 74 * U.ratio;
    let y = 10 * U.ratio;

    this.pageLayer = this.game.add.group();
    this.buttonsLayer = this.game.add.group();

    // let pageTitle = this.pageLayer.create(this.game.world.centerX, 20 * U.ratio, 'title-page');
    // pageTitle.enableBody = true;
    // pageTitle.name = 'pageTitle';
    // pageTitle.anchor.setTo(0.5, 0);
    // pageTitle.scale.setTo(U.ratioS, U.ratioS);
    // pageTitle.frame = 1;

    U.title.add({
      title: 'Market',
      click: () => {
        this.state.start('Home');
      }
    });

    U.btns.add({
      type: 'back',
      click: () => {
        this.state.start('Home');
      }
    });
  }
}
