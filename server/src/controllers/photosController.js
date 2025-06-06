const Photo = require('../db/photoModel');

const getPhotosByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const photos = await Photo.find({ user_id: userId })
      .populate('user_id', 'first_name last_name') // người đăng ảnh
      .populate('comments.user_id', 'first_name last_name') // người comment
      .lean();

    // Định dạng lại dữ liệu để frontend dễ dùng hơn
    const formattedPhotos = photos.map((photo) => {
      return {
        _id: photo._id,
        file_name: photo.file_name,
        date_time: photo.date_time,
        user: photo.user_id, // người đăng ảnh
        comments: photo.comments.map((comment) => ({
          comment: comment.comment,
          date_time: comment.date_time,
          user: comment.user_id, // người bình luận
        })),
      };
    });

    res.status(200).json(formattedPhotos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).send('Internal Server Error');
  }
};

const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newPhoto = new Photo({
      file_name: req.file.filename,
      user_id: req.user.userId,
      date_time: new Date(),
    });

    await newPhoto.save();
    res
      .status(201)
      .json({ message: 'Photo uploaded', filename: req.file.filename });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed', error: err });
  }
};

const uploadComment = async (req, res) => {
  try {
    const { photoId, comment } = req.body;
    const userId = req.user.userId;

    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    photo.comments.push({
      comment,
      user_id: userId,
      date_time: new Date(),
    });

    await photo.save();
    res.status(201).json({ message: 'Comment added' });
    console.log('comment ok');
  } catch (err) {
    res.status(500).json({ message: 'Comment failed', error: err.message });
  }
};

const editComment = async (req, res) => {
  try {
    const { photoId, commentId } = req.params;
    const { newComment } = req.body;
    const userId = req.user.userId;

    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    const comment = photo.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user_id.toString() !== userId) {
      return res.status(403).json({ message: 'Not your comment' });
    }

    comment.comment = newComment;
    await photo.save();

    res.status(200).json({ message: 'Comment updated', comment });
  } catch (error) {
    res.status(500).json({ message: 'Edit failed', error: error.message });
  }
};
// const editPhoto = async (req, res) => {
//   if (!req.body.newPhoto) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }
//   try {
//     const { photoId } = req.params;
//     const { newPhoto } = req.body;
//     const photo = await Photo.findById(photoId);
//     photo.file_name = newPhoto.file_name;
//     photo.date_time = new Date();
//     await photo.save();
//   } catch (error) {
//     res.status(500).json({ message: 'Edit failed', error: error.message });
//   }
// };
// controllers/photoController.js
const editPhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // Update file_name và date_time
    photo.file_name = file.filename;
    photo.date_time = new Date();
    await photo.save();

    res.status(200).json({ message: 'Photo updated', filename: file.filename });
  } catch (error) {
    res.status(500).json({ message: 'Edit failed', error: error.message });
  }
};

module.exports = {
  getPhotosByUserId,
  uploadPhoto,
  uploadComment,
  editComment,
  editPhoto,
};
