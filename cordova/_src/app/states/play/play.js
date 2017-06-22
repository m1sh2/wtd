import Phaser from 'phaser';
import { U } from '../../utils/';
import $ from 'jquery';

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
    const sets = U.mem.get('sets');
    console.log(sets);

    this.splashBg = this.add.sprite(0, 0, 'splash-bg');
    this.splashBg.x = 0;
    this.splashBg.y = 0;
    this.splashBg.width = this.game.width;
    this.splashBg.height = this.game.height;
    
    let x = this.game.width - 74 * U.ratio;
    let y = 10 * U.ratio;

    this.pageLayer = this.game.add.group();
    this.buttonsLayer = this.game.add.group();

    U.title.add({
      title: 'Play',
      click: () => {
        this.state.start('Home');
      }
    });

    U.btns.add({
      type: 'back',
      click: () => {
        if ($('.map-item').hasClass('opened')) {
          $('.map-item').removeClass('opened');
          $('.map-item').removeClass('hidden');
          $('.title-suffix').remove();
        } else {
          this.state.start('Home');
        }
      }
    });

    const map = U.map.add(sets.levels, this);
  }
}
