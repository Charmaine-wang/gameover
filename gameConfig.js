const gameState = {
    score: 0,
    speed: 240,
    width: 4125,
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
            gravity: {
                y: 600
            },
            debug: false
        }
    },
    scene: [NewGame]
    
}

const game = new Phaser.Game(config);