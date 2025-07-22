import Phaser from 'phaser';

export default class Controls {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    
    this.isLeftDown = false;
    this.isRightDown = false;
    this.isJumpDown = false;
    this.jumpJustPressed = false;
    
    this.setupKeyboard();
    
    this.isMobile = !this.scene.sys.game.device.os.desktop;
    if (this.isMobile) {
      this.setupTouchControls();
    }
  }
  
  setupKeyboard() {
  }
  
  setupTouchControls() {
    if (!this.scene.game.scene.getScene('UIScene')) {
      console.warn('UIScene not found. Touch controls will not be created.');
      return;
    }
  }
  
  update() {
    this.player.setTouchControls({
      left: this.isLeftDown,
      right: this.isRightDown,
      jump: this.jumpJustPressed
    });
    
    this.jumpJustPressed = false;
  }
  
  setLeftDown(isDown) {
    this.isLeftDown = isDown;
  }
  
  setRightDown(isDown) {
    this.isRightDown = isDown;
  }
  
  setJumpDown(isDown = true) {
    if (isDown && !this.isJumpDown) {
      this.jumpJustPressed = true;
    }
    this.isJumpDown = isDown;
  }
}
