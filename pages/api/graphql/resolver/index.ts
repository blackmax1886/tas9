import { Prisma } from '@prisma/client'

import { Resolvers } from '../types/graphql'

import { prisma } from '@/prisma/client'

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
        orderBy: { createdAt: 'asc' },
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
    deleteUser: async (_, args) => {
      const result = await prisma.user.delete({
        where: {
          id: String(args.id),
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
    updateTask: async (_, args) => {
      const { id, input } = args

      const data: Prisma.TaskUpdateInput = {}

      // Enumerate the fields in `input` and only add them to `data` if they are not `undefined`.
      if (input.title !== undefined) {
        data.title = input.title || ''
      }
      if (input.content !== undefined) {
        data.content = input.content || ''
      }
      if (input.done !== undefined) {
        data.done = input.done || false
      }
      if (input.archived !== undefined) {
        data.archived = input.archived || false
      }
      if (input.due !== undefined) {
        data.due = input.due
      }
      if (input.start !== undefined) {
        data.start = input.start
      }
      if (input.end !== undefined) {
        data.end = input.end
      }
      if (input.group !== undefined) {
        data.group = input.group
      }
      if (input.type !== undefined) {
        data.type = input.type
      }
      if (input.priority !== undefined) {
        data.priority = input.priority
      }

      const result = await prisma.task.update({
        where: { id: String(id) },
        data,
      })

      return result
    },
  },
}
