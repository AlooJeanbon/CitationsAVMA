const db = require('../database/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const citationController = {};

// Contrôleur pour obtenir toutes les citations
citationController.getAllCitations = (req, res) => {
  db.all("SELECT * FROM citations", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
};

//Contrôleur pour obtenir toutes les citations d'un utilisateur
citationController.getAllCitationsOfUser = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "L'identifiant Discord est requis dans les paramètres de la requête." });
  }
  db.all("SELECT * FROM citations WHERE userId = ?", [req.params.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
};

// Contrôleur pour ajouter une nouvelle citation
citationController.addNewCitation = (req, res) => {
  const { texte, idDiscord } = req.body;
  if (!texte || !idDiscord) {
    return res.status(400).json({ error: "Les champs 'content' et 'userId' sont requis." });
  }
  db.get("SELECT * FROM users WHERE idDiscord = ?", [idDiscord], (err, row) => {
    if (!err) {
      jwt.verify(row.token, process.env.CLE, (err, decoded) => {
        if (!err) {
          console.log(decoded.idDiscord);
          console.log(row.idDiscord);
          if (decoded.idDiscord == row.idDiscord){
            db.run("INSERT INTO citations (contenu, publication, userId) VALUES (?, ?, ?)", 
            [texte, new Date(Date.now()), idDiscord], function(err) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
        
            res.status(200).json({ message: "Citation ajoutée", id: this.lastID });
            });
          } else {
            return res.status(500).json({ error: "Utilisateur non identifié" });
          }
        }
      });
    }
  });
};

citationController.addTest = async (req, res) => {
  const texte = "Rien n'est vrai tout est permis";
  const idDiscord = "598881507116974100";
  if (!texte || !idDiscord) {
    return res.status(400).json({ error: "Les champs 'content' et 'userId' sont requis." });
  }

  db.run("INSERT INTO citations (contenu, publication, userId) VALUES (?, ?, ?)", 
  [texte, new Date(Date.now()), idDiscord], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json({ message: "Citation ajoutée", id: this.lastID });
  });
};

citationController.favoriteCitation = async (req, res) => {
  const { idCitation, idDiscord } = req.body;
  if (!idCitation || !idDiscord) {
    return res.status(400).json({ error: "Les champs 'idCitation' et 'userId' sont requis." });
  }
  db.get("SELECT * FROM users WHERE idDiscord = ?", [idDiscord], (err, row) => {
    if (!err) {
      jwt.verify(row.token, process.env.CLE, (err, decoded) => {
        if (!err) {
          console.log(decoded.idDiscord);
          console.log(row.idDiscord);
          if (decoded.idDiscord == row.idDiscord){
            db.run("INSERT INTO favoris (userId, citationId) VALUES (?, ?)", 
            [idDiscord, idCitation], function(err) {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
              res.status(200).json({ message: "Favoris ajoutée", id: idCitation });
            });
          }
        }
      });
    }  
  });
}

// Contrôleur pour obtenir les citations favorites d'un utilisateur par son identifiant Discord
citationController.getUserFavorites = (req, res) => {
  const idDiscord = req.params.id;
  if (!idDiscord) {
    return res.status(400).json({ error: "L'identifiant Discord est requis dans les paramètres de la requête." });
  }
  db.get("SELECT * FROM users WHERE idDiscord = ?", [idDiscord], (err, row) => {
    if (!err) {
      jwt.verify(row.token, process.env.CLE, (err, decoded) => {
        if (!err) {
          console.log(decoded.idDiscord);
          console.log(row.idDiscord);
          if (decoded.idDiscord == row.idDiscord){
            // Utilisez une requête SQL pour récupérer les citations favorites de l'utilisateur
            const query = `
              SELECT citations.id, citations.contenu, citations.publication
              FROM citations
              JOIN favoris ON citations.id = favoris.citationId
              JOIN users ON users.idDiscord = favoris.userId
              WHERE users.idDiscord = ?
            `;

            db.all(query, [idDiscord], (err, rows) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }

              res.json(rows);
            });
          }
        }
      });
    }
  });
}

citationController.getSpecificCitation = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "L'identifiant Citation est requis dans les paramètres de la requête." });
  }

  db.get("SELECT * FROM citations WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ error: "Citation non trouvé." });
    }

    res.status(200).json(row);
  });
};

module.exports = citationController;