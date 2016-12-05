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
    lvl: 0,
    lvls: []
  };
  BASE: any;
  baseWpnPos: any;
  wallTop: number = 0;

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

  switchToVillage: boolean = false
}