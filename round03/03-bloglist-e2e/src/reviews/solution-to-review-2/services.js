import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token =`bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response =>  response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  //console.log('put-pyynnön id:',id)
  //console.log('put-pyynnön newObject:',newObject)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  console.log(response.data)
  return response.data
}
const remove = async (id) => {
  console.log('remove-pyynnön id:',id)

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response.data)
  return response.data
}

const login = async credentials => {
  const response = await axios.post('/api/login', credentials)
  console.log('loginservice response data: ',  response.data)
  return response.data
}
const blogService = { getAll, login, create, setToken, update, remove }

export default blogService
