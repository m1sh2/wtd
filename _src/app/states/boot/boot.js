import Phaser from 'phaser';
import WebFont from 'webfontloader';
import { U } from '../../utils/';

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#333333';
    // this.fontsReady = false
    // this.fontsLoaded = this.fontsLoaded.bind(this)
    setTimeout(() => {
      this.state.start('Splash');
    }, 1000);
  }

  preload () {
    // WebFont.load({
    //   google: {
    //     families: ['Oswald', 'Roboto', 'Lato', 'Alegreya Sans SC', 'Text Me One', 'Changa']
    //   },
    //   active: this.fontsLoaded
    // });

    // let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' });
    // text.anchor.setTo(0.5, 0.5);

    this.load.image('loaderBg', require('../../../assets/images/loader-bg.png'));
    this.load.image('loaderBar', require('../../../assets/images/loader-bar.png'));
    this.load.image('splash-bg', require('../../../assets/images/splash-bg.png'));
    this.load.spritesheet('splash-logo', require('../../../assets/images/splash-logo.png'), 909, 512);

    this.load.spritesheet('enemy-bug', require('../../../assets/images/enemies/bug.png'), 128, 128, 1);

    // User UI
    this.load.spritesheet('coin', require('../../../assets/images/coin.png'), 96, 96, 8);
    
    // Static game UI
    this.load.spritesheet('wall', require('../../../assets/images/wall/wall.png'), 997, 85, 1);

    // Weapons
    this.load.spritesheet('w1', require('../../../assets/images/weapons/weapon-gun-2.png'), 128, 128, 6);
  }

  render () {
    // if (this.fontsReady) {
      
    // }
  }

  create() {
    this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.input.maxPointers = 1;

    this.splashBg = this.add.sprite(0, 0, 'splash-bg');
    this.splashLogo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'splash-logo');
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.height - 30 * U.ratio, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.height - 30 * U.ratio, 'loaderBar');
    
    U.setCenter([this.loaderBg, this.loaderBar, this.splashLogo]);

    this.splashBg.x = 0;
    this.splashBg.y = 0;
    this.splashBg.width = this.game.width;
    this.splashBg.height = this.game.height;
    this.load.setPreloadSprite(this.loaderBar);
    // this.game.input.multiInputOverride = Phaser.Input.TOUCH_OVERRIDES_MOUSE;
  }

  // fontsLoaded () {
  //   this.fontsReady = true;
  // }

}
