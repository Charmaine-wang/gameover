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
            gravity: { y: 10 },
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

    this.load.image("sky", "sky.png",);
    // this.load.image('ground', 'platform.png');
    // this.load.image('star', 'star.png');
    // this.load.image('bomb', 'bomb.png');
    this.load.spritesheet('dude',
        'dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    // let dude = new Charmaine(this.gameState, 0, 0);
    // dude.loadImage();
};


function create() {
    // make player
    this.add.image(500, 300, "sky");
    this.add.image(500, 400, "star");
    //cursor event
    gameState.cursor = this.input.keyboard.createCursorKeys();
    gameState.dude = this.physics.add.sprite(16, 284, 'dude');
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
    if (gameState.cursor.down.isDown) {
        gameState.dude.y += 5;
    }

}




const game = new Phaser.Game(config);