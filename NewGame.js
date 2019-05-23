let dude;
let platforms;
let cursors;
let map;
let tileset;
let enemies;
let enemies2;
let enemieCount = 0;
let coins;
let killPlayer = false;

class NewGame extends Phaser.Scene {
  constructor() {
    super({
      key: "NewGame"
    });
  }
  init(data) {
    this.props = data;
  }

  preload() {
    this.load.crossOrigin = true;

            this.load.image(
              "house",
              "/assets/house.png"
            );
            

    this.load.spritesheet("enemies", "./assets/bouncer.png", {
      frameWidth: 32,
      frameHeight: 48
    });

    this.load.spritesheet("enemies2", "./assets/bouncer.png", {
      frameWidth: 32,
      frameHeight: 48
    });


      this.load.spritesheet("erik", "/assets/erik6.png", {
        frameWidth: 32,
        frameHeight: 48
      });

     this.load.spritesheet("charre", "/assets/charre.png", {
       frameWidth: 32,
       frameHeight: 48
     });
           

    this.load.spritesheet("coins", "/assets/coin_spritesheet.png", {
      frameWidth: 22,
      frameHeight: 22
    });

    this.load.image("sheet2", "./assets/warTileset_32x32.png");
    this.load.tilemapTiledJSON("test3", "/assets/test5.json");
  }

  create(startData) {
    if (gameState) {

this.add
  .image(0, -80, "house")
  .setOrigin(0, 0);

      const map = this.make.tilemap({
        key: "test3"
      });
      const tileset = map.addTilesetImage("sheet2", "sheet2");

      const aboveLayer = map.createStaticLayer("layer", tileset, 0, 0);

      aboveLayer.setCollisionByProperty({
        collide: true
      });

    
      this.character = startData.startData;

      if (this.character === 1) {
        dude = this.physics.add.sprite(16, 284, "erik");
      } else {
        dude = this.physics.add.sprite(16, 284, "charre");
      }

      dude.setBounce(0.4);
      dude.setCollideWorldBounds(true);
      this.physics.add.collider(dude, aboveLayer);

      //player movements
      this.anims.create({
        key: `2-left`,
        frames: this.anims.generateFrameNumbers("charre", {
          start: 0,
          end: 3
        }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: `2-turn`,
        frames: [{ key: "charre", frame: 4 }],
        frameRate: 20
      });

      this.anims.create({
        key: `2-right`,
        frames: this.anims.generateFrameNumbers("charre", {
          start: 5,
          end: 8
        }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: `1}-left`,
        frames: this.anims.generateFrameNumbers("erik", {
          start: 0,
          end: 3
        }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: `1-turn`,
        frames: [{ key: "erik", frame: 4 }],
        frameRate: 20
      });

      this.anims.create({
        key: `1-right`,
        frames: this.anims.generateFrameNumbers("erik", {
          start: 5,
          end: 8
        }),
        frameRate: 10,
        repeat: -1
      });

      //coins movement

      this.anims.create({
        key: "coin",
        frames: this.anims.generateFrameNumbers("coins", {
          start: 0,
          end: 3
        }),
        frameRate: 10,
        repeat: -1
      });

      //enemy one movements
      this.anims.create({
        key: "enemies-left",
        frames: this.anims.generateFrameNumbers("enemies", {
          start: 0,
          end: 3
        }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: "enemies-turn",
        frames: [{ key: "enemies", frame: 4 }],
        frameRate: 20
      });

      this.anims.create({
        key: "enemies-right",
        frames: this.anims.generateFrameNumbers("enemies", {
          start: 5,
          end: 8
        }),
        frameRate: 10,
        repeat: -1
      });

      //enemy two movements
      this.anims.create({
        key: "enemies2-left",
        frames: this.anims.generateFrameNumbers("enemies2", {
          start: 0,
          end: 3
        }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: "enemies2-turn",
        frames: [{ key: "enemies2", frame: 4 }],
        frameRate: 20
      });

      this.anims.create({
        key: "enemies2-right",
        frames: this.anims.generateFrameNumbers("enemies2", {
          start: 5,
          end: 8
        }),
        frameRate: 10,
        repeat: -1
      });

      dude.body.fixedRotation = true;
      this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
      this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
      this.cameras.main.startFollow(dude, true, 0.5, 0.5);

      cursors = this.input.keyboard.createCursorKeys();

      //create coins

      const addCoins = (positionX, positionY, coin) => {
        coins = this.physics.add.group();
        coins.enableBody = true;

        // coins.anims.play("coin")

        this.physics.add.collider(coins, aboveLayer);
        for (let y = 0; y < 1; y++) {
          for (let x = 0; x < 1; x++) {
            coins.create(positionX, positionY, coin);
          }
        }
        coins.children.entries.map(coin => {
          this.tweens.add({
            targets: coin
          });
          coin.anims.play("coin");
          gameState.scoreText.setScrollFactor(0);

          this.physics.add.collider(coin, dude, function(singelCoin) {
            singelCoin.destroy();
            gameState.score += 5;
            gameState.scoreText.setText(`Score: ${gameState.score}`);
          });
        });
      };
      //end of coins

      // create enemies
      const addEnemies = (positionX, positionY, en, scale) => {
        enemieCount++;
        enemies = this.physics.add.group();
        enemies.enableBody = true;
        this.physics.add.collider(enemies, aboveLayer, function(a, b) {
          // enemies.children.entries.map(enemy => {
          //   enemy.body.setCollideWorldBounds(true);
          //   console.log(enemy.body.touching.left);
          // })

          if (a.body.blocked.left) {
            a.anims.play(`${en}-right`);
          }
          if (a.body.blocked.right) {
            a.anims.play(`${en}-left`);
          }
        });

        for (let y = 0; y < 1; y++) {
          for (let x = 0; x < 1; x++) {
            enemies.create(positionX, positionY, en).setScale(scale);
          }
        }
        // enemies.x = 4000;
        // enemies.y = 2050;
        enemies.children.entries.map(enemy => {
          this.tweens.add({
            targets: enemy
          });
          cos = Math.cos(30);

          enemy.setVelocity(40, 1);
          enemy.setBounce(1, 0.2);
          enemy.body.setCollideWorldBounds(true);

          gameState.scoreText = this.add.text(30, 0, "Score: ", {
            fontSize: "15px",
            fill: "#000000"
          });
          gameState.scoreText.setScrollFactor(0);

          this.physics.add.collider(enemy, dude, function(singelEnemy, b) {
            console.log(singelEnemy.body.touching);
            console.log(dude);
            if (
              singelEnemy.body.touching.left ||
              singelEnemy.body.touching.right
            ) {
              killPlayer = true;
            } else {
              singelEnemy.destroy();
              enemieCount--;
            }

            gameState.score += 10;
            gameState.scoreText.setText(`Score: ${gameState.score}`);
          });

          this.anims.create({
            key: "taiLeft",
            frames: this.anims.generateFrameNumbers(en, { start: 3, end: 0 }),
            frameRate: 10,
            repeat: 0
          });
          //center
          this.anims.create({
            key: "taiCenter",
            frames: this.anims.generateFrameNumbers(en, { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 1
          });
          //right
          this.anims.create({
            key: "taiRight",
            frames: this.anims.generateFrameNumbers(en, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: 0
          });
          this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.launchTaiFighter
          });
        });
      };

      addEnemies(736, 288, "enemies2", 1.5);
      // addEnemies(400, 200, "enemies2", 1.5);
      // addEnemies(920, 248, "enemies");
      // addEnemies(2000, 248, "enemies");


      addCoins(400, 500, "coins");
      addCoins(736, 288, "coins");
      addCoins(920, 248, "coins");
      addCoins(2000, 248, "coins");
    }
  }
  

  update() {
    if (cursors.left.isDown) {
      dude.setVelocityX(-160);
      dude.anims.play(`${this.character}-left`, true);
      
    } else if (cursors.right.isDown) {
      dude.setVelocityX(160);

      dude.anims.play(`${this.character}-right`, true);
    } else {
      dude.setVelocityX(0);

      dude.anims.play(`${this.character}-turn`);
    }
    if (cursors.up.isDown && dude.body.blocked.down) {
      dude.setVelocityY(-330);
    }

      // console.log(this.props.startData);
      // console.log(enemieCount);
    
    if(enemieCount === 0 ) {
      
      this.add.text(310, 80, "You Won", {
        fill: "#000000",
        fontSize: "40px"
      });
      console.log("text");
      setTimeout(
         (a) => {
          console.log(a)
          this.scene.stop("NewGame"),
          this.scene.start("StartPlayer")
          enemieCount = 0;
          gameState.score = 0;
          this.props.startData = 0;
        },
        3000
        );
  }
    if(killPlayer) {
    killPlayer = false;
    this.scene.restart();
  }
  }
}
