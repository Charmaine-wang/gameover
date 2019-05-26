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
              "/assets/andralang.png"
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
    this.load.tilemapTiledJSON("test3", "/assets/test3.json");
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
        key: `1-left`,
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
      const addEnemies = (
        positionX,
        positionY,
        enemyName,
        scale,
        points
      ) => {
        enemieCount++;
        enemies = this.physics.add.group();
        enemies.enableBody = true;
        this.physics.add.collider(enemies, aboveLayer, function(
          collision,
          b
        ) {

          if (collision.body.blocked.left) {
            collision.anims.play(`${enemyName}-right`);
          }
          if (collision.body.blocked.right) {
            collision.anims.play(`${enemyName}-left`);
          }
        });

        for (let y = 0; y < 1; y++) {
          for (let x = 0; x < 1; x++) {
            enemies
              .create(positionX, positionY, enemyName)
              .setScale(scale);
          }
        }

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

          this.physics.add.collider(enemy, dude, function(
            singelEnemy,
            b
          ) {
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

        
          this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.launchTaiFighter
          });
        });
      };

      addEnemies(736, 288, "enemies2", 1.5, 10);
      addEnemies(400, 200, "enemies2", 1.5);
      addEnemies(920, 248, "enemies", 1, 10);
      addEnemies(2000, 248, "enemies", 1, 15);
      addEnemies(2600, 500, "enemies", 1, 15);
      addEnemies(3300, 100, "enemies", 1, 15);
      addEnemies(4000, 348, "enemies", 3, 20);


      addCoins(300, 500, "coins");

      addCoins(300, 600, "coins");
      addCoins(320, 600, "coins");
      addCoins(340, 600, "coins");
      addCoins(360, 600, "coins");
      addCoins(400, 500, "coins");

     

      addCoins(715, 500, "coins");
      addCoins(750, 500, "coins");
      addCoins(785, 500, "coins");

      addCoins(875, 500, "coins");
      addCoins(915, 500, "coins");
      addCoins(945, 500, "coins");

      addCoins(910, 248, "coins");
      addCoins(950, 248, "coins");
      addCoins(970, 248, "coins");
      addCoins(990, 248, "coins");
      addCoins(1010, 248, "coins");
      addCoins(1040, 248, "coins");

      addCoins(1295, 500, "coins");
      addCoins(1225, 500, "coins");
      addCoins(1260, 500, "coins");

      addCoins(1395, 500, "coins");
      addCoins(1425, 500, "coins");
      addCoins(1460, 500, "coins");

      addCoins(1490, 500, "coins");
      addCoins(1520, 500, "coins");
      addCoins(1550, 500, "coins");
      addCoins(1580, 500, "coins");
      addCoins(1610, 500, "coins");
      addCoins(1640, 500, "coins");

      // addCoins(1570, 200, "coins");
      addCoins(1590, 200, "coins");
      addCoins(1620, 200, "coins");
      addCoins(1650, 200, "coins");
      addCoins(1680, 200, "coins");
      addCoins(1710, 200, "coins");
      addCoins(1740, 200, "coins");
      addCoins(1770, 200, "coins");
      addCoins(1800, 200, "coins");
      // addCoins(1830, 200, "coins");
      // addCoins(1860, 200, "coins");
      // addCoins(1890, 200, "coins");

      addCoins(2000, 248, "coins");

      addCoins(2160, 200, "coins");
      addCoins(2190, 200, "coins");
      addCoins(2220, 200, "coins");

      addCoins(2350, 200, "coins");
      addCoins(2380, 200, "coins");
      addCoins(2410, 200, "coins");

      // addCoins(2300, 400, "coins");
      addCoins(2320, 400, "coins");
      addCoins(2350, 400, "coins");
      addCoins(2380, 400, "coins");
      addCoins(2410, 400, "coins");
      addCoins(2440, 350, "coins");


       addCoins(2550, 200, "coins");
       addCoins(2580, 200, "coins");
       addCoins(2610, 200, "coins");
       addCoins(2640, 200, "coins");

      addCoins(2610, 300, "coins");
      addCoins(2640, 300, "coins");
      addCoins(2670, 300, "coins");
      addCoins(2700, 350, "coins");


       addCoins(2770, 100, "coins");
       addCoins(2800, 100, "coins");
       addCoins(2830, 100, "coins");
       addCoins(2860, 100, "coins");
       addCoins(2890, 100, "coins");
       addCoins(2920, 100, "coins");
       addCoins(2950, 100, "coins");
       addCoins(2980, 100, "coins");

       addCoins(2830, 200, "coins");
       addCoins(2860, 200, "coins");
       addCoins(2890, 200, "coins");
       addCoins(2920, 200, "coins");
       addCoins(2950, 200, "coins");

       addCoins(2930, 600, "coins");
       addCoins(2960, 600, "coins");
       addCoins(2990, 600, "coins");

      //  addCoins(3200, 600, "coins");
      //  addCoins(3230, 600, "coins");

       addCoins(3150, 500, "coins");
       addCoins(3180, 500, "coins");

       addCoins(3340, 500, "coins");
       addCoins(3370, 550, "coins");

       addCoins(3380, 100, "coins");

       addCoins(3440, 200, "coins");

       addCoins(3700, 50, "coins");
       addCoins(3730, 50, "coins");
       addCoins(3760, 50, "coins");

       addCoins(3730, 200, "coins");
       addCoins(3760, 200, "coins");
       addCoins(3790, 200, "coins");

       addCoins(3820, 100, "coins");
       addCoins(3850, 100, "coins");
       addCoins(3880, 100, "coins");
        addCoins(4100, 100, "coins"); 
        addCoins(4130, 100, "coins");
       
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
    enemieCount = 0;
          gameState.score = 0;
  }
  }
}
