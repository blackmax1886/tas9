import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

const typeDefs = loadSchemaSync('pages/api/graphql/schema/root.graphql', {
  loaders: [new GraphQLFileLoader()],
})

export default typeDefs
