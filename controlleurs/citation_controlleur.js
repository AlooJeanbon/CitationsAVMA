// controllers/citationController.js
const Citation = require('../models/citation');
const User = require('../models/utilisateur');

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
  console.log(req);
  // On récupre l'utilisateur connecté
  const discordId = req.user.discordId;
  const author = await User.findOne({ discordId: discordId });
  console.log(discordId);

  const citation = new Citation({
    author: author._id,
    text : "Rien n'est vrai tout est permis",
  });

  try {
    const newCitation = await citation.save();
    res.status(201).json(newCitation);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout de la citation' });
  }
};

citationController.addTest = async (req, res) => {

    // On récupre l'utilisateur connecté
    const discordId = req.user.discordId;
    
    const author = await User.findOne({ discordId: discordId });
    console.log(author);
  
    const citation = new Citation({
      author: author._id,
      text : "Hum bizarre ce jeu2",
    });
  
    //console.log(citation);
    
    try {
    const newCitation = await citation.save();
    res.status(201).json(newCitation);
    
  } catch (error) {
    res.status(400).json({ message: "Citation ajouté avec succès" });
  }
};

citationController.favoriteCitation = async (req, res) => {
  try {
    // On récupre l'utilisateur connecté
    const discordId = req.user.discordId;
    const user = await User.findOne({ discordId });

    // On récupère l'id de citation
    const citationId = req.params.citationId;

    // On ajoute la citation aux favoris
    user.favorites.push(citationId);
    await user.save();

    // Réponse indiquant que la citation a été marquée comme favorite
    res.status(200).json({ message: 'Citation marquée comme favorite avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

citationController.getUserFavorites = async (req, res) => {
  try {
    // On récupre l'utilisateur connecté
    const discordId = req.user.discordId;
    const user = await User.findOne({ discordId });

    // On récupre ces citations favoris
    const favorites = await Citation.find({ _id: { $in: user.favorites } });

    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = citationController;