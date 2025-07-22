import Phaser from 'phaser';

export default class TouchManager {
  /**
   * TouchManager class for handling multi-touch input
   * @param {Phaser.Scene} scene - The scene this touch manager belongs to
   * @param {Controls} controls - The controls object to update
   */
  constructor(scene, controls) {
    this.scene = scene;
    this.controls = controls;
    
    // Store active touches by ID
    this.activeTouches = new Map();
    
    // Touch control zones
    this.leftZone = null;
    this.rightZone = null;
    this.jumpZone = null;
    
    // Debug visualization
    this.debugEnabled = true;
    this.debugGraphics = this.scene.add.graphics();
    this.debugText = this.scene.add.text(10, 10, 'Touch Debug', {
      font: '16px Arial',
      fill: '#ffffff',
      backgroundColor: '#000000'
    });
    this.debugText.setScrollFactor(0);
    this.debugText.setDepth(1000);
    
    // Set up touch event listeners
    this.setupEventListeners();
  }
  
  /**
   * Set up touch event listeners
   */
  setupEventListeners() {
    this.scene.input.on('pointerdown', this.handleTouchStart, this);
    this.scene.input.on('pointermove', this.handleTouchMove, this);
    this.scene.input.on('pointerup', this.handleTouchEnd, this);
    this.scene.input.on('pointerupoutside', this.handleTouchEnd, this);
  }
  
  /**
   * Define touch control zones
   * @param {Object} zones - Object containing left, right, and jump zones
   */
  setControlZones(zones) {
    this.leftZone = zones.left;
    this.rightZone = zones.right;
    this.jumpZone = zones.jump;
  }
  
  /**
   * Handle touch start event
   * @param {Phaser.Input.Pointer} pointer - The pointer that triggered the event
   */
  handleTouchStart(pointer) {
    // Store the touch with its ID and position
    this.activeTouches.set(pointer.id, {
      x: pointer.worldX,
      y: pointer.worldY,
      startTime: this.scene.time.now
    });
    
    // Check which zone was touched and update controls
    this.updateControlsFromTouch(pointer.id, pointer.worldX, pointer.worldY);
  }
  
  /**
   * Handle touch move event
   * @param {Phaser.Input.Pointer} pointer - The pointer that triggered the event
   */
  handleTouchMove(pointer) {
    // Update the stored touch position
    if (this.activeTouches.has(pointer.id)) {
      const touchData = this.activeTouches.get(pointer.id);
      touchData.x = pointer.worldX;
      touchData.y = pointer.worldY;
      
      // Update controls based on new position
      this.updateControlsFromTouch(pointer.id, pointer.worldX, pointer.worldY);
    }
  }
  
  /**
   * Handle touch end event
   * @param {Phaser.Input.Pointer} pointer - The pointer that triggered the event
   */
  handleTouchEnd(pointer) {
    // Check which control was being touched before removing
    if (this.activeTouches.has(pointer.id)) {
      const touchData = this.activeTouches.get(pointer.id);
      
      // Reset the control that was being touched
      this.resetControlFromTouch(pointer.id, touchData.x, touchData.y);
      
      // Remove the touch from active touches
      this.activeTouches.delete(pointer.id);
    }
  }
  
  /**
   * Update controls based on touch position
   * @param {number} id - Touch identifier
   * @param {number} x - Touch x position
   * @param {number} y - Touch y position
   */
  updateControlsFromTouch(id, x, y) {
    // Check if touch is in left control zone
    if (this.leftZone && Phaser.Geom.Circle.Contains(this.leftZone, x, y)) {
      this.controls.setLeftDown(true);
      // Store which control this touch is activating
      this.activeTouches.get(id).control = 'left';
    }
    
    // Check if touch is in right control zone
    if (this.rightZone && Phaser.Geom.Circle.Contains(this.rightZone, x, y)) {
      this.controls.setRightDown(true);
      // Store which control this touch is activating
      this.activeTouches.get(id).control = 'right';
    }
    
    // Check if touch is in jump control zone
    if (this.jumpZone && Phaser.Geom.Circle.Contains(this.jumpZone, x, y)) {
      this.controls.setJumpDown(true);
      // Store which control this touch is activating
      this.activeTouches.get(id).control = 'jump';
    }
  }
  
  /**
   * Reset control when touch ends
   * @param {number} id - Touch identifier
   * @param {number} x - Touch x position
   * @param {number} y - Touch y position
   */
  resetControlFromTouch(id, x, y) {
    const touchData = this.activeTouches.get(id);
    
    // Reset the appropriate control based on which one this touch was activating
    if (touchData.control === 'left') {
      this.controls.setLeftDown(false);
    } else if (touchData.control === 'right') {
      this.controls.setRightDown(false);
    } else if (touchData.control === 'jump') {
      // Reset the jump button state when the touch ends
      this.controls.setJumpDown(false);
    }
  }
  
  /**
   * Update method to be called in the scene's update method
   */
  update() {
    // Clean up any stale touches
    const currentTime = this.scene.time.now;
    const frameTouches = new Set();
    
    // Get all current active pointers
    this.scene.input.manager.pointers.forEach(pointer => {
      if (pointer.isDown) {
        frameTouches.add(pointer.id);
      }
    });
    
    // Remove any touches that are no longer active
    this.activeTouches.forEach((touchData, id) => {
      if (!frameTouches.has(id)) {
        this.resetControlFromTouch(id, touchData.x, touchData.y);
        this.activeTouches.delete(id);
      }
    });
    
    // Update debug visualization
    if (this.debugEnabled) {
      this.updateDebugVisualization();
    }
  }
  
  /**
   * Update debug visualization
   */
  updateDebugVisualization() {
    // Clear previous frame's graphics
    this.debugGraphics.clear();
    
    // Draw control zones
    this.debugGraphics.lineStyle(2, 0xffff00, 0.5);
    
    if (this.leftZone) {
      this.debugGraphics.strokeCircle(this.leftZone.x, this.leftZone.y, this.leftZone.radius);
    }
    
    if (this.rightZone) {
      this.debugGraphics.strokeCircle(this.rightZone.x, this.rightZone.y, this.rightZone.radius);
    }
    
    if (this.jumpZone) {
      this.debugGraphics.strokeCircle(this.jumpZone.x, this.jumpZone.y, this.jumpZone.radius);
    }
    
    // Draw active touches
    this.debugGraphics.lineStyle(2, 0xff0000, 1);
    
    this.activeTouches.forEach((touchData, id) => {
      // Draw a circle at touch position
      this.debugGraphics.fillStyle(0xff0000, 0.5);
      this.debugGraphics.fillCircle(touchData.x, touchData.y, 20);
      
      // Draw a line from touch to its control if assigned
      if (touchData.control) {
        this.debugGraphics.lineStyle(2, 0x00ff00, 1);
        
        let targetX, targetY;
        if (touchData.control === 'left' && this.leftZone) {
          targetX = this.leftZone.x;
          targetY = this.leftZone.y;
        } else if (touchData.control === 'right' && this.rightZone) {
          targetX = this.rightZone.x;
          targetY = this.rightZone.y;
        } else if (touchData.control === 'jump' && this.jumpZone) {
          targetX = this.jumpZone.x;
          targetY = this.jumpZone.y;
        }
        
        if (targetX && targetY) {
          this.debugGraphics.lineBetween(touchData.x, touchData.y, targetX, targetY);
        }
      }
    });
    
    // Update debug text
    const touchInfo = Array.from(this.activeTouches.entries())
      .map(([id, data]) => `Touch ${id}: (${Math.floor(data.x)},${Math.floor(data.y)}) ${data.control || 'none'}`);
    
    const controlInfo = [
      `Left: ${this.controls.isLeftDown ? 'DOWN' : 'up'}`,
      `Right: ${this.controls.isRightDown ? 'DOWN' : 'up'}`,
      `Jump: ${this.controls.isJumpDown ? 'DOWN' : 'up'}`
    ];
    
    this.debugText.setText([
      'Touch Debug:',
      ...touchInfo,
      '',
      'Controls:',
      ...controlInfo
    ]);
  }
}
