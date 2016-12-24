import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    
    // Loading all assets
    this.load.image('bullet', './assets/images/bullet.png');
    this.load.spritesheet('enemy-bug', './assets/images/enemies/bug.png', 128, 128, 1);
    this.load.spritesheet('w-base', './assets/images/weapon-base.png', 64, 64, 8);
    this.load.spritesheet('w-gun', './assets/images/weapon-gun.png', 64, 64, 8);
    this.load.spritesheet('coin', './assets/images/coin.png', 96, 96, 8);
    this.load.spritesheet('wall', './assets/images/wall/wall.png', 997, 85, 1);
    this.load.spritesheet('button', './assets/images/buttons/button.png', 192, 64, 1);
    this.load.spritesheet('menu-top', './assets/images/menu-top.png', 16, 32, 1);
    this.load.audio('sfx', './assets/audio/shot.wav');

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
    this.state.start('Game');
  }

}
