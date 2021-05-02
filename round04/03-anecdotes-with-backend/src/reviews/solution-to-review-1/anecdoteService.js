import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = (anecdote) => {
  const request = axios.post(baseUrl, anecdote)
  return request.then(response => response.data)
}

const update = (anecdote) => {
  const request = axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return request.then(response => response.data)
}

export default {
  getAll,
  createNew,
  update
}
