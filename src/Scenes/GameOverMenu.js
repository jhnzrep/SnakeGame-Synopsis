import Phaser from "phaser";
import desert from '../assets/desert.png';
import playagain from '../assets/playagain.png';

class GameOverMenu extends Phaser.Scene {
    constructor()
    {
        super({
            key:'GameOverMenu'
        });
    }

    preload() {
        this.load.image('desert', desert);
        this.load.spritesheet('playagain', playagain, {frameWidth:440, frameHeight:100});
    }

    create(){
        this.background = this.add.image(0,0, 'desert').setOrigin(0).setDepth(0);
        this.background.setDisplaySize(900, 600);

        this.createButtons();

        this.scoreText = this.add.text(270, 230, 'Score: ' + this.game.score, { fontSize: '72px', fill: '#000' }).setOrigin(0);
    }

    createButtons(){
        this.playButton = this.add.sprite(this.game.renderer.width / 2, 350, 'playagain', 0);
        this.playButton.setInteractive();
        this.playButton.on('pointerover', () => {
            this.playButton.setFrame(1);
        })

        this.playButton.on('pointerout', () => {
            this.playButton.setFrame(0);
        })

        this.playButton.on('pointerup', () => {
            this.scene.start('MainScene');
        });

        

    }
}

export default GameOverMenu;