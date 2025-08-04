const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');

// Create Post
router.post('/', auth, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const post = await Post.create({
      userId: req.user.id,
      title,
      content,
      tags,
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Get User's Posts
router.get('/', auth, async (req, res) => {
  const posts = await Post.find({ userId: req.user.id });
  res.json(posts);
});

// Update Post
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Post.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Delete Post
router.delete('/:id', auth, async (req, res) => {
  try {
    await Post.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

module.exports = router;
