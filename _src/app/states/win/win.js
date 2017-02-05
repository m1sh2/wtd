import Phaser from 'phaser';
import $ from 'jquery';
import { U } from '../../utils/';

export default class extends Phaser.State {
  init () {
    U.btns.clear();
    U.map.remove();
    U.title.remove();
  }

  preload () {
  }

  render () {

  }

  create() {
    U.title.add({
      title: 'Win',
      click: () => {
        this.state.start('Play');
      }
    });

    let $content = $('#content');
    let $buttons = $('#buttons');

    $content.append('<h1>You won!</h1><h1>Congratulations</h1>');

    U.btns.add({
      x: U.view.w / 2 - 60,
      y: U.view.h - 50,
      w: 120,
      h: 40,
      click: () => {
        this.state.start('Play');
      },
      label: 'Go to menu'
    });
  }

}
