const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Créer la table 'users' si elle n'existe pas
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (idDiscord INTEGER PRIMARY KEY, pseudo TEXT, token TEXT)");

  // Créer la table 'citations' si elle n'existe pas
  db.run("CREATE TABLE IF NOT EXISTS citations (id INTEGER PRIMARY KEY AUTOINCREMENT, contenu TEXT, publication DATE, userId INTEGER, FOREIGN KEY (userId) REFERENCES users(idDiscord))");

  // Créer la table 'favoris' si elle n'existe pas
  db.run("CREATE TABLE IF NOT EXISTS favoris (userId INTEGER, citationId INTEGER, PRIMARY KEY (userId, citationId), FOREIGN KEY (userId) REFERENCES users(idDiscord), FOREIGN KEY (citationId) REFERENCES citations(id))");
});

module.exports = db;