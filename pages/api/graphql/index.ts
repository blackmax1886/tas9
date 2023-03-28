import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { resolvers } from './resolver'

const typeDefs = loadSchemaSync('pages/api/graphql/schema/root.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

//TODO: GraphQLResolveInfo does not match BaseContext
// @ts-expect-error to be fixed
export default startServerAndCreateNextHandler(server)