export class Enemies extends Phaser.GameObjects.Enemies {
        constructor() {
            super({
                key: 'Enemies'
            })
        }

        preload() {
        this.load.spritesheet('enemies', './assets/dude.png', {
        frameWidth: 32,
        frameHeight: 48
        });
        }

        create(){

        // create enemies
        enemies = this.physics.add.group();
        enemies.enableBody = true;
        this.physics.add.collider(enemies, platforms);


        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 2; x++) {
                enemies.create(
                    360 + Math.random() * 3740,
                    120 + Math.random() * 400,
                    "enemies"
                );
            }
        }
        enemies.x = 4000;
        enemies.y = 2050;
        //const firstEnemy = enemies.children.entries[0];
        enemies.children.entries.map(enemy => {
            this.tweens
                .add({
                    targets: enemy,

                })
            cos = Math.cos(30);
            enemy.setVelocity(40, 0);
            enemy.setBounce(0.4);
            console.log(enemy)

        });


        }

    }

