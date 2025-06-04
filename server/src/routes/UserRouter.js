const express = require('express');
const User = require('../db/userModel');
const {
  getUsersList,
  getUserDetail,
} = require('../controllers/usersController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', async (request, response) => {});
router.get('/', authenticateToken, getUsersList);
router.get('/:userId', authenticateToken, getUserDetail);
module.exports = router;
