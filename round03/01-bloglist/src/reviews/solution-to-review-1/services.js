import axios from 'axios'

const baseUrl = '/api'
const blogsUrl = `${baseUrl}/blogs`
const loginUrl = `${baseUrl}/login`

let token = null

const getAll = async () =>
{
  const response = await axios.get(blogsUrl)
  return response.data
}

const resetToken = () =>
{
  token = null
}

const setToken = newToken =>
{
  if(newToken && newToken.length)
  {
    token = `bearer ${newToken}`
  }
  else
  {
    resetToken()
  }
}

const login = async credentials =>
{
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

const postBlog = async (blog) =>
{
  const response = await axios.post(
    blogsUrl,
    blog,
    { headers: { 'Authorization': token } })

  return response

}

const likeBlog = async (blog) =>
{
  const data =
  {
    user: blog.user.id,
    likes: blog.likes ? blog.likes + 1 : 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  const response = await axios.put(
    `${blogsUrl}/${blog.id}`,
    data,
    { headers: { 'Authorization': token } })

  if(response.status === 200)
  {
    blog.likes++
  }

  return response
}

const deleteBlog = async (blog) =>
{
  const response = await axios.delete(
    `${blogsUrl}/${blog.id}`,
    { headers: { 'Authorization': token } })

  return response
}

export default { getAll, login, setToken, postBlog, likeBlog, deleteBlog }
