
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()

const axios = require('axios');

const blogsURL = 'http://localhost:3004/blogs';
const usersURL = 'http://localhost:3004/users';

blogsRouter.get('/', async (request, response) => {

  const res = await axios.get(`${blogsURL}?_expand=user`);
  response.json(res.data);

})


blogsRouter.post('/', async (request, response, next) => {

  try {

    const { token } = request
    // console.log('token', token)

    // --
    // 2021-03-30 / TiM
    // const decodedToken = jwt.verify(token, process.env.SECRET)
    let decodedToken;
    try {
      // causes exception (JsonWebTokenError), if fails 
      decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (error) {
      // just continue
    }
    // -- 

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const userRes = await axios.get(`${usersURL}?id=${decodedToken.id}`);
    const user = userRes.data[0];

    if (!user || user.username !== decodedToken.username) {
      return response.status(401).json({ error: 'user missing or invalid' })
    }

    const blog = {
      ...request.body,
      // likes: 0,
      userId: user.id
    }

    const { data: savedBlog } = await axios.post(blogsURL, blog);

    response.status(201).json({
      ...savedBlog, user
    })

  }
  catch (error) { next(error) }

})


blogsRouter.delete('/:id', async (request, response, next) => {
  try {

    const { token } = request
    const { id } = request.params;

    // --
    // 2021-03-30 / TiM
    // const decodedToken = jwt.verify(token, process.env.SECRET)
    let decodedToken;
    try {
      // causes exception (JsonWebTokenError), if fails 
      decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (error) {
      // just continue
    }
    // -- 

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const { data: blog, status: getStatus } = await axios.get(`${blogsURL}/${id}`)

    if (getStatus !== 200) {
      return response.status(getStatus).end()
    }

    if (!decodedToken.id || blog.userId !== decodedToken.id) {
      return response.status(401).json({ error: 'unauthorized user' })
    }

    const { status: deleteStatus } = await axios.delete(`${blogsURL}/${id}`);
    response.status(deleteStatus === 200 ? 204 : deleteStatus).end();

  }
  catch (error) { next(error) }
})


blogsRouter.put('/:id', async (request, response, next) => {

  //TODO token check in here

  const { id } = request.params

  // --
  // 2021-04-26 / TiM
  // const { likes } = request.body
  const { likes, comments } = request.body
  // -- 

  try {

    // --
    // 2021-04-26 / TiM
    // const updatedBlog = await axios.patch(`${blogsURL}/${id}`, { likes })
    const updatedBlog = await axios.patch(`${blogsURL}/${id}`, { likes, comments })
    // -- 

    response.json(request.body)
  }
  catch (error) { next(error) }

})

module.exports = blogsRouter
