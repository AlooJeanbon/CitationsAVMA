// index.js
require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const connectDB = require('./config/database'); // Importer la configuration de la base de données
const User = require('./models/utilisateur');
const Citation = require('./models/citation');


const app = express();

// Middleware
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.DISCORD_CALLBACK_URL,
  scope: ['identify'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ discordId: profile.id });

    if (!user) {
      user = new User({
        discordId: profile.id,
        accessToken,
        tokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expiration après 7 jours
      });

      await user.save();
    } else {
      // Mettre à jour le token et l'expiration
      user.accessToken = accessToken;
      user.tokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await user.save();
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
});

// Connecter à la base de données MongoDB
connectDB();

// Middleware pour ajouter l'utilisateur à chaque requête
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Autres configurations et middleware Express
const apiRouter = require("./routes/api");

app.use("", apiRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ===================================================== //

const Discord = require('discord.js');
const bot = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
  ],
});
// first two needed to see messages

const fs = require('fs');
bot.commands = new Discord.Collection();

// [- - - - - - - ---- VARIABLES / CLASSES ---- - - - - - - -]

const prefix = '²';

// [- - - - - - - ---- MESSAGES GESTION ---- - - - - - - -]

bot.on('messageCreate', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();

  if (cmd === '?') return message.reply('I\'m logged in, you can manage citations');

  // à enlever
  if (cmd === 'roll') {// - - - ***************** ROLL
    if (!args[1]) return message.reply('Specify the dice.');
    if (args[2]) return message.reply('Stop adding useless things.');
    if (parseInt(args[1]) === 'NaN') return message.reply('Number please.');
    
    // command code

    return message.reply('https://tenor.com/view/marvel-you-had-one-job-loki-tom-hiddleson-gif-11509538');
  }

});

bot.login(process.env.DISCORD_TOKEN);
