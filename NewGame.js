let dude;
let platforms;
let cursors;
let map;
let tileset;
let enemies;
let enemies2;

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
    this.load.spritesheet("enemies", "./assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet("enemies2", "./assets/erik3.png", {
      frameWidth: 32,
      frameHeight: 48
    });

    if(this.props.startData === 1){
      this.load.spritesheet("dude", "/assets/erik5.png", {
        frameWidth: 32,
        frameHeight: 48
      });
    }else{
      this.load.spritesheet("dude", "/assets/charre.png", {
        frameWidth: 32,
        frameHeight: 48
      });
    }

    this.load.image("sheet", "./assets/sheet2.png");
    this.load.tilemapTiledJSON("test3", "/assets/test4.json");
  }

  create(startData) {
    if (gameState) {
      const map = this.make.tilemap({
        key: "test3"
      });
      const tileset = map.addTilesetImage("sheet", "sheet");

      const aboveLayer = map.createStaticLayer("layer", tileset, 0, 0);

      aboveLayer.setCollisionByProperty({
        collide: true
      });
      dude = this.physics.add.sprite(16, 284, "dude");
      dude.setBounce(0.4);
      dude.setCollideWorldBounds(true);
      this.physics.add.collider(dude, aboveLayer);

      //player movements
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", {
          start: 0,
          end: 3
        }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20
      });

      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", {
          start: 5,
          end: 8
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
      // create enemies
      const addEnemies = (positionX, positionY, en) => {
        enemies = this.physics.add.group();
        enemies.enableBody = true;
        this.physics.add.collider(enemies, aboveLayer, function(a, b) {
          // enemies.children.entries.map(enemy => {
          //   enemy.body.setCollideWorldBounds(true);
          //   console.log(enemy.body.touching.left);
          // })
            

            if (a.body.blocked.left) {
              a.anims.play(`${en}-right`)
            }
            if (a.body.blocked.right) {
              a.anims.play(`${en}-left`);
            }
        });

        for (let y = 0; y < 1; y++) {
          for (let x = 0; x < 1; x++) {
            enemies.create(positionX, positionY, en);
          }
        }
        enemies.x = 4000;
        enemies.y = 2050;
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


          this.physics.add.collider(enemy, dude, function (singelEnemy) {
            singelEnemy.destroy();
            gameState.score += 10;
            gameState.scoreText.setText(`Score: ${gameState.score}`);
          });

        });
      };

      addEnemies(736, 288, "enemies2");
      addEnemies(400, 200, "enemies2");
      addEnemies(920, 248, "enemies");
      addEnemies(2000, 248, "enemies");
    }
  
  }

  update() {
    if (cursors.left.isDown) {
      dude.setVelocityX(-160);

      dude.anims.play("left", true);
    } else if (cursors.right.isDown) {
      dude.setVelocityX(160);

      dude.anims.play("right", true);
    } else {
      dude.setVelocityX(0);

      dude.anims.play("turn");
    }
    
    if (cursors.up.isDown && dude.body.blocked.down) {
      dude.setVelocityY(-330);
    }
  }
}
