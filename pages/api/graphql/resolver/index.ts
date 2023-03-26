import { PrismaClient } from '@prisma/client'
import { Resolvers } from '../types/graphql'

const prisma = new PrismaClient()

export const resolvers: Resolvers = {
  Query: {
    user: async (_, args) => {
      const result = await prisma.user.findUnique({
        where: {
          id: Number(args.id),
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
