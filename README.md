# Telegram Game

A simple game built for the Telegram Game Platform using Phaser.js.

## Description

This project is a "Hello World" game that demonstrates how to create a game for the Telegram Game Platform using Phaser.js. It serves as a foundation for developing more complex arcade-style games in the future.

## Technologies Used

- [Phaser.js](https://phaser.io/) - HTML5 game framework
- [Parcel](https://parceljs.org/) - Web application bundler
- [Telegram Game Platform](https://core.telegram.org/bots/games) - Platform for hosting and distributing games

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/telegame.git
   cd telegame
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Development

To start the development server:

```
npm start
```

This will start a local development server at http://localhost:1234.

### Building for Production

To build the game for production:

```
npm run build
```

The built files will be in the `dist` directory.

## Deployment to GitHub Pages

To deploy the game to GitHub Pages:

1. Make sure you have committed all changes to your main branch
2. Run the deployment script:
   ```bash
   npm run deploy
   ```
   
This will:
- Build the production version
- Switch to gh-pages branch
- Copy built files
- Commit and push changes

### Manual Deployment

If you prefer to deploy manually:
```bash
./deploy-gh-pages.sh
```

## Telegram Bot Setup

1. Talk to [@BotFather](https://t.me/botfather) on Telegram
2. Create a new bot with `/newbot`
3. Add a game to your bot with `/newgame`
4. Set the game URL to your deployed game

## License

This project is licensed under the MIT License - see the LICENSE file for details.
