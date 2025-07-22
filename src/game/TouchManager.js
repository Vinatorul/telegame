import Phaser from 'phaser';

export default class TouchManager {
  constructor(scene, controls) {
    this.scene = scene;
    this.controls = controls;
    
    this.activeTouches = new Map();
    
    this.leftZone = null;
    this.rightZone = null;
    this.jumpZone = null;
    
    this.debugEnabled = true;
    this.debugGraphics = this.scene.add.graphics();
    this.debugText = this.scene.add.text(10, 10, 'Touch Debug', {
      font: '16px Arial',
      fill: '#ffffff',
      backgroundColor: '#000000'
    });
    this.debugText.setScrollFactor(0);
    this.debugText.setDepth(1000);
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    this.scene.input.on('pointerdown', this.handleTouchStart, this);
    this.scene.input.on('pointermove', this.handleTouchMove, this);
    this.scene.input.on('pointerup', this.handleTouchEnd, this);
    this.scene.input.on('pointerupoutside', this.handleTouchEnd, this);
  }
  
  setControlZones(zones) {
    this.leftZone = zones.left;
    this.rightZone = zones.right;
    this.jumpZone = zones.jump;
  }
  
  handleTouchStart(pointer) {
    this.activeTouches.set(pointer.id, {
      x: pointer.worldX,
      y: pointer.worldY,
      startTime: this.scene.time.now
    });
    
    this.updateControlsFromTouch(pointer.id, pointer.worldX, pointer.worldY);
  }
  
  handleTouchMove(pointer) {
    if (this.activeTouches.has(pointer.id)) {
      const touchData = this.activeTouches.get(pointer.id);
      touchData.x = pointer.worldX;
      touchData.y = pointer.worldY;
      
      this.updateControlsFromTouch(pointer.id, pointer.worldX, pointer.worldY);
    }
  }
  
  handleTouchEnd(pointer) {
    if (this.activeTouches.has(pointer.id)) {
      const touchData = this.activeTouches.get(pointer.id);
      
      this.resetControlFromTouch(pointer.id, touchData.x, touchData.y);
      
      this.activeTouches.delete(pointer.id);
    }
  }
  
  updateControlsFromTouch(id, x, y) {
    if (this.leftZone && Phaser.Geom.Circle.Contains(this.leftZone, x, y)) {
      this.controls.setLeftDown(true);
      this.activeTouches.get(id).control = 'left';
    }
    
    if (this.rightZone && Phaser.Geom.Circle.Contains(this.rightZone, x, y)) {
      this.controls.setRightDown(true);
      this.activeTouches.get(id).control = 'right';
    }
    
    if (this.jumpZone && Phaser.Geom.Circle.Contains(this.jumpZone, x, y)) {
      this.controls.setJumpDown(true);
      this.activeTouches.get(id).control = 'jump';
    }
  }
  
  resetControlFromTouch(id, x, y) {
    const touchData = this.activeTouches.get(id);
    
    if (touchData.control === 'left') {
      this.controls.setLeftDown(false);
    } else if (touchData.control === 'right') {
      this.controls.setRightDown(false);
    } else if (touchData.control === 'jump') {
      this.controls.setJumpDown(false);
    }
  }
  
  update() {
    const currentTime = this.scene.time.now;
    const frameTouches = new Set();
    
    this.scene.input.manager.pointers.forEach(pointer => {
      if (pointer.isDown) {
        frameTouches.add(pointer.id);
      }
    });
    
    this.activeTouches.forEach((touchData, id) => {
      if (!frameTouches.has(id)) {
        this.resetControlFromTouch(id, touchData.x, touchData.y);
        this.activeTouches.delete(id);
      }
    });
    
    if (this.debugEnabled) {
      this.updateDebugVisualization();
    }
  }
  
  updateDebugVisualization() {
    this.debugGraphics.clear();
    
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
    
    this.debugGraphics.lineStyle(2, 0xff0000, 1);
    
    this.activeTouches.forEach((touchData, id) => {
      this.debugGraphics.fillStyle(0xff0000, 0.5);
      this.debugGraphics.fillCircle(touchData.x, touchData.y, 20);
      
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
