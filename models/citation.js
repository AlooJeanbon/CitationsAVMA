const mongoose = require('mongoose');

const citationSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});

const Citation = mongoose.model('Citation', citationSchema);

module.exports = Citation;