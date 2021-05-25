
// == DO NOT CHANGE THESE THREE LINES
const { basename } = require('path')
const dataPath = basename(__dirname) === 'your-solution' ? '../..' : '../../..'
let { authors, books } = require(`${dataPath}/library-data`)
// ==
const { v1: uuid } = require('uuid')
const { UserInputError } = require('apollo-server')
// == ENTER COMMIT SHA OF YOUR REPO IN HERE 
const commitSHA = '682e666';


const resolvers = {
  Query: {                            
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (_, args) => {

      if (args.author && args.genre) {
        return books.filter(book => book.author === args.author && book.genres.includes(args.genre))
      }

      if (args.author) {
        return books.filter(book => book.author === args.author) 
      }

      if (args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      }

      return books
    },
    allAuthors: () => authors,
  },

  Author: {    
    bookCount: (root) => {
      const foundBooks = books.filter(book => book.author === root.name) 
      return foundBooks.length
    }
  },
 
  Mutation: {
    addBook: (_, args) => {
      const book = { ...args, id: uuid() }
      if (books.find(book => book.title === args.title)) {
        throw new UserInputError('Book already exists', {
          invalidArgs: args.title,
        })
      }
      books = books.concat(book)
      return book
    },
    editAuthor: (_, args) => {
      const author = authors.find(p => p.name === args.name)
      if (!author) {
        return null
      }
  
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(p => p.name === args.name ? updatedAuthor : p)
      return updatedAuthor
    }
  
  }
}

// == DO NOT CHANGE THIS LINE
module.exports = { resolvers, commitSHA }
// ==
