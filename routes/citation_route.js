const express = require('express');
const router = express.Router();
const citationController = require('../controlleurs/citation_controlleur');


// Get all citations
router.get('/', citationController.getAllCitations);

// Get all citations of user
router.get('/user/:id', citationController.getAllCitations);

// Add a new citation
router.post('/add', citationController.addTest);

router.get('/re1', citationController.addTest);

// Get a specific citation
router.get('/:id', citationController.getSpecificCitation);

// Favorite a citation
router.post('/favorite/:id', citationController.favoriteCitation);

// Get user's favorite citations
router.get('/favorites', citationController.getUserFavorites);

module.exports = router;