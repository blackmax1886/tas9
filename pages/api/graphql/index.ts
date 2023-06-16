import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { applyMiddleware } from 'graphql-middleware'
import { getSession } from 'next-auth/react'

import { resolvers } from './resolver'
import dateScalar from './resolver/dateScalar'
import permissions from './resolver/permissions'


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
  userId: ID!
  title: String!
  content: String
  done: Boolean!
  due: Date
  start: Date
  end: Date
  group: String
  type: String
  priority: Int
  archived: Boolean!
  createdAt: Date!
}

input NewTask {
  userId: ID!
  title: String!
  content: String
}

input UpdateTaskInput {
  title: String
  content: String
  done: Boolean
  due: Date
  start: Date
  end: Date
  group: String
  type: String
  priority: Int
  archived: Boolean
}

type Query {
  user(id: ID!): PrismaUser
  tasks(userId: ID!): [Task!]!
  task(id: ID!): Task
}

type Mutation {
  createUser(input: NewUser!): PrismaUser!
  deleteUser(id: ID!): PrismaUser
  createTask(input: NewTask!): Task!
  deleteTask(id: ID!): Task
  updateTask(id: ID!, input: UpdateTaskInput!): Task!
}

`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Date: dateScalar,
    ...resolvers,
  },
})

const schemaWithMiddleware = applyMiddleware(schema, permissions)

const server = new ApolloServer({schema:schemaWithMiddleware})

export default startServerAndCreateNextHandler(server, {
  context: async (req) => {
    const session = await getSession({req})
    return {session}
  }
})
