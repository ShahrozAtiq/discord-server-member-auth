// Import the required libraries
const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Create a new Discord client
const client = new Discord.Client();

// Configure the bot
const prefix = '!'; // The prefix for bot commands
const email = 'example@gmail.com'; // The email address to send OTPs from
const password = 'password123'; // The password for the email address
const otpSecret = speakeasy.generateSecret({length: 20}); // Generate a secret for OTP generation
const otpCode = speakeasy.totp({secret: otpSecret.base32}); // Generate the initial OTP code

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password
  }
});

// Create a Discord message collector for email address inputs
const emailCollector = new Discord.MessageCollector(channel, m => m.author.id === message.author.id, { time: 10000 });

// When the bot is ready, log a message to the console
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Listen for messages
client.on('message', async (message) => {
  // Ignore messages that are not commands or that come from bots
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Split the command and arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Handle the auth command
  if (command === 'auth') {
    // Send a message to the user requesting their email address
    message.channel.send('Please enter your email address:');

    // Wait for the user to enter their email address
    emailCollector.on('collect', async m => {
      const emailAddress = m.content;

      // Generate the OTP QR code
      const qrCode = await QRCode.toDataURL(otpSecret.otpauth_url);

      // Send the OTP QR code to the user's email address
      const mailOptions = {
        from: email,
        to: emailAddress,
        subject: 'OTP for Discord authentication',
        html: `Your OTP code is: ${otpCode}. Please scan the following QR code in your authenticator app:<br><img src="${qrCode}"/>`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          message.reply('There was an error sending the OTP code.');
        } else {
          console.log('Email sent: ' + info.response);
          message.reply('An OTP code has been sent to your email address. Please enter the code in the following format: `!verify <code>`');
        }
      });
    });
  }})

  // Handle the verify command
  if (command === 'verify') {
    // Check that the user has entered a valid OTP code
    const otpIsValid = speakeasy.totp.verify({ secret: otpSecret.base32, encoding: 'base32', token: args[0] });
    if (otpIsValid) {
      // Give the user the "member" role
      const memberRole = message.guild.roles.cache.find(role => role.name === 'member');
      const member = message.member;
      member.roles.add(memberRole);
      message.reply('You have been authenticated and have been given the "member" role')
    }
  }
