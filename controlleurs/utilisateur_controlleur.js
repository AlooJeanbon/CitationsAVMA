const db = require('../database/db');

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

// Contrôleur pour ajouter un nouveau utilisateur
userController.addUser = (req, res) => {
  const { idDiscord, pseudo, token } = req.body;
  if (!pseudo || !token || !idDiscord) {
    return res.status(400).json({ error: "Tout les champs ne sont pas remplis." });
  }

  db.run("INSERT INTO users (idDiscord, pseudo, token, tokenExpiration) VALUES (?, ?, ?, ?)", 
  [idDiscord, pseudo, token, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json({ message: "Citation ajoutée", id: this.lastID });
  });
};

module.exports = userController;
