// import Charmaine from './assets/dude.png';
const gameState = {}


function preload(){
    this.load.spritesheet('dude',
        './assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    )
    // let dude = new Charmaine(this.gameState, 0, 0);
    // dude.loadImage();
};



function create() {
    // make player

    //cursor event
    gameState.cursor = this.input.keyboard.createCursorKeys();
    gameState.dude = this.add.sprite(16, 284, 'dude');
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

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    backgroundColor: "#5f2a55",
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //     gravity: { y: 300 },
    //     debug: false
    //     },
    //gets all the functions
    scene: {
        create,
        update
    }
}
// }

const game = new Phaser.Game(config);