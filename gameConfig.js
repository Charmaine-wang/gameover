const gameState = {
    score: 0,
    speed: 240,
    width: 4000,
    height: 640,
}

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 640,
    backgroundColor: "#f57283",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 640
            },
            debug: false
        }
    },
    scene: [StartPlayer, NewGame],
        // type: [Erik, Charmaine]
}

var cos = 0;

const game = new Phaser.Game(config);