import Phaser from 'phaser';
import TouchManager from '../game/TouchManager';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
    
    this.controls = null;
    
    this.leftButton = null;
    this.rightButton = null;
    this.jumpButton = null;
    
    this.touchManager = null;
  }

  init(data) {
    this.controls = data.controls;
  }

  create() {
    if (!this.sys.game.device.os.desktop) {
      this.createTouchControls();
    }
  }

  createTouchControls() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    const buttonAlpha = 0.5;
    const buttonSize = 80;
    
    this.leftButton = this.add.circle(
      buttonSize,
      height - buttonSize,
      buttonSize / 2,
      0x0000ff,
      buttonAlpha
    );
    this.leftButton.setInteractive();
    this.leftButton.setScrollFactor(0);
    
    const leftArrow = this.add.triangle(
      buttonSize,
      height - buttonSize,
      -15, 0,
      15, -20,
      15, 20,
      0xffffff
    );
    leftArrow.setScrollFactor(0);
    
    this.rightButton = this.add.circle(
      buttonSize * 3,
      height - buttonSize,
      buttonSize / 2,
      0x0000ff,
      buttonAlpha
    );
    this.rightButton.setInteractive();
    this.rightButton.setScrollFactor(0);
    
    const rightArrow = this.add.triangle(
      buttonSize * 3,
      height - buttonSize,
      15, 0,
      -15, -20,
      -15, 20,
      0xffffff
    );
    rightArrow.setScrollFactor(0);
    
    this.jumpButton = this.add.circle(
      width - buttonSize,
      height - buttonSize,
      buttonSize / 2,
      0xff0000,
      buttonAlpha
    );
    this.jumpButton.setInteractive();
    this.jumpButton.setScrollFactor(0);
    
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
    
    this.initTouchManager();
  }

  initTouchManager() {
    if (!this.controls) {
      console.warn('Controls not set in UIScene');
      return;
    }
    
    this.touchManager = new TouchManager(this, this.controls);
    
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
  
  update() {
    if (this.touchManager) {
      this.touchManager.update();
    }
  }
}
