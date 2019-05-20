class Score extends Phaser.Scene{
    constructor() {
        super({ key: 'Score'})
    }
    create() {
      gameState.scoreText = this.add.text(195, 485, 'Score: 0', {
          fontSize: '15px',
          fill: '#000000'
      });
      this.physics.add.collider(bugs, platforms, function (bug) {
          bug.destroy();
          // Add your code below:
          gameState.score += 10;
          gameState.scoreText.setText(`Score: ${gameState.score}`);
      });
    }

}