import Phaser from 'phaser';

const UP = 1;
const RIGHT = 2;
const LEFT = 3;
const DOWN = 4;

class Snake extends Phaser.GameObjects.Image{
    constructor(scene, x, y, snaketile, snakebody){
        super(scene, x ,y, snaketile, snakebody);
        
        this.snakebody = snakebody

        this.headPosition = {x, y};

        this.body = scene.add.group();

        this.head = this.body.create(x, y, snaketile);
        this.head.setFrame(2);
        this.head.setDepth(1);
        this.end = {x, y};
        
        this.dead = false;

        this.direction = DOWN;
        this.directionHolder = DOWN;

        this.timeToMove = 0;
        this.snakeSpeed = 200;

        console.log("created");

    }

    updateSnake(time){
        if(time >= this.timeToMove)
        {
            return this.moveSnake(time);
        }
    }

    goLeft(){
        if (this.direction === UP || this.direction === DOWN)
            {
                this.directionHolder = LEFT;
            }
    }

    goRight(){
        if (this.direction === UP || this.direction === DOWN)
            {
                this.directionHolder = RIGHT;
            }
    }

    goUp(){
        if (this.direction === LEFT || this.direction === RIGHT)
            {
                this.directionHolder = UP;
            }
    }

    goDown(){
        if (this.direction === LEFT || this.direction === RIGHT)
            {
                this.directionHolder = DOWN;
            }
    }

    moveSnake(time){
        switch(this.directionHolder)
        {
            case LEFT:
                this.head.setFrame(1);
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1*30, 30, 900);
                break;

            case RIGHT:
                this.head.setFrame(3);
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1*30, 30, 900);
                break;

            case UP:
                this.head.setFrame(0);
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1*30, 30, 600);
                break;

            case DOWN:
                this.head.setFrame(2);
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1*30, 30, 600);
                break;
        }

        this.direction = this.directionHolder;

        Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x, this.headPosition.y, 1, this.end);
        
        var collideWithBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);

        if(collideWithBody){
            this.dead = true;
            return false;
        }

        this.timeToMove = time + this.snakeSpeed;

        return true;
    }

    addBody(){
        this.body.create(this.end.x, this.end.y, this.scene.textures.get('snakebody'));
    }

    eatFood(food){
        if(this.head.x === food.x && this.head.y === food.y){
            this.addBody();
            return true;
        } 
        else{
            return false;
        }
    }
    
    eatPoison(poison)
    {
        if(this.head.x === poison.x && this.head.y === poison.y)
        {
            return true;
        }
        else return false;
    }
}

export default Snake;