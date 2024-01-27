const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controlleurs/utilisateur_controlleur');

// Login avec Discord
router.get('/login/discord', passport.authenticate('discord'));

router.get('/login/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  userController.handleDiscordCallback
);

// Logout
router.get('/logout', userController.logout);

// Get user profile
router.get('/profile', userController.getUserProfile);


// Ajouter un user manuellement
router.post('/add', userController.addUser);

module.exports = router;
