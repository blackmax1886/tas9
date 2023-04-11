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
    tasks: async (_, args) => {
      const result = await prisma.task.findMany({
        where: {
          userId: String(args.userId),
        },
        // TODO:
        orderBy: { createdAt: 'desc' },
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
    createTask: async (_, args) => {
      const { userId, title, content } = args.input
      const result = await prisma.task.create({
        data: {
          userId,
          title,
          content,
          done: false,
          archived: false,
          createdAt: new Date(),
        },
      })
      return result
    },
    deleteTask: async (_, args) => {
      const result = await prisma.task.delete({
        where: {
          id: String(args.id),
        },
      })
      return result
    },
    updateTaskIsDone: async (_, args) => {
      const result = await prisma.task.update({
        where: { id: String(args.id) },
        data: { done: Boolean(args.isDone) },
      })
      return result
    },
    updateTaskContent: async (_, args) => {
      const result = await prisma.task.update({
        where: { id: String(args.id) },
        data: { content: String(args.content) },
      })
      return result
    },
    updateTaskStartEnd: async (_, args) => {
      const result = await prisma.task.update({
        where: { id: String(args.id) },
        data: { start: args.start, end: args.end },
      })
      return result
    },
  },
}
