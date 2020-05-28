import Phaser from "phaser";
import snaketile from "../assets/snaketilespritewhite.png";
import backgroundtile from "../assets/background.png";
import Snake from '../GameObjects/Snake';
import Food from '../GameObjects/Food';
import Poison from '../GameObjects/Poison';
import foodtile from '../assets/food.png';
import snakebody from "../assets/snaketile1.png";
import poisontile from '../assets/poison.png';




class MainScene extends Phaser.Scene{
    constructor()
    {
        super({
            key:'MainScene'
        });
    }

    preload() {
        this.load.spritesheet('snaketile', snaketile, {frameWidth:30, frameHeight:30});
        this.load.image('backgroundtile', backgroundtile);
        this.load.image('foodtile', foodtile);
        this.load.image('snakebody', snakebody);
        this.load.image('poisontile', poisontile);
        this.background = this.add.group();
    }

    create() {
        this.createBackground();

        this.snake = new Snake(this, 10 * 30, 8 * 30, 'snaketile', 'snakebody');
        this.food = new Food(this, Phaser.Math.Between(1,29)*30, Phaser.Math.Between(1, 19)*30, 'foodtile');
        this.poison = new Poison(this, Phaser.Math.Between(1,29)*30, Phaser.Math.Between(1, 19)*30,'poisontile');

        this.cursors = this.input.keyboard.createCursorKeys();

        this.score = 0;

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    } 

    update(time, delta)
    {    
        if(this.snake.dead){
            this.game.score = this.score;
            if(this.pausetime == null) this.pausetime = time;
            if(time >= this.pausetime + 1500){
                this.scene.start('GameOverMenu');
            }
            return;
        };

        this.getInput();

       this.poison.updatePoison(time, this.snake, this.food);

        if(this.snake.updateSnake(time)){
            if(this.snake.eatFood(this.food)){
                this.food.getEaten(this.snake, this.poison);
                this.score++;
                this.scoreText.setText('Score: ' + this.score);
            }
            if(this.snake.eatPoison(this.poison))
            {
                this.snake.dead = true;
                return;
            }
        }
    }


    createBackground(){
        for(var i = 0; i < 60; i++){
            for(var j = 0; j < 40; j++){
                var image = this.add.sprite(i * 30 , j * 30, 'backgroundtile');
                image.displayHeight = 30;
                image.displayWidth = 30;
                this.background.add(image);
            }
        }
    }

    getInput(){
        if(this.cursors.up.isDown)
        {
            this.snake.goUp();
            console.log("up");
        }
        else if(this.cursors.down.isDown)
        {
            this.snake.goDown();
            console.log("down");
        }
        else if(this.cursors.left.isDown)
        {
            this.snake.goLeft();
        }
        else if(this.cursors.right.isDown)
        {
            this.snake.goRight();
        }
    }
}

 export default MainScene;