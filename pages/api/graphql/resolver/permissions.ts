import { rule, shield } from 'graphql-shield'

const isCurrentUser = rule()(
  async (parent, { id }, context) => id === context.session.user.id
)
const isOwner = rule()(async (parent, args, context) => {
  const userId = context.session.user.id

  return args.userId === userId
})
// name this rule
const isTaskCreator = rule()(async (parent, args, context) => {
  const userId = context.session.user.id

  return args.input.userId === userId
})

const permissions = shield({
  Query: {
    user: isCurrentUser,
    tasks: isOwner,
    task: isOwner,
  },
  Mutation: {
    createTask: isTaskCreator,
    updateTask: isOwner,
    deleteTask: isOwner,
    deleteUser: isCurrentUser,
  },
})

export default permissions
