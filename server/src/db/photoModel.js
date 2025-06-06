const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  comment: String,
  date_time: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

const photoSchema = new mongoose.Schema({
  file_name: String,
  date_time: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  comments: [commentSchema],
});
const Photo = mongoose.model.Photos || mongoose.model('Photos', photoSchema);
const Comment =
  mongoose.model.Comments || mongoose.model('Comments', commentSchema);
module.exports = Photo;
