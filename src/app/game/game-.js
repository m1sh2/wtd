window.onload = function() {
  var body = document.body,
    html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight, 
            html.clientHeight, html.scrollHeight, html.offsetHeight );

  var width = Math.max( body.scrollWidth, body.offsetWidth, 
            html.clientWidth, html.scrollWidth, html.offsetWidth );

  var game = new Phaser.Game(width, height, Phaser.CANVAS, 'gameplay', {
    preload: preload,
    create: create,
    update: update,
    init: function() {},
    render: render
  });

  WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Montserrat']
    }

  };

  var platforms;
  var player;
  var cursors;
  var stars;
  var cannon;
  var weapons;
  var weaponsNames = {};
  var weaponsPositions = getWeaponsPositions();

  var bullets;
  var bullet;
  var bulletsArr = [];
  var wall;
  var pi = Math.PI;
  var button;

  // canvas.width = myWidth * window.devicePixelRatio;
  // canvas.height = myHeight * window.devicePixelRatio;
  // canvas.style.width = myWidth + "px";
  // canvas.style.height = myHeight + "px";

  function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('bullet', 'assets/bullet.png');

    game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');

    game.load.spritesheet('cannon', 'assets/cannon.png', 64, 64, 8);
    game.load.spritesheet('coin', 'assets/coin.png', 24, 24, 8);
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('wall', 'assets/wall.png', 64, 192, 4);
    game.load.spritesheet('button', 'assets/button.png', 32, 96, 1);

    game.load.script('webfont', '//fonts.googleapis.com/css?family=Montserrat:400,700');
  }

  function create() {

    game.stage.backgroundColor = '#8BC34A';
    
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.minWidth = 320;
    game.scale.minHeight = 240;
    game.scale.maxWidth = 1366;
    game.scale.maxHeight = 768;

    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    // Keep original size
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

    // Maintain aspect ratio
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;


    // game.scale.refresh();
    
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    

    //  A simple background for our game
    // game.add.sprite(0, 0, 'sky');
    // game.add.tileSprite(0, 0, width, height, 'sky');


    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    platforms.enableBody = true;

    wall = game.add.tileSprite(0, game.world.height - 192, width, 192, 'wall');
    game.physics.arcade.enable(wall);
    wall.body.immovable = true;
    wall.body.moves = false;
    wall.life = 1000;
    platforms.add(wall);

    // Here we create the ground.
    // var ground = game.add.tileSprite(0, game.world.height - 64, width, 64, 'ground');
    // game.physics.arcade.enable(ground);
    // ground.body.immovable = true;
    // ground.body.moves = false;
    // var ground = platforms.create(0, game.world.height - 64, 'ground');

    // platforms.add(ground);
    // s.scaleY = 0.5;

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    // ground.body.immovable = true;

    //  Now let's create two ledges
    // var ledge = platforms.create(game.world.width - 400, game.world.height - 250, 'ground');
    // ledge.body.immovable = true;

    // ledge = platforms.create(-150, game.world.height - 300, 'ground');
    // ledge.body.immovable = true;



    // The player and its settings
    // player = game.add.sprite(32, game.world.height - 150, 'dude');
    // //  We need to enable physics on the player
    // game.physics.arcade.enable(player);
    // //  Player physics properties. Give the little guy a slight bounce.
    // player.body.bounce.y = 0.2;
    // player.body.gravity.y = 300;
    // player.body.collideWorldBounds = true;
    // //  Our two animations, walking left and right.
    // player.animations.add('left', [0, 1, 2, 3], 10, true);
    // player.animations.add('right', [5, 6, 7, 8], 10, true);

    // cursors = game.input.keyboard.createCursorKeys();


    //  Finally some stars to collect
    stars = game.add.group();
    stars.enableBody = true;
    //  Here we'll create 12 of them evenly spaced apart
    var starsLength = game.world.width / 30;
    for (var i = 0; i < starsLength; i++) {
      //  Create a star inside of the 'stars' group
      var star = stars.create(i * 30, Math.random() * 100, 'coin');
      star.life = 100;
      star.name = 'star' + i;

      // var coin = game.add.sprite(100, game.world.height - 100, 'coin');
      star.animations.add('left', [0, 1, 2, 3, 5, 6, 7], 15, true);
      star.animations.play('left');
    }



    // cannon
    // cannon = game.add.sprite(100, game.world.height - 450, 'cannon');
    // game.physics.arcade.enable(cannon);
    // cannon.body.immovable = true;
    // cannon.body.moves = false;
    // cannon.frame = 1;
    weapons = game.add.group();
    weapons.enableBody = true;
    weapons.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < weaponsPositions.length; i++) {
      var position = weaponsPositions[i];
      var bullet = game.add.group();
      bullet.enableBody = true;
      bullet.physicsBodyType = Phaser.Physics.ARCADE;

      var bullets = game.add.group();
      bullets.enableBody = true;
      bullets.physicsBodyType = Phaser.Physics.ARCADE;

      for (var j = 0; j < 40; j++) {
        var b = bullets.create(0, 0, 'bullet');
        b.name = 'bullet' + j;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(function(bullet) {
          bullet.kill();
        }, this);
        b.anchor.setTo(0.5, 0.5);
      }

      var x = position.x;
      var y = game.world.height - 95 + position.y;

      var w = bullet.create(x, y, 'cannon');
      w.enableBody = true;
      w.name = 'weapon' + i;
      w.body.immovable = true;
      w.visible = true;
      w.frame = 0;
      w.timer = 0;
      w.anchor.setTo(0.5, 0.5);
      w.animations.add('open', [0, 1, 2, 3, 5, 6, 7], 15, false);
      w.animations.add('close', [7, 6, 5, 4, 3, 2, 1, 0], 15, false);

      // var circle = new Phaser.Circle(x, y, 64);
      // circle.enableBody = true;

      bullet.add(bullets);
      // weapons.add(circle);
      weapons.add(bullet);
    }

    button = game.add.button(game.world.centerX - 95, 400, 'button', function() {
      weapons.forEach(function(weapon_) {
        // console.log(weapon_.children[0]);
        var weapon = weapon_.children[0];
        if (weapon.frame === 0) {
          weapon.animations.play('open');
        }
      });
    }, this, 2, 1, 0);
    button.anchor.set(0.5);

    button = game.add.button(game.world.centerX, 400, 'button', function() {
      weapons.forEach(function(weapon_) {
        // console.log(weapon_.children[0]);
        var weapon = weapon_.children[0];
        if (weapon.frame === 7) {
          weapon.animations.play('close');
        }
      });
    }, this, 2, 1, 0);

    button = game.add.button(game.world.centerX + 95, 400, 'button', function() {
      getFullscreen();
    }, this, 2, 1, 0);
    
    var buttonLabel = game.add.bitmapText(200, 100, 'font', 'Open', 20);
    // buttonLabel.anchor.set(0.5);

    var style = { font: "20px Arial", fill: "#ffffff", align: "left" };
    var text = game.add.text(200, 120, "Open", style);

    style = { font: "20px Montserrat", fill: "#ffffff", align: "left" };
    text = game.add.text(200, 140, "Open", style);
    // text.anchor.setTo(0.5);

    // text.anchor.set(0.5);

    // button = new LabelButton(game, 480, 512, 'button', 'Start game!', function() {
      
    // }, this, 1, 0, 2);

    // button.onInputOver.add(over, this);
    // button.onInputOut.add(out, this);
    // button.onInputUp.add(up, this);

    // bullets = game.add.group();
    // bullets.enableBody = true;
    // bullets.physicsBodyType = Phaser.Physics.ARCADE;

    // for (var i = 0; i < 20; i++) {
    //   var b = bullets.create(0, 0, 'bullet');
    //   b.name = 'bullet' + i;
    //   b.exists = false;
    //   b.visible = false;
    //   b.checkWorldBounds = true;
    //   b.events.onOutOfBounds.add(function(bullet) {
    //     bullet.kill();
    //   }, this);
    // }

    console.log(stars, game, weapons);
  }

  function update() {
    // var hitPlatform = game.physics.arcade.collide(player, platforms);

    game.physics.arcade.collide(stars, wall, fireWeapon);
    game.physics.arcade.overlap(bulletsArr, stars, function(bullet, star) {
      // console.log(bullet.name);
      bullet.kill();
      star.kill();
      star.life = 0;
      bulletsArr.splice(bullet, 1);
    }, null, this);

    // game.physics.arcade.overlap(bullets, stars, function(bullet, star) {
      
    // }, null, this);
    
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // game.physics.arcade.overlap(player, stars, collectStar, null, this);

    // player.body.velocity.x = 0;


    for (var i = 0, len = stars.children.length; i < len; i++) {
      stars.children[i].body.velocity.y += Math.round(Math.random() * 5);
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
    game.debug.text('CodeCaptain Shooting Demo', 10, 30);
    game.debug.text('Click or press space / enter to shoot', 10, 55);
  }


  // Additional

  function fireWeapon(wall_, star) {
    weapons.forEach(function(weapon_) {
      // console.log(weapon_.children[0]);
      var weapon = weapon_.children[0];
      var bullets = weapon_.children[1];
      // console.log(weapon.name);

      var bullet = bullets.getFirstExists(false);
      
      // console.log('collide', star);
      if (weapon.frame === 7 && bullet && game.time.now > weapon.timer && star.life) {
        bulletsArr.push(bullet);
        bullet.reset(weapon.x, weapon.y);
        var angle = game.physics.arcade.angleBetween(bullet, star);
        // console.log('bullet', angle);
        // bullet.body.velocity.y = -300;
        // bullet.body.velocity.x = -300;
        game.physics.arcade.moveToXY(
          bullet,
          star.x + 12,
          star.y + 12,
          300
        );

        bullet.rotation = angle + pi / 2;
        weapon.rotation = angle + pi / 2;

        // game.add.tween(bullet).to( { x: star.x, y: star.y }, 2000, 'Linear');
        weapon.timer = game.time.now + 250;
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
    var distance8 = width / 9;
    var positions = [];

    for (var i = 0; i < 8; i++) {
      var x = distance8 + i * distance8;
      var y = 0;
      var position = {
        x: x,
        y: y
      };
      positions.push(position);
    }

    for (var i = 0; i < 7; i++) {
      var x = distance8 * 1.5 + i * distance8;
      var y = 50;
      var position = {
        x: x,
        y: y
      };
      positions.push(position);
    }

    return positions;
  }

  // function collectStar (player, star) {
    
  //   // Removes the star from the screen
  //   star.kill();
  //   setScore();
  // }

  // function setScore() {
  //   // var scoreElement = document.getElementById('score');
  //   // var scoreCurrent = parseInt(scoreElement.innerText, 10);
  //   // scoreElement.innerText = scoreCurrent + 1;
  // }
};