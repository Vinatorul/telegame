import Phaser from 'phaser';
import Player from '../game/Player';
import Controls from '../game/Controls';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    
    this.player = null;
    this.controls = null;
    this.platforms = null;
    this.background = null;
    
    this.levelWidth = 2000;
    this.levelHeight = 600;
  }

  create() {
    this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);
    
    this.createBackground();
    
    this.createPlatforms();
    
    this.createPlayer();
    
    this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);
    this.cameras.main.startFollow(this.player.getSprite(), true, 0.1, 0.1);
    
    this.controls = new Controls(this, this.player);
    
    this.scene.launch('UIScene', { controls: this.controls });
  }

  update() {
    this.player.update();
    
    this.controls.update();
  }

  createBackground() {
    this.background = this.add.tileSprite(0, 0, this.levelWidth, this.levelHeight, 'background');
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0.1);
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    
    const groundWidth = this.levelWidth;
    const groundHeight = 32;
    const ground = this.platforms.create(groundWidth / 2, this.levelHeight - groundHeight / 2, 'platform');
    ground.setDisplaySize(groundWidth, groundHeight);
    ground.refreshBody();
    
    this.createPlatform(100, 450, 200, 32);
    this.createPlatform(400, 350, 200, 32);
    this.createPlatform(700, 250, 200, 32);
    this.createPlatform(1000, 350, 200, 32);
    this.createPlatform(1300, 450, 200, 32);
    this.createPlatform(1600, 350, 200, 32);
    this.createPlatform(1900, 250, 200, 32);
    
    this.createPlatform(300, 200, 100, 32);
    this.createPlatform(600, 150, 100, 32);
    this.createPlatform(900, 100, 100, 32);
    this.createPlatform(1200, 200, 100, 32);
    this.createPlatform(1500, 150, 100, 32);
    this.createPlatform(1800, 100, 100, 32);
  }

  createPlatform(x, y, width, height) {
    const platform = this.platforms.create(x, y, 'platform');
    platform.setDisplaySize(width, height);
    platform.refreshBody();
    return platform;
  }

  createPlayer() {
    this.player = new Player(this, 100, 450, 'player');
    
    this.physics.add.collider(this.player.getSprite(), this.platforms);
  }
}
