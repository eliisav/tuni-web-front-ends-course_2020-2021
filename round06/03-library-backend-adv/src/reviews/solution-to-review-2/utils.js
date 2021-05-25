
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const PASSWORD = 'secret'

const validateUser = (username, users) => {
  return typeof username === 'string'
    && username.length >= 3
    && !users.find(user => user.username === username)
}

const validateGenre = genre => {
  return typeof genre === 'string'
    && genre.length >= 3
}

const validateLogin = (username, password, users) => {
  return password === PASSWORD
    && users.find(user => user.username === username)
}

const getToken = user => {
  const { username, id } = user
  return jwt.sign({ username, id }, JWT_SECRET)
}

const getCurrentUser = (token, users) => {
  let userFromToken
  try {
    userFromToken = jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return
  }
  return userFromToken && users.find(user => user.id === userFromToken.id)
}

module.exports = {
  validateUser,
  validateGenre,
  validateLogin,
  getToken,
  getCurrentUser
}
