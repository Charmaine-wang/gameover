let dude;
let platforms;

class NewGame extends Phaser.Scene {
  constructor() {
    super({
      key: "NewGame"
    });
  }

  preload() {
    this.load.crossOrigin = true;
    this.load.image("sky", "/assets/sky2.png");
    this.load.image("ground", "/assets/platform.png");
    this.load.image("star", "/assets/star.png");
    this.load.spritesheet("enemies", "./assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
    // this.load.image('bomb', '/assets/bomb.png');
    this.load.spritesheet("dude", "/assets/dude2.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    if (gameState) {
      // make map
      this.add.image(0, 0, "sky").setOrigin(0, 0);
      this.add.image(500, 400, "star");
      //make ground
      platforms = this.physics.add.staticGroup();
      platforms
        .create(400, 568, "ground")
        .setScale(18, 1)
        .refreshBody();
      platforms.create(0, 540, "ground");
      platforms.create(3900, 540, "ground");
      platforms.create(2900, 540, "ground");
      platforms.create(1900, 540, "ground");
      platforms.create(3400, 540, "ground");
      platforms.create(2400, 540, "ground");
      platforms.create(1400, 540, "ground");
      platforms.create(600, 400, "ground");
      platforms.create(50, 250, "ground");
      platforms.create(1050, 270, "ground");
      platforms.create(2050, 370, "ground");
      platforms.create(3050, 270, "ground");
      platforms.create(1250, 320, "ground");
      platforms.create(2250, 320, "ground");
      platforms.create(3250, 420, "ground");
      platforms.create(750, 220, "ground");
      platforms.create(1750, 220, "ground");
      platforms.create(2750, 320, "ground");
      platforms.create(3750, 220, "ground");
      // make player
      dude = this.physics.add.sprite(16, 284, "dude");
      dude.setBounce(0.4);
      dude.setCollideWorldBounds(true);
      this.physics.add.collider(dude, platforms);
      dude.body.fixedRotation = true;
      this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
      this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
      this.cameras.main.startFollow(dude, true, 0.5, 0.5);
      // this.cameras.main.startFollow(gameState.scoreText, true, 0.5, 0.5);

      gameState.cursor = this.input.keyboard.createCursorKeys();

      // create enemies
      const enemiestest = (positionX, positionY) => {
        enemies = this.physics.add.group();
        enemies.enableBody = true;
        this.physics.add.collider(enemies, platforms);
        // this.physics.add.collider(dude, enemies);

        for (let y = 0; y < 1; y++) {
          for (let x = 0; x < 1; x++) {
            enemies.create(positionX, positionY, "enemies");
          }
        }
        enemies.x = 4000;
        enemies.y = 2050;
        //const firstEnemy = enemies.children.entries[0];
        enemies.children.entries.map(enemy => {
          this.tweens.add({
            targets: enemy
          });
          cos = Math.cos(30);
          enemy.setVelocity(40, 0);
          enemy.setBounce(0.4);
          console.log(enemy);

                gameState.scoreText = this.add.text(30, 0, 'Score: ', {
                  fontSize: '15px',
                  fill: '#000000'
                });

                this.physics.add.collider(enemy, dude, function (singelEnemy) {
                   singelEnemy.destroy();
                  // enemies.killAndHide(singelEnemy)
                  console.log(singelEnemy)
                  // Add your code below:

                  // if (dude.setBounce(0.4)){
                  gameState.score += 10;
                  gameState.scoreText.setText(`Score: ${gameState.score}`);
                })
        });
      };

      enemiestest(200, 200);
      enemiestest(400, 200);
      enemiestest(200, 400);
    }

  }


  update() {
    if (gameState.cursor.right.isDown) {
      dude.x += 5;
    }

    //move left
    if (gameState.cursor.left.isDown) {
      dude.x -= 5;
    }

    //move up
    if (gameState.cursor.up.isDown) {
      dude.y -= 5;
    }

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
  }

 

  render() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(dude, 32, 500);
  }
}
