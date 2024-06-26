require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

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
const websiteUrl = 'http://localhost:3000';


// [- - - - - - - ---- MESSAGES GESTION ---- - - - - - - -]

bot.on('messageCreate', async(message) => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();// attention au tolowercase

  if (cmd === '?') return message.reply('I\'m logged in, you can manage citations');

  if(cmd === 'help'){
    return message.reply("```\n   Commands.\n"
    + "addQuote => write your code after that command to add it\n"
    + "seeQuotes => see all quotes\n"
    + "seeQuotes @user => see the user's quotes\n"
    + "favorites => see your favorites\n"
    + "```");
  }

  // =================================== ADDQUOTE =================================== //
  if(cmd === 'addquote'){
    if(!args[1]) return message.reply('maybe you should write your quote ...');
    else{
      quote = args[1];
      for(i = 2 ; args[i] ; i++){
        quote += ' ' + args[i];
      }
      // --------
      const url = `${websiteUrl}/citations/add`;
      console.log(url);
      try {
        const response = await fetch(url, { method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({
            texte: quote,
            idDiscord: message.author.id,}),
        });
    
        if (response.ok) console.log('Citation added successfully.');
        else console.error('Error adding citation:', response.statusText);
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  }
  // =================================== SEEQUOTES =================================== //
  if(cmd === 'seequotes'){
    
    if (!args[1]){ // display all quotes
      const url = `${websiteUrl}/citations`;
      try {
        const response = await fetch(url);
        if (!response.ok)throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
  
        quotes = "# ======== Citations========\n‎\n```";
        data.forEach(item => {
          quotes += " - " + item.contenu + "\n";
        });
        quotes += "```\n# ========================";
        message.reply(quotes);
  
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }else{ //
      let target = args[1];
      if(target[1] === '@'){
        // clean id
        rawId = args[1];
        id = rawId[2];
        for(i = 3 ; i < 20 ; i++) id += rawId[i];
        id[16] = '0'; // à enlever quand le problème sera réglé
        id[17] = '0';

        // get quotes by id
        const url = `${websiteUrl}/citations/user/${id}`;
        try {
          const response = await fetch(url);
          if (!response.ok)throw new Error(`HTTP error! Status: ${response.status}`);
          const data = await response.json();
  
          quotes = "# ======== Citations ========\n‎\n```";
          data.forEach(item => {
            quotes += " - " + item.contenu + "\n";
          });
          quotes += "```\n# ========================";
          message.reply(quotes);
  
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      } else return message.reply('Specify target by pinging');
    }
  }
  // =================================== FAVORITES =================================== //
  
  if(cmd === 'favorites'){
    console.log("here");
    const id = /*"598881507116974100"*/message.author.id;
    const url = `${websiteUrl}/citations/favorites/${id}`;
    try {
      const response = await fetch(url);
      if (!response.ok)throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      quotes = "# ======== Citations favorites ========\n‎\n```";
      data.forEach(item => {
        quotes += " - " + item.contenu + "\n";
      });
      quotes += "```\n# ========================";
      message.reply(quotes);

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

});

bot.login(process.env.DISCORD_TOKEN);
