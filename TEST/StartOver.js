class StartOver extends Phaser.Scene {
    constructor(){
        super({ key: 'StartOver'})
    }

    create(){
        this.input.on('påointerup', () => {
            gameState.Score = 0;
            this.Scene.restart();
        })
    }
}