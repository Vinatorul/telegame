export function createPlayerSprite(scene, width = 32, height = 64) {
  const graphics = scene.make.graphics({ x: 0, y: 0 });
  
  graphics.fillStyle(0x4488ff);
  graphics.fillRect(0, 0, width, height);
  
  graphics.fillStyle(0x225599);
  graphics.fillRect(width * 0.2, height * 0.2, width * 0.6, height * 0.1);
  graphics.fillRect(width * 0.3, height * 0.4, width * 0.4, height * 0.1);
  
  graphics.generateTexture('player', width, height);
  graphics.destroy();
  
  return 'player';
}

export function createPlayerAnimations(scene) {
  const idleFrames = [];
  const idleGraphics = scene.make.graphics({ x: 0, y: 0 });
  
  for (let i = 0; i < 4; i++) {
    idleGraphics.clear();
    
    const scale = 1 + Math.sin(i / 3 * Math.PI) * 0.05;
    const width = 32;
    const height = 64;
    
    idleGraphics.fillStyle(0x4488ff);
    idleGraphics.fillRect(0, 0, width, height);
    
    idleGraphics.fillStyle(0x225599);
    idleGraphics.fillRect(width * 0.2, height * 0.2, width * 0.6, height * 0.1);
    idleGraphics.fillRect(width * 0.3, height * 0.4, width * 0.4, height * 0.1);
    
    idleGraphics.generateTexture(`player_idle_${i}`, width, height);
    idleFrames.push({ key: `player_idle_${i}` });
  }
  
  idleGraphics.destroy();
  
  scene.anims.create({
    key: 'player_idle',
    frames: idleFrames,
    frameRate: 6,
    repeat: -1
  });
  
  const walkFrames = [];
  const walkGraphics = scene.make.graphics({ x: 0, y: 0 });
  
  for (let i = 0; i < 6; i++) {
    walkGraphics.clear();
    
    const width = 32;
    const height = 64;
    
    walkGraphics.fillStyle(0x4488ff);
    walkGraphics.fillRect(0, 0, width, height);
    
    walkGraphics.fillStyle(0x225599);
    walkGraphics.fillRect(width * 0.2, height * 0.2, width * 0.6, height * 0.1);
    
    const mouthWidth = width * 0.4 + Math.sin(i / 5 * Math.PI) * width * 0.1;
    walkGraphics.fillRect(width * 0.3, height * 0.4, mouthWidth, height * 0.1);
    
    const legOffset = Math.sin(i / 5 * Math.PI) * width * 0.2;
    walkGraphics.fillStyle(0x225599);
    walkGraphics.fillRect(width * 0.2 + legOffset, height * 0.7, width * 0.2, height * 0.3);
    walkGraphics.fillRect(width * 0.6 - legOffset, height * 0.7, width * 0.2, height * 0.3);
    
    walkGraphics.generateTexture(`player_walk_${i}`, width, height);
    walkFrames.push({ key: `player_walk_${i}` });
  }
  
  walkGraphics.destroy();
  
  scene.anims.create({
    key: 'player_walk',
    frames: walkFrames,
    frameRate: 10,
    repeat: -1
  });
  
  const jumpGraphics = scene.make.graphics({ x: 0, y: 0 });
  const width = 32;
  const height = 64;
  
  jumpGraphics.fillStyle(0x4488ff);
  jumpGraphics.fillRect(0, 0, width, height);
  
  jumpGraphics.fillStyle(0x225599);
  jumpGraphics.fillRect(width * 0.2, height * 0.2, width * 0.6, height * 0.1);
  jumpGraphics.fillRect(width * 0.3, height * 0.4, width * 0.4, height * 0.05);
  
  jumpGraphics.fillRect(width * 0.3, height * 0.7, width * 0.4, height * 0.3);
  
  jumpGraphics.generateTexture('player_jump', width, height);
  jumpGraphics.destroy();
  
  scene.anims.create({
    key: 'player_jump',
    frames: [{ key: 'player_jump' }],
    frameRate: 1
  });
  
  const fallGraphics = scene.make.graphics({ x: 0, y: 0 });
  
  fallGraphics.fillStyle(0x4488ff);
  fallGraphics.fillRect(0, 0, width, height);
  
  fallGraphics.fillStyle(0x225599);
  fallGraphics.fillRect(width * 0.2, height * 0.2, width * 0.6, height * 0.1);
  fallGraphics.fillRect(width * 0.3, height * 0.45, width * 0.4, height * 0.05);
  
  fallGraphics.fillRect(width * 0.2, height * 0.7, width * 0.2, height * 0.3);
  fallGraphics.fillRect(width * 0.6, height * 0.7, width * 0.2, height * 0.3);
  
  fallGraphics.generateTexture('player_fall', width, height);
  fallGraphics.destroy();
  
  scene.anims.create({
    key: 'player_fall',
    frames: [{ key: 'player_fall' }],
    frameRate: 1
  });
}
