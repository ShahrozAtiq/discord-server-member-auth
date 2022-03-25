# Discord Bot for Member Authentication

This is a Discord bot that provides member authentication in a server using email address and OTP.

## Installation

To install the bot, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies by running `npm install` in the project directory.
3. Create a new bot application on the [Discord Developer Portal](https://discord.com/developers/applications) and obtain the bot token.
4. Invite the bot to your Discord server by going to the OAuth2 page in the developer portal, selecting the "bot" scope, and generating an invite link.
5. Update the `BOT_TOKEN` variable in the `bot.js` file with your bot token.
6. Update the `email` and `password` variables in the `bot.js` file with the email address and password you want to use to send OTPs.
7. Start the bot by running `npm start` in the project directory.

## Usage

To use the bot, follow these steps:

1. In a channel on your server, type `!auth` to initiate the authentication process.
2. The bot will prompt you to enter your email address. Enter your email address in the channel.
3. The bot will send an OTP code to your email address and display a QR code in the channel.
4. Scan the QR code with your authenticator app and enter the OTP code in the channel in the following format: `!verify <code>`.
5. If the OTP code is valid, the bot will give you the "member" role on the server.

## Dependencies

This bot uses the following dependencies:

- `discord.js` - a Node.js module for interacting with the Discord API
- `nodemailer` - a Node.js module for sending email
- `speakeasy` - a Node.js module for generating and verifying OTPs
- `qrcode` - a Node.js module for generating QR codes

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
