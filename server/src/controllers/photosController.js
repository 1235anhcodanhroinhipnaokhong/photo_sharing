const Photo = require('../db/photoModel');

exports.getPhotosByUserId = async (req, res) => {
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
