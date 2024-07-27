const axios = require('axios').default;

async function fetchAllUsers() {
  const { data: users } = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );

  return users;
}

async function fetchUserById(userId) {
  const { data: user } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  if (user) {
    return {
      user,
    };
  }
  return null;
}

module.exports = { fetchAllUsers, fetchUserById };
