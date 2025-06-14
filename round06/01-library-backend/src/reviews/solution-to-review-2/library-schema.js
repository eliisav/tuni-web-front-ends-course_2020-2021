
const { gql } = require('apollo-server')


const typeDefs = gql`
  type Book {
    id: String!
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }

  type Author {
    id: String!
    name: String!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`


module.exports = { typeDefs }

