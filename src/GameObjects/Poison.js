import Phaser from 'phaser';

class Poison extends Phaser.GameObjects.Image{
    constructor(scene, x, y, poisontile){
        super(scene, x, y, poisontile);
        this.foodImg = scene.add.image(x, y, poisontile);
        this.timeToMove = 0;
    }

    movePoison(time, snake, food){
        let x = Phaser.Math.Between(1, 29);
        let y = Phaser.Math.Between(1, 19);
        
        if(Phaser.Actions.GetFirst(snake.body.getChildren(), { x: x, y: y }) != null)
            return this.movePoison(time, snake, food);
        if(food.x === x && food.y === y) return this.movePoison(time, snake, food);

        this.x = x*30;
        this.y = y*30;

        this.foodImg.x = x*30;
        this.foodImg.y = y*30;

        this.timeToMove = time + 5000;
    }

    updatePoison(time, snake, food)
    {
        if(time >= this.timeToMove)
        {
            return this.movePoison(time, snake, food);
        }
    }
}

export default Poison;