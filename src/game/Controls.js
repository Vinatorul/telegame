import Phaser from 'phaser';

export default class Controls {
  /**
   * Controls class for handling player input (keyboard and touch)
   * @param {Phaser.Scene} scene - The scene this controls object belongs to
   * @param {Player} player - The player object to control
   */
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    
    // Input state
    this.isLeftDown = false;
    this.isRightDown = false;
    this.isJumpDown = false;
    
    // Set up keyboard controls
    this.setupKeyboard();
    
    // Set up touch controls if on mobile
    this.isMobile = !this.scene.sys.game.device.os.desktop;
    if (this.isMobile) {
      this.setupTouchControls();
    }
  }
  
  /**
   * Set up keyboard controls
   */
  setupKeyboard() {
    // Already set up in Player class
  }
  
  /**
   * Set up touch controls
   */
  setupTouchControls() {
    // Create a UI scene for touch controls
    if (!this.scene.game.scene.getScene('UIScene')) {
      console.warn('UIScene not found. Touch controls will not be created.');
      return;
    }
    
    // The actual touch buttons are created in UIScene
    // This class just handles the logic
  }
  
  /**
   * Update method to be called in the scene's update method
   */
  update() {
    // Update player with touch control state
    this.player.setTouchControls({
      left: this.isLeftDown,
      right: this.isRightDown,
      jump: this.isJumpDown
    });
    
    // Reset jump flag after it's been processed
    this.isJumpDown = false;
  }
  
  /**
   * Handle left button press
   * @param {boolean} isDown - Whether the button is pressed
   */
  setLeftDown(isDown) {
    this.isLeftDown = isDown;
  }
  
  /**
   * Handle right button press
   * @param {boolean} isDown - Whether the button is pressed
   */
  setRightDown(isDown) {
    this.isRightDown = isDown;
  }
  
  /**
   * Handle jump button press
   */
  setJumpDown() {
    this.isJumpDown = true;
  }
}
