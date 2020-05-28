import Phaser from "phaser";
import MainScene from "./Scenes/MainScene";
import MenuScene from './Scenes/MenuScene';
import GameOverMenu from './Scenes/GameOverMenu';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 900,
  height: 600,
};

const game = new Phaser.Game(config);
game.scene.add('MenuScene', MenuScene);
game.scene.add('MainScene', MainScene);
game.scene.add('GameOverMenu', GameOverMenu);
game.scene.start('MenuScene');

