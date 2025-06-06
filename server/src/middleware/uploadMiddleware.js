// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // lưu vào thư mục này
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // đặt tên file
  },
});

const upload = multer({ storage });
module.exports = upload;
