import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Oswald', 'Roboto', 'Lato', 'Alegreya Sans SC', 'Text Me One', 'Changa']
      },
      active: this.fontsLoaded
    });

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' });
    text.anchor.setTo(0.5, 0.5);

    // this.load.image('loaderBg', './assets/images/loader-bg.png')
    // this.load.image('loaderBar', './assets/images/loader-bar.png')

    this.load.image('bullet', './assets/images/bullet.png');

    this.load.spritesheet('enemy-bug', './assets/images/enemies/bug.png', 128, 128, 1);
    this.load.spritesheet('w-base', './assets/images/weapon-base.png', 64, 64, 8);
    this.load.spritesheet('w-gun', './assets/images/weapon-gun.png', 64, 64, 8);
    this.load.spritesheet('coin', './assets/images/coin.png', 96, 96, 8);
    this.load.spritesheet('wall', './assets/images/wall/wall.png', 997, 85, 1);
    this.load.spritesheet('button', './assets/images/button.png', 32, 96, 1);
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

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }

}
