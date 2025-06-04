const express = require('express');
const Photo = require('../db/photoModel');
const { getPhotosByUserId } = require('../controllers/photosController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', async (request, response) => {});

router.get('/:userId', authenticateToken, getPhotosByUserId);
module.exports = router;
