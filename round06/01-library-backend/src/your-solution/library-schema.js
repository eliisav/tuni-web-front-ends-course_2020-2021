
const { gql } = require('apollo-server')


const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
  }
`


module.exports = { typeDefs }

