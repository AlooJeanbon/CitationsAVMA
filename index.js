// index.js
require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const DiscordStrategy = require('passport-discord');
const connectDB = require('./config/database'); // Importer la configuration de la base de données
const User = require('./models/utilisateur');
const Citation = require('./models/citation');


const app = express();
app.use(cors());
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
