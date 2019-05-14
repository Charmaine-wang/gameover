function create() {
    // make player

    //cursor event
    gameState.cursor = this.input.keyboard.createCursorKeys();
}

function update(){
    //do we need thois?
    //if(gameState.cursor.down.isDown){

    //move right
    if(gameState.cursor.right.isDown){
        gameState.codey.x +=5;
    }

    //move left
    if (gameState.cursor.left.isDown){
        gameState.codey.x -= 5;
    }

    //move up
    if (gameState.cursor.up.isDown) {
        gameState.codey.x -= 5;
    }

}

const config = {

    //gets all the functions
    scene: {
        create,
        update
    }
}

const game = new Phaser.Game(config);