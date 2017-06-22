import Phaser from 'phaser';
import { U } from '../../utils/';

export default class extends Phaser.State {
  init () {
    U.btns.clear();
    U.cnt.clear();
    this.state.start('Home');
  }

  preload () {
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
