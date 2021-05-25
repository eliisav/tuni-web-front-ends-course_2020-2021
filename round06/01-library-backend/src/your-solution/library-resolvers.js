
// == DO NOT CHANGE THESE THREE LINES
const { basename } = require('path')
const dataPath = basename(__dirname) === 'your-solution' ? '../..' : '../../..'
let { authors, books } = require(`${dataPath}/library-data`)
// ==

const { v1: uuid } = require('uuid')

// == ENTER COMMIT SHA OF YOUR REPO IN HERE 
const commitSHA = '4b7e13b';


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
  },

  Mutation: {
    addBook: (root, args) => {
      if (authors.find(a => a.name === args.author) === undefined) {
        authors = authors.concat({ name: args.author, id: uuid() })
      }
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book
    },

    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)

      if (author === undefined) {
        return null
      }
      const updated = {...author, born: args.setBornTo}
      authors = authors.map(a => a.id !== updated.id ? a : updated)
      return updated
    }
  },
}


// == DO NOT CHANGE THIS LINE
module.exports = { resolvers, commitSHA }
// ==
