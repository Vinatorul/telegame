import Phaser from 'phaser';
import HelloScene from './scenes/HelloScene';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import UIScene from './scenes/UIScene';

// Telegram Game API integration
const initTelegramGameAPI = () => {
  // Check if running in Telegram WebApp
  if (window.TelegramWebApp) {
    const tg = window.TelegramWebApp;
    
    // Initialize the WebApp
    tg.expand();
    tg.enableClosingConfirmation();
    
    // Set up theme colors
    document.documentElement.style.setProperty('--tg-color-scheme', tg.colorScheme);
    document.documentElement.style.setProperty('--tg-bg-color', tg.backgroundColor);
    
    // Handle theme changes
    tg.onEvent('themeChanged', () => {
      document.documentElement.style.setProperty('--tg-color-scheme', tg.colorScheme);
      document.documentElement.style.setProperty('--tg-bg-color', tg.backgroundColor);
    });
    
    // Handle viewport changes
    tg.onEvent('viewportChanged', () => {
      if (game) {
        game.scale.refresh();
      }
    });
    
    // Prepare init data for backend validation
    const initData = tg.initData || '';
    const initDataUnsafe = tg.initDataUnsafe || {};
    
    return {
      ...tg,
      initData,
      initDataUnsafe,
      userId: initDataUnsafe.user?.id,
      chatId: initDataUnsafe.chat?.id
    };
  }
  
  console.log('Not running in Telegram WebApp, using browser mode');
  return {
    initData: '',
    initDataUnsafe: {},
    userId: null,
    chatId: null
  };
};

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  scene: [BootScene, GameScene, UIScene, HelloScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  input: {
    touch: {
      capture: true
    },
    activePointers: 3  // Support up to 3 simultaneous touches
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
