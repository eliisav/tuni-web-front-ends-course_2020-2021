
// == DO NOT CHANGE THESE THREE LINES
const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid')
const { basename } = require('path')
const dataPath = basename(__dirname) === 'your-solution' ? '../..' : '../../..'
let { authors, books, users } = require(`${dataPath}/library-data`)
const {
  validateUser,
  validateGenre,
  validateLogin,
  getToken,
  getCurrentUser } = require('./utils')
// ==

const pubsub = new PubSub()

// == ENTER COMMIT SHA OF YOUR REPO IN HERE 
const commitSHA = '183f3d4';


const resolvers = {
  Author: {
    bookCount: (root) => books.filter(b => b.author === root.name).length
  },

  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      const foundBooks = (
        args.author ? books.filter(b => b.author === args.author) : books
      )
      return (
        args.genre
        ? foundBooks.filter(b =>b.genres.includes(args.genre) === true)
        : foundBooks
      )
    },
    allAuthors: () => authors,
    allUsers: () => users,
    me: (root, args, context) => {
      //console.log(context.token)
      return getCurrentUser(context.token, users)
    }
  },

  Mutation: {
    addBook: (root, args, context) => {
      if (!getCurrentUser(context.token, users)) {
        throw new AuthenticationError("not authenticated")
      }

      if (authors.find(a => a.name === args.author) === undefined) {
        authors = authors.concat({ name: args.author, id: uuid() })
      }

      const book = { ...args, id: uuid() }
      books = books.concat(book)
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },

    editAuthor: (root, args, context) => {
      if (!getCurrentUser(context.token, users)) {
        throw new AuthenticationError("not authenticated")
      }

      const author = authors.find(a => a.name === args.name)

      if (author === undefined) {
        return null
      }

      const updated = {...author, born: args.setBornTo}
      authors = authors.map(a => a.id !== updated.id ? a : updated)

      return updated
    },

    createUser: (root, args) => {
      if (!validateUser(args.username, users) || 
          !validateGenre(args.favoriteGenre)) {
        throw new UserInputError("invalid arguments", {invalidArgs: args})
      }

      const user = {
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        id: uuid()
      }

      users = users.concat(user)

      return user
    },

    login: (root, args) => {
      if (!validateLogin(args.username, args.password, users)) {
        throw new UserInputError("wrong credentials")
      }

      const user = users.find(u => u.username === args.username)

      const userForToken = {
        username: user.username,
        id: user.id,
      }

      return { value: getToken(userForToken) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}


// == DO NOT CHANGE THIS LINE
module.exports = { resolvers, commitSHA }
// ==
