
// == DO NOT CHANGE THESE LINES ==
const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid');
const { basename } = require('path')
const dataPath = basename(__dirname) === 'your-solution' ? '../..' : '../../..'
let { authors, books, users } = require(`${dataPath}/library-data`)
const {
  validateUser,
  validateGenre,
  validateLogin,
  getToken,
  getCurrentUser } = require('./utils');
const { JsonWebTokenError } = require('jsonwebtoken');
// ==

// == ENTER COMMIT SHA OF YOUR REPO IN HERE 
const commitSHA = 'c045b47d';

const pubsub = new PubSub();

const resolvers = {
  Query: {

    bookCount: () => books.length,

    authorCount: () => authors.length,

    allBooks: (root, args) => {
      if (args.author) {
        return books.filter(b => b.author === args.author);
      }

      if (args.genre) {
        return books.filter(
          b => b.genres.findIndex(g => g === args.genre) !== -1
        )
      }

      return books;
    },

    allAuthors: () => {
      return authors.map(author => {
        const bookCount = books.reduce(
          (a, book) => (book.author === author.name ? a + 1 : a), 0
          )
        return {
          name: author.name,
          id: author.id,
          born: author.born,
          bookCount
        }
      })
    },

    allUsers: () => users,

    // Used Postman to create POST request with correct auth bearer token
    me: (root, args, context) => {;

      return getCurrentUser(context.token, users);
    }
  },

  Mutation: {
    addBook: (root, args, context) => {

      if (!getCurrentUser(context.token, users)) {
        throw new UserInputError("You must login before adding new book");
      }

      if (!authors.find(author => author.name === args.author)) {
        const newAuthor = { name: args.author, id: 1, born: null }
        authors = authors.concat(newAuthor);
      }
      const book = { ...args };
      books = books.concat(book);

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },

    editAuthor: (root, args, context) => {

      if (!getCurrentUser(context.token, users)) {
        throw new UserInputError("You must login before you can edit author");
      }

      const author = authors.find(a => a.name === args.name);
      if (!author) {
        return null;
      }

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a);
      return updatedAuthor;
    },

    createUser: (root, args) => {

      const newUser = { ...args, id: uuid() };

      // Validata new user
      if (!validateUser(newUser.username, users)) {
        throw new UserInputError("Username is too short or user already exists!");
      }

      users = users.concat(newUser);

      return newUser;
    },

    login: (root, args) => {

      if (!validateLogin(args.username, args.password, users)) {
        throw new UserInputError("Username or password is incorrect.");
      }

      const user = users.find(u => u.username === args.username);

      const token = getToken(user);

      console.log("Logged in!");

      return {value: token};
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  }
}


// == DO NOT CHANGE THIS LINE
module.exports = { resolvers, commitSHA }
// ==
