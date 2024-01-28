const express = require('express');
const router = express.Router();
const userController = require('../controlleurs/utilisateur_controlleur');

router.get('/login/redirect', userController.loginRedirect);

// Renvoie le profile
router.get('/profile', userController.getUserProfile);

module.exports = router;
