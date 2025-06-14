import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql `
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql `
{
  allBooks { 
    title 
    author
    published 
    genres
  }
}
`

export const CREATE_BOOK = gql `
mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author
  }
}
`

export const EDIT_AUTHOR = gql `
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, setBornTo: $born) {
    name
    born
  }
}
`