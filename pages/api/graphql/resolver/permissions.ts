import { rule, shield } from 'graphql-shield'

import { prisma } from '@/prisma/client'

interface Context {
  session: {
    user: {
      id: string
    }
  }
}

const getUserId = (context: Context) => context.session.user.id

const isCurrentUser = rule()(
  async (parent, { id }, context: Context) =>
    id === getUserId(context) || 'You are not the current user.'
)

const isOwner = rule()(async (parent, args, context: Context) => {
  return args.userId === getUserId(context) || 'You are not the owner.'
})

const isTaskCreator = rule()(async (parent, args, context: Context) => {
  return (
    args.input.userId === getUserId(context) ||
    'You are not the owner of task you create.'
  )
})

const isTaskOwner = rule()(async (parent, args, context: Context) => {
  const taskId = args.taskId || args.id
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  })
  return (
    (!!task && task.userId === getUserId(context)) ||
    'You are not the owner of this task.'
  )
})

const permissions = shield({
  Query: {
    user: isCurrentUser,
    tasks: isOwner,
    task: isTaskOwner,
  },
  Mutation: {
    createTask: isTaskCreator,
    updateTask: isTaskOwner,
    deleteTask: isTaskOwner,
    deleteUser: isCurrentUser,
  },
})

export default permissions
