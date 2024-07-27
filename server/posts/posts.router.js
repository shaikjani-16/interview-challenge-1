const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { start, limit } = req.query;

    const posts = await fetchPosts({
      start: parseInt(start),
      limit: parseInt(limit),
    });

    const Post_Images = async post => {
      try {
        const photosResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`,
        );
        const photos = photosResponse.data;

        const user = await fetchUserById(post.userId);
        const userName = user ? user.user.name : 'Unknown';
        const email = user ? user.user.email : 'Unknown';

        return {
          ...post,
          images: photos.map(photo => ({ url: photo.url })),
          userName,
          email,
        };
      } catch (error) {
        console.error(
          `Error fetching photos or user for post ${post.id}:`,
          error,
        );

        return {
          ...post,
          images: [],
          userName: 'Unknown',
          email: 'Unknown',
        };
      }
    };

    const postsWithImages = [];
    for (const post of posts) {
      const completedPost = await Post_Images(post);
      postsWithImages.push(completedPost);
    }

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
