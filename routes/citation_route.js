const express = require('express');
const router = express.Router();
const citationController = require('../controlleurs/citation_controlleur');


// Renvoie toutes les citations
router.get('/', citationController.getAllCitations);

// Renvoie les citations d'un utilisateur
router.get('/user/:id', citationController.getAllCitationsOfUser);

// Ajoute une citation
router.post('/add', citationController.addNewCitation);

// Renvoie les citations favorites d'un utilisateur
router.get('/favorites/:id', citationController.getUserFavorites);

// Ajoute une citation en favoris
router.post('/favorite', citationController.favoriteCitation);

// Renvoie une citation
router.get('/:id', citationController.getSpecificCitation);

module.exports = router;