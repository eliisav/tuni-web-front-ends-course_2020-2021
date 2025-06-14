
import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query{
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query{
    allBooks {
      title,
      author,
      published,
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $year: Int!, $genres: [String]!) {
    addBook(
      title: $title,
      author: $author,
      published: $year,
      genres: $genres
    ) {
      title
      author
      published
      id
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
      bookCount
      id
    }
  }
`
