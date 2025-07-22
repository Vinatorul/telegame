import Phaser from 'phaser';

export default class Player {
  /**
   * Player class for handling player character logic
   * @param {Phaser.Scene} scene - The scene this player belongs to
   * @param {number} x - Initial x position
   * @param {number} y - Initial y position
   * @param {string} texture - The texture key to use for the player sprite
   */
  constructor(scene, x, y, texture) {
    this.scene = scene;
    
    // Create the player sprite
    this.sprite = scene.physics.add.sprite(x, y, texture);
    this.sprite.setCollideWorldBounds(true);
    
    // Set up physics body
    this.sprite.body.setSize(28, 60); // Slightly smaller than the sprite for better collision
    this.sprite.body.setOffset(2, 4);
    
    // Movement parameters
    this.speed = 200;
    this.jumpForce = 400;
    this.isJumping = false;
    this.isFalling = false;
    this.direction = 'right'; // 'left' or 'right'
    
    // Input handling
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.wasd = {
      up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };
    
    // Touch controls state (will be set by Controls class)
    this.touchControls = {
      left: false,
      right: false,
      jump: false
    };
  }
  
  /**
   * Update method to be called in the scene's update method
   */
  update() {
    // Handle horizontal movement
    this.handleMovement();
    
    // Handle jumping
    this.handleJump();
    
    // Update animation based on state
    this.updateAnimation();
  }
  
  /**
   * Handle horizontal movement based on input
   */
  handleMovement() {
    // Check keyboard input
    const leftKey = this.cursors.left.isDown || this.wasd.left.isDown || this.touchControls.left;
    const rightKey = this.cursors.right.isDown || this.wasd.right.isDown || this.touchControls.right;
    
    if (leftKey) {
      this.sprite.setVelocityX(-this.speed);
      this.direction = 'left';
    } else if (rightKey) {
      this.sprite.setVelocityX(this.speed);
      this.direction = 'right';
    } else {
      // No horizontal input, slow down
      this.sprite.setVelocityX(0);
    }
    
    // Flip sprite based on direction
    if (this.direction === 'left') {
      this.sprite.setFlipX(true);
    } else {
      this.sprite.setFlipX(false);
    }
  }
  
  /**
   * Handle jumping based on input
   */
  handleJump() {
    // Check if player is on the ground
    const onGround = this.sprite.body.blocked.down || this.sprite.body.touching.down;
    
    // Update jumping/falling state
    if (onGround) {
      this.isJumping = false;
      this.isFalling = false;
    } else if (this.sprite.body.velocity.y > 0) {
      this.isJumping = false;
      this.isFalling = true;
    }
    
    // Check jump input
    const jumpKey = Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
                    Phaser.Input.Keyboard.JustDown(this.wasd.up) ||
                    this.touchControls.jump;
    
    
    // Jump if on ground and jump key pressed
    if (onGround && jumpKey) {
      this.sprite.setVelocityY(-this.jumpForce);
      this.isJumping = true;
    }
  }
  
  /**
   * Update animation based on player state
   */
  updateAnimation() {
    // Get horizontal velocity
    const velocityX = this.sprite.body.velocity.x;
    const velocityY = this.sprite.body.velocity.y;
    const onGround = this.sprite.body.blocked.down || this.sprite.body.touching.down;
    
    // Determine which animation to play
    if (!onGround) {
      if (velocityY < 0) {
        // Jumping
        this.sprite.play('player_jump', true);
      } else {
        // Falling
        this.sprite.play('player_fall', true);
      }
    } else if (velocityX !== 0) {
      // Walking
      this.sprite.play('player_walk', true);
    } else {
      // Idle
      this.sprite.play('player_idle', true);
    }
  }
  
  /**
   * Set touch controls state
   * @param {Object} controls - Object with left, right, jump properties
   */
  setTouchControls(controls) {
    this.touchControls = controls;
  }
  
  /**
   * Get the player's sprite for collision detection
   * @returns {Phaser.Physics.Arcade.Sprite} - The player's sprite
   */
  getSprite() {
    return this.sprite;
  }
}
