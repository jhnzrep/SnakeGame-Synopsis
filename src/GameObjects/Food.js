import Phaser from 'phaser';

class Food extends Phaser.GameObjects.Image{
    constructor(scene, x, y, foodtile){
        super(scene, x, y, foodtile);

        this.foodImg = scene.add.image(x, y, foodtile);
    }

    getEaten(snake, poison){
        var x = Phaser.Math.Between(1, 29);
        var y = Phaser.Math.Between(1, 19);

        if(Phaser.Actions.GetFirst(snake.body.getChildren(), { x: x, y: y }) != null)
            return this.getEaten(snake, poison);
        if(poison.x === x && poison.y === y) return this.getEaten(snake, food);
        
        this.x = x*30;
        this.y = y*30;

        this.foodImg.x = x*30;
        this.foodImg.y = y*30;

    }
}

export default Food;