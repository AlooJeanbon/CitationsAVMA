// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  tokenExpiresAt: { type: Date, required: true },
  isAdmin: { type: Boolean, default: false },
  favoriteCitations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Citation' }],
  authoredCitations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Citation' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
