// controllers/citationController.js
const Citation = require('../models/citation');

const citationController = {};

citationController.getAllCitations = async (req, res) => {
  try {
    const citations = await Citation.find();
    res.json(citations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

citationController.getSpecificCitation = async (req, res) => {
  try {
    const citation = await Citation.findById(req.params.id);
    res.json(citation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

citationController.addNewCitation = async (req, res) => {
  const citation = new Citation({
    discordId: req.user.discordId, // récupération de l'id de l'utilisateur connecté
    text: req.body.text,
  });

  try {
    const newCitation = await citation.save();
    res.status(201).json(newCitation);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout de la citation' });
  }
};

citationController.favoriteCitation = async (req, res) => {
  try {
    const user = req.user;
    user.favoriteCitations.push(req.params.id);
    await user.save();
    res.json({ message: 'Citation favorited successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

citationController.getUserFavorites = async (req, res) => {
  try {
    const user = req.user;
    await user.populate('favoriteCitations').execPopulate();
    res.json(user.favoriteCitations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = citationController;