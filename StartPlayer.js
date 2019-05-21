let playerErik;
let playerCharre;

class StartPlayer extends Phaser.Scene {
    constructor(){
        super({ key: 'StartPlayer'},
                {frame: [
                    {key: ['erik',
                          'charre']}
                ]})
    }

    preload(){
    
    this.load.spritesheet("erik", "/assets/erik3.png", {
    frameWidth: 32,
    frameHeight: 48
    });

    this.load.spritesheet("charre", "/assets/charre.png", {
        frameWidth: 32,
        frameHeight: 48
    });
    }
    create(){

    this.add.text(310, 80, 'Choose a player', {
        fill: '#000000',
        fontSize: '40px'
    })

    

    playerErik = this.add.sprite(
        370,
        284,
        "erik",
        this.add.text(335, 400, 'erik', {
            fill: '#000000',
            fontSize: '30px'
        })
    );
       this.anims.create({
           key: "front",
           frames: [{
               key: "erik",
               frame: 4
           }]
       });
    playerErik.setScale(4);
    playerErik.anims.play("front")

 

     playerCharre = this.add.sprite(
         580,
         275,
         "charre",
              this.add.text(500, 400, 'Charmaine', {
                  fill: '#000000',
                  fontSize: '30px'
              })
     );
        this.anims.create({
            key: "front2",
            frames: [{
                key: "charre",
                frame: 4
            }]
        });
     playerCharre.setScale(5)
    playerCharre.anims.play("front2")


        this.input.on('pointerdown', () => {

            this.scene.stop('StartPlayer')
            this.scene.start('NewGame', {
                startData: "2"
            })

            })
     
    }
}




