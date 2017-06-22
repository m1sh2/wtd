import Phaser from 'phaser';
import { U } from '../../utils/';

const sets = {
  hidden: false,
  levels: [
    {
      id: 101,
      label: 'North America',
      locked: false,
      subLevels: [
        {
          id: 201,
          label: 'Nome',
          complete: true,
          locked: false,
          enemies: [
            {
              type: 'bug',
              count: 10,
              x: 0
            },
            {
              type: 'bug',
              count: 20,
              x: -500
            },
            {
              type: 'bug',
              count: 30,
              x: -1000
            },
            {
              type: 'bug',
              count: 40,
              x: -1500
            },
            {
              type: 'bug',
              count: 50,
              x: -2000
            }
          ],
          bases: 3
        },
        {
          id: 202,
          label: 'Edmonton',
          complete: true,
          locked: false,
          enemies: [
            {
              type: 'bug',
              count: 20
            }
          ],
          bases: 4
        },
        {
          id: 203,
          label: 'Winnipeg',
          complete: true,
          locked: false,
          enemies: [
            {
              type: 'bug',
              count: 30
            }
          ],
          bases: 5
        },
        {
          id: 204,
          label: 'Ottawa',
          complete: false,
          locked: false,
          enemies: [
            {
              type: 'bug',
              count: 40
            }
          ],
          bases: 6
        },
        {
          id: 205,
          label: 'New York',
          complete: false,
          locked: true,
          enemies: [
            {
              type: 'bug',
              count: 50
            }
          ],
          bases: 7
        },
        {
          id: 206,
          label: 'Washington',
          complete: false,
          locked: true,
          enemies: [
            {
              type: 'bug',
              count: 60
            }
          ],
          bases: 8
        },
        {
          id: 207,
          label: 'Nashville',
          complete: false,
          locked: true,
        },
        {
          id: 208,
          label: 'Dallas',
          complete: false,
          locked: true,
        },
        {
          id: 209,
          label: 'San Antonio',
          complete: false,
          locked: true,
        },
        {
          id: 210,
          label: 'Monterrey',
          complete: false,
          locked: true,
        },
        {
          id: 211,
          label: 'Guatemala',
          complete: false,
          locked: true,
        },
        {
          id: 212,
          label: 'San Miguel',
          complete: false,
          locked: true,
        }
      ]
    },
    {
      id: 102,
      label: 'South America',
      locked: false,
      subLevels: []
    },
    {
      id: 103,
      label: 'Europe',
      locked: false,
      subLevels: []
    },
    {
      id: 104,
      label: 'Asia',
      locked: true,
      subLevels: []
    },
    {
      id: 105,
      label: 'Australia',
      locked: true,
      subLevels: []
    },
    {
      id: 106,
      label: 'Africa',
      locked: true,
      subLevels: []
    }
  ],
  user: {
    car: 0,
    carLevel: 0,
    dron: 0,
    money: 1000,
    score: 0
  },
  cars: [
    {
      speed: 50,
      range: 100,
      rate: 10,
      width: 80,
      life: 200,
      damage: 20,
      dronsAmount: 1
    }
  ],
  drons: [
    {
      speed: 50,
      range: 100,
      rate: 10,
      damage: 10,
      attackRate: 200
    }
  ],
  enemies: {
    bug: {
      speed: 120,
      cost: 12,
      score: 2,
      damage: 2,
      attackRate: 1000,
      life: 60
    }
  }
};

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#333333';

    // debug, development
    localStorage.clear();

    if (!U.mem.get('sets')) {
      U.mem.set('sets', sets)
    }
    // this.fontsReady = false
    // this.fontsLoaded = this.fontsLoaded.bind(this)
    setTimeout(() => {
      this.state.start('SplashBoot');
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
    this.load.spritesheet('w1', require('../../../assets/images/weapons/weapon-gun-2.png'), 288, 288, 6);
    this.load.spritesheet('base', require('../../../assets/images/weapons/weapon-base-2.png'), 256, 256, 7);
    this.load.spritesheet('range-w1', require('../../../assets/images/weapons/weapon-range-w1.png'), 1024, 1024, 1);

    // Cars
    this.load.spritesheet('car-1', require('../../../assets/images/3d/car-1.png'), 600, 300, 1);
    this.load.spritesheet('car-1-range', require('../../../assets/images/weapons/weapon-range-w1.png'), 1024, 1024, 1);

    // Levels
    this.load.spritesheet('level-1', require('../../../assets/images/levels/level-1.png'), 2048, 1024, 8);
    this.load.spritesheet('level-2', require('../../../assets/images/levels/level-2.png'), 512, 1024, 1);
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
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.height - 5 * U.ratio, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.height - 5 * U.ratio, 'loaderBar');
    
    U.setCenter([this.loaderBg, this.loaderBar, this.splashLogo]);

    this.splashBg.x = 0;
    this.splashBg.y = 0;
    this.splashBg.width = this.game.width;
    this.splashBg.height = this.game.height;
    this.load.setPreloadSprite(this.loaderBar);
  }

  // fontsLoaded () {
  //   this.fontsReady = true;
  // }

}
