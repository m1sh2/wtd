// Game Constructor
import * as $ from 'jquery';

export class GameConstructor {
  // Data
  imagesUrl = 'http://wtd.datsko.it/';
  speed: number = 1;
  t: any;
  fps: number = 30;
  timer: number = 0;
  lifeColor: string = 'rgba(255, 0, 0, 1)';
  lifeColor0: string = 'rgba(0, 0, 0, 0.2)';;
  canvas: any;
  ctx: any;
  playing: boolean = false;
  sets: any = {
    points: 0,
    money: 99999,
    w: $(document).width(),
    h: $(document).height()
  };
  CLICK: Array<any> = [];
  default: any = {};
  started: boolean = false;
  mnyEarned: number = 0;

  // Base
  base: any = {
    id: '',
    x: 0,
    y: this.sets.h - 68,
    w: this.sets.w,
    h: 100,
    color: 'rgba(50, 50, 0, 1)',
    life: 1000,
    life0: 1000,
    type: 'base',
    level: 0
  };
  BASE: any;
  baseWpnPos: any;
  wallTop: number = 0;
  baseLevelsWeapons: Array<any> = [
    [2, 4, 7, 9],
    [2, 4, 5, 6, 7, 9],
    [1, 2, 4, 5, 6, 7, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 16, 20],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 16, 18, 20],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 20],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  ];
  baseLevelsLife: Array<number> = [
    1000,
    2000,
    3000,
    5000,
    8000,
    13000,
    21000,
    34000,
    55000
  ];
  baseLevelsBackground: Array<string> = [
    // wood
    'sandybrown',
    'saddlebrown',

    // stone
    'brown',
    'firebrick',
    'indianred',

    // metal
    'darkgrey',
    'grey',
    'darkslategrey',

    // energy
    'mediumorchid'
  ];

  // Bullet
  BULL: Array<any>;
  bullets: Array<any>;

  // Enemy
  objs: Array<any>;
  waves: Array<any>;
  wave: any;
  ENY: any;
  ENYS: Array<any>;
  LVL: any;
  LVLS: Array<any>;
  enemy: any;

  // Sound
  sbg: any;
  snd: any;

  // Weapons
  ww: number;
  wh: number;
  WPOS: any;
  wpns: any;
  max: any;
  wpnsCurrent: any;

  defenseItems: Array<any> = [];
  attackItems: Array<any> = [];

}