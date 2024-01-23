// controllers/userController.js
const User = require('../models/utilisateur');

const userController = {};

userController.handleDiscordCallback = (req, res) => {
  res.redirect('/citations');
};

userController.logout = (req, res) => {
  req.logout();
  res.redirect('/citations');
};

userController.getUserProfile = (req, res) => {
  res.json({ user: req.user });
};

module.exports = userController;
