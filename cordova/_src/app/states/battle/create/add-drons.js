import { U } from '../../../utils';

export const AddDrons = {
  init: (ctx) => {
    const dronsLength = ctx.car.dronsAmount;

    console.log(dronsLength);

    for (let i = 0; i < dronsLength; i ++) {
      const x = ctx.game.width / dronsLength * (i + 1) - ctx.game.width / dronsLength / 2;
      const y = ctx.game.height - 40 * U.ratio;
      const dronId = 'dron' + i;

      // let base = ctx.defenseLayer.create(x, y, 'base');
      // base.enableBody = true;
      // base.frame = 0;
      // base.name = 'base';
      // base.anchor.setTo(0.5, 0.5);
      // base.scale.setTo(U.ratioS, U.ratioS);
      // ctx.game.physics.arcade.enable(base);
      // base.body.immovable = true;
      // base.animations.add('open', [0, 1, 2, 3, 4, 5, 6], 30, false);
      // base.animations.add('close', [6, 5, 4, 3, 2, 1, 0], 30, false);

      let range = ctx.rangeLayer.create(x, y, 'range-w1');
      range.enableBody = true;
      range.frame = 0;
      range.name = 'range';
      range.dron = dronId;
      range.anchor.setTo(0.5, 0.5);
      range.scale.setTo(U.ratioS, U.ratioS);
      ctx.game.physics.arcade.enable(range);
      range.body.immovable = true;

      let dron = ctx.dronsLayer.create(x, y, 'w1');
      dron.enableBody = true;
      dron.name = 'dron';
      dron.anchor.setTo(0.5, 0.5);
      dron.scale.setTo(U.ratioS, U.ratioS);
      dron.frame = 3;
      dron.physicsBodyType = Phaser.Physics.ARCADE;
      ctx.game.physics.arcade.enable(dron);
      dron.body.immovable = true;
      dron.data.attackRate = ctx.carDron.attackRate;
      dron.data.attackRateTimeout = 0;
      dron.data.damage = ctx.carDron.damage;
      dron.animations.add('fire', [0, 1, 2, 3, 4, 5, 6], 30, false);

      ctx.drons.push(dron);

      ctx.dronsObj[dronId] = dron;
    }

    ctx.dronsLayer.children.forEach(dron => {
      if (dron.name === 'dron') {
        dron.visible = false;
      }
    });
  }
}