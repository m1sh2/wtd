// Game Constructor
import * as $ from 'jquery';
export var GameConstructor = (function () {
    function GameConstructor() {
        // Data
        this.imagesUrl = 'http://wtd.datsko.it/';
        this.speed = 1;
        this.fps = 30;
        this.timer = 0;
        this.lifeColor = 'rgba(255, 0, 0, 1)';
        this.lifeColor0 = 'rgba(0, 0, 0, 0.2)';
        this.playing = false;
        this.sets = {
            points: 0,
            money: 99999,
            w: $(document).width(),
            h: $(document).height()
        };
        this.CLICK = [];
        this.default = {};
        this.started = false;
        this.mnyEarned = 0;
        // Base
        this.base = {
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
        this.wallTop = 0;
        this.baseLevelsWeapons = [
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
        this.baseLevelsLife = [
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
        this.baseLevelsBackground = [
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
        this.defenseItems = [];
        this.attackItems = [];
    }
    ;
    return GameConstructor;
}());
//# sourceMappingURL=game.constructor.js.map