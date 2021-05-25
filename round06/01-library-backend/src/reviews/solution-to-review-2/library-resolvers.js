
// == DO NOT CHANGE THESE THREE LINES
const { basename } = require('path')
const dataPath = basename(__dirname) === 'your-solution' ? '../..' : '../../..'
let { authors, books } = require(`${dataPath}/library-data`)
// ==

const { v1: uuid } = require('uuid')

// == ENTER COMMIT SHA OF YOUR REPO IN HERE 
const commitSHA = 'b5bdaff';


const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => books
      .filter(b => args.author === undefined ? true: b.author === args.author)
      .filter(b => args.genre === undefined ? true: b?.genres?.includes(args.genre)),
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => {
      return books.reduce((acc, cur) => cur.author === root.name ? acc + 1 : acc, 0)
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, id: uuid() }
      books = books.concat(newBook)
      const newAuthor = { name: args.author, id: uuid() }
      authors = authors.map(a => a.name).includes(args.author) ? authors : authors.concat(newAuthor)
      return newBook
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }
}


// == DO NOT CHANGE THIS LINE
module.exports = { resolvers, commitSHA }
// ==
