import Phaser from 'phaser';
import { U } from '../../utils/';
import $ from 'jquery';

let clickArr = [];

export default class extends Phaser.State {
  init () {
    U.btns.clear();
    U.title.remove();
    U.map.remove();
  }
  
  preload () {}

  create () {
    this.splashBg = this.add.sprite(0, 0, 'splash-bg');
    this.splashBg.x = 0;
    this.splashBg.y = 0;
    this.splashBg.width = this.game.width;
    this.splashBg.height = this.game.height;
    
    let x = this.game.width - 74 * U.ratio;
    let y = 10 * U.ratio;

    this.pageLayer = this.game.add.group();
    this.buttonsLayer = this.game.add.group();

    U.title.add({
      title: 'Play',
      click: () => {
        this.state.start('Home');
      }
    });

    U.btns.add({
      type: 'back',
      click: () => {
        if ($('.map-item').hasClass('opened')) {
          $('.map-item').removeClass('opened');
          $('.map-item').removeClass('hidden');
        } else {
          this.state.start('Home');
        }
      }
    });

    const map = U.map.add({
      hidden: false,
      items: [
        {
          click: (event) => {
            console.log('to battle', {childNodes: event.target.childNodes});
            // if (!U.hasChild(event.target, '.icon-lock')) {
            //   this.state.start('Battle');
            // }
          },
          label: 'North America',
          progress: 100,
          closed: false,
          subItems: [
            {
              click: (event) => {
                // console.log('to battle', {childNodes: event.target.childNodes});
                if (!U.hasChild(event.target, '.icon-lock')) {
                  this.state.start('Battle');
                }
              },
              label: 'Nome',
              progress: 100,
              closed: false,
            },
            {
              click: (event) => {
                // console.log('to battle', {childNodes: event.target.childNodes});
                if (!U.hasChild(event.target, '.icon-lock')) {
                  this.state.start('Battle');
                }
              },
              label: 'Edmonton',
              progress: 100,
              closed: false,
            },
            {
              click: (event) => {
                // console.log('to battle', {childNodes: event.target.childNodes});
                if (!U.hasChild(event.target, '.icon-lock')) {
                  this.state.start('Battle');
                }
              },
              label: 'Winnipeg',
              progress: 100,
              closed: false,
            },
            {
              click: (event) => {
                // console.log('to battle', {childNodes: event.target.childNodes});
                if (!U.hasChild(event.target, '.icon-lock')) {
                  this.state.start('Battle');
                }
              },
              label: 'Ottawa',
              progress: 100,
              closed: false,
            },
            {
              click: (event) => {
                // console.log('to battle', {childNodes: event.target.childNodes});
                if (!U.hasChild(event.target, '.icon-lock')) {
                  this.state.start('Battle');
                }
              },
              label: 'New York',
              progress: 100,
              closed: false,
            },
            {
              click: (event) => {
                // console.log('to battle', {childNodes: event.target.childNodes});
                if (!U.hasChild(event.target, '.icon-lock')) {
                  this.state.start('Battle');
                }
              },
              label: 'Washington',
              progress: 100,
              closed: false,
            },
            {
              click: (event) => {
                // console.log('to battle', {childNodes: event.target.childNodes});
                if (!U.hasChild(event.target, '.icon-lock')) {
                  this.state.start('Battle');
                }
              },
              label: 'Nashville',
              progress: 25,
              closed: false,
            },
            {
              click: (event) => {
                // console.log('to battle', {childNodes: event.target.childNodes});
                if (!U.hasChild(event.target, '.icon-lock')) {
                  this.state.start('Battle');
                }
              },
              label: 'Dallas',
              progress: 0,
              closed: true,
            },
            {
              click: (event) => {
                // console.log('to battle', {childNodes: event.target.childNodes});
                if (!U.hasChild(event.target, '.icon-lock')) {
                  this.state.start('Battle');
                }
              },
              label: 'San Antonio',
              progress: 0,
              closed: true,
            },
            {
              click: (event) => {
                // console.log('to battle', {childNodes: event.target.childNodes});
                if (!U.hasChild(event.target, '.icon-lock')) {
                  this.state.start('Battle');
                }
              },
              label: 'Monterrey',
              progress: 0,
              closed: true,
            },
            {
              click: (event) => {
                // console.log('to battle', {childNodes: event.target.childNodes});
                if (!U.hasChild(event.target, '.icon-lock')) {
                  this.state.start('Battle');
                }
              },
              label: 'Guatemala',
              progress: 0,
              closed: true,
            },
            {
              click: (event) => {
                // console.log('to battle', {childNodes: event.target.childNodes});
                if (!U.hasChild(event.target, '.icon-lock')) {
                  this.state.start('Battle');
                }
              },
              label: 'San Miguel',
              progress: 0,
              closed: true,
            }
          ]
        },
        {
          click: (event) => {
            console.log('to battle', {childNodes: event.target.childNodes});
            if (!U.hasChild(event.target, '.icon-lock')) {
              this.state.start('Battle');
            }
          },
          label: 'South America',
          progress: 34,
          closed: false,
          subItems: []
        },
        {
          click: (event) => {
            console.log('to battle', {childNodes: event.target.childNodes});
            if (!U.hasChild(event.target, '.icon-lock')) {
              this.state.start('Battle');
            }
          },
          label: 'Europe',
          progress: 0,
          closed: false,
          subItems: []
        },
        {
          click: (event) => {
            console.log('to battle', {childNodes: event.target.childNodes});
            if (!U.hasChild(event.target, '.icon-lock')) {
              this.state.start('Battle');
            }
          },
          label: 'Asia',
          progress: 0,
          closed: true,
          subItems: []
        },
        {
          click: (event) => {
            console.log('to battle', {childNodes: event.target.childNodes});
            if (!U.hasChild(event.target, '.icon-lock')) {
              this.state.start('Battle');
            }
          },
          label: 'Australia',
          progress: 0,
          closed: true,
          subItems: []
        },
        {
          click: (event) => {
            console.log('to battle', {childNodes: event.target.childNodes});
            if (!U.hasChild(event.target, '.icon-lock')) {
              this.state.start('Battle');
            }
          },
          label: 'Africa',
          progress: 0,
          closed: true,
          subItems: []
        }
      ]
    });
  }
}
