import Phaser from 'phaser';
import { setCenter, getMenu, getRatio } from '../utils/';

let clickArr = [];

export default class HomeState extends Phaser.State {
  init () {}
  preload () {}

  create () {
    let x = this.game.world.centerX - 48 * getRatio.ratio;
    let y = this.game.height - 74 * getRatio.ratio;
    // this.state.start('Gameplay');
    let btnLab = this.addButton('Laboratory', x, y, () => {
      console.log('laboratory');
      // qwe++;
      // if (this.game.paused) {
      //   this.game.paused = false;
        
      //   // btnPause.button.visible = true;
      //   // btnPause.label.visible = true;
        
      //   // btnPlay.button.visible = false;
      //   // btnPlay.label.visible = false;
      // }
    });

    x = x + 100 * getRatio.ratio;
    let btnMarket = this.addButton('Market', x, y, () => {
      console.log('market');
      // qwe++;
      // if (this.game.paused) {
      //   this.game.paused = false;
        
      //   // btnPause.button.visible = true;
      //   // btnPause.label.visible = true;
        
      //   // btnPlay.button.visible = false;
      //   // btnPlay.label.visible = false;
      // }
    });

    x = x - 200 * getRatio.ratio;
    let btnSettings = this.addButton('Settings', x, y, () => {
      console.log('settings');
      // qwe++;
      // if (this.game.paused) {
      //   this.game.paused = false;
        
      //   // btnPause.button.visible = true;
      //   // btnPause.label.visible = true;
        
      //   // btnPlay.button.visible = false;
      //   // btnPlay.label.visible = false;
      // }
    });

    x = x + 100 * getRatio.ratio;
    y = this.game.world.centerY;
    let btnPlay = this.addButton('Play', x, y, () => {
      console.log('play');
      this.state.start('Gameplay');
    });

    this.game.input.onDown.add(pointer => {
      if (pointer.id === 1) {
        // console.log(this.game.input.x, this.game.input.y);
        let x = this.game.input.x;
        let y = this.game.input.y;
        let clickArrFiltered = clickArr.filter(click => click.xMin <= x
          && click.xMax >= x
          && click.yMin <= y
          && click.yMax >= y
        );

        if (clickArrFiltered.length && clickArrFiltered[0].callback) {
          clickArrFiltered[0].callback();
        }
      }
    }, this);
  }

  addButton(labelText, x, y, callback) {
    let btn = this.game.add.group();
    let button = this.game.add.button(
      x + 48 * getRatio.ratio,
      y + 32 * getRatio.ratio,
      'button-home',
      null,
      this,
      2,
      1,
      0
    );
    button.enableBody = true;
    button.anchor.set(0.5);
    // buttonsLayer.add(button);

    let label = this.game.add.text(
      x + 48 * getRatio.ratio,
      y + 32 * getRatio.ratio,
      labelText,
      {
        font: 16 * getRatio.ratio + 'px "Text Me One"',
        fill: '#ffffff',
        align: 'center'
      }
    );
    label.anchor.set(0.5);
    // buttonsLayer.add(label);

    // buttonsLayer.add(btn);

    clickArr.push({
      xMin: x / getRatio.ratio,
      xMax: x / getRatio.ratio + 48 * getRatio.ratio,
      yMin: y / getRatio.ratio,
      yMax: y / getRatio.ratio + 32 * getRatio.ratio,
      callback: callback
    });

    // if (callback) {
    //   callback();
    // }

    return {
      button,
      label
    }
  }
}
