import Phaser from 'phaser';

export default class Player {
  constructor(scene, x, y, texture) {
    this.scene = scene;
    
    this.sprite = scene.physics.add.sprite(x, y, texture);
    this.sprite.setCollideWorldBounds(true);
    
    this.sprite.body.setSize(28, 60);
    this.sprite.body.setOffset(2, 4);
    
    this.speed = 200;
    this.jumpForce = 400;
    this.isJumping = false;
    this.isFalling = false;
    this.direction = 'right';
    
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.wasd = {
      up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };
    
    this.touchControls = {
      left: false,
      right: false,
      jump: false
    };
  }
  
  update() {
    this.handleMovement();
    this.handleJump();
    this.updateAnimation();
  }
  
  handleMovement() {
    const leftKey = this.cursors.left.isDown || this.wasd.left.isDown || this.touchControls.left;
    const rightKey = this.cursors.right.isDown || this.wasd.right.isDown || this.touchControls.right;
    
    if (leftKey) {
      this.sprite.setVelocityX(-this.speed);
      this.direction = 'left';
    } else if (rightKey) {
      this.sprite.setVelocityX(this.speed);
      this.direction = 'right';
    } else {
      this.sprite.setVelocityX(0);
    }
    
    if (this.direction === 'left') {
      this.sprite.setFlipX(true);
    } else {
      this.sprite.setFlipX(false);
    }
  }
  
  handleJump() {
    const onGround = this.sprite.body.blocked.down || this.sprite.body.touching.down;
    
    if (onGround) {
      this.isJumping = false;
      this.isFalling = false;
    } else if (this.sprite.body.velocity.y > 0) {
      this.isJumping = false;
      this.isFalling = true;
    }
    
    const jumpKey = Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
                    Phaser.Input.Keyboard.JustDown(this.wasd.up) ||
                    this.touchControls.jump;
    
    if (onGround && jumpKey) {
      this.sprite.setVelocityY(-this.jumpForce);
      this.isJumping = true;
    }
  }
  
  updateAnimation() {
    const velocityX = this.sprite.body.velocity.x;
    const velocityY = this.sprite.body.velocity.y;
    const onGround = this.sprite.body.blocked.down || this.sprite.body.touching.down;
    
    if (!onGround) {
      if (velocityY < 0) {
        this.sprite.play('player_jump', true);
      } else {
        this.sprite.play('player_fall', true);
      }
    } else if (velocityX !== 0) {
      this.sprite.play('player_walk', true);
    } else {
      this.sprite.play('player_idle', true);
    }
  }
  
  setTouchControls(controls) {
    this.touchControls = controls;
  }
  
  getSprite() {
    return this.sprite;
  }
}
