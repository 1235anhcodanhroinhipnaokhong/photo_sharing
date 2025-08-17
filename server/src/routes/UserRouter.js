const express = require('express');
const User = require('../db/userModel');
const {
  getUsersList,
  getUserDetail,
} = require('../controllers/usersController');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { getPostDetail } = require('../controllers/postsController');
router.get('/:userId/posts', authenticateToken, getPostDetail);
router.get('/', authenticateToken, getUsersList);
router.get('/:userId', authenticateToken, getUserDetail);
module.exports = router;
