import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/boot';
import SplashState from './states/splash';
import GameplayState from './states/gameplay';
import HomeState from './states/home';

import { getRatio } from './utils/';

class Game extends Phaser.Game {

  constructor () {
    let width = document.documentElement.clientWidth * getRatio.ratio;
    let height = document.documentElement.clientHeight * getRatio.ratio;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Gameplay', GameplayState, false);
    this.state.add('Home', HomeState, false);

    this.state.start('Boot');
  }
}

window.game = new Game();
