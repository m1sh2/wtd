import Phaser from 'phaser';
import { setCenter, getRatio } from '../utils/';

export default class SplashState extends Phaser.State {
  init () {}

  preload () {
    this.splashBg = this.add.sprite(0, 0, 'splash-bg');
    this.splashLogo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'splash-logo');
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.height - 30 * getRatio.ratio, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.height - 30 * getRatio.ratio, 'loaderBar');

    setCenter([this.loaderBg, this.loaderBar, this.splashLogo]);

    this.splashBg.x = 0;
    this.splashBg.y = 0;
    this.splashBg.width = this.game.width;
    this.splashBg.height = this.game.height;
    this.load.setPreloadSprite(this.loaderBar);

    
    
    // Loading all assets
    // this.load.image('bullet', require('../../assets/images/weapons/bullet.png'));
    this.load.spritesheet('enemy-bug', require('../../assets/images/enemies/bug.png'), 128, 128, 1);
    // this.load.spritesheet('w-base', require('../../assets/images/weapons/weapon-base.png'), 64, 64, 8);
    // this.load.spritesheet('w-gun', require('../../assets/images/weapons/weapon-gun.png'), 64, 64, 8);
    this.load.spritesheet('coin', require('../../assets/images/coin.png'), 96, 96, 8);
    this.load.spritesheet('wall', require('../../assets/images/wall/wall.png'), 997, 85, 1);
    this.load.spritesheet('button', require('../../assets/images/buttons/button.png'), 192, 64, 1);
    this.load.spritesheet('button-home', require('../../assets/images/buttons/button-home.png'), 192, 128, 1);
    // this.load.spritesheet('menu-top', require('../../assets/images/menu-top.png'), 16, 32, 1);
    // this.load.audio('sfx', require('../../assets/audio/shot.wav'));

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
    
    setTimeout(() => {
      this.state.start('Home');
    }, 1000);
  }

}
