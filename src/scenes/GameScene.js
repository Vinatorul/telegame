import Phaser from 'phaser';
import Player from '../game/Player';
import Controls from '../game/Controls';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    
    // Game objects
    this.player = null;
    this.controls = null;
    this.platforms = null;
    this.background = null;
    
    // Level config
    this.levelWidth = 2000;
    this.levelHeight = 600;
  }

  create() {
    // Set world bounds
    this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);
    
    // Create background
    this.createBackground();
    
    // Create platforms
    this.createPlatforms();
    
    // Create player
    this.createPlayer();
    
    // Set up camera
    this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);
    this.cameras.main.startFollow(this.player.getSprite(), true, 0.1, 0.1);
    
    // Create controls
    this.controls = new Controls(this, this.player);
    
    // Launch UI scene for touch controls
    this.scene.launch('UIScene', { controls: this.controls });
  }

  update() {
    // Update player
    this.player.update();
    
    // Update controls
    this.controls.update();
  }

  /**
   * Create the background
   */
  createBackground() {
    // Create a tiled background
    this.background = this.add.tileSprite(0, 0, this.levelWidth, this.levelHeight, 'background');
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0.1); // Parallax effect
  }

  /**
   * Create platforms for the level
   */
  createPlatforms() {
    // Create a group for platforms
    this.platforms = this.physics.add.staticGroup();
    
    // Create ground platform
    const groundWidth = this.levelWidth;
    const groundHeight = 32;
    const ground = this.platforms.create(groundWidth / 2, this.levelHeight - groundHeight / 2, 'platform');
    ground.setDisplaySize(groundWidth, groundHeight);
    ground.refreshBody();
    
    // Create some platforms
    this.createPlatform(100, 450, 200, 32);
    this.createPlatform(400, 350, 200, 32);
    this.createPlatform(700, 250, 200, 32);
    this.createPlatform(1000, 350, 200, 32);
    this.createPlatform(1300, 450, 200, 32);
    this.createPlatform(1600, 350, 200, 32);
    this.createPlatform(1900, 250, 200, 32);
    
    // Create some smaller platforms
    this.createPlatform(300, 200, 100, 32);
    this.createPlatform(600, 150, 100, 32);
    this.createPlatform(900, 100, 100, 32);
    this.createPlatform(1200, 200, 100, 32);
    this.createPlatform(1500, 150, 100, 32);
    this.createPlatform(1800, 100, 100, 32);
  }

  /**
   * Helper method to create a platform
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {number} width - Width of platform
   * @param {number} height - Height of platform
   */
  createPlatform(x, y, width, height) {
    const platform = this.platforms.create(x, y, 'platform');
    platform.setDisplaySize(width, height);
    platform.refreshBody();
    return platform;
  }

  /**
   * Create the player character
   */
  createPlayer() {
    // Create player at starting position
    this.player = new Player(this, 100, 450, 'player');
    
    // Add collision with platforms
    this.physics.add.collider(this.player.getSprite(), this.platforms);
  }
}
