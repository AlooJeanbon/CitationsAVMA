const express = require('express');
const router = express.Router();
const citationController = require('../controlleurs/citation_controlleur');


// Get all citations
router.get('/', citationController.getAllCitations);

// Get all citations of user
router.get('/user/:id', citationController.getAllCitationsOfUser);

// Add a new citation
router.post('/add', citationController.addNewCitation);

router.get('/re1', citationController.addTest);

// Get user's favorite citations
router.get('/favorites/:id', citationController.getUserFavorites);

// Favorite a citation
router.post('/favorite', citationController.favoriteCitation);

// Get a specific citation
router.get('/:id', citationController.getSpecificCitation);

module.exports = router;