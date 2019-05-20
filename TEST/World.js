class World extends Phaser.Scene{
    constructor(){
        super({ key: 'World'})
    }

    preload() {
        this.load.image(
        "sky",
        "/assets/sky2.png"
        );
        this.load.image('ground', '/assets/platform.png');  
    }

    create() {
        if(gameState){
    //Sky
        this.add
        .image(0, 0, "sky")
        .setOrigin(0, 0);

    //platform 
       const platforms = this.physics.add.staticGroup();
        platforms
        .create(400, 568, "ground")
        .setScale(2)
        .refreshBody();
        platforms.create(600, 400, "ground");
        platforms.create(50, 250, "ground");
        platforms.create(750, 220, "ground");
     }
    }
}