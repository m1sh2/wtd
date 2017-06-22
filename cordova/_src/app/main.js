import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/boot/boot';
import SplashBootState from './states/splash/splash-boot';
import SplashPlayState from './states/splash/splash-play';
import BattleState from './states/battle/battle';
import HomeState from './states/home/home';
import SettingsState from './states/settings/settings';
import LabState from './states/lab/lab';
import MarketState from './states/market/market';
import PlayState from './states/play/play';
import WinState from './states/win/win';

import { U } from './utils/';

class Game extends Phaser.Game {

  constructor () {
    // StartAppSDK.init(this, '200270695', true);

    let width = document.documentElement.clientWidth * U.ratio;
    let height = document.documentElement.clientHeight * U.ratio;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('SplashBoot', SplashBootState, false);
    this.state.add('SplashPlay', SplashPlayState, false);
    this.state.add('Battle', BattleState, false);
    this.state.add('Home', HomeState, false);
    this.state.add('Settings', SettingsState, false);
    this.state.add('Lab', LabState, false);
    this.state.add('Market', MarketState, false);
    this.state.add('Play', PlayState, false);
    this.state.add('Win', WinState, false);

    this.state.start('Boot');
  }
}

window.game = new Game();
