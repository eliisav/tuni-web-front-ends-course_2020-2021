
/*******************************
           DO NOT TOUCH         
 *******************************/

const { ApolloServer } = require('apollo-server')

const { LIBRARY_APP } = process.env
let appDir 

switch (LIBRARY_APP) {

  case 'solution-to-review-1': case 'solution-to-review-2': {
    appDir = `reviews/${LIBRARY_APP}`
    break
  }

  case 'your-solution': default: {
    appDir = 'your-solution'
  }
}

const { typeDefs } = require(`${__dirname}/${appDir}/library-schema`)
const { resolvers, commitSHA } = require(`${__dirname}/${appDir}/library-resolvers`)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      return {token: auth.substring(7)}
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`>>>\n>>> ${LIBRARY_APP || 'your-solution:'} [ ${commitSHA} ] \n>>>`)
  console.log(`server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})

