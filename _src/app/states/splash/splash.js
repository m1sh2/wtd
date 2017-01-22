import Phaser from 'phaser';
import { U } from '../../utils/';

export default class extends Phaser.State {
  init () {
    U.btns.clear();
    this.state.start('Home');
  }

  preload () {
    // // Loading all assets
    // // this.load.image('bullet', require('../../../assets/images/weapons/bullet.png'));
    // this.load.spritesheet('enemy-bug', require('../../../assets/images/enemies/bug.png'), 128, 128, 1);
    // // this.load.spritesheet('w-base', require('../../../assets/images/weapons/weapon-base.png'), 64, 64, 8);
    // // this.load.spritesheet('w-gun', require('../../../assets/images/weapons/weapon-gun.png'), 64, 64, 8);

    // // User UI
    // this.load.spritesheet('coin', require('../../../assets/images/coin.png'), 96, 96, 8);
    
    // // Static game UI
    // this.load.spritesheet('wall', require('../../../assets/images/wall/wall.png'), 997, 85, 1);

    // Buttons
    // this.load.spritesheet('button-home', require('../../../assets/images/buttons/button-home.png'), 192, 128, 3);
    // this.load.spritesheet('button-mini', require('../../../assets/images/buttons/button-mini.png'), 128, 128, 4);
    // this.load.spritesheet('button-menu', require('../../../assets/images/buttons/button-menu.png'), 512, 128, 4);

    // Tites
    // this.load.spritesheet('title-page', require('../../../assets/images/titles/title-page.png'), 1152, 192, 4);

    // Map
    // this.load.spritesheet('map', require('../../../assets/images/map.png'), 2400, 800, 1);
    // this.load.spritesheet('menu-top', require('../../../assets/images/menu-top.png'), 16, 32, 1);
    // this.load.audio('sfx', require('../../../assets/audio/shot.wav'));

    this.game.stage.backgroundColor = '#333333';

    this.load.onLoadStart.add(() => {
      console.log('start load');
    }, this);
    this.load.onFileComplete.add(() => {
      console.log('source loaded');
    }, this);
    this.load.onLoadComplete.add(() => {
      console.log('loaded');
      this.game.stage.backgroundColor = '#8BC34A';
    }, this);
  }

  create () {
  }

}
