const db = require('../database/db');

require('dotenv').config();
const axios = require('axios');
const url = require('url');
const jwt = require('jsonwebtoken');


const userController = {};

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

      console.log(userinfo.data.id);

      const secretKey = process.env.CLE;
      const payload = {
        idDiscord: userinfo.data.id
      };
      const options = {
        expiresIn: '3h',
      };
      const token = jwt.sign(payload, secretKey, options);
      res.cookie('user', token);

      db.get("SELECT * FROM users WHERE idDiscord = ?", [userinfo.data.id], (err, row) => {
        if (err) {
          return done(err, null);
        }
        if (!row) {
          db.run("INSERT INTO users (pseudo, token, idDiscord) VALUES (?, ?, ?)", 
          [userinfo.data.username, token, userinfo.data.id], (err, row) => {
            if (err) {
              return done(err, null);
            }});
        } else {
          db.run("UPDATE users SET token = ? WHERE idDiscord = ?", 
          [token, userinfo.data.id], (err, row) => {
            if (err) {
              return done(err, null);
            }});
        }
        return done(null, row);
      });
    }
  }
};

userController.getUserProfile = (req, res) => {
  res.json({ user: req.user });
};

module.exports = userController;
