// script/hashPasswords.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../db/userModel');
const dbConnect = require('../db/dbConnect');
dbConnect();
async function hashPasswords() {
  const users = await User.find();
  for (const user of users) {
    if (!user.password.startsWith('$2')) {
      // nếu chưa hash
      user.password = await bcrypt.hash(user.password, 10);
      await user.save();
      console.log(`✔️ Hashed for ${user.login_name}`);
    }
  }
  mongoose.disconnect();
}

hashPasswords();
