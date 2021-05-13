
// == DO NOT CHANGE THESE THREE LINES
const { basename } = require('path')
const dataPath = basename(__dirname) === 'your-solution' ? '../..' : '../../..'
let { authors, books } = require(`${dataPath}/library-data`)
// ==

// == ENTER COMMIT SHA OF YOUR REPO IN HERE 
const commitSHA = 'commit-sha-in-here';


const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
  }
}


// == DO NOT CHANGE THIS LINE
module.exports = { resolvers, commitSHA }
// ==
