export function createPlatformSprite(scene, width = 128, height = 32) {
  const graphics = scene.make.graphics({ x: 0, y: 0 });
  
  graphics.fillStyle(0x55aa55);
  graphics.fillRect(0, 0, width, height);
  
  graphics.fillStyle(0x448844);
  
  graphics.fillRect(0, 0, width, 4);
  
  graphics.fillRect(0, height - 4, width, 4);
  
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * (width - 10);
    const y = 8 + Math.random() * (height - 16);
    const w = 5 + Math.random() * 15;
    const h = 3 + Math.random() * 5;
    graphics.fillRect(x, y, w, h);
  }
  
  graphics.generateTexture('platform', width, height);
  graphics.destroy();
  
  return 'platform';
}

export function createMovingPlatformSprite(scene, width = 96, height = 24) {
  const graphics = scene.make.graphics({ x: 0, y: 0 });
  
  graphics.fillStyle(0x5588aa);
  graphics.fillRect(0, 0, width, height);
  
  graphics.fillStyle(0x447788);
  
  graphics.fillRect(0, 0, width, 3);
  
  graphics.fillRect(0, height - 3, width, 3);
  
  graphics.fillStyle(0x333333);
  graphics.fillRect(width * 0.1, height * 0.4, width * 0.8, height * 0.2);
  
  graphics.fillStyle(0x666666);
  graphics.fillCircle(width * 0.2, height * 0.5, 2);
  graphics.fillCircle(width * 0.4, height * 0.5, 2);
  graphics.fillCircle(width * 0.6, height * 0.5, 2);
  graphics.fillCircle(width * 0.8, height * 0.5, 2);
  
  graphics.generateTexture('moving_platform', width, height);
  graphics.destroy();
  
  return 'moving_platform';
}

export function createBackgroundSprite(scene, width = 800, height = 600) {
  const graphics = scene.make.graphics({ x: 0, y: 0 });
  
  graphics.fillStyle(0x1a2b3c);
  graphics.fillRect(0, 0, width, height/2);
  
  graphics.fillStyle(0x2c3e50);
  graphics.fillRect(0, height/2, width, height/2);
  graphics.fillRect(0, 0, width, height);
  
  graphics.fillStyle(0x152536);
  
  const skylinePoints = [];
  const segments = 20;
  const segmentWidth = width / segments;
  
  for (let i = 0; i <= segments; i++) {
    const x = i * segmentWidth;
    const heightVariation = Math.random() * height * 0.3;
    const y = height * 0.7 - heightVariation;
    skylinePoints.push({ x, y });
  }
  
  graphics.beginPath();
  graphics.moveTo(0, height);
  
  graphics.lineTo(skylinePoints[0].x, skylinePoints[0].y);
  
  for (let i = 1; i < skylinePoints.length; i++) {
    graphics.lineTo(skylinePoints[i].x, skylinePoints[i].y);
  }
  
  graphics.lineTo(width, height);
  graphics.closePath();
  graphics.fill();
  
  graphics.fillStyle(0xffffff);
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height * 0.6;
    const size = Math.random() * 2;
    graphics.fillCircle(x, y, size);
  }
  
  graphics.generateTexture('background', width, height);
  graphics.destroy();
  
  return 'background';
}
