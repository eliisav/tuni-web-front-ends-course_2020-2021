
// == DO NOT CHANGE THESE THREE LINES
const { basename } = require('path')
const dataPath = basename(__dirname) === 'your-solution' ? '../..' : '../../..'
let { authors, books } = require(`${dataPath}/library-data`)
// ==

// == ENTER COMMIT SHA OF YOUR REPO IN HERE 
const commitSHA = 'commit-sha-in-here';


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
  }
}


// == DO NOT CHANGE THIS LINE
module.exports = { resolvers, commitSHA }
// ==
