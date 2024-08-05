import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

import { resolvers, typeDefs } from "./schema.js"

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers })

  const { url } = await startStandaloneServer(server)

  console.log(`
      🚀  Server is runningnew
      📭  Query at ${url}
    `)
}

startApolloServer()
