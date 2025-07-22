import Phaser from 'phaser';
import { createPlayerSprite, createPlayerAnimations } from '../assets/player/player';
import { createPlatformSprite, createMovingPlatformSprite, createBackgroundSprite } from '../assets/environment/platforms';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    const loadingText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Loading...',
      {
        font: '32px Arial',
        fill: '#ffffff'
      }
    ).setOrigin(0.5);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(
      this.cameras.main.width / 4,
      this.cameras.main.centerY + 50,
      this.cameras.main.width / 2,
      30
    );

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        this.cameras.main.width / 4 + 10,
        this.cameras.main.centerY + 60,
        (this.cameras.main.width / 2 - 20) * value,
        10
      );
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    this.load.on('complete', () => {
      createPlayerSprite(this);
      createPlayerAnimations(this);
      
      createPlatformSprite(this);
      createMovingPlatformSprite(this);
      
      createBackgroundSprite(this, this.cameras.main.width, this.cameras.main.height);
    });
  }

  create() {
    console.log('BootScene: Assets loaded');
    
    this.scene.start('GameScene');
  }
}
