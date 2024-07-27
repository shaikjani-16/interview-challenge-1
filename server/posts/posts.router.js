const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { start, limit } = req.query;
    console.log('start in router', start, 'limit in router', limit);

    const posts = await fetchPosts({
      start: parseInt(start),
      limit: parseInt(limit),
    });
    const postsWithImagesAndUsers = await Promise.all(
      posts.map(async post => {
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
            userEmail: 'Unknown',
          };
        }
      }),
    );

    res.json(postsWithImagesAndUsers);
  } catch (error) {
    console.error('Error fetching posts or photos:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
