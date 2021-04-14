import axios from 'axios'

const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const postBlog = (newBlog, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  }

  return axios.post(baseUrl, newBlog, config)
}

const login = (newUser) => {
  return axios.post(loginUrl, newUser)
}

const likeBlog = (newBlog, id) => {
  return axios.put(`${baseUrl}/${id}`, newBlog)
}

const deleteBlog = (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  }

  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, postBlog, login, likeBlog, deleteBlog }
