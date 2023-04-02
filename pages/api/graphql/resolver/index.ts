import { PrismaClient } from '@prisma/client'
import { Resolvers } from '../types/graphql'

const prisma = new PrismaClient()

export const resolvers: Resolvers = {
  Query: {
    user: async (_, args) => {
      const result = await prisma.user.findUnique({
        where: {
          id: String(args.id),
        },
      })
      return result
    },
    // TODO: Fix ts error, or maybe issue? ref: https://github.com/dotansimha/graphql-code-generator/issues/3174
    task: async (_, args) => {
      const result = await prisma.task.findUnique({
        where: {
          id: String(args.id),
        },
      })
      return result
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const { name, email } = args.input
      const result = await prisma.user.create({
        data: {
          name,
          email,
        },
      })
      return result
    },
  },
}
