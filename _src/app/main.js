import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import SplashState from './states/Splash';
import GameState from './states/Game';

import { scaleRatio } from './utils';

class Game extends Phaser.Game {

  constructor () {
    let width = document.documentElement.clientWidth * scaleRatio;
    let height = document.documentElement.clientHeight * scaleRatio;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);

    this.state.start('Boot');
  }
}

window.game = new Game();
