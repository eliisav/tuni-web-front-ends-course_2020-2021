
// == DO NOT CHANGE THESE THREE LINES
const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid');
const { basename } = require('path')
const dataPath = basename(__dirname) === 'your-solution' ? '../..' : '../../..'
let { authors, books, users } = require(`${dataPath}/library-data`)
const {
  validateUser,
  validateGenre,
  validateLogin,
  getToken,
  getCurrentUser } = require('./utils')
const jwt = require('jsonwebtoken')  
// ==

// == ENTER COMMIT SHA OF YOUR REPO IN HERE 
const commitSHA = 'dbc9b09';
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const allAuthors = () => {
  return authors.map(author => {
    const count = books.filter(book => book.author === author.name).length;
    return {
      ...author,
      bookCount: count
    }
  })
}

const allBooks = (root, args) => {
  let returnedBooks = books

  if(args.author) {
    returnedBooks = returnedBooks.filter(book => book.author === args.author)
  }
  if(args.genre) {
    returnedBooks = returnedBooks.filter(book => book.genres.includes(args.genre))
  }
  return returnedBooks
}

const bookAdded = (root, args) => {
  const user = getCurrentUser(args.token, users)
  return books.filter(book => book.genres.includes(user.favoriteGenre))
}

const addBook = (root, args) => {
  if(!jwt.verify(args.token, JWT_SECRET)){
    return null
  }

  const book = { ...args, id: uuid() }
  const authorsName = authors.map(author => author.name)
  if(!authorsName.includes(book.author)) {
    const newAuthor = {
      name: book.author,
      id: uuid()
    }
    authors = authors.concat(newAuthor)
  }
  books = books.concat(book)
  return book
}

const editAuthor = (root, args) => {
  if(!jwt.verify(args.token, JWT_SECRET)){
    return null
  }

  let authorscopy = authors
  let author = null
  for (var i in authorscopy) {
    if (authorscopy[i].name == args.name) {
       authorscopy[i].born = args.setBornTo;
       author = authorscopy[i]
       break; 
    }
  }
  authors = authorscopy
  return author
}

const me = (root, args) => {
  const currentUser = getCurrentUser(args.token, users)
  return currentUser
}

const login = (root, args) => {
  if(validateLogin(args.username, args.password, users)) {
    const user = users.filter(user => user.username === args.username)[0]
    const token = getToken(user)
    return {value: token}
  }
}

const createUser = (root, args) => {  
   const newUser = {
    username: args.username,
    favoriteGenre: args.favoriteGenre
  } 
  if(validateUser(args.username, users) && validateGenre(args.favoriteGenre)){
    users = users.concat(newUser) 
  }
  
  return newUser
}


const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: allBooks,
    allAuthors: allAuthors,
    allUsers: () => users,
    me: me,
    bookAdded: bookAdded
  },

  Mutation: {
    addBook: addBook,
    editAuthor: editAuthor,
    createUser: createUser,
    login: login
  }
}


// == DO NOT CHANGE THIS LINE
module.exports = { resolvers, commitSHA }
// ==
