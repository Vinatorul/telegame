import Phaser from 'phaser';

export default class HelloScene extends Phaser.Scene {
  constructor() {
    super('HelloScene');
  }

  preload() {
    // Load assets here
  }

  create() {
    // Create a text object
    this.add.text(
      this.cameras.main.centerX, 
      this.cameras.main.centerY, 
      'Hello Telegram Game!', 
      { 
        font: '64px Arial', 
        fill: '#ffffff' 
      }
    ).setOrigin(0.5);
  }

  update() {
    // Game loop logic here
  }
}
