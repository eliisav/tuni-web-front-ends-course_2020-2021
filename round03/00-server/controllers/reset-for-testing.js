const router = require('express').Router()
const axios = require('axios');

const blogsURL = 'http://localhost:3004/blogs';
const usersURL = 'http://localhost:3004/users';

router.post('/reset', async (request, response) => {

  const { data: blogs } = await axios.get(blogsURL);
  const { data: users } = await axios.get(usersURL);

  for (let i = 0; i < blogs.length; i++) {
    await axios.delete(`${blogsURL}/${blogs[i].id}`);
  }

  for (let i = 0; i < users.length; i++) {
    await axios.delete(`${usersURL}/${users[i].id}`);
  }

  response.status(204).end()
})

module.exports = router
