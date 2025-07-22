// This file contains functions to create placeholder player sprites

/**
 * Creates a simple player sprite
 * @param {Phaser.Scene} scene - The scene to add the sprite to
 * @param {number} width - Width of the player sprite
 * @param {number} height - Height of the player sprite
 * @returns {Phaser.GameObjects.Graphics} - The created graphics object
 */
export function createPlayerSprite(scene, width = 32, height = 64) {
  const graphics = scene.make.graphics({ x: 0, y: 0 });
  
  // Draw player body (blue rectangle)
  graphics.fillStyle(0x4488ff);
  graphics.fillRect(0, 0, width, height);
  
  // Add some details
  graphics.fillStyle(0x225599);
  graphics.fillRect(width * 0.2, height * 0.2, width * 0.6, height * 0.1); // Eyes
  graphics.fillRect(width * 0.3, height * 0.4, width * 0.4, height * 0.1); // Mouth
  
  // Generate texture
  graphics.generateTexture('player', width, height);
  graphics.destroy();
  
  return 'player';
}

/**
 * Creates animation frames for the player
 * @param {Phaser.Scene} scene - The scene to add the animations to
 */
export function createPlayerAnimations(scene) {
  // Idle animation (simple pulsing effect)
  const idleFrames = [];
  const idleGraphics = scene.make.graphics({ x: 0, y: 0 });
  
  for (let i = 0; i < 4; i++) {
    idleGraphics.clear();
    
    // Draw player body with slight size variation
    const scale = 1 + Math.sin(i / 3 * Math.PI) * 0.05;
    const width = 32;
    const height = 64;
    
    idleGraphics.fillStyle(0x4488ff);
    idleGraphics.fillRect(0, 0, width, height);
    
    // Add some details
    idleGraphics.fillStyle(0x225599);
    idleGraphics.fillRect(width * 0.2, height * 0.2, width * 0.6, height * 0.1); // Eyes
    idleGraphics.fillRect(width * 0.3, height * 0.4, width * 0.4, height * 0.1); // Mouth
    
    // Generate frame
    idleGraphics.generateTexture(`player_idle_${i}`, width, height);
    idleFrames.push({ key: `player_idle_${i}` });
  }
  
  idleGraphics.destroy();
  
  // Create the animation
  scene.anims.create({
    key: 'player_idle',
    frames: idleFrames,
    frameRate: 6,
    repeat: -1
  });
  
  // Walking animation
  const walkFrames = [];
  const walkGraphics = scene.make.graphics({ x: 0, y: 0 });
  
  for (let i = 0; i < 6; i++) {
    walkGraphics.clear();
    
    const width = 32;
    const height = 64;
    
    // Draw player body
    walkGraphics.fillStyle(0x4488ff);
    walkGraphics.fillRect(0, 0, width, height);
    
    // Add some details
    walkGraphics.fillStyle(0x225599);
    walkGraphics.fillRect(width * 0.2, height * 0.2, width * 0.6, height * 0.1); // Eyes
    
    // Animate mouth for walking
    const mouthWidth = width * 0.4 + Math.sin(i / 5 * Math.PI) * width * 0.1;
    walkGraphics.fillRect(width * 0.3, height * 0.4, mouthWidth, height * 0.1); // Mouth
    
    // Animate legs
    const legOffset = Math.sin(i / 5 * Math.PI) * width * 0.2;
    walkGraphics.fillStyle(0x225599);
    walkGraphics.fillRect(width * 0.2 + legOffset, height * 0.7, width * 0.2, height * 0.3); // Left leg
    walkGraphics.fillRect(width * 0.6 - legOffset, height * 0.7, width * 0.2, height * 0.3); // Right leg
    
    // Generate frame
    walkGraphics.generateTexture(`player_walk_${i}`, width, height);
    walkFrames.push({ key: `player_walk_${i}` });
  }
  
  walkGraphics.destroy();
  
  // Create the animation
  scene.anims.create({
    key: 'player_walk',
    frames: walkFrames,
    frameRate: 10,
    repeat: -1
  });
  
  // Jump animation (single frame)
  const jumpGraphics = scene.make.graphics({ x: 0, y: 0 });
  const width = 32;
  const height = 64;
  
  jumpGraphics.fillStyle(0x4488ff);
  jumpGraphics.fillRect(0, 0, width, height);
  
  // Add some details for jump
  jumpGraphics.fillStyle(0x225599);
  jumpGraphics.fillRect(width * 0.2, height * 0.2, width * 0.6, height * 0.1); // Eyes
  jumpGraphics.fillRect(width * 0.3, height * 0.4, width * 0.4, height * 0.05); // Mouth (smaller)
  
  // Legs together for jump
  jumpGraphics.fillRect(width * 0.3, height * 0.7, width * 0.4, height * 0.3); // Legs
  
  // Generate frame
  jumpGraphics.generateTexture('player_jump', width, height);
  jumpGraphics.destroy();
  
  // Create the animation
  scene.anims.create({
    key: 'player_jump',
    frames: [{ key: 'player_jump' }],
    frameRate: 1
  });
  
  // Fall animation (single frame)
  const fallGraphics = scene.make.graphics({ x: 0, y: 0 });
  
  fallGraphics.fillStyle(0x4488ff);
  fallGraphics.fillRect(0, 0, width, height);
  
  // Add some details for fall
  fallGraphics.fillStyle(0x225599);
  fallGraphics.fillRect(width * 0.2, height * 0.2, width * 0.6, height * 0.1); // Eyes
  fallGraphics.fillRect(width * 0.3, height * 0.45, width * 0.4, height * 0.05); // Mouth (lower)
  
  // Legs apart for fall
  fallGraphics.fillRect(width * 0.2, height * 0.7, width * 0.2, height * 0.3); // Left leg
  fallGraphics.fillRect(width * 0.6, height * 0.7, width * 0.2, height * 0.3); // Right leg
  
  // Generate frame
  fallGraphics.generateTexture('player_fall', width, height);
  fallGraphics.destroy();
  
  // Create the animation
  scene.anims.create({
    key: 'player_fall',
    frames: [{ key: 'player_fall' }],
    frameRate: 1
  });
}
