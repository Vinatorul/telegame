import Phaser from 'phaser';
import TouchManager from '../game/TouchManager';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
    
    // References to controls and player
    this.controls = null;
    
    // Touch buttons
    this.leftButton = null;
    this.rightButton = null;
    this.jumpButton = null;
    
    // Touch manager
    this.touchManager = null;
  }

  init(data) {
    // Get reference to controls from data
    this.controls = data.controls;
  }

  create() {
    // Only create touch controls on mobile devices
    if (!this.sys.game.device.os.desktop) {
      this.createTouchControls();
    }
  }

  /**
   * Create touch controls for mobile devices
   */
  createTouchControls() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Create semi-transparent buttons
    const buttonAlpha = 0.5;
    const buttonSize = 80;
    
    // Create left movement button (left side of screen)
    this.leftButton = this.add.circle(
      buttonSize,
      height - buttonSize,
      buttonSize / 2,
      0x0000ff,
      buttonAlpha
    );
    this.leftButton.setInteractive();
    this.leftButton.setScrollFactor(0);
    
    // Add left arrow icon
    const leftArrow = this.add.triangle(
      buttonSize,
      height - buttonSize,
      -15, 0,
      15, -20,
      15, 20,
      0xffffff
    );
    leftArrow.setScrollFactor(0);
    
    // Create right movement button (left-center of screen)
    this.rightButton = this.add.circle(
      buttonSize * 3,
      height - buttonSize,
      buttonSize / 2,
      0x0000ff,
      buttonAlpha
    );
    this.rightButton.setInteractive();
    this.rightButton.setScrollFactor(0);
    
    // Add right arrow icon
    const rightArrow = this.add.triangle(
      buttonSize * 3,
      height - buttonSize,
      15, 0,
      -15, -20,
      -15, 20,
      0xffffff
    );
    rightArrow.setScrollFactor(0);
    
    // Create jump button (right side of screen)
    this.jumpButton = this.add.circle(
      width - buttonSize,
      height - buttonSize,
      buttonSize / 2,
      0xff0000,
      buttonAlpha
    );
    this.jumpButton.setInteractive();
    this.jumpButton.setScrollFactor(0);
    
    // Add jump icon
    const jumpIcon = this.add.text(
      width - buttonSize,
      height - buttonSize,
      'JUMP',
      {
        font: '16px Arial',
        fill: '#ffffff'
      }
    ).setOrigin(0.5);
    jumpIcon.setScrollFactor(0);
    
    // Initialize touch manager
    this.initTouchManager();
  }

  /**
   * Initialize the touch manager
   */
  initTouchManager() {
    if (!this.controls) {
      console.warn('Controls not set in UIScene');
      return;
    }
    
    // Create touch manager
    this.touchManager = new TouchManager(this, this.controls);
    
    // Set control zones
    this.touchManager.setControlZones({
      left: new Phaser.Geom.Circle(
        this.leftButton.x,
        this.leftButton.y,
        this.leftButton.radius
      ),
      right: new Phaser.Geom.Circle(
        this.rightButton.x,
        this.rightButton.y,
        this.rightButton.radius
      ),
      jump: new Phaser.Geom.Circle(
        this.jumpButton.x,
        this.jumpButton.y,
        this.jumpButton.radius
      )
    });
  }
  
  /**
   * Update method called by the scene manager on each frame
   */
  update() {
    // Update touch manager if it exists
    if (this.touchManager) {
      this.touchManager.update();
    }
  }
}
