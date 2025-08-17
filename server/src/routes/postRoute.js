const express = require('express');
const { getPostDetail } = require('../controllers/postsController');
router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
router.get('/:userId', authenticateToken, getPostDetail);
module.exports = router;
