
export class GamePhaser {
  start() {
    let user = {
      money: 1000
    };

    const body = document.body;
    const html = document.documentElement;

    const ratio = window.devicePixelRatio;

    const width = window.innerWidth * ratio;
    const height = window.innerHeight * ratio;

    let game = new Phaser.Game(width, height, Phaser.CANVAS, 'gameplay', {
      preload: preload,
      create: create,
      update: update,
      init: () => {},
      render: render
    });



    let platforms;
    let player;
    let cursors;
    let enemies;
    let cannon;
    let weapons;
    let weaponsNames = {};
    let weaponsPositions = getWeaponsPositions();

    let bullets;
    let bullet;
    let bulletsArr = [];
    let wall;
    let pi = Math.PI;

    let button;
    let label;

    let sound;


    function preload() {
      game.load.image('bullet', 'images/bullet-' + ratio + '.png');

      game.load.spritesheet('w-base', 'images/weapon-base-' + ratio + '.png', 64 * ratio, 64 * ratio, 8);
      game.load.spritesheet('w-gun', 'images/weapon-gun-' + ratio + '.png', 64 * ratio, 64 * ratio, 8);
      game.load.spritesheet('coin', 'images/coin-' + ratio + '.png', 24 * ratio, 24 * ratio, 8);
      game.load.spritesheet('wall', 'images/wall-' + ratio + '.png', 64 * ratio, 192 * ratio, 4);
      game.load.spritesheet('button', 'images/button-' + ratio + '.png', 32 * ratio, 96 * ratio, 1);
      game.load.spritesheet('menu-top', 'images/menu-top-' + ratio + '.png', 16 * ratio, 32 * ratio, 1);
      game.load.audio('sfx', 'audio/shot.wav');

      game.stage.backgroundColor = '#333333';

      game.load.onLoadStart.add(() => {
        console.log('start load');
      }, this);
      game.load.onFileComplete.add(() => {
        console.log('source loaded');
      }, this);
      game.load.onLoadComplete.add(() => {
        console.log('loaded');
        game.stage.backgroundColor = '#8BC34A';
      }, this);
    }

    function create() {

      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.minWidth = 320;
      game.scale.minHeight = 240;
      game.scale.maxWidth = 1366 * ratio;
      game.scale.maxHeight = 768 * ratio;
      game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
      game.physics.startSystem(Phaser.Physics.ARCADE);


      platforms = game.add.group();
      platforms.enableBody = true;


      sound = game.add.audio('sfx');
      sound.addMarker('gun-shot', 0, 1.0);


      // let menuTop = game.add.tileSprite(0, 0, game.world.width, 32 * ratio, 'menu-top');


      wall = game.add.tileSprite(0, game.world.height - 192 * ratio, game.world.width, 192 * ratio, 'wall');
      game.physics.arcade.enable(wall);
      wall.body.immovable = true;
      wall.body.moves = false;
      wall.life = 1000;
      platforms.add(wall);
      

      enemies = game.add.group();
      enemies.enableBody = true;
      let enemiesLength = game.world.width / (30 * ratio);
      for (let i = 0; i < enemiesLength; i++) {
        let enemy = enemies.create(i * 30 * ratio, Math.random() * 100 * ratio, 'coin');
        enemy.life = 100;
        enemy.name = 'enemy' + i;

        enemy.animations.add('left', [0, 1, 2, 3, 5, 6, 7], 15, true);
        enemy.animations.play('left');
      }
      

      weapons = game.add.group();
      weapons.enableBody = true;
      weapons.physicsBodyType = Phaser.Physics.ARCADE;

      for (let i = 0; i < weaponsPositions.length; i++) {
        let position = weaponsPositions[i];
        let bullet = game.add.group();
        bullet.enableBody = true;
        bullet.physicsBodyType = Phaser.Physics.ARCADE;

        let bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        for (let j = 0; j < 40; j++) {
          let b = bullets.create(0, 0, 'bullet');
          b.name = 'bullet' + j;
          b.exists = false;
          b.visible = false;
          b.checkWorldBounds = true;
          b.outOfBoundsKill = true;
          b.events.onOutOfBounds.add(function(bullet) {
            bullet.kill();
          }, this);
          b.anchor.setTo(0.5, 0.5);
        }

        let x = position.x;
        let y = game.world.height - 95 * ratio + position.y;

        let base = bullet.create(x, y, 'w-base');
        base.enableBody = true;
        base.name = 'base' + i;
        base.body.immovable = true;
        base.visible = true;
        base.frame = 0;
        base.timer = 0;
        base.anchor.setTo(0.5, 0.5);
        base.animations.add('open', [0, 1, 2, 3, 5, 6], 15, false);
        base.animations.add('close', [6, 5, 4, 3, 2, 1, 0], 15, false);

        let w = bullet.create(x, y, 'w-gun');
        w.enableBody = true;
        w.name = 'weapon' + i;
        w.body.immovable = true;
        w.visible = false;
        w.frame = 0;
        w.timer = 0;
        w.anchor.setTo(0.5, 0.5);
        w.animations.add('open', [0, 1, 2, 3], 15, false);
        w.animations.add('close', [3, 2, 1, 0], 15, false);
        w.animations.add('fire', [4, 5, 3], 15, false);

        // let circle = new Phaser.Circle(x, y, 64);
        // circle.enableBody = true;

        bullet.add(bullets);
        // weapons.add(circle);
        weapons.add(bullet);
      }

      addButton('Open', 20, 20, () => {
        weapons.forEach(weaponGroup => {
          let base = weaponGroup.children[0];
          let weapon = weaponGroup.children[1];
          if (base.frame === 0) {
            base.animations.play('open');
            base.animations.currentAnim.onComplete.add(() => {
              weapon.visible = true;
              weapon.animations.play('open');
            }, this);
          }
        });
      });

      addButton('Close', 120, 20, () => {
        weapons.forEach(weaponGroup => {
          let base = weaponGroup.children[0];
          let weapon = weaponGroup.children[1];
          if (base.frame === 6) {
            weapon.animations.play('close');
            weapon.animations.currentAnim.onComplete.add(() => {
              weapon.visible = false;
              base.animations.play('close');
            }, this);
          }
        });
      });

      let buttonPause = addButton('Pause', 220, 20, () => {
        game.paused = true;
        buttonPause.button.visible = false;
        buttonPause.label.visible = false;

        buttonPlay.button.visible = true;
        buttonPlay.label.visible = true;
      });

      let buttonPlay = addButton('Play', 220, 20, () => {
        game.paused = false;
        buttonPause.button.visible = true;
        buttonPause.label.visible = true;

        buttonPlay.button.visible = false;
        buttonPlay.label.visible = false;
      });

      buttonPlay.button.visible = false;
      buttonPlay.label.visible = false;

      game.input.onDown.add(() => {
        game.paused = false;
        buttonPause.button.visible = true;
        buttonPause.label.visible = true;

        buttonPlay.button.visible = false;
        buttonPlay.label.visible = false;
      }, self);

      console.log(enemies, game, weapons);
    }

    function update() {
      // let hitPlatform = game.physics.arcade.collide(player, platforms);

      game.physics.arcade.collide(enemies, wall, fireWeapon);
      game.physics.arcade.overlap(bulletsArr, enemies, function(bullet, enemy) {
        // console.log(bullet.name);
        bullet.kill();
        enemy.kill();
        enemy.life = 0;
        bulletsArr.splice(bullet, 1);
      }, null, this);

      // game.physics.arcade.overlap(bullets, enemies, function(bullet, enemy) {
        
      // }, null, this);
      
      //  Checks to see if the player overlaps with any of the enemies, if he does call the collectenemy function
      // game.physics.arcade.overlap(player, enemies, collectenemy, null, this);

      // player.body.velocity.x = 0;


      for (let i = 0, len = enemies.children.length; i < len; i++) {
        enemies.children[i].body.velocity.y += Math.round(Math.random() * 5);
      }


      // if (cursors.left.isDown) {
      //   //  Move to the left
      //   player.body.velocity.x = -150;

      //   player.animations.play('left');
      // } else if (cursors.right.isDown) {
      //   //  Move to the right
      //   player.body.velocity.x = 150;

      //   player.animations.play('right');
      // } else {
      //   //  Stand still
      //   player.animations.stop();

      //   player.frame = 4;
      // }

      //  Allow the player to jump if they are touching the ground.
      // if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
      //   player.body.velocity.y = -350;
      // }
    }

    function render() {
      // game.debug.text('CodeCaptain Shooting Demo', 10 * ratio, 30 * ratio);
      // game.debug.text('Click or press space / enter to shoot', 10 * ratio, 55 * ratio);
    }


    // Additional

    function fireWeapon(wall_, enemy) {
      weapons.forEach(function(weaponGroup) {
        // console.log(weaponGroup.children);
        let base = weaponGroup.children[0];
        let weapon = weaponGroup.children[1];
        let bullets = weaponGroup.children[2];
        // console.log(weapon.name);

        let bullet = bullets.getFirstExists(false);
        
        // console.log('collide', enemy);
        if (base.frame === 6 && bullet && game.time.now > weapon.timer && enemy.life) {
          bulletsArr.push(bullet);
          bullet.reset(weapon.x, weapon.y);
          let angle = game.physics.arcade.angleBetween(bullet, enemy);
          // console.log('bullet', angle);
          // bullet.body.velocity.y = -300;
          // bullet.body.velocity.x = -300;
          game.physics.arcade.moveToXY(
            bullet,
            enemy.x + 12 * ratio,
            enemy.y + 12 * ratio,
            500 * ratio
          );

          bullet.rotation = angle + pi / 2;
          weapon.rotation = angle + pi / 2;

          // game.add.tween(bullet).to( { x: enemy.x, y: enemy.y }, 2000, 'Linear');
          weapon.timer = game.time.now + 250 * ratio;
          weapon.animations.play('fire');
          sound.play('gun-shot');
        }
      });
      
    }

    function getFullscreen() {
      if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
      } else {
        game.scale.startFullScreen(false);
      }
    }

    function getWeaponsPositions() {
      let distance8 = width / 9;
      let positions = [];

      for (let i = 0; i < 8; i++) {
        let x = distance8 + i * distance8;
        let y = 0;
        let position = {
          x: x,
          y: y
        };
        positions.push(position);
      }

      for (let i = 0; i < 7; i++) {
        let x = distance8 * 1.5 + i * distance8;
        let y = 50 * ratio;
        let position = {
          x: x,
          y: y
        };
        positions.push(position);
      }

      return positions;
    }

    function addButton(labelText, x, y, callback) {
      let button = game.add.button(
        x * ratio + 48 * ratio,
        y * ratio + 16 * ratio,
        'button',
        callback,
        this,
        2,
        1,
        0
      );
      button.enableBody = true;
      button.anchor.set(0.5);

      let label = game.add.text(
        x * ratio + 48 * ratio,
        y * ratio + 16 * ratio,
        labelText,
        {
          font: 16 * ratio + 'px Arial',
          fill: '#ffffff',
          align: 'center'
        }
      );
      label.anchor.set(0.5);

      return {
        button: button,
        label: label
      }
    }
  }
}