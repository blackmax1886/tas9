import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { resolvers } from './resolver'

//TODO: User id is string & add models for nextauth
const typeDefs = `#graphql
type PrismaUser {
  id: ID!
  name: String
  email: String!
}

input NewUser {
  name: String
  email: String!
}
type Task {
  id: ID!
  userId: Int
  name: String!
  content: String
  done: Boolean!
  due: String
  start: String
  end: String
  group: String
  type: String
  priority: String
  archived: Boolean!
}

input NewTask {
  name: String!
  content: String
  userId: Int!
}

type Query {
  user(id: Int!): PrismaUser
  tasks(userId: Int!): [Task!]!
  task(id: Int!): Task!
}

type Mutation {
  createUser(input: NewUser!): PrismaUser!
  createTask(input: NewTask!): Task!
}
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

//TODO: GraphQLResolveInfo does not match BaseContext
// @ts-expect-error to be fixed
export default startServerAndCreateNextHandler(server)
