const express = require('express');
const Photo = require('../db/photoModel');
const {
  getPhotosByUserId,
  uploadPhoto,
  uploadComment,
  editComment,
  editPhoto,
} = require('../controllers/photosController');
const router = express.Router();
const { authenticateToken, upload } = require('../middleware/authMiddleware');
router.get('/:userId', authenticateToken, getPhotosByUserId);
router.post('/upload', upload.single('image'), authenticateToken, uploadPhoto);
router.post(
  '/edit-photo/:photoId',
  upload.single('image'),
  authenticateToken,
  editPhoto
);
router.post('/add-comment/:photoId', authenticateToken, uploadComment);
router.put('/edit-comment/:photoId/:commentId', authenticateToken, editComment);
router.put('/edit-photo', authenticateToken);
module.exports = router;
