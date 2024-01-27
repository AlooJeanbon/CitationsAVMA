// index.js
require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const db = require('./database/db');

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
    db.get("SELECT * FROM users WHERE idDiscord = ?", [profile.id], (err, row) => {
      if (err) {
        return done(err, null);
      }
      if (!row) {
        db.run("INSERT INTO users (pseudo, token, tokenExpiration, idDiscord) VALUES (?, ?, ?, ?)", 
        [profile.username, accessToken,  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), profile.id], (err, row) => {
          if (err) {
            return done(err, null);
          }});
      } else {
        db.run("UPDATE users SET token = ?, tokenExpiration = ? WHERE idDiscord = ?", 
        [refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), profile.id], (err, row) => {
          if (err) {
            return done(err, null);
          }});
      }
      return done(null, row);
    });
}));

passport.serializeUser((user, done) => {
  done(null, user.idDiscord);
});

passport.deserializeUser(async (id, done) => {
  sql = "SELECT * FROM users WHERE idDiscord = ?";
  id = id.toString();
  db.get(sql, [id] ,(err, row) => {
    if (err) {
      return done(err, null);
    }
    if (!row) {
      return done("User not found", null);
    }
    return done(null, row);
  });
});

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

// ============================================================================================ //
//                                      DISCORD BOT
// ============================================================================================ //

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

bot.on('messageCreate', async(message) => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();// attention au tolowercase

  if (cmd === '?') return message.reply('I\'m logged in, you can manage citations');

  // à enlever
  if(cmd === 'addquote'){
    if(!args[1]) return message.reply('maybe you should write your quote ...');
    else{
      quote = args[1];
      for(i = 2 ; args[i] ; i++){
        quote += ' ' + args[i];
      }
      const citation = new Citation({
        author: message.author.id,
        text : quote,
      });
    // note à moi même penser à ajouter tous les mots !
    //console.log('here' + message.author.id + "|" + quote);
      try {
        const newCitation = await citation.save();
        return message.reply("\"" + newCitation + "\" saved");
      } catch (error) {
        return message.reply('An error has occured, praise the sun and retry');
      }
    }
  }

});

bot.login(process.env.DISCORD_TOKEN);
