// import Charmaine from './assets/dude.png';
// import { Enemie } from './assets/dude2.png';
// let skyLink = "./assets/sky.png";
// import enemieOne from "./enemieOne";

const gameState = {
    speed: 240,
    ups: 380,
    width: 4000,
    height: 600,
}

let enemies;
let cos = 0;

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    backgroundColor: "#5f2a55",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    //gets all the functions
    scene: {
        preload,    
        create,
        update
    }
}

function preload(){
    this.load.crossOrigin = true;
    this.load.image(
      "sky",
      "/assets/sky2.png"
    );
    this.load.image('ground', '/assets/platform.png');
    this.load.image('star', '/assets/star.png');
    this.load.spritesheet('enemies', './assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    });
    // this.load.image('bomb', '/assets/bomb.png');
    this.load.spritesheet(
      "dude",
      "/assets/dude2.png",
      { frameWidth: 32, frameHeight: 48 }
    );
};


function create() {
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
      this.cameras.main.startFollow(dude);
      gameState.cursor = this.input.keyboard.createCursorKeys();

      // create enemies
      enemies = this.physics.add.group();
      enemies.enableBody = true;
      this.physics.add.collider(enemies, platforms);

      
      for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 2; x++) {
          enemies.create(
            360 + Math.random() * 3740,
            120 + Math.random() * 400,
            "enemies"
          );
        }
      }
      enemies.x = 4000;
      enemies.y = 2050;
      //const firstEnemy = enemies.children.entries[0];
      enemies.children.entries.map(enemy => {
        this.tweens
            .add({
            targets: enemy, 
            
            })
        cos = Math.cos(30);
        enemy.setVelocity(40, 0);
        enemy.setBounce(0.4);
        console.log(enemy)

      });


      //createAnimations() {
      //        this.anims.create({
      //            key: 'run',
      //            frames: this.anims.generateFrameNumbers('codey', {
      //                start: 0,
      //                end: 3
      //            }),
      //            frameRate: 10,
      //            repeat: -1
      //        });
    }       

    }


function update(){
        //do we need thois?
        //if(gameState.cursor.down.isDown){ 
        //move right
        if(gameState.cursor.right.isDown){
            dude.x += 5;
        }
            
        //move left
        if (gameState.cursor.left.isDown){
            dude.x -= 5;
        }

        //move up
        if (gameState.cursor.up.isDown) {
            dude.y -= 5;
        }
        // if (gameState.cursor.down.isDown) {
        //     gameState.dude.y += 5;
        // }
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
}





const game = new Phaser.Game(config);