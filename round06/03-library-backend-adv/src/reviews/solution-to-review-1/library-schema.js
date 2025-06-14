
const { gql } = require('apollo-server')


const typeDefs = gql`
  type Book {
    title: String!,
    published: Int!,
    author: String!,
    id: String!,
    genres: [String!]!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me(token: String): User
    allUsers: [User!]!
    bookAdded(token: String): [Book!]!
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!,
      token: String!
    ): Book
    editAuthor(
      name: String!, 
      setBornTo: Int!,
      token: String!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`


module.exports = { typeDefs }

