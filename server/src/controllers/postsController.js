const { Posts } = require('../db/data');
const getPostDetail = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = Posts.filter((post) => post.user_id === userId);
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPostDetail };
