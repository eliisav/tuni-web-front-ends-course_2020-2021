import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const delPerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const replace = (id, object) => {
    return axios.put(`${baseUrl}/${id}`, object)
}

export default { 
  getAll: getAll, 
  create: create,
  delPerson: delPerson,
  replace: replace
}