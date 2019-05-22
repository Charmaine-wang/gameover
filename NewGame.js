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
    this.data = data;
  }

  preload() {
    if (this.data){
      
    }
    console.log(this.data)
    this.load.crossOrigin = true;
    this.load.spritesheet("enemies", "./assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet("enemies2", "./assets/erik3.png", {
      frameWidth: 32,
      frameHeight: 48
    });

    if(this.data.startData === 1){
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

      dude.body.fixedRotation = true;

      this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
      this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
      this.cameras.main.startFollow(dude, true, 0.5, 0.5);

      cursors = this.input.keyboard.createCursorKeys();
      // create enemies
      const addEnemies = (positionX, positionY, en) => {
        enemies = this.physics.add.group();
        enemies.enableBody = true;
        this.physics.add.collider(enemies, aboveLayer);

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

          gameState.scoreText = this.add.text(30, 0, "Score: ", {
            fontSize: "15px",
            fill: "#000000"
          });

          this.physics.add.collider(enemy, dude, function(singelEnemy) {
            singelEnemy.destroy();
            gameState.score += 10;
            gameState.scoreText.setText(`Score: ${gameState.score}`);
          });

          this.anims.create({
            key: 'taiLeft',
            frames: this.anims.generateFrameNumbers(en, { start: 3, end: 0 }),
            frameRate: 10,
            repeat: 0
          })
          //center
          this.anims.create({
            key: 'taiCenter',
            frames: this.anims.generateFrameNumbers(en, { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 1
          })
          //right
          this.anims.create({
            key: 'taiRight',
            frames: this.anims.generateFrameNumbers(en, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: 0
          })
          this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.launchTaiFighter
          })﻿


        });
      };

      addEnemies(736, 288, "enemies");
      addEnemies(400, 200, "enemies2");
      addEnemies(920, 248, "enemies");
      addEnemies(2000, 248, "enemies");
    }

    //SCORE
    // gameState.scoreText = this.add.text(30, 0, 'Score: 0', {
    //   fontSize: '15px',
    //   fill: '#000000'
    // });

    // this.physics.add.collider(dude, enemies, function (singelEnemy) {

    // singelEnemy.ignoreDestroy = false;
    // //  singelEnemy.destroy(singelEnsemy);
    // singelEnemy.setActive(false).setVisible(false)
    // dude.setActive(true).setVisible(true)
    // // enemies.killAndHide(singelEnemy)
    //   console.log(singelEnemy)
    //   // Add your code below:

    //   // if (dude.setBounce(0.4)){
    //   gameState.score += 10;
    //   gameState.scoreText.setText(`Score: ${gameState.score}`);
    // })
    // };
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

  render() {
    game.debug.cameraInfo(game.camera, 36, 36);
    game.debug.spriteCoords(dude, 36, 500);
  }
}
