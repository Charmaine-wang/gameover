// import Charmaine from './assets/dude.png';
// var skyLink = "./assets/sky.png";

const gameState = {}


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
                    // this.load.image('bomb', '/assets/bomb.png');
                    this.load.spritesheet(
                      "dude",
                      "/assets/dude.png",
                      { frameWidth: 32, frameHeight: 48 }
                    );

                  };


function create() {
    // make map
    this.add.image(0, 0, "sky").setOrigin(0, 0);
    this.add.image(500, 400, "star");


    //make ground
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // make player
    gameState.dude = this.physics.add.sprite(16, 284, 'dude');
    gameState.dude.setBounce(0.4);
    gameState.dude.setCollideWorldBounds(true);
    this.physics.add.collider(gameState.dude, platforms);

    //cursor event
    gameState.cursor = this.input.keyboard.createCursorKeys();

}

function update(){
    //do we need thois?
    //if(gameState.cursor.down.isDown){

    //move right
    if(gameState.cursor.right.isDown){
        gameState.dude.x += 5;
    }

    //move left
    if (gameState.cursor.left.isDown){
        gameState.dude.x -= 5;
    }

    //move up
    if (gameState.cursor.up.isDown) {
        gameState.dude.y -= 5;
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