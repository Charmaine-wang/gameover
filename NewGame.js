let dude;
let platforms;


class NewGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'NewGame'
        })
    }


    preload() {
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
            "/assets/dude2.png", {
                frameWidth: 32,
                frameHeight: 48
            }
        );
    };


    create() {
        if (gameState) {

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


            this.cameras.main.setBounds(0, 0, gameState.width, gameState.height)
            this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
            this.cameras.main.startFollow(dude, true, 0.5, 0.5);
    

            gameState.cursor = this.input.keyboard.createCursorKeys();

        }

    }
    update() {

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

    render() {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(dude, 32, 500);
    }

}
