import axios from 'axios'

//
// blogService
// 

const blogsURL = '/api/blogs'
let token = null

export const blogService = {

  setToken: newToken => {
    token = `bearer ${newToken}`
  },

  getAll: () => {
    const request = axios.get(blogsURL)
    return request.then(response => response.data)
  },

  create: newObject => {

    const config = {
      headers: { Authorization: token },
    }

    return axios
      .post(blogsURL, newObject, config)
      .then(response => response.data)
  },

  update: (id, newObject) => {

    const config = {
      headers: { Authorization: token },
    }

    return axios
      .put(`${blogsURL}/${id}`, newObject, config)
      .then(response => response.data)
  },

  remove: id => {

    const config = {
      headers: { Authorization: token },
    }

    return axios
      .delete(`${blogsURL}/${id}`, config)
  },

  addComment: async (id, comment) => {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(
      `${blogsURL}/${id}/comments`,
      comment,
      config,
    )
    return response.data
  }

}

//
// loginService
// 

const loginURL = '/api/login'

export const loginService = {

  login: async credentials => {
    const response = await axios.post(loginURL, credentials)
    return response.data
  }

}

const getAll = async () => {
  const response = await axios.get('/api/users')
  return response.data
}

export default { getAll }


