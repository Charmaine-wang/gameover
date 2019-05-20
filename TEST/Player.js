class Player extends Phaser.Scene {
    constructor(){
        super({ key: 'Player'})
    }
    preload(){
        this.load.spritesheet(
            "dude",
            "/assets/dude2.png", {
                frameWidth: 32,
                frameHeight: 48
            }
        );
    }

    create(){
            // make player
            console.log("lalalalala")
            const dude = this.physics.add.sprite(16, 284, "dude");
            console.log(dude)
            dude.setBounce(0.4);
            dude.setCollideWorldBounds(true);
            this.physics.add.collider(dude, platforms);
    
            dude.body.fixedRotation = true;
    
            this.cameras.main.setBounds(0, 0, gameState.width, gameState.height)
            this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
            this.cameras.main.startFollow(dude, true, 0.5, 0.5);
     
            gameState.cursor = this.input.keyboard.createCursorKeys();
    

    }

    update(){
      
        //move right
        if (gameState.cursor.right.isDown) {
            dude.x += 5;
        }
        //move left
        if (gameState.cursor.left.isDown) {
            dude.x -= 5;
        }
        //move up
        if (gameState.cursor.up.isDown) {
            dude.y -= 5;
        }
        // if (gameState.cursor.down.isDown) {
        //     gameState.dude.y += 5;
        // }

        //for the camera?
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
    }
    

    
}