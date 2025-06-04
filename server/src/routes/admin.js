// routes/AdminRouter.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../db/userModel');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { login_name, password } = req.body;

  const user = await User.findOne({ login_name });
  if (!user) {
    return res.status(400).json({ message: 'Invalid login name' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Incorrect password' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(200).json({
    user: {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    token,
  });
});

module.exports = router;
