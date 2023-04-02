import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { resolvers } from './resolver'
import dateScalar from './resolver/dateScalar'

const typeDefs = `#graphql
scalar Date

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
  userId: String
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
  userId: String!
  name: String!
  content: String
}

type Query {
  user(id: String!): PrismaUser
  tasks(userId: String!): [Task!]!
  task(id: String!): Task
}

type Mutation {
  createUser(input: NewUser!): PrismaUser!
  createTask(input: NewTask!): Task!
}
`

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Date: dateScalar,
    ...resolvers,
  },
})

//TODO: GraphQLResolveInfo does not match BaseContext
// @ts-expect-error to be fixed
export default startServerAndCreateNextHandler(server)
