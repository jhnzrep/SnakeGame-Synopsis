import Phaser from 'phaser';
import desert from '../assets/desert.png';
import play from '../assets/playbutton.png';
import speaker from '../assets/speakersprite.png';

class MenuScene extends Phaser.Scene{
    constructor()
    {
        super({
            key:'MenuScene'
        });
    }

    preload(){
        this.load.image('desert', desert);;
        this.load.audio('song','src/assets/Lobo_Loco.mp3');
        this.load.spritesheet('playbutton', play, {frameWidth:255, frameHeight:135});
        this.load.spritesheet('speaker', speaker, {frameWidth:512, frameHeight:512});
    }

    create(){
        this.background = this.add.image(0,0, 'desert').setOrigin(0).setDepth(0);
        this.background.setDisplaySize(900, 600);
        this.music = this.sound.add('song');
        this.music.play();
        //this.add.image(460,150, 'snakemenu').setDepth(1);
        this.createButton();

    }

    createButton(){
        //play button
        this.playButton = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, 'playbutton', 0).setDepth(2);
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
        //mute/unmute button
        this.speakerButton = this.add.sprite(700, 500, 'speaker', 1).setDepth(2);
        this.speakerButton.setDisplaySize(70,70);
        this.speakerButton.setInteractive();

        this.speakerButton.on('pointerup', () => {
            if(this.music.isPlaying){
                this.speakerButton.setFrame(0);
                this.music.pause();
            }
            else{
                this.speakerButton.setFrame(1);
                this.music.resume();
            }
        });
    }
}

export default MenuScene;