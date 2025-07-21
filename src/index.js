import Phaser from 'phaser';
import HelloScene from './scenes/HelloScene';

// Telegram Game API integration
const initTelegramGameAPI = () => {
  // Check if running in Telegram WebApp
  if (window.TelegramWebApp) {
    const tg = window.TelegramWebApp;
    
    // Initialize the WebApp
    tg.expand();
    
    // Handle game events
    tg.onEvent('viewportChanged', () => {
      // Resize game if needed
      if (game) {
        game.scale.refresh();
      }
    });
    
    return tg;
  }
  
  console.log('Not running in Telegram WebApp, using browser mode');
  return null;
};

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  scene: [HelloScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

// Initialize the game
const game = new Phaser.Game(config);

// Initialize Telegram API
const telegramAPI = initTelegramGameAPI();

// Add a global reference to the game for debugging
window.game = game;
