
import { gql } from '@apollo/client'

// Stage 1
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

// Stage 2
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      genres
    }
  }
`

// Stage 3
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
    }
  }
`

// Stage 4

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ) {
      name
    }
  }
`

// Stage 6

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

// Stage 10 

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author
    }
  }
`
