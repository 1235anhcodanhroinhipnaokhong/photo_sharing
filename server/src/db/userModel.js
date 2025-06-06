const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login_name: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Có thể hash sau
  first_name: { type: String },
  last_name: { type: String },
  location: { type: String },
  description: { type: String },
  occupation: { type: String },
});
const User = mongoose.model.Users || mongoose.model('Users', userSchema);
module.exports = User;
