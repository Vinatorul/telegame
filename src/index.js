import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import UIScene from './scenes/UIScene';

const initTelegramGameAPI = () => {
  if (window.TelegramWebApp) {
    const tg = window.TelegramWebApp;
    
    tg.expand();
    tg.enableClosingConfirmation();
    
    document.documentElement.style.setProperty('--tg-color-scheme', tg.colorScheme);
    document.documentElement.style.setProperty('--tg-bg-color', tg.backgroundColor);
    
    tg.onEvent('themeChanged', () => {
      document.documentElement.style.setProperty('--tg-color-scheme', tg.colorScheme);
      document.documentElement.style.setProperty('--tg-bg-color', tg.backgroundColor);
    });
    
    tg.onEvent('viewportChanged', () => {
      if (game) {
        game.scale.refresh();
      }
    });
    
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

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  scene: [BootScene, GameScene, UIScene],
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

const game = new Phaser.Game(config);

const telegramAPI = initTelegramGameAPI();

window.game = game;
