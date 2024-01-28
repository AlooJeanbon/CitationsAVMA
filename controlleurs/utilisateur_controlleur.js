const db = require('../database/db');

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const url = require('url');


const userController = {};

userController.handleDiscordCallback = (req, res) => {
  res.redirect('/citations');
};

// ====================== **************** ZONE DE TRAVAUX **************** ====================== //

/// quand on clique sur connexion on  passe par ici
userController.loginRedirect = async (req, res) => {
  const { code } = req.query;
  
  if(code){
    const formData = new url.URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code.toString(),
      redirect_uri: 'http://localhost:3000/utilisateur/login/redirect'
    });

    const output = await axios.post('https://discord.com/api/v10/oauth2/token',
      formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    if(output.data){
      const access = output.data.access_token;

      const userinfo = await axios.get('https://discord.com/api/v10/users/@me', {
        headers: {
          'Authorization': `Bearer ${access}`,
        }
      });

      //console.log(output.data, userinfo.data);
      console.log(userinfo.data.id);
    }
  }
};

userController.login = async (req, res) => {
  // ici on appelle l'url de redirection ???
  const REDIRECT_URI = "https://discord.com/api/oauth2/authorize?client_id=1181168268900315136&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Futilisateur%2Flogin%2Fredirect&scope=identify";
  // en allant sur cette url on est redirigé vers "http://localhost:3000/login/redirect"
  // avec "?code=..." en plus à la fin


  /*console.log('here');

  const url = `https://discord.com/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=identify%20guilds.join&state=15773059ghq9183habn&redirect_uri=https%3A%2F%2Fnicememe.website&prompt=consent`;
      console.log(url);
      try {
        var formBody = [];
        formBody.push("redirect_uri=")
        const response = await fetch(url, { method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded',},

        });
    
        if (response.ok){
          console.log('Code retrieved successfully.');
        }
        else console.error('Error retrieve code:', response.statusText);
      } catch (error) {
        console.error('Error:', error.message);
      }

      
  var formBody = [];
  formBody.push("grant_type=authorization_code");
  formBody.push("code=code");*/

};


// =============================================================================================== //


userController.logout = (req, res) => {
  req.logout();
  res.redirect('/citations');
};

userController.getUserProfile = (req, res) => {
  res.json({ user: req.user });
};

// Contrôleur pour ajouter un nouvel utilisateur
userController.addUser = (req, res) => {
  const { idDiscord, pseudo, token } = req.body;
  if (!texte || !idDiscord) {
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
