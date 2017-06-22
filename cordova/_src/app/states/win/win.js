import Phaser from 'phaser';
import { U } from '../../utils/';

export default class extends Phaser.State {
  init () {
    U.btns.clear();
    U.cnt.clear();
    U.map.remove();
    U.title.remove();
  }

  preload () {
  }

  render () {

  }

  create() {
    let sets = U.mem.get('sets');
    const user = sets.user;
    const isWin = +(U.mem.get('win'));

    U.title.add({
      title: 'Win',
      click: () => {
        this.state.start('Play');
      }
    });

    if (isWin) {
      U.cnt.add('<h1>You won!</h1><h1>Congratulations</h1>', {x: 20, y: 100});
    } else {
      U.cnt.add('<h1>You loose...</h1><h1>Try again!</h1>', {x: 20, y: 100});
    }
    U.cnt.add('<h4>Your money: ' + user.money + '</h4>', {x: 20, y: 140});
    U.cnt.add('<h4>Your score: ' + user.score + '</h4>', {x: 20, y: 180});

    U.btns.add({
      x: U.view.w / 2 - 60,
      y: U.view.h - 50,
      w: 120,
      h: 40,
      click: () => {
        this.state.start('Play');
      },
      label: 'Go to level select'
    });
  }

}
