// import Charmaine from './assets/dude.png';
// var skyLink = "./assets/sky.png";

const gameState = {
    speed: 240,
    ups: 380,
    width: 4000,
    height: 600,
}


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
        update,
        render
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
                    // this.load.image('bomb', '/assets/bomb.png');
                    this.load.spritesheet(
                      "dude",
                      "/assets/dude2.png",
                      { frameWidth: 32, frameHeight: 48 }
                    );
                  };


function create() {
    if(gameState) {

        // make map
        this.add
        .image(0, 0, "sky")
        .setOrigin(0, 0);
        this.add.image(500, 400, "star");

        //make ground
        platforms = this.physics.add.staticGroup();
        
        platforms
        .create(400, 568, "ground")
        .setScale(2)
        .refreshBody();
        platforms.create(600, 400, "ground");
        platforms.create(50, 250, "ground");
        platforms.create(750, 220, "ground");
        
        // make player
        dude = this.physics.add.sprite(16, 284, "dude");
        dude.setBounce(0.4);
        dude.setCollideWorldBounds(true);
        this.physics.add.collider(dude, platforms);

        dude.body.fixedRotation = true;


        // this.bg.setScrollFactor(0);
        // this.createAnimations();

         this.cameras.main.setBounds(0, 0, gameState.width, gameState.height)
         this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
         this.cameras.main.startFollow(dude, true, 0.5, 0.5);
        // gameState.dude.anchor.setTo(0.5, 0.5);                 
        // gameState.camera.bounds = (608, 400);
        // Try to add Camer that follws player
        // this.cameras.main.startFollow(this.dude);
        // this.cameras.main.roundPixels = true;
        //cursor event
            
            gameState.cursor = this.input.keyboard.createCursorKeys();


            //   createAnimations() {
            //           this.anims.create({
            //               key: 'run',
            //               frames: this.anims.generateFrameNumbers('codey', {
            //                   start: 0,
            //                   end: 3
            //               }),
            //               frameRate: 10,
            //               repeat: -1
            //           });
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

function render() {
  game.debug.cameraInfo(game.camera, 32, 32);
  game.debug.spriteCoords(dude, 32, 500);
}




const game = new Phaser.Game(config);